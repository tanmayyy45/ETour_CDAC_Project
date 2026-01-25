import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://127.0.0.1:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// =====================
// Category APIs
// =====================
export const categoryAPI = {
    getMainCategories: () => api.get('/categories'),
    getSubCategories: (categoryId) => api.get(`/categories/${categoryId}`),
};

// =====================
// Tour APIs
// =====================
export const tourAPI = {
    getAllTours: () => api.get('/tours'),
    getTourById: (id) => api.get(`/tours/${id}`),
    getTourDetails: (catmasterId) => api.get(`/tours/details/${catmasterId}`),
    createTour: (data) => api.post('/tours', data),
    deleteTour: (id) => api.delete(`/tours/${id}`),
};

// =====================
// Search APIs
// =====================
export const searchAPI = {
    searchTours: (params) => api.get('/search', { params }),
};

// =====================
// Booking APIs
// =====================
export const bookingAPI = {
    createBooking: (data) => api.post('/bookings/create', data),
    getBookingsByCustomer: (customerId) => api.get(`/bookings/customer/${customerId}`),
    getBookingById: (id) => api.get(`/bookings/${id}`),
    getAllBookings: () => api.get('/bookings/all'),
    cancelBooking: (id) => api.delete(`/bookings/${id}`),
};

// =====================
// Customer APIs
// =====================
export const customerAPI = {
    register: (data) => api.post('/customers/register', data),
    login: (data) => api.post('/customers/login', data),
    getProfile: (id) => api.get(`/customers/${id}`),
    updateProfile: (id, data) => api.put(`/customers/${id}`, data),
};

// =====================
// Site Config APIs
// =====================
export const configAPI = {
    getBanners: () => api.get('/config/banners'),
    getBannersByPosition: (position) => api.get(`/config/banners/${position}`),
    getAnnouncements: () => api.get('/config/announcements'),
    getCompanyInfo: () => api.get('/config/company'),
};

// Alias for compatibility
export const siteConfigAPI = configAPI;

// =====================
// Media APIs
// =====================
export const mediaAPI = {
    getAllPhotos: () => api.get('/media/photos'),
    getAllVideos: () => api.get('/media/videos'),
    getByTour: (tourId) => api.get(`/media/tour/${tourId}`),
};

// =====================
// Itinerary APIs
// =====================
export const itineraryAPI = {
    getByCategory: (catmasterId) => api.get(`/itinerary/category/${catmasterId}`),
};

// =====================
// Cost APIs
// =====================
export const costAPI = {
    getByCategory: (catmasterId) => api.get(`/cost/category/${catmasterId}`),
};

// =====================
// Departure APIs
// =====================
export const departureAPI = {
    getByCategory: (catmasterId) => api.get(`/departure/category/${catmasterId}`),
    getUpcoming: (catmasterId) => api.get(`/departure/${catmasterId}/upcoming`),
};

// =====================
// Payment APIs
// =====================
export const paymentAPI = {
    addPayment: (data) => api.post('/payments', data),
    getPaymentById: (id) => api.get(`/payments/${id}`),
    getPaymentsByBooking: (bookingId) => api.get(`/payments/booking/${bookingId}`),
};

export default api;
