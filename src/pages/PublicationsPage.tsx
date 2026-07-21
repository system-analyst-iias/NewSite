import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import pubImg from '../assets/interior.JPG';

export default function PublicationsPage() {
  const [activeTab, setActiveTab] = useState<'books' | 'journals' | 'ordering'>('books');

  const booksList = [
    { title: 'The Concept of Indian Unity', author: 'Prof. Niharranjan Ray', year: '2024', ISBN: '978-81-7986-120-1', price: '₹ 850' },
    { title: 'Viceregal Lodge: Architecture and Politics', author: 'Dr. V. C. Ohri', year: '2023', ISBN: '978-81-7986-099-0', price: '₹ 1,200' },
    { title: 'Himalayan Frontier Systems', author: 'Prof. L. P. Singh', year: '2024', ISBN: '978-81-7986-145-4', price: '₹ 650' },
    { title: 'Tradition and Modernity in Indian Thought', author: 'Dr. Margaret Chatterjee', year: '2022', ISBN: '978-81-7986-081-5', price: '₹ 950' },
  ];

  return (
    <div className="iias-page-shell">
      <Navbar />

      <main className="iias-main-content">
        {/* Page Banner */}
        <section className="page-banner" style={{ backgroundImage: `url(${pubImg})` }}>
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-breadcrumb"><Link to="/">Home</Link> / Publications</span>
            <h1>IIAS Publications & Monographs</h1>
            <p>Disseminating Rigorous Research in Humanities & Social Sciences Since 1965</p>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="heritage-section">
          <div className="section-container">
            <div className="tab-buttons-wrap">
              <button
                className={`tab-btn ${activeTab === 'books' ? 'active' : ''}`}
                onClick={() => setActiveTab('books')}
              >
                📚 Monographs & Books
              </button>
              <button
                className={`tab-btn ${activeTab === 'journals' ? 'active' : ''}`}
                onClick={() => setActiveTab('journals')}
              >
                📖 IIAS Research Journals
              </button>
              <button
                className={`tab-btn ${activeTab === 'ordering' ? 'active' : ''}`}
                onClick={() => setActiveTab('ordering')}
              >
                🛒 Ordering & Purchase Info
              </button>
            </div>

            {/* Tab 1: Books */}
            {activeTab === 'books' && (
              <div className="tab-content-fade">
                <div className="section-header">
                  <span className="section-eyebrow">SCHOLARLY MONOGRAPHS</span>
                  <h2>Recent Book Publications</h2>
                  <p>Over 1,500 titles published under the IIAS monograph series based on research conducted by resident Fellows.</p>
                </div>

                <div className="grid-2-col">
                  {booksList.map((book) => (
                    <div key={book.ISBN} className="publication-card">
                      <div className="pub-badge">Published {book.year}</div>
                      <h3>{book.title}</h3>
                      <p className="pub-author">By <strong>{book.author}</strong></p>
                      <p className="pub-meta">ISBN: {book.ISBN} • Price: {book.price}</p>
                      <button className="btn btn-gold-sm" onClick={() => setActiveTab('ordering')}>
                        Order Volume
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Journals */}
            {activeTab === 'journals' && (
              <div className="tab-content-fade">
                <div className="section-header">
                  <span className="section-eyebrow">PEER-REVIEWED PERIODICALS</span>
                  <h2>IIAS Academic Journals</h2>
                </div>

                <div className="grid-2-col">
                  <div className="journal-card">
                    <div className="journal-header">
                      <h3>Summer Hill: IIAS Review</h3>
                      <span className="issn">ISSN: 0972-1452</span>
                    </div>
                    <p>
                      A bi-annual journal devoted to book reviews, review articles, and extended discussions on landmark publications in the Humanities and Social Sciences across India and abroad.
                    </p>
                  </div>

                  <div className="journal-card">
                    <div className="journal-header">
                      <h3>Studies in Humanities and Social Sciences</h3>
                      <span className="issn">ISSN: 0971-9229</span>
                    </div>
                    <p>
                      A refereed research journal published twice a year featuring original articles, theme-based symposia, and methodological debates.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Ordering */}
            {activeTab === 'ordering' && (
              <div className="tab-content-fade">
                <div className="ordering-info-box">
                  <h2>How to Order IIAS Publications</h2>
                  <p>
                    All publications of the Institute are available for direct purchase at the Sales Counter at Rashtrapati Nivas, Shimla, or through postal orders via the Publication Department.
                  </p>

                  <div className="grid-3-col" style={{ marginTop: '1.5rem' }}>
                    <div className="order-step">
                      <h4>1. Contact Sales Section</h4>
                      <p>Email your order list to <strong>publications@iias.ac.in</strong> or call <strong>+91 (177) 2831375</strong>.</p>
                    </div>
                    <div className="order-step">
                      <h4>2. Payment Mode</h4>
                      <p>Payment can be made via Demand Draft in favor of <em>"Secretary, IIAS Shimla"</em> or electronic NEFT/RTGS transfer.</p>
                    </div>
                    <div className="order-step">
                      <h4>3. Institutional Discount</h4>
                      <p>Libraries, academic institutions, and book sellers are eligible for standard trade discounts (20% to 35%).</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
