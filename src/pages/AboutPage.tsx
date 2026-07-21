import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import lodgeImg from '../assets/Building_exterior.JPG';
import interiorImg from '../assets/interior (2).JPG';

export default function AboutPage() {
  return (
    <div className="iias-page-shell">
      <Navbar />

      <main className="iias-main-content">
        {/* Page Banner */}
        <section className="page-banner" style={{ backgroundImage: `url(${lodgeImg})` }}>
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-breadcrumb"><Link to="/">Home</Link> / About Us</span>
            <h1>About IIAS & History of Rashtrapati Nivas</h1>
            <p>A Sanctuary for Creative Thinking & Historical Significance</p>
          </div>
        </section>

        {/* Content Section 1: History of Viceregal Lodge */}
        <section className="heritage-section">
          <div className="section-container split-layout">
            <div className="text-col">
              <span className="section-eyebrow">ARCHITECTURAL LEGACY</span>
              <h2 className="section-heading">The Viceregal Lodge (Built 1888)</h2>
              <p className="paragraph">
                The Indian Institute of Advanced Study is housed in the historic Viceregal Lodge, located on Observatory Hill in Shimla. Designed by Henry Irwin, architect to the Public Works Department, the building was constructed between 1884 and 1888 as the summer residence of the Viceroy of India, Lord Dufferin.
              </p>
              <p className="paragraph">
                Built in the Elizabethan Elizabethan Jacobethan style, the structure was equipped with advanced technology for its time, including an independent steam power plant, incandescent lighting, and complex rain harvesting systems.
              </p>
              <p className="paragraph">
                Significant political events took place within these walls, including the Shimla Conference of 1945 and decisions surrounding the partition of India in 1947. Following independence, the estate became the summer retreat of the President of India (Rashtrapati Nivas).
              </p>
            </div>
            <div className="image-col">
              <div className="image-card-frame">
                <img src={lodgeImg} alt="Viceregal Lodge Facade" className="frame-img" />
                <div className="image-caption">
                  <span>Front Lawn & Stone Facade of Rashtrapati Nivas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section 2: Genesis of the Institute */}
        <section className="heritage-section bg-sandstone">
          <div className="section-container split-layout reverse">
            <div className="image-col">
              <div className="image-card-frame">
                <img src={interiorImg} alt="IIAS Conference Hall Interior" className="frame-img" />
                <div className="image-caption">
                  <span>Burma Teak Paneled Interior & Meeting Chambers</span>
                </div>
              </div>
            </div>
            <div className="text-col">
              <span className="section-eyebrow">VISION OF DR. S. RADHAKRISHNAN</span>
              <h2 className="section-heading">Transformation into an Institute of Advanced Study (1964)</h2>
              <p className="paragraph">
                In 1964, Dr. S. Radhakrishnan, the eminent philosopher and second President of India, envisioned handing over the estate to the Ministry of Education to set up a residential institute dedicated to advanced research.
              </p>
              <p className="paragraph">
                Formally inaugurated on October 20, 1965 by Dr. Radhakrishnan, IIAS was registered as a society under the Societies Registration Act XXI of 1860. It functions as an autonomous research institution dedicated to multi-disciplinary inquiry.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Objectives Grid */}
        <section className="heritage-section">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">OUR MANDATE</span>
              <h2 className="section-heading">Vision & Objectives</h2>
              <div className="heading-line"></div>
            </div>

            <div className="grid-3-col">
              <div className="info-card-box">
                <div className="icon-wrap">📜</div>
                <h3>Humanities & Social Sciences</h3>
                <p>Promote fundamental, interdisciplinary, and comparative research in literature, philosophy, sociology, history, and fine arts.</p>
              </div>
              <div className="info-card-box">
                <div className="icon-wrap">🌐</div>
                <h3>Inter-civilizational Studies</h3>
                <p>Examine Asian, Western, and global intellectual traditions, encouraging dialogue across diverse cultural perspectives.</p>
              </div>
              <div className="info-card-box">
                <div className="icon-wrap">📚</div>
                <h3>Academic Freedom</h3>
                <p>Provide residential fellows complete freedom from routine teaching responsibilities to focus on scholarly monographs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Governing Body Structure */}
        <section className="heritage-section bg-burgundy-dark text-light">
          <div className="section-container">
            <div className="section-header center light">
              <span className="section-eyebrow">GOVERNANCE</span>
              <h2 className="section-heading">Institutional Governance</h2>
              <p className="section-subtext">The affairs of the Institute are administered by the Governing Body and the General Society.</p>
            </div>

            <div className="governance-cards-grid">
              <div className="gov-card">
                <h4>General Society</h4>
                <p>Chaired by the President of the IIAS Society (appointed by the Hon’ble Minister of Education, Govt. of India).</p>
              </div>
              <div className="gov-card">
                <h4>Governing Body</h4>
                <p>Executes administrative policies, approves fellowship recommendations, and oversees financial management.</p>
              </div>
              <div className="gov-card">
                <h4>Academic Committee</h4>
                <p>Evaluates fellowship research proposals, seminar proposals, and peer-reviewed monograph publications.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
