**AgriConnect** aims to solve these problems by creating a centralized digital ecosystem that connects farmers, experts, administrators, and the public.

---

## 🚀 Features

### 👨‍💼 Admin

* Manage platform content
* Approve and monitor posts
* Manage user accounts
* Ensure data authenticity

### 🚜 Farmer

* Access farming resources
* Connect with agricultural experts
* Explore government schemes
* Post queries and share experiences

### 🌿 Agricultural Expert

* Provide consultancy and guidance
* Publish educational content
* Conduct digital awareness sessions

### 🌍 Public User

* Learn about agriculture
* Participate in discussions
* Support farmer initiatives

---

## 🛠 Tech Stack

### Frontend
* ⚛ React.js 19+
* 📘 TypeScript 5.8+
* 🎨 Tailwind CSS 4+
* ⚡ Vite 6
* 📡 React Router 7+
* 🎭 Radix UI Components

### Backend
* ☕ Java / Spring Boot
* 🗄️ MySQL Database
* 🔐 JWT Authentication

---

## 📂 Project Structure

```
agriconnect/
│
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   ├── dashboard/         # Dashboard widgets
│   │   ├── layout/            # Layout components
│   │   └── ui/                # Reusable UI components
│   ├── context/               # Context providers (Auth)
│   ├── pages/                 # Page components
│   ├── lib/
│   │   ├── api.ts             # API service layer
│   │   ├── hooks.ts           # Custom React hooks
│   │   └── utils.ts           # Utility functions
│   ├── data/                  # Mock data (deprecated)
│   ├── App.tsx
│   └── main.tsx
│
├── .env                       # Environment variables
├── vite.config.ts
├── tsconfig.json
├── package.json
├── INTEGRATION_GUIDE.md       # Backend integration guide
└── README.md
```

---

## ⚙ Installation & Setup

### Prerequisites

- Node.js 16+ 
- npm 8+
- Java 11+ (for backend)
- MySQL 8+ (for backend)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/hemanthanala303/agriconnect.git

# Navigate to project folder
cd agriconnect

# Install dependencies
npm install

# Create .env file (copy from .env.example and update)
cp .env.example .env
# Edit .env with your backend URL:
# VITE_API_URL=http://localhost:8080
# VITE_API_PREFIX=/api/v1

# Start development server
npm run dev
```

The frontend will run at:
👉 [http://localhost:3000/](http://localhost:3000/)

### Backend Setup

Ensure your Spring backend is running on `http://localhost:8080` with the following configuration:

1. **Database**: Configure MySQL connection in `application.properties`
2. **CORS**: Enable CORS for `http://localhost:3000` (and `http://localhost:5173` for Vite preview)
3. **JWT**: Configure JWT token generation and validation
4. **Endpoints**: Follow the API structure in [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

---

## 🔌 API Integration

The frontend is fully integrated with the Spring backend. All API calls are managed through:

- **API Service**: [`src/lib/api.ts`](src/lib/api.ts) - Central API client
- **Auth Context**: [`src/context/AuthContext.tsx`](src/context/AuthContext.tsx) - Authentication management
- **Custom Hooks**: [`src/lib/hooks.ts`](src/lib/hooks.ts) - useFetch, usePaginatedFetch

### Quick Example

```typescript
import { useAuth } from "@/context/AuthContext";
import { cropAPI } from "@/lib/api";
import { useFetch } from "@/lib/hooks";

function MyCrops() {
  const { user } = useAuth();
  const { data: crops, isLoading, error } = useFetch(
    () => cropAPI.getUserCrops(user?.id || ""),
    [user?.id]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {crops?.map(crop => <div key={crop.id}>{crop.name}</div>)}
    </div>
  );
}
```

📖 **For detailed integration guide, see [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)**

---

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server with HMR

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Quality
npm run lint         # Type checking with TypeScript
npm run clean        # Clean dist folder
```

---

## 🔐 Authentication

The app uses JWT token-based authentication with the Spring backend:

1. **Login**: User credentials are sent to backend `/api/v1/auth/login`
2. **Token**: Backend returns JWT token stored in localStorage
3. **Protected Routes**: Routes require valid authentication
4. **Auto-Redirect**: 401 responses redirect to login page

---

## 🌐 Environment Variables

Create a `.env` file in the project root:

```env
# Backend Configuration
VITE_API_URL=http://localhost:8080
VITE_API_PREFIX=/api/v1

# Optional: Gemini API Key for AI features
VITE_GEMINI_API_KEY=your_api_key_here
```

---

## 🧪 Testing Backend Connection

1. Ensure Spring backend is running: `http://localhost:8080`
2. Start frontend: `npm run dev`
3. Open browser DevTools → Network tab
4. Try logging in - inspect API requests
5. Check response data and errors in console

---

## 📋 API Endpoints

All endpoints use `/api/v1` prefix. Full reference:

- **Auth**: `/auth/login`, `/auth/register`, `/auth/me`, `/auth/logout`
- **Crops**: `/crops`, `/crops/{id}`, `/crops/user/{userId}`
- **Farm**: `/farm-data/stats`, `/farm-data/metrics`, `/farm-data/tasks`
- **Community**: `/community/forum/threads`, `/community/connections`
- **Learning**: `/learning/resources`
- **Market**: `/market/prices`, `/market/opportunities`
- **Admin**: `/admin/stats`, `/admin/users`, `/admin/content/moderation`

📖 **See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for complete API reference**

---

## 🐛 Troubleshooting

### CORS Errors
- Check backend CORS configuration
- Ensure frontend origin is whitelisted on backend

### 401 Unauthorized
- Clear localStorage and login again
- Check if backend token validation is working

### API Connection Failed
- Verify backend URL in `.env`
- Check if backend service is running
- Inspect Network tab in DevTools

For more help, see [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md#common-issues-and-solutions)

---

## 📚 Documentation

- [Integration Guide](./INTEGRATION_GUIDE.md) - Backend integration details
- [Setup Scripts](./SETUP.sh) - Automated setup (Linux/Mac)
- [Setup Script](./SETUP.bat) - Automated setup (Windows)

---

## 👥 Contributors

- Hemant Anala

---

## 📝 License

This project is licensed under the MIT License.

---
