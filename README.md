# Student Financial Wellness App

## **Description**  
This project is a **student-focused financial wellness platform** designed to help college students manage their finances more effectively while building financial literacy.  

It combines:  
- **Expense Tracking:** Manual entry and optional bank integration.  
- **Student Loan Management & Education:** A loan dashboard, a repayment calculator, and financial concepts explained by an AI.  
- **Discounts & Scholarships Feed:** Aggregated student-specific offers.  
- **AI Chatbot:** An intelligent assistant that answers student financial questions, integrates user data, and provides personalized insights.  

---

## **Key Features**  
- Track income and expenses with categories and visual dashboards.  
- Manage student loans with repayment simulations and forecasting.  
- Get real-time student discounts and curated scholarship information.  
- Ask questions via an AI-powered chatbot for:  
  - Spending summaries (*“How much did I spend on books last month?”*)  
  - Loan advice (*“What happens if I pay $100 more per month?”*)  
  - Offers (*“Any food discounts available this week?”*)  
- Cloud-deployed web app with a responsive front-end design.  

---

## **Tech Stack**

### **Frontend**  
- React.js (main framework for web app)  
- Material-UI / Chakra UI (component library for styling)  
- Chart.js / Recharts (visualization of expenses & loans)  
- React Router (routing & navigation)  

### **Backend & Infrastructure**  
- **Backend Framework:** Node.js (Express.js) or Python (FastAPI)  
- **Database:** PostgreSQL (primary), Redis (caching)  
- **AI Integration:** OpenAI GPT-4o API  
- **Bank Integration (optional):** Plaid API Sandbox  
- **Discounts Integration:** Custom scrapers/APIs for student offers  
- **Cloud:**  
  - AWS/GCP (backend + DB hosting)  
  - Vercel/Netlify (frontend hosting)  
  - Docker & Kubernetes for scalability  
- **Auth & Security:** JWT, OAuth2, HTTPS  

---

## **Project Status**  
1. **Current Phase (Week 1):** Setting up repo, writing README, finalizing architecture.  
2. **Next Phase (Week 2):** Start Expense Tracking module (manual entry).  

---

## **Workload Distribution**  
Since this is a **solo project**, all roles will be handled by me:  
- **Frontend Development:** UI/UX with React.js  
- **Backend Development:** APIs with Express/FastAPI  
- **Database Design:** PostgreSQL schema for users, expenses, loans, offers  
- **AI Integration:** OpenAI GPT-4o chatbot, connecting data to LLM  
- **Cloud & DevOps:** AWS/GCP deployment, Dockerization  
- **Project Management:** Weekly progress tracked in Notion + GitHub commits  

---

## **Future Roadmap: Sprints/Phases**  
- **Week 1:** Setup (repo, DB schema, README, environment)  
- **Week 2–3:** Expense Tracking (manual input + dashboard)  
- **Week 4:** Loan Management (loan input + calculator)  
- **Week 5:** Discounts & Scholarships feed  
- **Week 6:** Chatbot (UI + basic GPT integration)  
- **Week 7:** Chatbot with DB data integration (expenses, loans, offers)  
- **Week 8:** Deployment (AWS/Vercel) + final polish + demo prep  

---

## **How to Run the Project (Midterm Delivery)**  
*(To be added later once setup instructions are finalized.)*  

---

## **Cost Breakdown (Estimated)**  
- **OpenAI GPT-4o API:** ~$0.01 per advanced request ($5–10/month for demo use)  
- **Plaid Sandbox:** Free for testing  
- **AWS/GCP Cloud (Student Credits):** $0 (using free tier or credits)  
- **Frontend Hosting (Vercel/Netlify):** Free tier  
- **Domain (Optional):** $10–15/year  

**Total Estimated Cost for MVP:** ~$15–25/month (mostly AI usage)  

---

## **Business Use Case**  
- Students struggle with irregular income, complex loan terms, and overspending.  
- Current apps (Mint, YNAB, Rocket Money) assume financial literacy and stable income.  

**Differentiator:**  
- **Education-first:** AI explains financial terms.  
- **Student-specific:** Loans, scholarships, student discounts.  
- **Proactive:** The chatbot provides reminders, insights, and advice instead of passive dashboards.  

---

## **Authors & Acknowledgements**

