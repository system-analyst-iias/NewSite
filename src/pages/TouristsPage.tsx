import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import lodgeImg from '../assets/Building_exterior_full_view.JPG';
import gardenImg from '../assets/Building_exterior.JPG';

export default function TouristsPage() {
  const touristAttractions = [
    {
      icon: '📜',
      title: 'Tagore Gallery',
      desc: 'A dedicated exhibition space honoring Rabindranath Tagore, showcasing his literary manuscripts, portraits, and historical connection with the Institute.',
    },
    {
      icon: '🚒',
      title: 'Fire Station Gallery',
      desc: 'Housed in the estate’s historic Victorian fire station building, displaying archival photographs, antique firefighting apparatus, and architectural history.',
    },
    {
      icon: '🌺',
      title: 'Botanical Gardens & Estate Lawns',
      desc: '110 acres of manicured heritage gardens, rare Himalayan flora, ancient pine trees, and panoramic vantage points overlooking Shimla valley.',
    },
    {
      icon: '🏛️',
      title: 'Historical Galleries in Main Building',
      desc: 'Guided interior tours through the Burma teak-paneled Entrance Hall, the historic Council Room (Shimla Conference 1945 venue), and Viceroy galleries.',
    },
    {
      icon: '☕',
      title: 'Sunset View Cafe',
      desc: 'Open-air refreshment cafe situated on the estate, offering hot beverages, regional snacks, and scenic Himalayan sunset views.',
    },
    {
      icon: '🛺',
      title: 'E-Golf Cart Shuttle Facility',
      desc: 'Convenient, eco-friendly battery-operated e-golf cart service running continuously from Gorkha Gate to the Fire Station Ticket Counter for visitors.',
    },
  ];

  return (
    <div className="iias-page-shell">
      <Navbar />

      <main className="iias-main-content">
        {/* Page Banner */}
        <section className="page-banner" style={{ backgroundImage: `url(${lodgeImg})` }}>
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-breadcrumb"><Link to="/">Home</Link> / Tourist Guide</span>
            <h1>Visiting Rashtrapati Nivas (Viceregal Lodge)</h1>
            <p>Plan Your Heritage Tour to Shimla’s Historic Monument & Estate Gardens</p>
          </div>
        </section>

        {/* Essential Info Strip */}
        <section className="stats-strip">
          <div className="stats-container">
            <div className="stat-card">
              <span className="stat-number">9:30 AM – 5:00 PM</span>
              <span className="stat-label">Opening Timings (Tue – Sun)</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">CLOSED</span>
              <span className="stat-label">Every Monday for Maintenance</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">₹ 50 / ₹ 100</span>
              <span className="stat-label">Garden / Guided Building Ticket</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">🛺 E-GOLFCART</span>
              <span className="stat-label">Gorkha Gate to Ticket Counter</span>
            </div>
          </div>
        </section>

        {/* Guided Tour Overview */}
        <section className="heritage-section">
          <div className="section-container split-layout">
            <div className="text-col">
              <span className="section-eyebrow">HERITAGE WALK</span>
              <h2 className="section-heading">Explore Observatory Hill & Rashtrapati Nivas</h2>
              <p className="paragraph">
                The Viceregal Lodge, now home to the Indian Institute of Advanced Study, is Shimla's finest architectural landmark. Built between 1884 and 1888 on Observatory Hill, the estate combines Elizabethan Jacobethan architecture with sprawling botanical gardens.
              </p>
              <p className="paragraph">
                Visitors can ride the eco-friendly <strong>E-Golf Cart facility</strong> from Gorkha Gate directly to the Fire Station Ticket Counter, then explore the historic main building galleries, Tagore Gallery, Fire Station exhibition, and enjoy refreshments at the <strong>Sunset View Cafe</strong>.
              </p>
            </div>
            <div className="image-col">
              <div className="image-card-frame">
                <img src={gardenImg} alt="Rashtrapati Nivas Exterior & Gardens" className="frame-img" />
                <div className="image-caption">
                  <span>Viceregal Lodge Facade & Heritage Gardens</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Attractions Grid */}
        <section className="heritage-section bg-sandstone">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">HIGHLIGHTS & AMENITIES</span>
              <h2 className="section-heading">Key Tourist Attractions & Visitor Facilities</h2>
              <div className="heading-line"></div>
            </div>

            <div className="grid-3-col">
              {touristAttractions.map((attraction, idx) => (
                <div key={idx} className="attraction-card-box">
                  <div className="attraction-icon">{attraction.icon}</div>
                  <h3>{attraction.title}</h3>
                  <p>{attraction.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ticket Tariff Table */}
        <section className="heritage-section">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">ENTRY TARIFF</span>
              <h2 className="section-heading">Ticket Charges & Options</h2>
              <div className="heading-line"></div>
            </div>

            <div className="table-responsive">
              <table className="iias-table">
                <thead>
                  <tr>
                    <th>Visitor Category</th>
                    <th>Garden Entry Only</th>
                    <th>Guided Tour (Building + Museum Galleries)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Indian Citizens</strong></td>
                    <td>₹ 50 per head</td>
                    <td>₹ 100 per head</td>
                  </tr>
                  <tr>
                    <td><strong>Foreign Tourists</strong></td>
                    <td>₹ 100 per head</td>
                    <td>₹ 300 per head</td>
                  </tr>
                  <tr>
                    <td><strong>Students (School/College ID)</strong></td>
                    <td>₹ 20 per student</td>
                    <td>₹ 50 per student</td>
                  </tr>
                  <tr>
                    <td><strong>Children (Below 5 Years)</strong></td>
                    <td>FREE</td>
                    <td>FREE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Visitor Protocol & Guidelines */}
        <section className="heritage-section bg-sandstone">
          <div className="section-container">
            <div className="info-card-box highlight-border">
              <span className="section-eyebrow">VISITOR PROTOCOL</span>
              <h3>⚠️ Important Guidelines for Tourists</h3>
              <ul className="custom-check-list" style={{ marginTop: '1rem' }}>
                <li>🛺 <strong>E-Golfcart Facility:</strong> Eco-friendly e-golf carts are available at Gorkha Gate to convey visitors to the Fire Station Ticket Counter.</li>
                <li>📷 <strong>Photography:</strong> Outdoor garden photography is permitted. Photography inside the interior heritage museum rooms is restricted.</li>
                <li>☕ <strong>Sunset View Cafe:</strong> Refreshment cafe open during visiting hours near the heritage gardens.</li>
                <li>🚭 <strong>Strictly Prohibited:</strong> Smoking, littering, and single-use plastics are prohibited across the 110-acre estate grounds.</li>
                <li>🎒 <strong>Baggage:</strong> Small hand purses are permitted; larger luggage must be deposited in the cloakroom near the main gate.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How to Reach Map & Directions */}
        <section className="heritage-section bg-burgundy-dark text-light">
          <div className="section-container">
            <div className="section-header center light">
              <span className="section-eyebrow">LOCATION & DIRECTIONS</span>
              <h2 className="section-heading">How to Reach IIAS Shimla</h2>
              <p className="section-subtext">Situated 3 km west of the Shimla Mall Road atop Observatory Hill.</p>
            </div>

            <div className="grid-3-col">
              <div className="reach-card">
                <h4>🚖 From Shimla Bus Stand (ISBT)</h4>
                <p>Approximately 4 km. Taxis and local city buses run regularly to Summer Hill and Boileauganj stop.</p>
              </div>

              <div className="reach-card">
                <h4>🚂 From Shimla Railway Station</h4>
                <p>Located 3.5 km away. Toy train passengers can disembark at <strong>Summer Hill Railway Station</strong> (1 km walk).</p>
              </div>

              <div className="reach-card">
                <h4>✈️ From Jubbarhatti Airport</h4>
                <p>Located 20 km from Observatory Hill. Pre-booked taxis take roughly 45 minutes via National Highway 22.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
