import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  ShowcasePage,
  HomePage,
  SubSectorPage,
  ProductPage,
  TourDetailPage,
  SearchPage,
  BookingPage,
  AboutPage,
  TermsPage,
  FeedbackPage,
  GalleryPage,
  VideosPage,
  DownloadPage,
  LoginPage,
  RegisterPage,
} from './pages';

import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Entry Point - Showcase Page */}
        <Route path="/" element={<ShowcasePage />} />

        {/* Main Pages */}
        <Route path="/home" element={<HomePage />} />

        {/* Tour Browsing */}
        <Route path="/tours" element={<HomePage />} />
        <Route path="/tours/:sectorId" element={<SubSectorPage />} />
        <Route path="/tours/:sectorId/:subSectorId" element={<ProductPage />} />

        {/* Tour Detail */}
        <Route path="/tour/:tourId" element={<TourDetailPage />} />

        {/* Search */}
        <Route path="/search" element={<SearchPage />} />

        {/* Booking */}
        <Route path="/booking/:tourId" element={<BookingPage />} />

        {/* Static Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<FeedbackPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/download" element={<DownloadPage />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Fallback - Redirect to showcase */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
