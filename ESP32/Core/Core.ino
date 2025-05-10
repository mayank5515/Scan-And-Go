/*    FOR RFID SENSOR                  FOR LCD DISPLAY
------------------------------- -------------------------------
SDA         |       5               SDA        |     21
SCK         |       18              SCL        |     22
MOSI        |       23              VCC        |     VIN
MISO        |       19                         |
RST         |       2                          |
------------------------------- -------------------------------
*/

#include <SPI.h>
#include <MFRC522.h>
#include <string>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);  // Change 0x27 to your I2C address

const char* ssid = "IQOO_Z5_YJ";
const char* password = "yatharthjain";
char host[] = "192.168.70.131:3000";

#define RST_PIN 2
#define SS_PIN 5
int buzzer = 25;

MFRC522 mfrc522(SS_PIN, RST_PIN);

String lastSentID = "";                  // To store the last sent RFID ID
unsigned long lastSentTime = 0;          // To store the time when the last ID was sent
const unsigned long resendDelay = 5000;  // 5-second delay for re-sending the same ID

void setup() {
  Serial.begin(115200);
  SPI.begin();
  initializeLCD();                                                  // Call the function to initialize the LCD
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  displayText("Connecting To :" , ssid);
  pinMode(buzzer, OUTPUT);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  displayText("Wifi Connected" , "");
  delay(1000);
  displayText("192.168.70.131" , "PORT : 5173");
  delay(5000);

  mfrc522.PCD_Init();
  Serial.println(F("Read personal data on a MIFARE PICC:"));
}

void loop() {
  HTTPClient client;
  client.begin("http://192.168.70.131:3000/api/v1/products");

  displayText("Add Items in" , "the Cart");

  String ID = read_RFID();   // Fetch ID from RFID
  String Name = read_NAME(ID);
  int Price = get_price(ID);
  String desc = product_desc(ID);

  Serial.print(F("ID of product in string form is : "));
  Serial.println(ID);
  Serial.print(F("Name of the Product is : "));
  Serial.println(Name);

  // Check if ID is empty or if it's the same as the last sent ID within the delay period
  if (ID == "" || (ID == lastSentID && millis() - lastSentTime < resendDelay)) {
    delay(100);
    client.end();
    displayText("Add/Remove" , "items in cart");
    return;  // Skip sending data if ID is empty or duplicate within the delay period
  }

  // Update last sent ID and timestamp
  lastSentID = ID;
  lastSentTime = millis();

  // Create JSON object to send
  StaticJsonDocument<200> doc_tx;
  String jsonstring = "";
  JsonObject obj = doc_tx.to<JsonObject>();

  obj["unique_id"] = ID;
  obj["product_name"] = Name;
  obj["cost_price"] = Price;
  obj["product_description"] = desc;

  serializeJson(doc_tx, jsonstring);
  delay(500);  // Short delay before sending
  buzz(buzzer);  // Activate Buzzer to indicate a read

  String line1 = Name + " Detected";
  String str_price = String(Price);
  String line2 = "Rs. " + str_price;

  displayText(line1 , line2);
  delay(1000);

  client.addHeader("Content-Type", "application/json");
  int httpCode = client.POST(jsonstring);
  Serial.println(httpCode);

  if (httpCode > 0) {
    String payload = client.getString();
    Serial.println("\nStatusCode : " + String(httpCode));
    Serial.println(payload);
  } else {
    Serial.println("Error on HTTP request");
  }

  client.end();
}



