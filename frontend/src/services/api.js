/**
 * ETour API Service
 * 
 * This file contains placeholder API calls that will be connected to the 
 * Spring Boot backend. Currently returns mock data for development.
 */

const API_BASE_URL = 'http://localhost:8080/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

// ==================== CATEGORY/SECTOR APIs ====================

export const getCategories = async () => {
    // Will call: GET /api/categories
    // return apiCall('/categories');

    // Mock data for now
    return [
        { id: 1, categoryId: 'domestic', name: 'Domestic Tours', imagePath: null, flag: true },
        { id: 2, categoryId: 'international', name: 'International Tours', imagePath: null, flag: true },
        { id: 3, categoryId: 'adventure', name: 'Adventure Tours', imagePath: null, flag: true },
        { id: 4, categoryId: 'honeymoon', name: 'Couple Tours', imagePath: null, flag: true },
    ];
};

export const getSubCategories = async (categoryId) => {
    // Will call: GET /api/categories/{categoryId}/subcategories
    // return apiCall(`/categories/${categoryId}/subcategories`);

    return [
        { id: 1, subcategoryId: 'kashmir', name: 'Kashmir' },
        { id: 2, subcategoryId: 'kerala', name: 'Kerala' },
        { id: 3, subcategoryId: 'goa', name: 'Goa' },
    ];
};

// ==================== TOUR APIs ====================

export const getTours = async (params = {}) => {
    // Will call: GET /api/tours?categoryId=xxx&subcategoryId=xxx
    // const queryString = new URLSearchParams(params).toString();
    // return apiCall(`/tours?${queryString}`);

    return [
        { id: 1, title: 'Kashmir Paradise', location: 'Srinagar', duration: '6N/7D', price: 25000 },
        { id: 2, title: 'Kerala Backwaters', location: 'Alleppey', duration: '5N/6D', price: 18000 },
    ];
};

export const getTourById = async (tourId) => {
    // Will call: GET /api/tours/{tourId}
    // return apiCall(`/tours/${tourId}`);

    return {
        id: tourId,
        title: 'Kashmir Paradise Explorer',
        location: 'Srinagar, Kashmir',
        duration: '6N/7D',
        price: 25000,
        description: 'Experience the breathtaking beauty of Kashmir.',
    };
};

export const searchTours = async (searchParams) => {
    // Will call: POST /api/tours/search
    // return apiCall('/tours/search', { method: 'POST', body: JSON.stringify(searchParams) });

    return [];
};

// ==================== ITINERARY APIs ====================

export const getItinerary = async (tourId) => {
    // Will call: GET /api/tours/{tourId}/itinerary
    // return apiCall(`/tours/${tourId}/itinerary`);

    return [
        { day: 1, title: 'Arrival in Srinagar', description: 'Arrive at Srinagar airport...' },
        { day: 2, title: 'Gulmarg Excursion', description: 'Day trip to Gulmarg...' },
    ];
};

// ==================== COST APIs ====================

export const getTourCosts = async (tourId) => {
    // Will call: GET /api/tours/{tourId}/costs
    // return apiCall(`/tours/${tourId}/costs`);

    return [
        { category: 'Adult', price: 25000 },
        { category: 'Child', price: 18000 },
        { category: 'Infant', price: 8000 },
    ];
};

// ==================== DEPARTURE DATE APIs ====================

export const getDepartureDates = async (tourId) => {
    // Will call: GET /api/tours/{tourId}/departures
    // return apiCall(`/tours/${tourId}/departures`);

    return [
        { id: 1, date: '2026-02-15', status: 'Available', seatsAvailable: 12 },
        { id: 2, date: '2026-02-22', status: 'Available', seatsAvailable: 8 },
    ];
};

// ==================== CUSTOMER APIs ====================

export const registerCustomer = async (customerData) => {
    // Will call: POST /api/customers/register
    // return apiCall('/customers/register', { method: 'POST', body: JSON.stringify(customerData) });

    return { id: 1, ...customerData };
};

export const loginCustomer = async (credentials) => {
    // Will call: POST /api/customers/login
    // return apiCall('/customers/login', { method: 'POST', body: JSON.stringify(credentials) });

    return { token: 'mock-jwt-token', customer: { id: 1, name: 'Test User' } };
};

export const getCustomerProfile = async (customerId) => {
    // Will call: GET /api/customers/{customerId}
    // return apiCall(`/customers/${customerId}`);

    return { id: customerId, name: 'Test User', email: 'test@example.com' };
};

// ==================== BOOKING APIs ====================

export const createBooking = async (bookingData) => {
    // Will call: POST /api/bookings
    // return apiCall('/bookings', { method: 'POST', body: JSON.stringify(bookingData) });

    return {
        id: Math.floor(Math.random() * 10000),
        orderNumber: `ETR-${Date.now()}`,
        ...bookingData
    };
};

export const getBookingById = async (bookingId) => {
    // Will call: GET /api/bookings/{bookingId}
    // return apiCall(`/bookings/${bookingId}`);

    return null;
};

export const getCustomerBookings = async (customerId) => {
    // Will call: GET /api/customers/{customerId}/bookings
    // return apiCall(`/customers/${customerId}/bookings`);

    return [];
};

// ==================== PASSENGER APIs ====================

export const addPassenger = async (bookingId, passengerData) => {
    // Will call: POST /api/bookings/{bookingId}/passengers
    // return apiCall(`/bookings/${bookingId}/passengers`, { method: 'POST', body: JSON.stringify(passengerData) });

    return { id: 1, ...passengerData };
};

// ==================== PAYMENT APIs ====================

export const initiatePayment = async (paymentData) => {
    // Will call: POST /api/payments/initiate
    // return apiCall('/payments/initiate', { method: 'POST', body: JSON.stringify(paymentData) });

    return {
        paymentId: `PAY-${Date.now()}`,
        gatewayUrl: 'https://payment-gateway.example.com',
        amount: paymentData.amount,
    };
};

export const verifyPayment = async (paymentId, transactionId) => {
    // Will call: POST /api/payments/verify
    // return apiCall('/payments/verify', { method: 'POST', body: JSON.stringify({ paymentId, transactionId }) });

    return { status: 'SUCCESS', transactionId };
};

// ==================== ADDON APIs ====================

export const getTourAddons = async (tourId) => {
    // Will call: GET /api/tours/{tourId}/addons
    // return apiCall(`/tours/${tourId}/addons`);

    return [
        { id: 1, name: 'Skiing Package', price: 5000 },
        { id: 2, name: 'Photography Session', price: 3000 },
    ];
};

export default {
    getCategories,
    getSubCategories,
    getTours,
    getTourById,
    searchTours,
    getItinerary,
    getTourCosts,
    getDepartureDates,
    registerCustomer,
    loginCustomer,
    getCustomerProfile,
    createBooking,
    getBookingById,
    getCustomerBookings,
    addPassenger,
    initiatePayment,
    verifyPayment,
    getTourAddons,
};
