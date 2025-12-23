🏢 WorkProof — Secure Employee & Organization Management System

📌 Project Overview
WorkProof is a full-stack web application designed to securely manage organizations, employees, and their employment history.
The system enables organizations to onboard employees, track their work history, and verify employment records, while employees can securely access and manage their profiles.

🔧 Implementation Approach
Backend: Built using Node.js, Express, and MongoDB, following RESTful API principles.
Authentication: JWT-based authentication for secure role-based access (Organization & Employee).
Frontend: Developed using React (Vite) with clean routing, reusable components, and API integration.
Security: Password hashing, JWT token validation, protected routes, and environment-based configuration.

⚙️ Setup & Run Instructions
📦 Prerequisites
-Node.js (v18+ recommended)
-MongoDB (local or Atlas)
-npm / yarn

🔹 Backend Setup
cd backend
npm install

env
PORT=5000
MONGO_URI=mongodb+srv://workproofadmin:workproof204@workproof0.uyo6n8m.mongodb.net/workproofdb?retryWrites=true&w=majority
JWT_SECRET=98ebb1201ba7fe926145cc414fd5eae461d2a50fe2d0d58ed766f83a1c34a6796d968a295ec793d6b3d48fc470d893deba19bf3ab73b881741b38197b58c4cef
JWT_EXPIRY=3600

Run the backend server:
npm run dev

Backend will run on:
👉 http://localhost:5000

🔹 Frontend Setup
cd frontend
npm install
npm run dev

Frontend will run on:
👉 http://localhost:5173 

![alt text](image-1.png) 

![alt text](image-2.png) 

![alt text](image-3.png) 

![alt text](image-4.png) 

![alt text](image-5.png) 

![alt text](image-6.png) 

⭐ Effectiveness Score
Score: 5 / 5
Justification:
AI tools significantly improved development speed by reducing boilerplate work, accelerating debugging, and improving architectural decisions. Saved approximately 3–4 hours on JWT authentication, routing issues, and frontend-backend integration.

📊 Evaluation Criteria Alignment
✅ Backend Implementation — High

RESTful API design
JWT-based authentication
Secure password hashing
Robust error handling
Clean controller & route separation

✅ Frontend Implementation — High
React + Vite architecture
Clean UI & responsive layouts
Proper state handling
Secure API communication

✅ Code Quality — High
Modular structure
Clear naming conventions
Commented logic
Reusable components

✅ Documentation & Submission — Medium
Clear setup instructions
API documentation
AI usage log included

✅ AI Tool Utilization — Medium
Strategic and responsible usage
Assisted productivity without over-dependency

🚀 Future Enhancements
Organization verification workflow
Employee document upload
Audit logs
Admin dashboard
Email notifications


