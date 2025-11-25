# 🌍 AQI City Search – Full Stack Assessment

A full-stack web application to **search Air Quality Index (AQI)** for any city using an external API.
The project is built from scratch with **Node.js + Express (Backend)** and **React + Vite (Frontend)** using **MongoDB** for logging past searches and implementing caching.

---

## 🚀 Features

### 🔹 UI (Frontend)

✔ Search AQI by city name
✔ Show detailed air quality information
✔ Display pollutant breakdown (PM2.5, PM10, etc.)
✔ Show AQI level with color/category
✔ Maintain recent searched cities history
✔ Fast UI with React + Vite

### 🔹 Backend (Node.js + Express)

✔ Securely fetch AQI from external API
✔ **Caching layer** for speed (memory-based LRU Cache)
✔ Cache expiry & max entry control
✔ Error handling for invalid city/API errors
✔ Logs search history in MongoDB
✔ Proper REST API design

---

## 🛠️ Tech Stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Frontend     | React + Vite, Axios                     |
| Backend      | Node.js, Express                        |
| Database     | MongoDB                                 |
| External API | AQICN API (or similar AQI API provider) |
| Other        | dotenv, morgan, helmet, cors            |

---

## 📁 Project Structure

```
aqi-search/
│
├── backend/
│   ├── src/
│   │   ├── config/        # env vars, DB config
│   │   ├── controllers/   # API controllers
│   │   ├── middlewares/   # error handling
│   │   ├── models/        # MongoDB Schemas
│   │   ├── routes/        # API routes
│   │   ├── services/      # cache + API logic
│   │   ├── app.js         # Configure middleware
│   │   └── index.js       # App entry point
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/    # UI Components
    │   ├── hooks/         # Custom hooks
    │   ├── services/      # Axios API calls
    │   └── styles/        # CSS
```

---

## 🔑 API Used

API Recommended: **AQICN API**

Endpoint format:

```
https://api.waqi.info/feed/{CITY}/?token=YOUR_TOKEN
```

📌 You **must create your own free token** here → [https://aqicn.org/data-platform/token/](https://aqicn.org/data-platform/token/)
🔒 Token is stored securely in backend `.env`

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the project

```bash
git clone <repository-url>
cd aqi-search
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` in `backend/` folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aqi_search
AQI_API_BASE=https://api.waqi.info
AQI_API_TOKEN=YOUR_AQICN_TOKEN_HERE
CACHE_TTL_MS=300000
CACHE_MAX_ENTRIES=100
```

Then run:

```bash
npm run dev
```

Backend will run at 👉 **[http://localhost:5000](http://localhost:5000)**

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run at 👉 **[http://localhost:5173](http://localhost:5173)**

---

### 4️⃣ Test the Application

Open the frontend and **search any city**, e.g. `Delhi`, `Mumbai`, `London`, etc.

Or test the API directly:

```
GET http://localhost:5000/api/aqi?city=Delhi
```

---

## 🧠 Caching Logic

✔ LRU (Least Recently Used) in-memory cache
✔ Old entries removed automatically
✔ Faster response for repeated searches
✔ Cache expiry (example: 5 minutes)

---

## 📦 MongoDB Use

Used to store past successful AQI search logs:

```js
{
  city: "Delhi",
  aqi: 165,
  category: "Unhealthy",
  dominantPollutant: "pm25",
  createdAt: date
}
```

This helps in future analytics like:

* Most searched cities
* AQI trend tracking

---

## 🔐 Why Backend Even If We Have API Key?

| Problem                                    | Solution via Backend   |
| ------------------------------------------ | ---------------------- |
| API key gets visible if stored in frontend | Hidden in backend      |
| No caching/retries possible in frontend    | Implemented in backend |
| Error handling is hard                     | Managed in Express     |
| Need to log data                           | MongoDB via backend    |

---

## 📌 API Route Documentation

| Method | Route                  | Description               |
| ------ | ---------------------- | ------------------------- |
| `GET`  | `/api/aqi?city=<name>` | Get AQI details of a city |

Response example:

```json
{
  "city": "Delhi",
  "aqi": 165,
  "category": "Unhealthy",
  "dominantPollutant": "pm25",
  "breakdown": { "pm25": 165, "pm10": 89 },
  "time": "2025-01-12 15:00:00",
  "fromCache": false
}
```

---

## 📊 Frontend Highlights

* Built using **React (Vite)**
* Reusable components
* Custom hook for search (`useAqiSearch`)
* Responsive UI
* Clear error & loading states

---

## 🧪 Error Handling

| Case              | Handled As                              |
| ----------------- | --------------------------------------- |
| Invalid API Token | 401 → “API key invalid”                 |
| City not found    | 404 → “City not found”                  |
| External API down | 500 → “Service temporarily unavailable” |
| No input entered  | 400 → “City is required”                |

---

## 🏁 Final Notes

* The entire project runs **locally**.
* Code is written to be **clean, extensible, and production-ready**.
* You can easily add:

  * Authentication
  * AQI history graph
  * Multiple providers
  * Deployment

---

## 📬 Contact 

**Developer:** Aniket Singh


