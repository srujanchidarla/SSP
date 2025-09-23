# SmartScan Pro

## **Description**
**SmartScan Pro** is an AI-powered self-scanning retail app for off-price retailers like Marshalls, TJ Maxx, and HomeGoods.  
It uses OCR + barcode scanning to handle complex price tags, integrates with payment systems, and provides secure QR-based exit verification — making shopping faster and safer.

---

## **Problem Solved**
Traditional self-checkouts fail in off-price retail due to inconsistent barcodes, handwritten tags, and theft risk.  
**SmartScan Pro** solves this with AI-powered scanning, real-time price validation, and security integration.

---

## **Key Features**
- **Scanning:** AI OCR + barcode support, multi-format tag recognition
- **Shopping Assistant:** Budget tracking, allergen alerts, product discovery feed
- **Security:** Encrypted QR exit verification, fraud detection, transaction logs
- **Analytics:** Heatmaps, cart abandonment insights, inventory trends

---

## **Tech Stack**
- **Frontend:** React Native, Redux Toolkit, React Navigation, NativeBase, react-native-camera, Stripe SDK
- **Backend:** Node.js (Express.js), JWT Auth, Multer, Sharp/OpenCV.js, Redis, Jest
- **Database:** PostgreSQL (Sequelize ORM), Redis cache
- **APIs:** Google Vision, Stripe, Twilio, Firebase (FCM), Google Maps
- **Deployment:** Docker, AWS/GCP, GitHub Actions (CI/CD), Swagger (API Docs), Sentry (error tracking)

---

## **Project Status**
🚧 **In Development** – 14-week Capstone Project

- **Completed:** Repo setup, database schema, JWT auth, basic app navigation, user registration/login
- **In Progress:** Barcode scanning, product DB integration, digital cart, payment flow
- **Upcoming:** QR-based security, OCR integration, analytics dashboard, full testing & polish

---

## **Workload Distribution**
- **Mobile Development (40%)** – UI/UX, camera scanning, payment integration
- **Backend (35%)** – APIs, authentication, database, integrations
- **AI/ML (15%)** – OCR, image processing, recommendations
- **DevOps (10%)** – CI/CD, deployment, monitoring

---

## **Future Roadmap (Sprints – 2 weeks each)**
- **Core Scanning:** Barcode scanning, cart system, basic payments
- **Security & QR:** Encrypted QR exit, fraud detection, transaction history
- **AI OCR Integration:** Price tag OCR, allergen & ingredient analysis
- **Smart Features:** Budget tracker, product discovery, route optimization
- **Analytics Dashboard:** Store heatmaps, inventory insights, KPI tracking
- **Testing & Polish:** Load testing, security audit, accessibility, docs

---

## **Getting Started (Setup by Midterm)**

```bash
# Clone repo
git clone https://github.com/[username]/smartscan-pro.git && cd smartscan-pro

# Backend setup
cd backend && npm install && cp .env.example .env && npm run migrate && npm run dev

# Mobile app setup
cd ../mobile-app/SmartScanApp && npm install && npx react-native start
npx react-native run-android   # or run-ios (Mac only)
