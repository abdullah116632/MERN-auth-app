# MERN Authentication App

## 📌 Overview
**MERN Authentication App** is a **full-stack authentication system** built using **MongoDB, Express, React, and Node.js**. This project includes **user sign-up, login, email verification with OTP, forgot password, and password reset** functionalities. It uses **Zustand** for state management and **Tailwind CSS** for styling.

## 🎯 Features
- ✅ **User Sign-Up & Login**  
- ✉️ **Email Verification via OTP** (using Nodemailer)  
- 🔒 **Forgot Password & Reset Password**  
- 🛠️ **State management with Zustand**  
- 🎨 **Tailwind CSS for responsive design**  
- 🔐 **Secure authentication with JWT & bcrypt**  
- 🗄️ **MongoDB Atlas for database storage**  

## 🛠️ Technologies Used
### **Frontend:**
- **React.js** (for the user interface)
- **Zustand** (for global state management)
- **React Router** (for navigation)
- **Tailwind CSS** (for styling)

### **Backend:**
- **Node.js & Express.js** (for API and server)
- **MongoDB Atlas** (for database)
- **Mongoose** (for schema modeling)
- **JWT Authentication** (for secure login)
- **Bcrypt** (for password hashing)
- **Nodemailer** (for sending OTP emails)

## 📂 Folder Structure
```
MERN-auth-app/
│── client/   # React frontend with Zustand
│── server/    # Express & MongoDB backend
```

## 📸 Screenshots
![MERN Auth App Screenshot](https://res.cloudinary.com/dp0zdj77w/image/upload/v1742194430/forReadme/Screenshot_2025-03-17_125333_s3qjhe.png)

## 🚀 How to Run
0. Clone the repository:
   ```sh
   git clone https://github.com/abdullah116632/MERN-auth-app.git
   ```

### 🖥️ Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Add a `.env` file and set up:
   ```
   MONGO_URI=your-mongodb-atlas-url
   JWT_SECRET=your-secret-key
   EMAIL_HOST=smtp.your-email-provider.com
   EMAIL_PORT=your-email-port
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### 🎨 Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm start
   ```
4. Open your browser and go to `http://localhost:3000/`.

## 📌 Future Improvements
- 🔄 **Implement social authentication (Google, GitHub, etc.)**  
- 🔔 **Add email notifications for account activity**  
- 🌍 **Deploy the app on a cloud platform**  

## 📜 License
This project is open-source and can be modified for learning purposes.
