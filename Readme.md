# Sneakers online store with MERN Stack

<img src="https://i.ibb.co/r70cv7y/Screenshot-2023-07-18-121715.jpg"/>

<!-- <a href="https://ibb.co/NVCm7VY"><img src="https://i.ibb.co/r70cv7y/Screenshot-2023-07-18-121715.jpg" alt="Screenshot-2023-07-18-121715" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'>post it png free</a><br /> -->

This is a online sneakers store project named SNEAKEST, built with the MERN stack, including Axios,Redux-toolkit and Razorpay Payment Gateway integration. The project aims to provide a platform for users to buy sneakers online. The design inspiration is adopt from old design of Super kick online sneakers website.

Live Website -

### 📝 Table of Contents

- Features
- Technologies
- Installation
- Usage
- Authors

### 🧐 Features

- User registration and authentication with login
- Product listing
- Product details
- Add to cart and checkout
- Payment using Razorpay Payment Gateway

### ⛏️ Technologies

This project is built with the following technologies:

- MERN stack (MongoDB, Express, React, Node.js)
- Axios (for HTTP requests)
- JWT Token with token generation and verification.
- Razorpay Payment Gateway
- Styled components (for styling)
- Font Awesome (for icons)

### 🏁 Installation

Desc- Created with some sold react pacakges, therefore kindly use --force for installation, if face any errors

To run this project on your local machine, follow these steps:

1. Clone the repository: git clone
2. Change directory: `cd api`
3. Install dependencies: `npm install` if any error do `npm install --force`
4. Create a .env file and add the following environment variables

```
 MONGO_URI=<MONGO_URI>
Secrete_key=<YOUR_SECERTE_KEY>
 JWT_SECERTE_KEY=<YOUR_JWT_SECERTE_KEY>
 RAZORPAY_KEY_ID =<RAZORPAY_KEY_ID>
 RAZORPAY_KEY_SECRET =<RAZORPAY_KEY_SECRET>

```

5. Start the backend server: `npm start`(if you are using nodemon then change in script of pacakge.json for start i.e `nodemon index.js`)

6. Then `cd ..` to comes back to root file and do `cd client` and then do `npm install` or `npm install --force`.

7. Create a .env file and add the following environment variables

```
    REACT_APP_RAZORPAY_KEY_ID =<RAZORPAY_KEY_ID>(same as used in server folder)
    REACT_APP_RAZORPAY_KEY_SECRET =<RAZORPAY_KEY_SECRET>(same as REACT_APP_used in server folder)
    REACT_APP_BACKEND_API_URL=http://localhost:5500/api

```

8. start the frontend server: `npm start`.

### 🎈Usage

1. Register as a user or login to an existing account.
2. Browse the products listed on the home page or search for a specific product.
3. Click on a product to view its details and comments.
4. Add the product to your cart and proceed to checkout.
5. Enter your payment details and complete the payment using Razorpay Payment Gateway.

Note- Razorpay Gateway which I used is in testmode so used following payments details for testing purposes

######Card details:

```
Card number - 4111 1111 1111 1111
CVV - Random CVV
ExpiryDate - Any future date

```

######UPI ID

```for UPI
for success test - success@razorpay

for failure test - failure@razorpay
```

### ✍️ Authors

[@AbhayKadam57](https://github.com/AbhayKadam57) - only for clone making

- Desclaimer - All rights of images are belong to the Superkick company.
  This project is created just for educational purposes only. we do not intend to use it for any commercial purposes.
