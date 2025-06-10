# 🖥 Real Estate Backend API

## 🔍 Overview  
This is the backend of the Real Estate Marketing Website. It provides an API for managing property listings, user authentication, and admin roles.

---

## ✨ Key Features

- User registration and login with bcrypt password hashing  
- Authentication using JWT  
- Role-based access control (Admin / Client)  
- CRUD operations for property listings

---

## 🛠 Technologies

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- bcrypt  
- JWT

---

## ⚙️ Installation and Running

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

---

## 📁 Folder Structure

```
/controllers  
/models  
/routes  
/middleware  
server.js
```

---

## 🔐 Security

- Passwords are hashed with bcrypt before being stored in the database  
- Routes are protected using JWT  
- Access is controlled based on user roles

---

## 📄 License

MIT
