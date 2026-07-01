/* ============================================================
   HOMEPAGE
   Composes the core sections and manages the onboarding/boot cycle
   ============================================================ */
import { useState, useEffect } from 'react';
import Onboarding from '../components/Onboarding';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FutureProjects from '../components/Services';
import PlotsShowcase from '../components/PlotsShowcase';

import TamilNaduExplorer from '../components/TamilNaduExplorer';
import FranchiseCTA from '../components/FranchiseCTA';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AIEstimator from '../components/AIEstimator';

export default function HomePage({ isEstimatorOpen, setIsEstimatorOpen }) {
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    document.title = "Squaareten Construction Pvt Ltd — Building Excellence, Shaping Futures";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Squaareten Construction Pvt Ltd delivers premium residential, commercial, and turnkey construction solutions. Award-winning craftsmanship with modern design excellence in Madurai.');
    }
  }, []);

  return (
    <>
      {/* Onboarding Loader Screen */}
      <Onboarding onComplete={() => setOnboardingComplete(true)} />

      {/* Main Layout */}
      <div className={`app-layout ${onboardingComplete ? 'is-ready' : ''}`}>
        <Navbar isVisible={onboardingComplete} />
        <main>
          <Hero isReady={onboardingComplete} onOpenEstimator={() => setIsEstimatorOpen(true)} />
          {onboardingComplete && (
            <>
              <FutureProjects />
              <PlotsShowcase />
              <TamilNaduExplorer />
              <FranchiseCTA />
              <Testimonials />
              <Contact />
            </>
          )}
        </main>
        {onboardingComplete && <Footer />}
      </div>

      {/* Estimator Modal */}
      <AIEstimator isOpen={isEstimatorOpen} onClose={() => setIsEstimatorOpen(false)} />
    </>
  );
}
