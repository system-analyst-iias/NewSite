import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

import heroImg from '../assets/Building_exterior_full_view.JPG';
import lodgeImg from '../assets/Building_exterior.JPG';
import libraryImg from '../assets/library.JPG';
import academicsImg from '../assets/interior (3).JPG';
import adminImg from '../assets/interior (2).JPG';
import pubImg from '../assets/interior.JPG';

import fbQr from '../assets/Facebook.png';
import xQr from '../assets/X.com.png';
import ytQr from '../assets/YouTube.png';

type WhatsNewItem = {
  id?: number;
  date: string;
  title: string;
  isNew?: boolean;
};

type CallForPapersItem = {
  id?: number;
  badge?: string;
  title: string;
  description: string;
  deadline?: string;
  wordLimit?: string;
  email?: string;
};

export default function HomePage() {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [whatsNewItems, setWhatsNewItems] = useState<WhatsNewItem[]>([
    { date: 'JULY 20, 2026', title: 'Notification for National & Tagore Fellowships 2026–2027 Application Process', isNew: true },
    { date: 'JULY 18, 2026', title: 'Call for Papers: Summer Hill IIAS Review (Winter Issue 2026)', isNew: true },
    { date: 'JULY 12, 2026', title: 'Release of New Research Monograph: "Comparative Hermeneutics of Indian Thought"', isNew: false },
    { date: 'JUNE 28, 2026', title: 'Annual General Society Meeting Schedule at Rashtrapati Nivas', isNew: false },
  ]);

  const [callForPapersItems, setCallForPapersItems] = useState<CallForPapersItem[]>([
    {
      badge: 'Journal Volume 2026',
      title: 'Summer Hill: IIAS Review & Studies in Humanities',
      description: 'Inviting original research articles, book reviews, and symposia papers from scholars, professors, and resident fellows across Philosophy, Social Sciences, History, and Literature.',
      deadline: 'August 31, 2026',
      wordLimit: '6,000 – 8,000 words',
      email: 'publications@iias.ac.in',
    },
  ]);

  const galleryImages = [
    { src: heroImg, caption: 'Rashtrapati Nivas (Viceregal Lodge) Panoramic View' },
    { src: lodgeImg, caption: 'Front Facade & Main Lawns, Observatory Hill' },
    { src: libraryImg, caption: 'IIAS Heritage Research Library & Reading Hall' },
    { src: academicsImg, caption: 'Academic Seminar Chamber & Conference Rooms' },
    { src: adminImg, caption: 'Historic Burma Teak Paneled Council Room' },
    { src: pubImg, caption: 'Monographs & Archives Preservation Vault' },
  ];

  // Fetch live What's New & Call for Papers content
  useEffect(() => {
    let isMounted = true;
    fetch('/api/content/whats-new')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setWhatsNewItems(data);
        }
      })
      .catch(() => {});

    fetch('/api/content/call-for-papers')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setCallForPapersItems(data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-play photo slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const activeCfp = callForPapersItems[0];

  return (
    <div className="iias-page-shell">
      <Navbar />

      <main className="iias-main-content">
        {/* Hero Section */}
        <section className="heritage-hero">
          <div className="hero-background-overlay" style={{ backgroundImage: `url(${heroImg})` }}></div>
          <div className="hero-content-wrapper">
            <div className="hero-badge">
              <span>🏛️ CONSTITUTIONAL HERITAGE & ADVANCED SCHOLARSHIP</span>
            </div>
            <h1 className="hero-title">
              Indian Institute of Advanced Study
            </h1>
            <p className="hero-subtitle-hindi">भारतीय उच्च अध्ययन संस्थान • शिमला</p>
            <p className="hero-lead">
              Housed in the historic Rashtrapati Nivas (Viceregal Lodge), IIAS is India’s premier residential center for free and creative enquiry in the Humanities, Social Sciences, and Natural Sciences.
            </p>
            <div className="hero-cta-group">
              <Link to="/academics" className="btn btn-gold">
                Explore Fellowships
              </Link>
              <Link to="/tourists" className="btn btn-outline-light">
                Plan a Tourist Visit
              </Link>
              <Link to={user ? "/dashboard" : "/auth"} className="btn btn-burgundy">
                {user ? "Go to Portal Dashboard" : "Staff & Fellow Sign In"}
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Ticker Strip */}
        <section className="stats-strip">
          <div className="stats-container">
            <div className="stat-card">
              <span className="stat-number">1888</span>
              <span className="stat-label">Viceregal Lodge Built</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">1964</span>
              <span className="stat-label">Founded by Dr. S. Radhakrishnan</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">1,500+</span>
              <span className="stat-label">Research Monographs Published</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">200,000+</span>
              <span className="stat-label">Volumes in Library Collection</span>
            </div>
          </div>
        </section>

        {/* What's New Corner & Call for Papers Grid */}
        <section className="heritage-section bg-sandstone">
          <div className="section-container grid-2-col">
            {/* Left Column: What's New Corner */}
            <div className="whats-new-card">
              <div className="card-header-badge">
                <span className="badge-icon">📢</span>
                <div>
                  <span className="section-eyebrow">LATEST ANNOUNCEMENTS</span>
                  <h2>What's New Corner</h2>
                </div>
              </div>

              <div className="news-ticker-list">
                {whatsNewItems.map((item, index) => (
                  <div key={item.id || index} className="news-item">
                    <div className="news-meta">
                      <span className="news-date">📅 {item.date}</span>
                      {item.isNew && <span className="blinking-new-tag">NEW</span>}
                    </div>
                    <p className="news-title">{item.title}</p>
                  </div>
                ))}
              </div>

              <div className="card-footer-link">
                <Link to="/administration" className="btn btn-gold-sm">
                  View All Notifications & Circulars →
                </Link>
              </div>
            </div>

            {/* Right Column: Call for Papers */}
            <div className="call-for-papers-card">
              <div className="card-header-badge">
                <span className="badge-icon">✍️</span>
                <div>
                  <span className="section-eyebrow">ACADEMIC SUBMISSIONS</span>
                  <h2>Call for Papers & Monographs</h2>
                </div>
              </div>

              {activeCfp && (
                <div className="cfp-content-body">
                  <div className="cfp-highlight-box">
                    <div className="cfp-badge">{activeCfp.badge || 'Journal Volume'}</div>
                    <h3>{activeCfp.title}</h3>
                    <p className="cfp-desc">{activeCfp.description}</p>
                    <ul className="cfp-details-list">
                      <li>📅 <strong>Submission Deadline:</strong> {activeCfp.deadline || 'August 31, 2026'}</li>
                      <li>📄 <strong>Word Count Limit:</strong> {activeCfp.wordLimit || '6,000 – 8,000 words'}</li>
                      <li>✉️ <strong>Peer Review Submission:</strong> <a href={`mailto:${activeCfp.email || 'publications@iias.ac.in'}`}>{activeCfp.email || 'publications@iias.ac.in'}</a></li>
                    </ul>
                  </div>

                  <div className="cfp-actions">
                    <Link to="/academics" className="btn btn-gold">
                      View Guidelines & Schemes
                    </Link>
                    <Link to="/publications" className="btn btn-burgundy">
                      Browse Journal Archives
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Director's Welcome & Overview */}
        <section className="heritage-section">
          <div className="section-container split-layout">
            <div className="text-col">
              <span className="section-eyebrow">INSTITUTIONAL MESSAGES</span>
              <h2 className="section-heading">Nurturing Intellectual Thought in the Lap of the Himalayas</h2>
              <p className="paragraph">
                Set atop Observatory Hill in Shimla, the Indian Institute of Advanced Study provides a serene environment for scholars of distinguished talent to pursue research without the encumbrances of routine academic duties.
              </p>
              <p className="paragraph">
                Under the leadership of Chairperson <strong>Prof. ShashiPrabha Kumar</strong> and Director <strong>Prof. Himanshu Kumar Chaturvedi</strong>, the Institute encourages interdisciplinary dialogue into the fundamental questions of human civilization, Indian culture, and contemporary society.
              </p>
              <div className="cta-row">
                <Link to="/about" className="btn btn-gold">Read Full History & Vision →</Link>
              </div>
            </div>
            <div className="image-col">
              <div className="image-card-frame">
                <img src={lodgeImg} alt="Rashtrapati Nivas Viceregal Lodge" className="frame-img" />
                <div className="image-caption">
                  <span>Rashtrapati Nivas (Viceregal Lodge), Observatory Hill</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars Grid */}
        <section className="heritage-section bg-sandstone">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">INSTITUTIONAL PILLARS</span>
              <h2 className="section-heading">Explore the Realm of IIAS</h2>
              <div className="heading-line"></div>
            </div>

            <div className="pillar-grid">
              {/* Card 1: Fellowships */}
              <div className="pillar-card">
                <div className="pillar-image-wrap">
                  <img src={academicsImg} alt="Academic Seminar Hall" />
                  <div className="pillar-tag">Academics</div>
                </div>
                <div className="pillar-body">
                  <h3>National & Tagore Fellowships</h3>
                  <p>Residential fellowships for eminent scholars, young researchers, and associate fellows with complete research support.</p>
                  <Link to="/academics" className="card-link">View Fellowship Schemes →</Link>
                </div>
              </div>

              {/* Card 2: Library */}
              <div className="pillar-card">
                <div className="pillar-image-wrap">
                  <img src={libraryImg} alt="IIAS Heritage Library" />
                  <div className="pillar-tag">Research Library</div>
                </div>
                <div className="pillar-body">
                  <h3>The IIAS Library & Archives</h3>
                  <p>Housing over 200,000 volumes, rare manuscripts, and microfilms spanning philosophy, literature, history, and social sciences.</p>
                  <Link to="/library" className="card-link">Explore Library Catalog →</Link>
                </div>
              </div>

              {/* Card 3: Tourism */}
              <div className="pillar-card">
                <div className="pillar-image-wrap">
                  <img src={heroImg} alt="Lodge Lawns" />
                  <div className="pillar-tag">Tourism</div>
                </div>
                <div className="pillar-body">
                  <h3>Rashtrapati Nivas Visitor Tour</h3>
                  <p>Experience the Victorian architecture, teak interiors, heritage gardens, and historical galleries open to national and international visitors.</p>
                  <Link to="/tourists" className="card-link">Book Tour & Info →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Slider Media Gallery Section */}
        <section className="heritage-section">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">VISUAL REPOSITORY</span>
              <h2 className="section-heading">IIAS Media & Heritage Photo Slider</h2>
              <p className="section-subtext">Click any photo to view full resolution.</p>
              <div className="heading-line"></div>
            </div>

            {/* Slider Container */}
            <div className="photo-slider-wrapper">
              <button className="slider-arrow prev-arrow" onClick={prevSlide} aria-label="Previous Slide">
                ❮
              </button>

              <div
                className="slider-stage-item"
                onClick={() => setSelectedImage({ src: galleryImages[currentSlide].src, caption: galleryImages[currentSlide].caption })}
              >
                <img
                  src={galleryImages[currentSlide].src}
                  alt={galleryImages[currentSlide].caption}
                  className="slider-img"
                />
                <div className="slider-caption-bar">
                  <span>{galleryImages[currentSlide].caption}</span>
                </div>
              </div>

              <button className="slider-arrow next-arrow" onClick={nextSlide} aria-label="Next Slide">
                ❯
              </button>

              {/* Slide Indicators */}
              <div className="slider-dots">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Modal Viewer for Photo Slider */}
        {selectedImage && (
          <div className="modal-backdrop" onClick={() => setSelectedImage(null)}>
            <div className="modal-content-frame" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedImage(null)}>✕</button>
              <img src={selectedImage.src} alt={selectedImage.caption} className="modal-full-img" />
              <p className="modal-caption">{selectedImage.caption}</p>
            </div>
          </div>
        )}

        {/* Facebook Page Frame & Social QR Codes Section */}
        <section className="heritage-section bg-sandstone">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">CONNECT WITH US</span>
              <h2 className="section-heading">Official Social Media & Live Updates</h2>
              <div className="heading-line"></div>
            </div>

            <div className="social-connect-grid">
              {/* Facebook Frame Container */}
              <div className="fb-frame-card">
                <h3>📘 Official Facebook Feed</h3>
                <p className="fb-sub">Follow official announcements, seminar streams, and heritage tours.</p>

                <div className="fb-iframe-wrapper">
                  <iframe
                    title="IIAS Shimla Official Facebook Page"
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FIIASShimla&tabs=timeline&width=380&height=460&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                    width="100%"
                    height="460"
                    style={{ border: 'none', overflow: 'hidden', borderRadius: '8px' }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                </div>
              </div>

              {/* QR Code Cards Grid */}
              <div className="qr-codes-container">
                <h3>📱 Scan to Follow IIAS Social Pages</h3>
                <p className="qr-sub">Scan using your smartphone camera to connect with our official channels.</p>

                <div className="qr-cards-grid">
                  {/* Facebook QR */}
                  <div className="qr-card">
                    <div className="qr-image-wrap">
                      <img src={fbQr} alt="Facebook QR Code" />
                    </div>
                    <h4>Facebook</h4>
                    <p>@IIASShimla</p>
                    <a
                      href="https://www.facebook.com/IIASShimla"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="qr-link"
                    >
                      Visit Page →
                    </a>
                  </div>

                  {/* X / Twitter QR */}
                  <div className="qr-card">
                    <div className="qr-image-wrap">
                      <img src={xQr} alt="X.com QR Code" />
                    </div>
                    <h4>X (Twitter)</h4>
                    <p>@IIAS_Shimla</p>
                    <a
                      href="https://x.com/IIAS_Shimla"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="qr-link"
                    >
                      Visit Profile →
                    </a>
                  </div>

                  {/* YouTube QR */}
                  <div className="qr-card">
                    <div className="qr-image-wrap">
                      <img src={ytQr} alt="YouTube QR Code" />
                    </div>
                    <h4>YouTube</h4>
                    <p>IIAS Shimla Official</p>
                    <a
                      href="https://www.youtube.com/@IIASShimla"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="qr-link"
                    >
                      Watch Channel →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portal Callout */}
        <section className="heritage-section">
          <div className="section-container">
            <div className="portal-callout-box">
              <div className="callout-content">
                <h2>Fellows & Employee Digital Portal</h2>
                <p>
                  Access research monograph submissions, library pass generation, fellowship stipend tracking, and department announcements.
                </p>
                <div className="callout-actions">
                  <Link to={user ? "/dashboard" : "/auth"} className="btn btn-gold">
                    {user ? "Open Your Dashboard" : "Sign In to Portal"}
                  </Link>
                  <Link to="/publications" className="btn btn-outline-gold">
                    Browse Publications
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
