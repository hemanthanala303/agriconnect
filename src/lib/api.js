/**
 * API Service Module - AgriConnect Frontend
 * Integrated with Spring Boot Backend using JWT Authentication
 * 
 * Backend URL: http://localhost:8080
 * API Prefix: /api/v1
 * 
 * Features:
 * - Axios HTTP client
 * - JWT Bearer Token Interceptor
 * - Request/Response transformation
 * - Error handling
 * - Auto-logout on 401 Unauthorized
 */

import axios from "axios";

// Get base URL from environment or default
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://agriconnect-backend-4407.onrender.com";
const API_PREFIX = "/api/v1";

/**
 * Create axios instance with base configuration
 */
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}${API_PREFIX}`,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor - Add JWT Token to Authorization Header
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor - Handle errors and token expiration
 */
apiClient.interceptors.response.use(
  (response) => {
    console.log("📨 [apiClient interceptor] Response from server:", {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      config: {
        url: response.config.url,
        method: response.config.method
      }
    });
    return response.data;
  },
  (error) => {
    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      console.error("❌ [apiClient interceptor] 401 Unauthorized:", error.response.data);
      localStorage.removeItem("authToken");
      localStorage.removeItem("agri_user");
      // Redirect to login
      window.location.href = "/login";
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error("❌ [apiClient interceptor] 403 Forbidden:", error.response.data);
    }

    console.error("❌ [apiClient interceptor] Request error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url
    });

    return Promise.reject(error.response?.data || error);
  }
);

/**
 * Authentication API Endpoints
 */
export const authAPI = {
  /**
   * Register new user
   * POST /api/v1/auth/register
   * @param {Object} userData - { firstName, lastName, email, password, role }
   * @returns {Promise} Response with user data and token
   */
  register: async (userData) => {
    try {
      console.log("🔄 [authAPI.register] Sending request to POST /auth/register");
      console.log("📨 Request payload:", userData);
      
      const response = await apiClient.post("/auth/register", userData);
      
      console.log("✅ [authAPI.register] Success! Response:", response);
      return response;
    } catch (error) {
      console.error("❌ [authAPI.register] Error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  /**
   * Login user
   * POST /api/v1/auth/login
   * @param {string} email
   * @param {string} password
   * @returns {Promise} Response with user data and token
   */
  login: async (email, password) => {
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Refresh JWT token
   * POST /api/v1/auth/refresh
   * @returns {Promise} Response with new token
   */
  refreshToken: async () => {
    try {
      const response = await apiClient.post("/auth/refresh");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Verify token validity
   * GET /api/v1/auth/verify
   * @returns {Promise} Response with verification status
   */
  verifyToken: async () => {
    try {
      const response = await apiClient.get("/auth/verify");
      return response;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * User API Endpoints
 */
export const userAPI = {
  /**
   * Get current user profile
   * GET /api/v1/users/me
   * @returns {Promise} Current user data
   */
  getCurrentUser: async () => {
    try {
      const response = await apiClient.get("/users/me");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user by ID
   * GET /api/v1/users/{id}
   * @param {string} userId
   * @returns {Promise} User data
   */
  getUser: async (userId) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user profile
   * PUT /api/v1/users/{id}
   * @param {string} userId
   * @param {Object} updateData
   * @returns {Promise} Updated user data
   */
  updateUser: async (userId, updateData) => {
    try {
      const response = await apiClient.put(`/users/${userId}`, updateData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete user account
   * DELETE /api/v1/users/{id}
   * @param {string} userId
   * @returns {Promise} Deletion confirmation
   */
  deleteUser: async (userId) => {
    try {
      const response = await apiClient.delete(`/users/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Farmer Profile API Endpoints
 */
