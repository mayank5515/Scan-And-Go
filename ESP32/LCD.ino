void initializeLCD() {
  lcd.begin();                       // Initialize the LCD
  lcd.backlight();                  // Turn on the backlight
  lcd.clear();                      // Clear the display
}

void displayText(String line1, String line2) {
  lcd.clear();                      // Clear the display before updating
  lcd.setCursor(0, 0);              // Set cursor to the first row
  lcd.print(line1);                 // Print the first line of text
  lcd.setCursor(0, 1);              // Set cursor to the second row
  lcd.print(line2);                 // Print the second line of text
}
