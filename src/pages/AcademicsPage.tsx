import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import academicsImg from '../assets/interior (3).JPG';

export default function AcademicsPage() {
  return (
    <div className="iias-page-shell">
      <Navbar />

      <main className="iias-main-content">
        {/* Page Banner */}
        <section className="page-banner" style={{ backgroundImage: `url(${academicsImg})` }}>
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-breadcrumb"><Link to="/">Home</Link> / Academics</span>
            <h1>Fellowships & Academic Programs</h1>
            <p>Residential Research Opportunities for Scholars & Intellectuals</p>
          </div>
        </section>

        {/* Intro Overview */}
        <section className="heritage-section">
          <div className="section-container split-layout">
            <div className="text-col">
              <span className="section-eyebrow">RESEARCH FELLOWSHIPS</span>
              <h2 className="section-heading">Fostering Independent Research</h2>
              <p className="paragraph">
                The primary objective of the Institute is to provide a residential environment for scholars of distinguished talent to pursue fundamental research in the Humanities, Social Sciences, and Natural Sciences.
              </p>
              <p className="paragraph">
                Fellows are awarded residential accommodations at the estate, access to the research library, travel assistance, and monthly research grants to complete original scholarly monographs.
              </p>
              <div className="cta-row">
                <Link to="/auth" className="btn btn-gold">
                  Apply or Submit Fellow Credentials →
                </Link>
              </div>
            </div>
            <div className="image-col">
              <div className="image-card-frame">
                <img src={academicsImg} alt="Academic Seminar Hall" className="frame-img" />
                <div className="image-caption">
                  <span>Weekly Inter-disciplinary Seminar Presentations</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fellowship Categories Grid */}
        <section className="heritage-section bg-sandstone">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">SCHEMES & CATEGORIES</span>
              <h2 className="section-heading">IIAS Fellowship Opportunities</h2>
              <div className="heading-line"></div>
            </div>

            <div className="grid-2-col">
              {/* Category 1 */}
              <div className="scheme-card">
                <div className="scheme-badge">Category A</div>
                <h3>National Fellows</h3>
                <p className="tenure">Tenure: 1 to 2 Years</p>
                <p className="desc">
                  Awarded to eminent scholars of international repute who have made extraordinary contributions to scholarship in philosophy, literature, social sciences, or arts. Includes full residential grant and secretarial assistance.
                </p>
              </div>

              {/* Category 2 */}
              <div className="scheme-card">
                <div className="scheme-badge">Category B</div>
                <h3>Tagore Fellows</h3>
                <p className="tenure">Tenure: 1 Year</p>
                <p className="desc">
                  Instituted under the Tagore National Fellowship scheme to support dedicated research on Indian cultural history, Rabindranath Tagore’s literary legacy, and comparative literature.
                </p>
              </div>

              {/* Category 3 */}
              <div className="scheme-card">
                <div className="scheme-badge">Category C</div>
                <h3>Regular Residential Fellows</h3>
                <p className="tenure">Tenure: 6 Months to 2 Years</p>
                <p className="desc">
                  Open to university professors, associate professors, and independent scholars working on approved monograph projects across designated thrust areas.
                </p>
              </div>

              {/* Category 4 */}
              <div className="scheme-card">
                <div className="scheme-badge">Category D</div>
                <h3>Associate Fellows</h3>
                <p className="tenure">Tenure: 1 to 3 Months</p>
                <p className="desc">
                  Short-term fellowships intended for university teachers to spend vacation periods at the Institute using the library and consulting with resident Fellows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Focus Areas */}
        <section className="heritage-section">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">THRUST AREAS</span>
              <h2 className="section-heading">Major Research Domains</h2>
              <div className="heading-line"></div>
            </div>

            <div className="domain-pills-grid">
              <div className="domain-pill">
                <span>📚</span> Philosophy & Religion
              </div>
              <div className="domain-pill">
                <span>🏛️</span> Indian History & Archaeology
              </div>
              <div className="domain-pill">
                <span>✍️</span> Literature, Aesthetics & Linguistics
              </div>
              <div className="domain-pill">
                <span>⚖️</span> Political Economy & Governance
              </div>
              <div className="domain-pill">
                <span>🌱</span> Human Geography & Ecology
              </div>
              <div className="domain-pill">
                <span>🎭</span> Fine Arts & Performing Arts
              </div>
            </div>
          </div>
        </section>

        {/* Application Process Timeline */}
        <section className="heritage-section bg-burgundy-dark text-light">
          <div className="section-container">
            <div className="section-header center light">
              <span className="section-eyebrow">HOW TO APPLY</span>
              <h2 className="section-heading">Fellowship Application Process</h2>
              <p className="section-subtext">Applications are invited annually through nationwide notification in leading national newspapers and the Institute website.</p>
            </div>

            <div className="timeline-steps">
              <div className="timeline-step">
                <div className="step-num">1</div>
                <h4>Project Proposal Submission</h4>
                <p>Submit a 2000-word detailed research proposal along with your curriculum vitae and publication record.</p>
              </div>
              <div className="timeline-step">
                <div className="step-num">2</div>
                <h4>Peer Expert Evaluation</h4>
                <p>Proposals are refereed by independent domain experts appointed by the Academic Committee.</p>
              </div>
              <div className="timeline-step">
                <div className="step-num">3</div>
                <h4>Presentation & Interview</h4>
                <p>Shortlisted candidates present their proposed monograph before the Selection Committee in Shimla or New Delhi.</p>
              </div>
              <div className="timeline-step">
                <div className="step-num">4</div>
                <h4>Residency & Award</h4>
                <p>Selected Fellows join the residential campus at Observatory Hill, Shimla.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
