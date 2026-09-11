/* ============================================================
   TESTIMONIALS — Verified Google Reviews (Curated & Performance Optimized)
   ============================================================ */
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. CURATED GOOGLE REVIEWS DATA (Pasted original reviews)
const localTestimonials = [
  {
    name: "Viswanth Kanthapandiyan",
    text: "working with srini and praveen is good and their service and timing is real,ly good",
    avatar: "V",
    role: "Google Reviewer",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "Senthil kumar M Jeyaprakash",
    text: "Excellent construction company with a highly knowledgeable civil engineering team and professional approach. They use cost-effective materials without compromising quality and provide creative elevation designs exactly as per client requirements.",
    avatar: "S",
    role: "Local Guide",
    rating: 5,
    date: "a month ago",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "Sathishkumar Palanisamy",
    text: "Squaareten Constructions is a reliable choice for residential construction projects. The team demonstrated professionalism, good workmanship, timely completion, and proper coordination throughout the project. They maintain a strong balance of quality and cost.",
    avatar: "S",
    role: "Google Reviewer",
    rating: 5,
    date: "a month ago",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "praveenkumar K P",
    text: "Suggested for Best construction and interior works!!!",
    avatar: "P",
    role: "Google Reviewer",
    rating: 5,
    date: "4 months ago",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "arumugam sarath",
    text: "Your team’s craftsmanship and dedication to detail have transformed our vision into a reality. We’re truly impressed by the quality of work and professionalism shown throughout the project.",
    avatar: "A",
    role: "Google Reviewer",
    rating: 5,
    date: "a year ago",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "Shivang Singh",
    text: "They are punctual and expert in their work.",
    avatar: "S",
    role: "Local Guide",
    rating: 5,
    date: "4 weeks ago",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "Siva prakash",
    text: "Working with your company has been a pleasure from start to finish. Your professionalism, dedication, and outstanding craftsmanship are evident in every corner of the project.",
    avatar: "S",
    role: "Google Reviewer",
    rating: 5,
    date: "a year ago",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "athi athithya",
    text: "As you construct great things, may your company also build a lasting legacy of trust, quality, and excellence. Wishing you all the best!",
    avatar: "A",
    role: "Google Reviewer",
    rating: 5,
    date: "a year ago",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "Rajkumar T",
    text: "Cost efficient",
    avatar: "R",
    role: "Local Guide",
    rating: 5,
    date: "a year ago",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "DHARANI PRASANNA G",
    text: "Professional team, excellent quality, timely completion, and great customer support. They paid attention to every detail and delivered exactly what was promised. Highly recommended!",
    avatar: "D",
    role: "Google Reviewer",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "Santhosh",
    text: "Completed the project on time. Everything was good, didn't face any issues. I told my requirement and they completed it in a wonderful way. Happy with their work.",
    avatar: "S",
    role: "Local Guide",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "Surya Nava",
    text: "All time favrte teamm😍Best in all☺️",
    avatar: "S",
    role: "Local Guide",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "sangu servai",
    text: "They are currently handling our construction project. I was initially very confused about how to go about it, especially given the significant length of the structure, but they designed it beautifully, and the work is now nearing completion.",
    avatar: "S",
    role: "Local Guide",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "Kovil Papakudi",
    text: "The team of young workers is approachable, and the staff performs excellently; the mason's workmanship, in particular, is outstanding.",
    avatar: "K",
    role: "Google Reviewer",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "sanjay servai",
    text: "They craft it excellently—very quickly and right on time—even in instances where we might not be able to do so ourselves.",
    avatar: "S",
    role: "Google Reviewer",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "sangu servai",
    text: "With the selection of the right materials and high-quality components, featuring a perfect structural design.",
    avatar: "S",
    role: "Google Reviewer",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "samayanallur panjayat",
    text: "They are easily approachable and work in a very friendly manner.",
    avatar: "S",
    role: "Google Reviewer",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "Sakul hameed",
    text: "They kept their commitment and completed the work within the given timeline without any compromise in quality.we loved their work ❤️",
    avatar: "S",
    role: "Google Reviewer",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "Akbar Basha",
    text: "Best place in madurai for all your construction needs.",
    avatar: "A",
    role: "Google Reviewer",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "Alagappan",
    text: "Five stars for SquareTen Construction! Here is why I highly recommend them: Budget-Friendly: Premium interior design options at very reasonable rates. Professional Work: Stunning design concepts and flawless execution. Timely Output: They delivered exactly what was promised.",
    avatar: "A",
    role: "Google Reviewer",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "Gokul Raj",
    text: "Super",
    avatar: "G",
    role: "Google Reviewer",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "MNG Dhanush",
    text: "The finished project looks amazing, and we have received many compliments on the workmanship Praveen and Srini. Looking forward to plan another project with you guys.",
    avatar: "M",
    role: "Google Reviewer",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "Fathima azise",
    text: "Nice work neat finishing performance is very good...",
    avatar: "F",
    role: "Google Reviewer",
    rating: 5,
    date: "Recent Review",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  },
  {
    name: "MOHAMMED GANI",
    text: "They never compromise the quality of works. They are having end to end experience about construction.",
    avatar: "M",
    role: "Local Guide",
    rating: 5,
    date: "a month ago",
    url: "https://www.google.com/maps/place/Squaareten+Construction+Pvt+Ltd/@9.9252,78.1198,17z"
  }
];

