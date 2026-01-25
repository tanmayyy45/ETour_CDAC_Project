import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Pages
import ShowcasePage from './pages/ShowcasePage';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import SectorPage from './pages/SectorPage';
import TourDetailPage from './pages/TourDetailPage';
import SearchPage from './pages/SearchPage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import MyBookingsPage from './pages/MyBookingsPage';
import BookingDetailsPage from './pages/BookingDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageTours from './pages/admin/ManageTours';
import ManageCosts from './pages/admin/ManageCosts';
import UploadExcel from './pages/admin/UploadExcel';

// Styles
import './index.css';

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    {/* Entry Point - Showcase/Splash */}
                    <Route path="/" element={<ShowcasePage />} />

                    {/* Main Home Page */}
                    <Route path="/home" element={<HomePage />} />

                    {/* Tour Browsing */}
                    <Route path="/tours" element={<ToursPage />} />
                    <Route path="/sector/:sectorId" element={<SectorPage />} />
                    <Route path="/sector/:sectorId/:subsectorId" element={<SectorPage />} />

                    {/* Tour Detail */}
                    <Route path="/tour/:tourId" element={<TourDetailPage />} />

                    {/* Search */}
                    <Route path="/search" element={<SearchPage />} />

                    {/* Booking */}
                    <Route path="/book/:tourId" element={<BookingPage />} />

                    {/* Static Pages */}
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Customer Dashboard */}
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/my-bookings" element={<MyBookingsPage />} />
                    <Route path="/booking/:bookingId" element={<BookingDetailsPage />} />

                    {/* Admin Panel */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/tours" element={<ManageTours />} />
                    <Route path="/admin/costs" element={<ManageCosts />} />
                    <Route path="/admin/upload" element={<UploadExcel />} />

                    {/* Fallback */}
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;
