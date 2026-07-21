import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home-shell">
      <header className="home-topbar">
        <Link className="brand" to="/">
          <div>
            <span className="brand-name">Institute for Innovative Applied Studies</span>
            <span className="brand-tag">Research • Learning • Public Service</span>
          </div>
        </Link>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#programs">Programs</a>
          <a href="#contact">Contact</a>
        </nav>
        <Link className="btn btn-secondary" to={user ? '/dashboard' : '/auth'}>
          {user ? 'Open dashboard' : 'Staff portal'}
        </Link>
      </header>

      <main>
        <section className="hero home-hero">
          <div className="hero-content">
            <p className="eyebrow">Academic excellence, securely connected</p>
            <h1>Welcome to the institute’s digital front door.</h1>
            <p className="hero-text">
              Faculty, employees, and research fellows can access campus updates, manage their profile,
              and move between programs with confidence through our secure portal.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/auth">
                Register or sign in
              </Link>
              <a className="btn btn-secondary" href="#programs">
                Explore programs
              </a>
            </div>
            <ul className="hero-highlights">
              <li>Secure onboarding</li>
              <li>Research fellow registration</li>
              <li>Staff and department access</li>
            </ul>
          </div>

          <div className="hero-media">
            <div className="home-panel">
              <p className="eyebrow">Portal highlights</p>
              <h3>Designed for everyday academic operations</h3>
              <ul>
                <li>Role-based access for employees and fellows</li>
                <li>Simple sign-in and account creation</li>
                <li>Fast access to your personal dashboard</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="section-split">
            <div>
              <p className="eyebrow">About the institute</p>
              <h2>Supporting innovation with a modern public-facing experience.</h2>
              <p>
                Our platform brings together governance, collaboration, and research support in one place.
                Whether you are joining the team or managing an academic program, the experience is built
                to feel welcoming and dependable.
              </p>
            </div>
            <div className="card-grid">
              <article className="card">
                <h3>Research impact</h3>
                <p>Enable fellows to register, collaborate, and access institute resources with clarity.</p>
              </article>
              <article className="card">
                <h3>Administrative readiness</h3>
                <p>Streamline departments, staffing, and staff access through a single secure entry point.</p>
              </article>
              <article className="card">
                <h3>Community trust</h3>
                <p>A polished public homepage reinforces the institute’s reputation and opens the door to the portal.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="programs">
          <h2>Programs and opportunities</h2>
          <div className="card-grid">
            <article className="card">
              <h3>Faculty engagement</h3>
              <p>Coordinate teaching, review programs, and maintain a secure institutional presence.</p>
            </article>
            <article className="card">
              <h3>Fellowship pathways</h3>
              <p>Guide national and associate fellows through a clear registration experience.</p>
            </article>
            <article className="card">
              <h3>Operational support</h3>
              <p>Give departments and administration a dependable portal for service delivery.</p>
            </article>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Questions about the portal?</h2>
            <p>
              Reach out to the institute administration for onboarding, support, or guidance on your role-based account.
            </p>
          </div>
          <div className="contact-card">
            <h3>Institute administration</h3>
            <p>Email: admin@iias.example</p>
            <p>Phone: +1 (555) 014-2048</p>
            <Link className="btn btn-primary" to="/auth">
              Go to sign in
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Institute for Innovative Applied Studies. All rights reserved.</p>
      </footer>
    </div>
  );
}