export default function Testimonials() {
  const containerRef = useRef(null);
  const [reviews] = useState(localTestimonials);
  const [overallRating] = useState(4.9);
  const [totalReviews] = useState(65);

  // 2. ANIMATION & GSAP TRIGGER
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Fade in header elements
      gsap.fromTo('.testimonials__header', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Fade in carousel track
      gsap.fromTo('.testimonials__carousel',
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reviews]); // Re-trigger only when reviews list shifts

  // Duplicate testimonials for smooth infinite marquee looping
  const duplicatedTestimonials = [...reviews, ...reviews];

  return (
    <section className="section testimonials" id="testimonials" ref={containerRef}>
      <div className="container testimonials__container-header">
        <div className="testimonials__header">
          <span className="section__label">Client Reviews</span>
          <h2 className="section__title">What Our Clients Say</h2>
          
          {/* Dynamic Google overall rating badge */}
          <div className="testimonials__google-rating">
            <div className="google-rating__badge">
              <span className="google-rating__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </span>
              <span className="google-rating__stars">⭐ {Number(overallRating).toFixed(1)} / 5</span>
              <span className="google-rating__count">({totalReviews} Google Reviews)</span>
            </div>
          </div>

          <p className="section__subtitle">Don't just take our word for it — hear from the families and businesses who trusted us.</p>
        </div>
      </div>

      {/* Infinite Scrolling Ticker Track */}
      <div className="testimonials__carousel">
        <div className="testimonials__track">
          {duplicatedTestimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              
              <div className="testimonial-card__header">
                {/* Star rating */}
                <div className="testimonial-card__stars">
                  {[...Array(5)].map((_, j) => (
                    <span 
                      className="testimonial-card__star" 
                      key={j}
                      style={{ color: j < (t.rating || 5) ? 'var(--color-premium-gold)' : 'rgba(0,0,0,0.12)' }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Verified badge */}
                <span className="testimonial-card__verified-badge">
                  <svg viewBox="0 0 24 24" className="verified-icon">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Verified Review
                </span>
              </div>

              {/* Review date */}
              <div className="testimonial-card__date">
                {t.date || 'Recent Review'}
              </div>

              {/* Review quote text */}
              <p className="testimonial-card__text">"{t.text}"</p>

              {/* Author footer and original link */}
              <div className="testimonial-card__author">
                <div className="testimonial-card__author-info">
                  <div className="testimonial-card__avatar">{t.avatar}</div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__role">{t.role}</div>
                  </div>
                </div>

                {/* External link to Google review */}
                <a 
                  href={t.url || "https://www.google.com/maps"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="testimonial-card__google-link" 
                  title="View original review"
                >
                  <svg viewBox="0 0 24 24" className="google-icon-svg" style={{ width: '16px', height: '16px' }}>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
