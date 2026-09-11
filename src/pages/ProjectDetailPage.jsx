/* ============================================================
   PROJECT DETAIL PAGE — Individual Project View
   Premium editorial layout with gallery and story
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getProjects } from '../lib/projectStore';

gsap.registerPlugin(ScrollTrigger);

const getGalleryItemClass = (index, total) => {
  if (total === 2) {
    return 'pd-gallery__item--half';
  }
  if (total === 5) {
    return index < 2 ? 'pd-gallery__item--half' : 'pd-gallery__item--third';
  }
  if (total === 10) {
    if (index === 9) return 'pd-gallery__item--full';
    return index === 0 ? 'pd-gallery__item--large' : 'pd-gallery__item--standard';
  }
  if (total === 19) {
    if (index === 18) return 'pd-gallery__item--full';
    return (index === 0 || index === 12) ? 'pd-gallery__item--large' : 'pd-gallery__item--standard';
  }
  if (total % 3 === 0) {
    return index === 0 ? 'pd-gallery__item--large' : 'pd-gallery__item--standard';
  }
  return 'pd-gallery__item--standard';
};

/* ── Auto Carousel for Before / After ────────────────── */
const AutoCarousel = ({ images, title }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="pd-comparison__carousel">
      {images.map((img, i) => (
        <div
          key={img}
          className={`pd-comparison__slide ${i === index ? 'is-active' : ''}`}
        >
          <img src={img} alt={`${title} — Photo ${i + 1}`} loading="lazy" />
        </div>
      ))}
      
      {images.length > 1 && (
        <div className="pd-comparison__dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`pd-comparison__dot ${i === index ? 'is-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Location Pin SVG ────────────────────────────────── */
const LocationPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#C9A96E' }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/* ── Custom Premium Gold SVGs for Specifications ─────── */
const ProjectTypeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LandAreaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6l9-3 9 3v12l-9 3-9-3V6z" />
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
  </svg>
);

const BuiltUpAreaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="9" y1="22" x2="9" y2="16" />
    <line x1="15" y1="22" x2="15" y2="16" />
    <line x1="9" y1="16" x2="15" y2="16" />
    <path d="M8 6h2M8 10h2M14 6h2M14 10h2" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const StatusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const HighlightCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 8 12 12 14 14" />
  </svg>
);

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    setProjectsList(getProjects());
  }, []);

  const project = projectsList.find(p => p.id === slug);

  // Redirect to custom page if project has its own dedicated page
  useEffect(() => {
    if (project?.isCustomPage) {
      navigate(`/projects/${project.id}`, { replace: true });
    }
  }, [project, navigate]);

  // Set dynamic SEO document title and meta description
  useEffect(() => {
    if (project) {
      document.title = `${project.name} — Squaareten Construction`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', project.description || `Read details of ${project.name} project designed and constructed by Squaareten Construction Pvt Ltd.`);
      }
    }
  }, [project]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('is-loading');
    setActiveImageIndex(0);
  }, [slug]);

  // Animations
  useEffect(() => {
    if (!pageRef.current || !project) return;

    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo('.pd-main-grid',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );

      // Details reveal
      gsap.fromTo('.pd-bottom-layout',
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pd-bottom-layout',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, pageRef.current);

    return () => ctx.revert();
  }, [project]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev - 1 + project.gallery.length) % project.gallery.length);
      if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev + 1) % project.gallery.length);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, project]);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClick = useCallback((e) => {
    // If clicked on navigation button, don't close
    if (e.target.closest('.pd-lightbox__nav')) {
      return;
    }
    setLightboxOpen(false);
  }, []);

  // 404 fallback
  if (!project) {
    return (
      <div className="app-layout is-ready" ref={pageRef}>
        <Navbar alwaysScrolled />
        <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', backgroundColor: '#0C0806' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 'var(--fs-h1)', marginBottom: 'var(--space-lg)', color: '#FFFFFF' }}>Project Not Found</h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-2xl)' }}>The project you're looking for doesn't exist.</p>
            <Link to="/projects" className="btn btn--primary">Back to Projects</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const galleryImages = project.gallery && project.gallery.length > 0 ? project.gallery : [project.img];

  return (
    <div className="project-detail-page app-layout is-ready" ref={pageRef} style={{ backgroundColor: '#0C0806', color: '#FFFFFF' }}>
      <Navbar alwaysScrolled />

      <main style={{ padding: '120px 0 var(--space-4xl) 0' }}>
        <div className="container">
          
          {/* Back Button */}
          <button 
            className="pd-hero__back" 
            onClick={() => navigate('/projects')}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'rgba(255, 255, 255, 0.6)', 
              cursor: 'pointer', 
              fontSize: '0.9rem', 
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-sans)'
            }}
          >
            ← Back to Projects
          </button>

          {/* ── TOP SECTION: 2-Column Gallery & Specs ── */}
          <div className="pd-main-grid" style={{ marginBottom: '80px' }}>
            
            {/* Left: Info Specifications Card */}
            <div className="pd-details-panel">
              <span className="pd-details-cat" style={{ display: 'block', color: '#C9A96E', fontSize: '0.6875rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                {project.category}
              </span>
              <h1 className="pd-details-title" style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '12px', fontStyle: 'italic', fontWeight: '700' }}>
                {project.name}
              </h1>
              <div className="pd-details-loc" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', marginBottom: '20px' }}>
                <LocationPin />
                <span>{project.location}</span>
              </div>
              <p className="pd-details-desc" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '30px' }}>
                {project.description}
              </p>

              {/* Specifications Table */}
              <div className="pd-specs-table" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '35px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    <ProjectTypeIcon />
                    <span>Project Type</span>
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '500' }}>
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    <LandAreaIcon />
                    <span>Land Area</span>
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '500' }}>
                    {project.plotArea || project.area || 'N/A'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    <BuiltUpAreaIcon />
                    <span>Built-up Area</span>
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '500' }}>
                    {project.area || 'N/A'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    <CalendarIcon />
                    <span>Year Completed</span>
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '500' }}>
                    {project.year || project.expectedCompletion || 'N/A'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
                    <StatusIcon />
                    <span>Status</span>
                  </div>
                  <span style={{ color: '#C9A96E', fontSize: '0.95rem', fontWeight: '600' }}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Consultation CTA Button */}
              <a 
                href={`https://wa.me/917540002054?text=I'm interested in the project: ${encodeURIComponent(project.name)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn" 
                style={{ 
                  background: 'linear-gradient(135deg, #C9A96E, #8E7544)', 
                  color: '#000000', 
                  fontWeight: '700', 
                  letterSpacing: '0.08em', 
                  textAlign: 'center', 
                  padding: '16px 32px',
                  borderRadius: '4px',
                  border: 'none',
                  textTransform: 'uppercase',
                  display: 'block',
                  textDecoration: 'none',
                  fontSize: '0.85rem'
                }}
              >
                Get Free Consultation
              </a>
            </div>

            {/* Right: Gallery Showcase */}
            <div className="pd-gallery-showcase">
              {/* Main Showcase Image */}
              <div 
                className="pd-main-image-wrap" 
                onClick={() => openLightbox(activeImageIndex)}
              >
                <img 
                  src={galleryImages[activeImageIndex]} 
                  alt={project.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'rgba(255, 255, 255, 0.02)', transition: 'transform 0.5s ease' }} 
                />
              </div>

              {/* Thumbnails Row */}
              {galleryImages.length > 1 && (
                <div className="pd-thumbnails-slider" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button 
                    onClick={() => {
                      const maxIndex = galleryImages.length > 5 ? 3 : galleryImages.length - 1;
                      setActiveImageIndex(prev => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
                    }}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201, 169, 110, 0.2)', color: '#C9A96E', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', outline: 'none' }}
                  >
                    ‹
                  </button>
                  <div className="pd-thumbnails-track" style={{ display: 'flex', gap: '10px', flexGrow: 1, overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {galleryImages.slice(0, galleryImages.length > 5 ? 5 : galleryImages.length).map((img, idx) => {
                      const isLast = idx === 4 && galleryImages.length > 5;
                      const remainingCount = galleryImages.length - 4;
                      return (
                        <div 
                          key={idx} 
                          onClick={() => {
                            if (isLast) {
                              openLightbox(4);
                            } else {
                              setActiveImageIndex(idx);
                            }
                          }}
                          style={{ 
                            width: '90px', 
                            height: '65px', 
                            borderRadius: '4px', 
                            overflow: 'hidden', 
                            cursor: 'pointer', 
                            border: !isLast && activeImageIndex === idx ? '2px solid #C9A96E' : '1px solid rgba(255,255,255,0.1)',
                            flexShrink: 0,
                            opacity: !isLast && activeImageIndex === idx ? 1 : 0.6,
                            transition: 'all 0.3s ease',
                            position: 'relative'
                          }}
                        >
                          <img src={img} alt={`thumbnail-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          {isLast && (
                            <div style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'rgba(12, 8, 6, 0.75)',
                              backdropFilter: 'blur(2px)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#C9A96E',
                              fontWeight: '700',
                              fontSize: '0.8rem',
                              textAlign: 'center'
                            }}>
                              <span style={{ fontSize: '1rem', color: '#FFFFFF' }}>+{remainingCount}</span>
                              <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>Photos</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <button 
                    onClick={() => {
                      const maxIndex = galleryImages.length > 5 ? 3 : galleryImages.length - 1;
                      setActiveImageIndex(prev => (prev + 1) % (maxIndex + 1));
                    }}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201, 169, 110, 0.2)', color: '#C9A96E', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', outline: 'none' }}
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── BOTTOM SECTION: Project Overview & Highlights ── */}
          <div className="pd-bottom-layout" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '50px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '50px' }}>
            
            {/* Left Column: Project Overview */}
            <div className="pd-overview-box">
              <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '20px', fontStyle: 'italic', fontWeight: '700' }}>
                Project Overview
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: '1.8' }}>
                {project.story || project.description}
              </p>
            </div>

            {/* Right Column: Key Highlights */}
            <div className="pd-highlights-box">
              <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '20px', fontStyle: 'italic', fontWeight: '700' }}>
                Key Highlights
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {project.features && project.features.length > 0 ? (
                  project.features.map((feature, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>
                      <HighlightCheckIcon />
                      <span>{feature}</span>
                    </div>
                  ))
                ) : (
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>General premium development details.</div>
                )}
              </div>
            </div>
          </div>

          {/* Optional sections (Before/After & Videos) */}
          {project.category !== 'plots' && (project.beforeGallery || (project.gallery && project.gallery.length > 1)) && (
            <div style={{ marginTop: '80px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '50px' }}>
              <span className="section__label" style={{ color: '#C9A96E', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '15px' }}>The Transformation</span>
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '30px', fontStyle: 'italic' }}>Before &amp; After Comparison</h2>
              <div className="pd-comparison__grid">
                <div className="pd-comparison__column">
                  <div className="pd-comparison__badge pd-comparison__badge--before">Before</div>
                  <AutoCarousel 
                    images={project.beforeGallery || (project.gallery && project.gallery.length > 1 ? [project.gallery[1]] : [project.img])} 
                    title={`${project.name} - Before`} 
                  />
                </div>
                <div className="pd-comparison__column">
                  <div className="pd-comparison__badge pd-comparison__badge--after">After</div>
                  <AutoCarousel 
                    images={project.afterGallery || (project.gallery && project.gallery.length > 0 ? [project.gallery[0]] : [project.img])} 
                    title={`${project.name} - After`} 
                  />
                </div>
              </div>
            </div>
          )}

          {project.videos && project.videos.length > 0 && (
            <div style={{ marginTop: '80px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '50px' }}>
              <span className="section__label" style={{ color: '#C9A96E', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '15px' }}>Walkthrough</span>
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: '#FFFFFF', marginBottom: '30px', fontStyle: 'italic' }}>Project Videos</h2>
              <div className="pd-videos__grid">
                {project.videos.map((vid, i) => (
                  <div key={i} className="pd-videos__item">
                    <video src={vid} controls preload="metadata" playsInline style={{ width: '100%', borderRadius: '8px' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />

      {/* ── Lightbox ──────────────────────────────────── */}
      {lightboxOpen && (
        <div className="pd-lightbox" onClick={handleLightboxClick} data-hover-cursor>
          <button className="pd-lightbox__close" onClick={() => setLightboxOpen(false)}>✕</button>
          {galleryImages.length > 1 && (
            <>
              <button
                className="pd-lightbox__nav pd-lightbox__nav--prev"
                onClick={() => setLightboxIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length)}
              >
                ←
              </button>
              <button
                className="pd-lightbox__nav pd-lightbox__nav--next"
                onClick={() => setLightboxIndex(prev => (prev + 1) % galleryImages.length)}
              >
                →
              </button>
            </>
          )}
          <img
            className="pd-lightbox__image"
            src={galleryImages[lightboxIndex]}
            alt={`${project.name} — Photo ${lightboxIndex + 1}`}
            style={{ cursor: 'zoom-out' }}
            data-hover-cursor
          />
          <div className="pd-lightbox__counter">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