export const farmerAPI = {
  /**
   * Get farmer profile
   * GET /api/v1/farmer/profile
   * @returns {Promise} Farmer profile data
   */
  getProfile: async () => {
    try {
      const response = await apiClient.get("/farmer/profile");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update farmer profile
   * POST /api/v1/farmer/profile
   * @param {Object} profileData - Profile information to update
   * @returns {Promise} Updated profile data
   */
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.post("/farmer/profile", profileData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get farmer dashboard statistics
   * GET /api/v1/farmer/dashboard
   * @returns {Promise} Dashboard data
   */
  getDashboard: async () => {
    try {
      const response = await apiClient.get("/farmer/dashboard");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get farmer farm data
   * GET /api/v1/farmer/farm-data
   * @returns {Promise} Farm statistics
   */
  getFarmData: async () => {
    try {
      const response = await apiClient.get("/farmer/farm-data");
      return response;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Crops API Endpoints
 */
export const cropAPI = {
  /**
   * Add new crop
   * POST /api/v1/crops/add
   * @param {Object} cropData - { name, variety, areaPlanted, plantingDate, expectedHarvestDate, soilType, irrigationType }
   * @returns {Promise} Created crop data
   */
  addCrop: async (cropData) => {
    try {
      const response = await apiClient.post("/crops/add", cropData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all crops for current user
   * GET /api/v1/crops
   * @returns {Promise} Array of crops
   */
  getAllCrops: async () => {
    try {
      const response = await apiClient.get("/crops");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get crop by ID
   * GET /api/v1/crops/{id}
   * @param {string} cropId
   * @returns {Promise} Crop data
   */
  getCrop: async (cropId) => {
    try {
      const response = await apiClient.get(`/crops/${cropId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update crop
   * PUT /api/v1/crops/{id}
   * @param {string} cropId
   * @param {Object} updateData
   * @returns {Promise} Updated crop data
   */
  updateCrop: async (cropId, updateData) => {
    try {
      const response = await apiClient.put(`/crops/${cropId}`, updateData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete crop
   * DELETE /api/v1/crops/delete/{id}
   * @param {string} cropId
   * @returns {Promise} Deletion confirmation
   */
  deleteCrop: async (cropId) => {
    try {
      const response = await apiClient.delete(`/crops/delete/${cropId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user crops
   * GET /api/v1/crops/user/{userId}
   * @param {string} userId
   * @returns {Promise} Array of user's crops
   */
  getUserCrops: async (userId) => {
    try {
      console.log("🌾 [cropAPI.getUserCrops] Fetching crops for user:", userId);
      const response = await apiClient.get(`/crops/user/${userId}`);
      console.log("📥 [cropAPI.getUserCrops] Raw response:", response);
      console.log("📥 [cropAPI.getUserCrops] Response type:", typeof response);
      console.log("📥 [cropAPI.getUserCrops] Is array:", Array.isArray(response));
      console.log("📥 [cropAPI.getUserCrops] Response keys:", Object.keys(response || {}));
      return response;
    } catch (error) {
      console.error("❌ [cropAPI.getUserCrops] Error:", error);
      throw error;
    }
  },

  /**
   * Get crop health status
   * GET /api/v1/crops/{id}/health
   * @param {string} cropId
   * @returns {Promise} Health data
   */
  getCropHealth: async (cropId) => {
    try {
      const response = await apiClient.get(`/crops/${cropId}/health`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Advisory / Advice API Endpoints
 */
export const adviceAPI = {
  /**
   * Ask a question / Post advice request
   * POST /api/v1/advice/ask
   * @param {Object} adviceData - { title, description, cropId, category }
   * @returns {Promise} Created advice request
   */
  askAdvice: async (adviceData) => {
    try {
      const response = await apiClient.post("/advice/ask", adviceData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Answer a question / Provide advice
   * POST /api/v1/advice/answer/{id}
   * @param {string} adviceId
   * @param {Object} answerData - { answer }
   * @returns {Promise} Created answer
   */
  answerAdvice: async (adviceId, answerData) => {
    try {
      const response = await apiClient.post(`/advice/answer/${adviceId}`, answerData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all advice/questions
   * GET /api/v1/advice
   * @returns {Promise} Array of advice requests
   */
  getAllAdvice: async () => {
    try {
      const response = await apiClient.get("/advice");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get advice by ID
   * GET /api/v1/advice/{id}
   * @param {string} adviceId
   * @returns {Promise} Advice data with answers
   */
  getAdvice: async (adviceId) => {
    try {
      const response = await apiClient.get(`/advice/${adviceId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user's advice requests
   * GET /api/v1/advice/user/{userId}
   * @param {string} userId
   * @returns {Promise} Array of user's advice requests
   */
  getUserAdvice: async (userId) => {
    try {
      const response = await apiClient.get(`/advice/user/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get expert's answers
   * GET /api/v1/advice/expert/{expertId}
   * @param {string} expertId
   * @returns {Promise} Array of expert's answers
   */
  getExpertAnswers: async (expertId) => {
    try {
      const response = await apiClient.get(`/advice/expert/${expertId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Farm Data & Tasks API Endpoints
 */
export const farmDataAPI = {
  /**
   * Get farm statistics
   * GET /api/v1/farm-data/stats
   * @returns {Promise} Farm statistics
   */
  getStats: async () => {
    try {
      const response = await apiClient.get("/farm-data/stats");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user tasks
   * GET /api/v1/farm-data/tasks
   * @returns {Promise} Array of tasks
   */
  getTasks: async () => {
    try {
      const response = await apiClient.get("/farm-data/tasks");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user tasks (alternative endpoint)
   * GET /api/v1/farm-data/user/{userId}/tasks
   * @param {string} userId
   * @returns {Promise} Array of user's tasks
   */
  getUserTasks: async (userId) => {
    try {
      const response = await apiClient.get(`/farm-data/user/${userId}/tasks`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new task
   * POST /api/v1/farm-data/tasks
   * @param {Object} taskData - { title, description, dueDate, priority }
   * @returns {Promise} Created task
   */
  createTask: async (taskData) => {
    try {
      const response = await apiClient.post("/farm-data/tasks", taskData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update task
   * PUT /api/v1/farm-data/tasks/{id}
   * @param {string} taskId
   * @param {Object} updateData
   * @returns {Promise} Updated task
   */
  updateTask: async (taskId, updateData) => {
    try {
      const response = await apiClient.put(`/farm-data/tasks/${taskId}`, updateData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete task
   * DELETE /api/v1/farm-data/tasks/{id}
   * @param {string} taskId
   * @returns {Promise} Deletion confirmation
   */
  deleteTask: async (taskId) => {
    try {
      const response = await apiClient.delete(`/farm-data/tasks/${taskId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get weather data
   * GET /api/v1/farm-data/weather
   * @returns {Promise} Weather information
   */
  getWeather: async () => {
    try {
      const response = await apiClient.get("/farm-data/weather");
      return response;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Weather API Endpoints
 */
export const weatherAPI = {
  /**
   * Get weather data
   * GET /api/v1/weather
   * @returns {Promise} Weather information
   */
  getWeather: async () => {
    try {
      const response = await apiClient.get("/weather");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get weather by location
   * GET /api/v1/weather/location/{location}
   * @param {string} location
   * @returns {Promise} Weather data for location
   */
  getWeatherByLocation: async (location) => {
    try {
      const response = await apiClient.get(`/weather/location/${location}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get weather forecast
   * GET /api/v1/weather/forecast
   * @returns {Promise} Weather forecast
   */
  getForecast: async () => {
    try {
      const response = await apiClient.get("/weather/forecast");
      return response;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Market Prices API Endpoints
 */
export const marketAPI = {
  /**
   * Get market prices
   * GET /api/v1/market/prices
   * @returns {Promise} Current market prices
   */
  getPrices: async () => {
    try {
      const response = await apiClient.get("/market/prices");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get price for specific crop
   * GET /api/v1/market/prices/{crop}
   * @param {string} crop
   * @returns {Promise} Price data for crop
   */
  getCropPrice: async (crop) => {
    try {
      const response = await apiClient.get(`/market/prices/${crop}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get market opportunities
   * GET /api/v1/market/opportunities
   * @returns {Promise} Array of opportunities
   */
  getOpportunities: async () => {
    try {
      const response = await apiClient.get("/market/opportunities");
      return response;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Community/Forum API Endpoints
 */
export const communityAPI = {
  /**
   * Get all forum threads
   * GET /api/v1/community/forum
   * @returns {Promise} Array of forum threads
   */
  getForumThreads: async () => {
    try {
      const response = await apiClient.get("/community/forum");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create forum thread
   * POST /api/v1/community/forum
   * @param {Object} threadData - { title, description, category }
   * @returns {Promise} Created thread
   */
  createForumThread: async (threadData) => {
    try {
      const response = await apiClient.post("/community/forum", threadData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get forum thread by ID
   * GET /api/v1/community/forum/{id}
   * @param {string} threadId
   * @returns {Promise} Thread data with replies
   */
  getForumThread: async (threadId) => {
    try {
      const response = await apiClient.get(`/community/forum/${threadId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Post reply to forum thread
   * POST /api/v1/community/forum/{id}/reply
   * @param {string} threadId
   * @param {Object} replyData - { content }
   * @returns {Promise} Created reply
   */
  postReply: async (threadId, replyData) => {
    try {
      const response = await apiClient.post(
        `/community/forum/${threadId}/reply`,
        replyData
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user connections
   * GET /api/v1/community/connections
   * @returns {Promise} Array of connections
   */
  getConnections: async () => {
    try {
      const response = await apiClient.get("/community/connections");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Add connection
   * POST /api/v1/community/connections/{userId}
   * @param {string} userId
   * @returns {Promise} Connection data
   */
  addConnection: async (userId) => {
    try {
      const response = await apiClient.post(`/community/connections/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Learning Resources API Endpoints
 */
export const learningAPI = {
  /**
   * Get all learning resources
   * GET /api/v1/learning/resources
   * @returns {Promise} Array of resources
   */
  getResources: async () => {
    try {
      const response = await apiClient.get("/learning/resources");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get resource by ID
   * GET /api/v1/learning/resources/{id}
   * @param {string} resourceId
   * @returns {Promise} Resource data
   */
  getResource: async (resourceId) => {
    try {
      const response = await apiClient.get(`/learning/resources/${resourceId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user's learning progress
   * GET /api/v1/learning/progress
   * @returns {Promise} User's progress data
   */
  getProgress: async () => {
    try {
      const response = await apiClient.get("/learning/progress");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update resource progress
   * POST /api/v1/learning/progress/{resourceId}
   * @param {string} resourceId
   * @param {Object} progressData - { completed, videoTime, quizScore }
   * @returns {Promise} Updated progress
   */
  updateProgress: async (resourceId, progressData) => {
    try {
      const response = await apiClient.post(
        `/learning/progress/${resourceId}`,
        progressData
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Expert Profile API Endpoints
 */
export const expertAPI = {
  /**
   * Get all experts
   * GET /api/v1/experts
   * @returns {Promise} Array of experts
   */
  getAllExperts: async () => {
    try {
      const response = await apiClient.get("/experts");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get expert profile
   * GET /api/v1/experts/{id}
   * @param {string} expertId
   * @returns {Promise} Expert profile data
   */
  getExpert: async (expertId) => {
    try {
      const response = await apiClient.get(`/experts/${expertId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get expert's consultations
   * GET /api/v1/experts/{id}/consultations
   * @param {string} expertId
   * @returns {Promise} Array of consultations
   */
  getConsultations: async (expertId) => {
    try {
      const response = await apiClient.get(`/experts/${expertId}/consultations`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Book consultation
   * POST /api/v1/experts/{id}/consult
   * @param {string} expertId
   * @param {Object} consultData - { date, description }
   * @returns {Promise} Consultation booking
   */
  bookConsultation: async (expertId, consultData) => {
    try {
      const response = await apiClient.post(`/experts/${expertId}/consult`, consultData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Admin API Endpoints
 */
export const adminAPI = {
  /**
   * Get admin dashboard data
   * GET /api/v1/admin/dashboard
   * @returns {Promise} Dashboard statistics
   */
  getDashboard: async () => {
    try {
      const response = await apiClient.get("/admin/dashboard");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all users
   * GET /api/v1/admin/users
   * @returns {Promise} Array of users
   */
  getUsers: async () => {
    try {
      const response = await apiClient.get("/admin/users");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user status
   * PUT /api/v1/admin/users/{id}
   * @param {string} userId
   * @param {Object} updateData
   * @returns {Promise} Updated user data
   */
  updateUser: async (userId, updateData) => {
    try {
      const response = await apiClient.put(`/admin/users/${userId}`, updateData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get moderation data
   * GET /api/v1/admin/moderation
   * @returns {Promise} Content for moderation
   */
  getModeration: async () => {
    try {
      const response = await apiClient.get("/admin/moderation");
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Moderate content
   * PUT /api/v1/admin/moderation/{id}
   * @param {string} contentId
   * @param {Object} moderationData - { action, reason }
   * @returns {Promise} Moderation result
   */
  moderateContent: async (contentId, moderationData) => {
    try {
      const response = await apiClient.put(
        `/admin/moderation/${contentId}`,
        moderationData
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Export API client for custom usage if needed
 */
export { apiClient };

export default {
  authAPI,
  userAPI,
  farmerAPI,
  cropAPI,
  adviceAPI,
  farmDataAPI,
  weatherAPI,
  marketAPI,
  communityAPI,
  learningAPI,
  expertAPI,
  adminAPI,
};
