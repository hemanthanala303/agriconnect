# Quick Reference - Frontend-Backend Integration

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Frontend
```bash
npm run dev
# Opens on http://localhost:5173
```

### 3. Run Backend
```bash
# In separate terminal
mvn spring-boot:run
# Runs on http://localhost:8080
```

### 4. Test Login
- Navigate to `http://localhost:5173/login`
- Enter valid credentials
- Should redirect to dashboard

---

## 📁 Key Files

| File | Purpose | Status |
|------|---------|--------|
| `src/lib/api.js` | API client with JWT | ✅ Ready |
| `src/context/AuthContext.jsx` | Auth state management | ✅ Ready |
| `.env` | API configuration | ✅ Ready |
| `package.json` | Dependencies | ✅ Ready |

---

## 🔗 API Usage

### Import API
```javascript
import { cropAPI, authAPI, adviceAPI } from '@/lib/api';
```

### Login
```javascript
const user = await authAPI.login(email, password);
// Token auto-stored in localStorage
```

### Get Crops
```javascript
const crops = await cropAPI.getAllCrops();
```

### Add Crop
```javascript
const crop = await cropAPI.addCrop({
  name: "Wheat",
  variety: "HD2967",
  areaPlanted: 5,
  plantingDate: "2026-03-15",
  expectedHarvestDate: "2026-06-15"
});
```

### Ask Advice
```javascript
const advice = await adviceAPI.askAdvice({
  title: "Crop Disease",
  description: "My wheat has brown spots",
  cropId: 1,
  category: "Disease Management"
});
```

### Use Auth Context
```javascript
import { useAuth } from '@/context/AuthContext';

function MyComponent() {
  const { user, login, logout } = useAuth();
  return <>{user?.name && <p>Welcome {user.name}</p>}</>;
}
```

---

## 🔐 Authentication Flow

1. User logs in → `authAPI.login(email, password)`
2. Backend returns JWT token
3. Token stored in `localStorage.authToken`
4. All requests include: `Authorization: Bearer {token}`
5. 401 response → Auto-redirect to login

---

## 📡 Available API Modules

```javascript
authAPI       // Login, register, token management
userAPI       // User profile CRUD
farmerAPI     // Farmer profile operations
cropAPI       // Crop management
adviceAPI     // Advisory/questions/answers
farmDataAPI   // Tasks, stats, weather
weatherAPI    // Weather data
marketAPI     // Market prices, opportunities
communityAPI  // Forum, connections
learningAPI   // Learning resources
expertAPI     // Expert profiles, consultations
adminAPI      // Admin operations
```

---

## 🛠️ Backend Endpoints Required

### Authentication
```
POST /api/v1/auth/login
Request: { email, password }
Response: { data: { id, email, firstName, lastName, userType, token } }

POST /api/v1/auth/register
Request: { firstName, lastName, email, password, userType, phone, address }
Response: { data: { id, email, firstName, lastName, userType, token } }
```

### Crops
```
POST /api/v1/crops/add
GET /api/v1/crops
DELETE /api/v1/crops/delete/{id}
```

### Advisory
```
POST /api/v1/advice/ask
GET /api/v1/advice
POST /api/v1/advice/answer/{id}
```

### Farmer Profile
```
GET /api/v1/farmer/profile
POST /api/v1/farmer/profile
```

---

## ⚙️ Configuration

### Backend URL
Edit `.env`:
```
VITE_API_URL=http://localhost:8080
```

### CORS (Backend)
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

---

## 🐛 Debugging

### Check Token
```javascript
console.log(localStorage.getItem('authToken'));
```

### Check User
```javascript
console.log(JSON.parse(localStorage.getItem('agri_user')));
```

### Test API Call
```javascript
import { cropAPI } from './src/lib/api';
cropAPI.getAllCrops().then(console.log).catch(console.error);
```

### Network Inspection
1. Open DevTools → Network tab
2. Look for API requests
3. Check Authorization header is present
4. Check response status and body

---

## 📚 Documentation

- **INSTALLATION_GUIDE.md** - Complete setup guide
- **BACKEND_INTEGRATION_GUIDE.md** - Backend requirements
- **IMPLEMENTATION_SUMMARY.md** - Integration details
- **BACKEND_CHECKLIST.md** - Backend requirements checklist

---

## ✅ Frontend Status

- ✅ Axios installed
- ✅ JWT interceptor configured
- ✅ 12 API modules ready
- ✅ Auth context implemented
- ✅ Protected routes configured
- ✅ Error handling ready
- ⏳ Awaiting backend endpoints

---

## 🔗 Common Operations

### Handle Errors
```javascript
try {
  const result = await cropAPI.addCrop(data);
} catch (error) {
  console.error(error.error || error.message);
}
```

### Show Loading
```javascript
const [loading, setLoading] = useState(false);
useEffect(() => {
  setLoading(true);
  api.call().finally(() => setLoading(false));
}, []);
```

### Refresh Data
```javascript
const [crops, setCrops] = useState([]);
const refetch = () => cropAPI.getAllCrops().then(setCrops);
useEffect(refetch, []);
return <button onClick={refetch}>Refresh</button>;
```

---

## 📞 Support

- Check `.env` is configured correctly
- Verify backend is running on `http://localhost:8080`
- Check CORS is enabled in backend
- Look for errors in browser console
- Check Network tab for API errors
- Verify JWT token is in localStorage

---

## 📝 Next Steps

1. [ ] Implement backend endpoints
2. [ ] Enable CORS in Spring Boot
3. [ ] Set up JWT validation
4. [ ] Create database tables
5. [ ] Test login flow
6. [ ] Test API calls
7. [ ] Handle edge cases
8. [ ] Deploy to production

---

*Last Updated: April 6, 2026*
*Frontend Version: 1.0.0*
*Backend Requirements: Spring Boot 3.x + JWT + MySQL*

