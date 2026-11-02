import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/layout/ToastContainer';
import { EnquiryModal } from './components/enquiry/EnquiryModal';
import { LivePreviewModal } from './components/demos/LivePreviewModal';

import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { CategoryPage } from './pages/CategoryPage';
import { DemoDetailsPage } from './pages/DemoDetailsPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CollectionsPage } from './pages/CollectionsPage';

const AppContent: React.FC = () => {
  const { currentPage, userSession } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'explore':
        return <ExplorePage />;
      case 'collections':
        return <CollectionsPage />;
      case 'category':
        return <CategoryPage />;
      case 'details':
        return <DemoDetailsPage />;
      case 'downloads':
        return <DownloadsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin-login':
        return userSession.isAuthenticated ? <AdminDashboardPage /> : <AdminLoginPage />;
      case 'admin-dashboard':
        return userSession.isAuthenticated ? <AdminDashboardPage /> : <AdminLoginPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1d] text-slate-100 selection:bg-[#D9A441] selection:text-slate-950">
      <Navbar />
      
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      <Footer />

      {/* Global Modals & Notifications */}
      <EnquiryModal />
      <LivePreviewModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
