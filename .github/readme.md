
 <div align="center"> 

#  **Scan&Go**



 ### Self-Checkout Made Simple






<p align="center">
<img  width="400" height="400" src="">
</p>

  
[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://github.com/mayank5515/shoppingList) 
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://react.dev/) 
[![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://github.com/mayank5515/shoppingList)
       
  
 [![Typing SVG](https://readme-typing-svg.demolab.com?font=QUARTZO+&pause=1000&color=F72288&width=435&lines=Built+for+7th+Semester+Minor+Project)](https://git.io/typing-svg)
 
 
</div>


# 🧭 `Table of contents`

- [Scan&Go](#Scan&Go)
- [Table of contents🧭 ](#Table-of-contents)
- [Introduction🚀](#Introduction)
- [Local Implementation](#Local-Implementation)
- [Technologies Used📫](#Technologies-Used)
- [Features](#Features)
- [ScanGo In Action](#Screenshots-and-Video)
- [Made By](#Builders)





## `Introduction`
<!--- <div align="center">
<img  width="100" height="120" align="center" src="https://user-images.githubusercontent.com/110530263/225117486-588eb822-df15-44c5-aa77-d6a955fa9002.png">
 </div> --->
 
- Scan&Go makes checkout hassle-free! First, authenticate by entering your number and verifying with OTP.
- Then, add items to your cart, and they’ll sync instantly to your phone.
- Pay directly through the website on your phone and skip the checkout line. Quick, easy, and no queues!


## `Local Implementation`
- Clone the repository

```
git clone https://github.com/mayank5515/shoppingList
```

- Navigate to the project directory
```
cd backend
```
- Install dependencies
```
npm run dev 
```

- Run the react application



## `Technologies Used`

- [ReactJS](react.dev)
- [Socket](https://socket.io/docs/v4/)
- [ESP32](https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf)
- [Authentication with twillio](https://www.twilio.com/docs)
  


## `Features`

- Real-time Synchronization: Your phone will sync with the hardware in real-time as soon as you connect it to the store's WiFi thanks to Socket.io. The connection is made as soon as you enter your OTP, and the things you add to your cart are immediately updated.

- Simple Cart Management: Put products in your shopping basket and instantly sync them with your phone. Re-scanning the RFID tags allows you to remove things as well.

- ESP32 Integration: For smooth connectivity, the ESP32 module joins the store's WiFi network. Due to static IP restrictions, we used mobile internet for testing; however, this may be readily set up for actual implementation.

- Flexible Payment Options: Checkout accepts a number of payment options, including UPI, credit cards, and debit cards, and supports the Razorpay payment gateway the documentation for same could be found [here](https://razorpay.com/docs/#home-payments)
  
## `Screenshots and Video` 

## How to Contribute
💥 **How to Contribute to scan&Go?**

1. Take a look at the existing issues or create your own issues!
2. Wait for the issue to be assigned to you.
3. Fork the repository: [shoppingList](https://github.com/mayank5515/shoppingList)
4. Clone the repository to your local machine using the following command:
    ```bash
    git clone https://github.com/mayank5515/shoppingList
    ```
5. Create a new branch for your contributions:
    ```bash
    git checkout -b feature/your-feature-name
    ```
6. Make your changes and commit them:
    ```bash
    git add .
    git commit -m "Add your meaningful commit message here"
    ```
7. Push your changes to your fork:
    ```bash
    git push origin feature/your-feature-name
    ```
8. Create a Pull Request (PR) from your fork to the `main` branch of the original repository.
9. Wait for your PR to be reviewed and merged.

Thank you for contributing to scan&go! 🌟

## `Builders`

* [Mayank Chaturwedi](https://github.com/mayank5515)
  
# ⭐️ `Star us`
- **If you like our project and want to support us, please consider starring our repository as a token of appreciation. Thank you!**
