# SmartScan Pro

# 🛒 Smart Scan Pro: AI-Powered Self-Checkout Web App

## Description
Smart Scan Pro is a web-based application designed to eliminate long checkout lines in retail stores. Customers can use their smartphone's web browser to scan product barcodes as they shop, view a real-time running total, and complete their transaction through a streamlined digital process. This project aims to improve the customer experience and increase operational efficiency for retailers.

---

## 🔑 Key Features
- **User Authentication:** Secure sign-up and login for customers.
- **Real-time Barcode Scanning:** Uses the device's camera via the web browser to scan barcodes instantly.
- **Dynamic Shopping Cart:** Items are immediately added to a digital cart, and the total price is updated in real-time.
- **QR Code Checkout:** Generates a unique QR code upon payment completion for receipt verification and security checks.
- **Responsive Design:** Fully functional on both mobile and desktop web browsers.

---

## 🛠️ Tech Stack

### Front End
* **Framework:** React.js
* **Language:** JavaScript, HTML5, CSS3
* **Styling:** Tailwind CSS (or Material-UI)

### Back End
* **Framework:** Flask (or Django)
* **Language:** Python
* **Key Libraries:**
    * `Flask-RESTful` for API development
    * `Flask-SQLAlchemy` for database interaction
    * `Flask-JWT-Extended` for authentication

### Database
* **Development:** SQLite
* **Production:** PostgreSQL

### APIs
* **Internal:** A custom REST API built with Flask to handle products, users, and carts.
* **External:** A JavaScript library for camera access and barcode decoding.

### Deployment and Documentation
* **Front End Deployment:** Vercel / Netlify
* **Back End Deployment:** Heroku / AWS Elastic Beanstalk
* **API Documentation:** Swagger / OpenAPI

---

## 📊 Project Status
**In Development**

This project is currently in the initial development phase. The core features are being planned and implemented.

---

## 👥 Workload Distribution


---

## 🚀 Future Roadmap (Sprints)
*Each sprint is 2 weeks.*

### Sprint 1 (Weeks 1-2): Foundation & Setup
- [ ] Initialize Git repository.
- [ ] Set up the front-end (React) and back-end (Flask) project structures.
- [ ] Design the database schema for Users, Products, and Carts.
- [ ] Create basic UI mockups and wireframes.

### Sprint 2 (Weeks 3-4): User Authentication
- [ ] Implement user registration and login functionality on the back end.
- [ ] Create sign-up and login pages on the front end.
- [ ] Implement JWT token-based authentication to secure endpoints.

### Sprint 3 (Weeks 5-6): Core Scanning & Cart Feature
- [ ] Integrate a barcode scanning library into the React front end.
- [ ] Create back-end endpoints to fetch product details based on a scanned barcode.
- [ ] Implement the real-time shopping cart on the front end.

### Sprint 4 (Weeks 7-8): Checkout & Finalization
- [ ] Develop the checkout process logic.
- [ ] Generate a QR code receipt after successful "payment".
- [ ] Create a "verification" screen for the cashier.
- [ ] Refine the UI and fix bugs.

### Future Sprints (Post-MVP)
- **AI Object Recognition:** Implement a feature to identify items without barcodes (like produce) using a machine learning model (e.g., TensorFlow.js).
- **Promotions Engine:** Add functionality to apply discounts and coupons.
- **Analytics Dashboard:** Create a simple dashboard for retailers to view sales data.

---

## 🏁 Getting Started

---
## ✍️ Authors & Acknowledgements
* **Author:** 
* **Acknowledgements:** 
