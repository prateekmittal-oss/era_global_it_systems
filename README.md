# ERA IT Asset Management System (IT AMS)

A modern, full-stack internal IT Asset Management dashboard for ERA Global. No login required — dashboard-only admin interface.

## Tech Stack

| Layer    | Technologies                                      |
|----------|---------------------------------------------------|
| Frontend | React 18, Vite, Tailwind CSS, React Router, Axios |
| Backend  | Node.js, Express.js, Mongoose                     |
| Database | MongoDB                                           |

## Project Architecture

```
era_it_assests_cursor/
├── backend/                 # Express REST API
│   ├── config/db.js         # MongoDB connection
│   ├── controllers/         # Business logic
│   ├── middleware/          # Error handling
│   ├── models/Asset.js      # Mongoose schema
│   ├── routes/assetRoutes.js
│   └── server.js
├── frontend/                # React SPA
│   └── src/
│       ├── api/             # Axios API layer
│       ├── components/      # Reusable UI
│       ├── context/         # Theme, Toast, Search
│       ├── pages/           # Route pages
│       └── utils/           # CSV export, dates
└── README.md
```

## Features

- **Dashboard** — Stats cards, bar/pie charts, recent assets table
- **CRUD** — Add, edit, delete, view asset details
- **Search & filters** — By keyword, category, status
- **Pagination** — Server-side paginated asset list
- **Categories** — Laptops, Desktops, LEDs, Printers, WiFi Devices, Cables
- **Auto Asset IDs** — `LAP-0001`, `DESK-0001`, `LED-0001`, etc.
- **Reports** — Analytics page with charts and CSV export
- **Dark/Light mode** — Toggle with persistence
- **Responsive UI** — Glassmorphism, sidebar, mobile-friendly

## Asset ID Prefixes

| Category      | Prefix | Example   |
|---------------|--------|-----------|
| Laptops       | LAP    | LAP-0001  |
| Desktops      | DESK   | DESK-0001 |
| LEDs          | LED    | LED-0001  |
| Printers      | PRN    | PRN-0001  |
| WiFi Devices  | WIFI   | WIFI-0001 |
| Cables        | CBL    | CBL-0001  |

## API Endpoints

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | `/api/health`               | Health check             |
| GET    | `/api/assets`               | List (search, filter, pagination) |
| GET    | `/api/assets/stats`         | Dashboard statistics     |
| GET    | `/api/assets/category/:name`| Assets by category       |
| GET    | `/api/assets/:id`           | Single asset             |
| POST   | `/api/assets`               | Create asset             |
| PUT    | `/api/assets/:id`           | Update asset             |
| DELETE | `/api/assets/:id`           | Delete asset             |

### Query Parameters (GET /api/assets)

- `search` — Full-text search
- `category` — Filter by category
- `status` — Filter by status
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 10, max: 100)

---

## Installation & Setup

### Prerequisites

- **Node.js** 18+ ([nodejs.org](https://nodejs.org))
- **MongoDB** 6+ running locally or MongoDB Atlas URI

### 1. Clone / open project

```powershell
cd "c:\Users\ERA GLOBAL\OneDrive\Desktop\era_it_assests_cursor"
```

### 2. Backend setup

```powershell
cd backend
copy .env.example .env
# Edit .env — set MONGODB_URI if needed
npm install
npm run dev
```

Server runs at **http://localhost:5000**

### 3. MongoDB setup

**Local MongoDB:**

1. Install MongoDB Community Server
2. Start the service: `net start MongoDB` (Windows)
3. Default URI in `.env`: `mongodb://127.0.0.1:27017/era_it_assets`

**MongoDB Atlas:**

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Get connection string and set in `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/era_it_assets
   ```

### 4. Frontend setup

```powershell
cd frontend
npm install
npm run dev
```

App runs at **http://localhost:5173** (API proxied to backend via Vite)

Optional: create `frontend/.env` for production API URL:

```
VITE_API_URL=http://localhost:5000/api
```

---

## Running in Production Mode

```powershell
# Terminal 1 — Backend
cd backend
npm start

# Terminal 2 — Frontend build & preview
cd frontend
npm run build
npm run preview
```

---

## Pages

| Route                    | Page                    |
|--------------------------|-------------------------|
| `/`                      | Dashboard               |
| `/assets`                | All Assets              |
| `/assets/add`            | Add Asset               |
| `/assets/edit/:id`       | Edit Asset              |
| `/assets/:id`            | Asset Details           |
| `/category/laptops`      | Category: Laptops       |
| `/category/desktops`     | Category: Desktops      |
| `/category/leds`         | Category: LEDs          |
| `/category/printers`     | Category: Printers      |
| `/category/wifi-devices` | Category: WiFi Devices  |
| `/category/cables`       | Category: Cables        |
| `/reports`               | Reports & Statistics    |

---

## Deployment Guide

### Backend (Render / Railway / VPS)

1. Push code to GitHub
2. Set environment variables:
   - `PORT=5000`
   - `MONGODB_URI=<your-atlas-uri>`
3. Start command: `npm start`
4. Enable CORS for your frontend domain (already open via `cors()`)

### Frontend (Vercel / Netlify)

1. Build command: `npm run build`
2. Output directory: `dist`
3. Environment variable:
   ```
   VITE_API_URL=https://your-api-domain.com/api
   ```

### Full-stack VPS (Nginx)

1. Run backend with PM2: `pm2 start server.js --name era-ams-api`
2. Build frontend: `npm run build`
3. Serve `frontend/dist` with Nginx
4. Proxy `/api` to `localhost:5000`

---

## Testing Checklist

- [ ] MongoDB connected (check backend console)
- [ ] `GET http://localhost:5000/api/health` returns success
- [ ] Add asset → ID auto-generated (e.g. LAP-0001)
- [ ] Edit asset → category locked, other fields update
- [ ] Delete asset → confirmation modal works
- [ ] Search, category, status filters on All Assets
- [ ] Dashboard charts load with data
- [ ] Export CSV downloads file
- [ ] Dark mode toggle persists on refresh
- [ ] Mobile sidebar opens/closes

---

## License

Internal use — ERA Global IT Department.
