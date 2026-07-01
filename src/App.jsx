/* ============================================================
   APP ENTRY — Routing & Global Elements
   ============================================================ */
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import KaruppiahNagarPage from './pages/KaruppiahNagarPage';
import AbiAndCoPage from './pages/AbiAndCoPage';
import ConsultancyPage from './pages/ConsultancyPage';
import LoanCalculatorPage from './pages/LoanCalculatorPage';
import CustomCursor from './components/CustomCursor';
import WhatsAppFAB from './components/WhatsAppFAB';
import AIAssistant from './components/AIAssistant';
import AIEstimator from './components/AIEstimator';

// Admin Components & Context
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPlots from './pages/admin/AdminPlots';
import AdminBookings from './pages/admin/AdminBookings';
import AdminReports from './pages/admin/AdminReports';
import PrintLayout from './pages/admin/PrintLayout';

// New Admin Management views
import AdminProjects from './pages/admin/AdminProjects';
import AdminCareers from './pages/admin/AdminCareers';
import AdminConsultancy from './pages/admin/AdminConsultancy';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminMedia from './pages/admin/AdminMedia';

export default function App() {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  useEffect(() => {
    // Print premium console logo
    console.log(
      `%c\n` +
      `  _____  ____  _    _          _      _____  ______ _______ ______ _   _ \n` +
      ` / ____|/ __ \\| |  | |   /\\   | |    |  __ \\|  ____|__   __|  ____| \\ | |\n` +
      `| (___ | |  | | |  | |  /  \\  | |    | |__) | |__     | |  | |__  |  \\| |\n` +
      ` \\___ \\| |  | | |  | | / /\\ \\ | |    |  _  /|  __|    | |  |  __| | . \` |\n` +
      ` ____) | |__| | |__| |/ ____ \\| |____| | \\ \\| |____   | |  | |____| |\\  |\n` +
      `|_____/ \\___\\_\\\\____//_/    \\_\\______|_|  \\_\\______|  |_|  |______|_| \\_|\n\n`,
      "color: #c9a86a; font-weight: bold;"
    );
    console.log(
      "%c BUILDING EXCELLENCE — SINCE 2014 %c Developed & Managed by orginx.in ",
      "color: #121212; background: #c9a86a; padding: 4px 8px; font-weight: 700; border-radius: 3px 0 0 3px;",
      "color: #c9a86a; background: #1a1a1a; padding: 4px 8px; font-weight: 700; border-radius: 0 3px 3px 0;"
    );

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Detect mobile/touch devices — skip Lenis on these for native smooth scrolling
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileScreen = window.innerWidth < 1024;
    const skipLenis = isTouchDevice || isMobileScreen;

    let lenis = null;
    let tickerCallback = null;

    if (!skipLenis) {
      // Initialize Lenis smooth scroll (desktop only)
      lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
      });

      window.lenis = lenis;

      // Connect Lenis scroll events to ScrollTrigger updates
      lenis.on('scroll', ScrollTrigger.update);

      // Sync GSAP ticker to run Lenis raf (requestAnimationFrame) loop
      let lastIsAdmin = null;
      tickerCallback = (time) => {
        const isAdminRoute = window.location.pathname.startsWith('/admin');
        if (isAdminRoute !== lastIsAdmin) {
          lastIsAdmin = isAdminRoute;
          if (isAdminRoute) {
            lenis.stop();
            document.documentElement.classList.add('is-admin');
            document.documentElement.classList.remove('is-loading');
          } else {
            document.documentElement.classList.remove('is-admin');
            lenis.start();
          }
        }

        if (!isAdminRoute) {
          lenis.raf(time * 1000);
        }
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(50, 16);
    } else {
      // On mobile/touch: just handle admin class toggling for scroll fixes
      let lastIsAdmin = null;
      tickerCallback = (time) => {
        const isAdminRoute = window.location.pathname.startsWith('/admin');
        if (isAdminRoute !== lastIsAdmin) {
          lastIsAdmin = isAdminRoute;
          if (isAdminRoute) {
            document.documentElement.classList.add('is-admin');
            document.documentElement.classList.remove('is-loading');
          } else {
            document.documentElement.classList.remove('is-admin');
          }
        }
      };
      gsap.ticker.add(tickerCallback);
    }

    return () => {
      if (lenis) {
        lenis.destroy();
        window.lenis = null;
      }
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      document.documentElement.classList.remove('is-admin');
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        {/* Premium Custom Cursor (Desktop only) */}
      <CustomCursor />

      {/* Floating Action Buttons */}
      <WhatsAppFAB />
      <AIAssistant onOpenEstimator={() => setIsEstimatorOpen(true)} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={
              <HomePage
                isEstimatorOpen={isEstimatorOpen}
                setIsEstimatorOpen={setIsEstimatorOpen}
              />
            } />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/residential" element={<ProjectsPage category="residential" />} />
          <Route path="/projects/residential/:status" element={<ProjectsPage category="residential" />} />
          <Route path="/projects/commercial" element={<ProjectsPage category="commercial" />} />
          <Route path="/projects/commercial/:status" element={<ProjectsPage category="commercial" />} />
          <Route path="/projects/interiors" element={<ProjectsPage category="interiors" />} />
          <Route path="/projects/interiors/:status" element={<ProjectsPage category="interiors" />} />
          <Route path="/projects/consulting" element={<ProjectsPage category="consulting" />} />
          <Route path="/projects/consulting/:status" element={<ProjectsPage category="consulting" />} />
          <Route path="/projects/plots" element={<ProjectsPage category="plots" />} />
          <Route path="/projects/plots/:status" element={<ProjectsPage category="plots" />} />
          <Route path="/projects/karuppiah-nagar" element={<KaruppiahNagarPage />} />
          <Route path="/projects/abi-and-co-home-appliances" element={<AbiAndCoPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/consultancy" element={<ConsultancyPage />} />
          <Route path="/loan-emi-calculator" element={<LoanCalculatorPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/plots" element={<ProtectedRoute><AdminPlots /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookings /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute><AdminReports /></ProtectedRoute>} />
          <Route path="/admin/print" element={<ProtectedRoute><PrintLayout /></ProtectedRoute>} />
          
          {/* New Admin Management Routes */}
          <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
          <Route path="/admin/careers" element={<ProtectedRoute><AdminCareers /></ProtectedRoute>} />
          <Route path="/admin/consultancy" element={<ProtectedRoute><AdminConsultancy /></ProtectedRoute>} />
          <Route path="/admin/enquiries" element={<ProtectedRoute><AdminEnquiries /></ProtectedRoute>} />
          <Route path="/admin/media" element={<ProtectedRoute><AdminMedia /></ProtectedRoute>} />


          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global AI Cost Estimator Modal */}
      <AIEstimator isOpen={isEstimatorOpen} onClose={() => setIsEstimatorOpen(false)} />
    </Router>
    </AuthProvider>
  );
}
