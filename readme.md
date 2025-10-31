# 📘 Bookit – Experience Booking Platform

Bookit is a full-stack MERN (MongoDB, Express.js, React, Node.js) web application that allows users to browse and book experiences. It includes date selection, slot validation, and checkout functionality.

---

## 🧩 Tech Stack

**Frontend:**

- React (Vite)
- Axios
- Tailwind CSS

**Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS

**Deployment:**

- Vercel (Frontend + Backend)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/bookit.git
cd bookit
```

---

### 2️⃣ Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

---

### 3️⃣ Environment Variables

Create `.env` files in both **client** and **server** directories.

#### 🧠 Server (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

#### 🧠 Client (.env.local)

```env
VITE_API_URL=http://localhost:5000
```

When deploying to production:

- Update `CLIENT_URL` to your **frontend Vercel URL**
- Update `VITE_API_URL` to your **backend Vercel URL**

Example:

```env
VITE_API_URL=https://bookit-backend-one.vercel.app
```

---

### 4️⃣ Run the App Locally

#### Backend

```bash
cd server
npm start
```

Server runs on [http://localhost:5000](http://localhost:5000)

#### Frontend

```bash
cd ../client
npm run dev
```

Frontend runs on [http://localhost:5173](http://localhost:5173)

---

## 🚀 Deployment (Vercel)

### Frontend

1. Connect your **client** folder to Vercel.
2. Set root directory as `client`.
3. Add environment variables from `.env.production`.
4. Vercel automatically builds using Vite.

### Backend

1. Connect your **server** folder to Vercel.
2. Set root directory as `server`.
3. Add environment variables (`MONGO_URI`, `CLIENT_URL`, etc.).
4. Vercel builds and deploys automatically.

---

## 🧠 Features

✅ Experience listing with details  
✅ Date and time selection  
✅ Form validation (name, email, etc.)  
✅ Prevents double booking for the same slot  
✅ Real-time feedback (loading, success, failure)  
✅ Responsive and modern UI  
✅ Deployed full-stack on Vercel

---

## 🧪 API Endpoints

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| GET    | `/experiences`     | Fetch all experiences         |
| GET    | `/experiences/:id` | Get details of one experience |
| POST   | `/bookings`        | Create a booking              |
| GET    | `/bookings`        | Get all bookings              |

---

## 📸 Screenshots

> _(Add some screenshots here once your frontend is finalized)_

---

## 💡 Future Improvements

- Add user authentication
- Integrate payment gateway
- Add admin dashboard for managing experiences and bookings

---

## 👨‍💻 Author

**Ashwin Jaiswal**  
🚀 Built with ❤️ using the MERN Stack  
[Frontend Deployed on Vercel](https://bookit-frontend-ejtartf5y-chaserashwin-projects.vercel.app)  
[Backend Deployed on Vercel](https://bookit-backend-one.vercel.app)
