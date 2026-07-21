import './App.css'
import iiLogo from './assets/IIAS_Logo.png'
import heroImage from './assets/Building_exterior.JPG'
import galleryImage from './assets/Building_exterior_full_view.JPG'
import interiorImage from './assets/interior (3).JPG'
import libraryImage from './assets/library.JPG'

const programs = [
  {
    title: 'Advanced Studies',
    description: 'Interdisciplinary seminars and fellowship-led research for scholars across the humanities and social sciences.',
  },
  {
    title: 'Public Intellectual Life',
    description: 'Programs that connect scholarship to policy, culture, and civic thought through lectures and roundtables.',
  },
  {
    title: 'Research Fellowships',
    description: 'Residential fellowships that support ambitious projects, archival work, and collaborative inquiry.',
  },
]

const highlights = [
  'Historic campus setting',
  'Scholarly residencies',
  'Engaged public programming',
]

function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#home">
          <img src={iiLogo} alt="Indian Institute of Advanced Study logo" />
          <div>
            <span className="brand-name">Indian Institute of Advanced Study</span>
            <span className="brand-tag">Scholarship, inquiry, and public thought</span>
          </div>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#academics">Academics</a>
          <a href="#campus">Campus</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">A centre of advanced learning and intellectual inquiry</p>
            <h1>Shaping ideas that endure.</h1>
            <p className="hero-text">
              The Indian Institute of Advanced Study nurtures rigorous scholarship, public dialogue, and a lasting culture of learning in one of India’s most distinguished academic settings.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#academics">
                Explore Academic Life
              </a>
              <a className="btn btn-secondary" href="#contact">
                Visit the Institute
              </a>
            </div>
            <ul className="hero-highlights">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="hero-media">
            <img src={heroImage} alt="The institute campus exterior" />
          </div>
        </section>

        <section className="stats">
          <article>
            <strong>125+</strong>
            <span>Years of intellectual heritage</span>
          </article>
          <article>
            <strong>30+</strong>
            <span>Fellowships hosted annually</span>
          </article>
          <article>
            <strong>100%</strong>
            <span>Commitment to scholarly excellence</span>
          </article>
        </section>

        <section id="about" className="section section-split">
          <div>
            <p className="eyebrow">About the institute</p>
            <h2>Anchored in scholarship, open to the world.</h2>
            <p>
              IIAS is dedicated to advancing research, fostering public understanding, and sustaining a vibrant space where scholars can think deeply and write with clarity.
            </p>
            <p>
              From residence-based study to thought-provoking public programs, the institution creates the conditions for transformative ideas to take shape.
            </p>
          </div>
          <div className="image-card">
            <img src={galleryImage} alt="A wider view of the institute buildings" />
          </div>
        </section>

        <section id="academics" className="section">
          <div className="section-heading">
            <p className="eyebrow">Academic focus</p>
            <h2>Programs shaped by curiosity and rigor.</h2>
          </div>
          <div className="card-grid">
            {programs.map((program) => (
              <article key={program.title} className="card">
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="campus" className="section gallery-section">
          <div className="section-heading">
            <p className="eyebrow">Campus and collections</p>
            <h2>Spaces designed for reflection and discovery.</h2>
          </div>
          <div className="gallery-grid">
            <figure>
              <img src={interiorImage} alt="Interior spaces of the institute" />
              <figcaption>Historic interiors and study spaces</figcaption>
            </figure>
            <figure>
              <img src={libraryImage} alt="Library resources at the institute" />
              <figcaption>Collections that support deep research</figcaption>
            </figure>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Engage with the institute.</h2>
            <p>
              Whether you are a scholar, student, or visitor, the institute welcomes thoughtful engagement and future collaborations.
            </p>
          </div>
          <div className="contact-card">
            <p><strong>Address:</strong> Shimla, Himachal Pradesh</p>
            <p><strong>Email:</strong> contact@iias.ac.in</p>
            <p><strong>Hours:</strong> Monday to Friday, 9:00 AM to 5:00 PM</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Indian Institute of Advanced Study. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
