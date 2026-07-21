import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import libraryImg from '../assets/library.JPG';

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const sampleCatalog = [
    { title: 'Studies in Comparative Philosophy', author: 'Dr. S. Radhakrishnan', code: 'IIAS-LIB-1042', subject: 'Philosophy' },
    { title: 'The Viceregal Lodge Shimla: Architectural Record', author: 'Henry Irwin', code: 'IIAS-ARCH-009', subject: 'Architecture' },
    { title: 'Himalayan Trade Routes & Cultural Exchange', author: 'Prof. K. N. Panikkar', code: 'IIAS-SOC-552', subject: 'History' },
    { title: 'Sanskrit Manuscripts from Northern India', author: 'Rare Archive Collection', code: 'IIAS-MS-001', subject: 'Manuscripts' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResult(null);
      return;
    }
    const found = sampleCatalog.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResult(`Found ${found.length} items matching "${searchQuery}" in the IIAS Digital Archives.`);
  };

  return (
    <div className="iias-page-shell">
      <Navbar />

      <main className="iias-main-content">
        {/* Page Banner */}
        <section className="page-banner" style={{ backgroundImage: `url(${libraryImg})` }}>
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-breadcrumb"><Link to="/">Home</Link> / Library</span>
            <h1>The IIAS Research Library & Archives</h1>
            <p>One of Asia's Finest Research Repositories in Humanities & Social Sciences</p>
          </div>
        </section>

        {/* Digital Catalog Search Widget */}
        <section className="heritage-section bg-sandstone">
          <div className="section-container">
            <div className="catalog-search-card">
              <div className="search-header">
                <span className="section-eyebrow">OPAC & DIGITAL CATALOGUE</span>
                <h2>Search Library Holdings</h2>
                <p>Search over 200,000 cataloged books, rare manuscripts, and microfilms.</p>
              </div>

              <form onSubmit={handleSearch} className="catalog-search-form">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="search-select"
                >
                  <option value="All">All Subject Areas</option>
                  <option value="Philosophy">Philosophy & Religion</option>
                  <option value="History">History & Archival Records</option>
                  <option value="Literature">Literature & Linguistics</option>
                  <option value="Social Sciences">Sociology & Political Science</option>
                  <option value="Manuscripts">Rare Manuscripts</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter keywords, author name, or book title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="btn btn-gold">
                  Search Catalog
                </button>
              </form>

              {searchResult && (
                <div className="search-results-box">
                  <p className="results-msg">🔍 {searchResult}</p>
                  <div className="results-list">
                    {sampleCatalog
                      .filter(
                        (item) =>
                          selectedCategory === 'All' || item.subject === selectedCategory
                      )
                      .map((book) => (
                        <div key={book.code} className="result-item">
                          <span className="code-badge">{book.code}</span>
                          <div className="item-details">
                            <strong>{book.title}</strong>
                            <p>Author: {book.author} • Subject: {book.subject}</p>
                          </div>
                          <span className="avail-status">Available in Reading Room</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Overview & Special Collections */}
        <section className="heritage-section">
          <div className="section-container split-layout">
            <div className="text-col">
              <span className="section-eyebrow">RARE ARCHIVES & MANUSCRIPTS</span>
              <h2 className="section-heading">Rich Literary & Historical Heritage</h2>
              <p className="paragraph">
                The Library was started along with the establishment of the Institute in 1964. It is primarily designed to meet the research requirements of the Fellows of the Institute.
              </p>
              <p className="paragraph">
                The collection is particularly strong in the fields of Humanities and Social Sciences. It subscribes to over 300 national and international journals and maintains microfilms of historical government papers and rare 19th-century publications.
              </p>
              <div className="feature-bullets">
                <div className="bullet-item">
                  <span className="bullet-icon">📖</span>
                  <div>
                    <strong>Rare Manuscripts & First Editions</strong>
                    <p>Includes rare Sanskrit manuscripts, colonial records, and personal papers of eminent Indian scholars.</p>
                  </div>
                </div>
                <div className="bullet-item">
                  <span className="bullet-icon">💻</span>
                  <div>
                    <strong>E-Resources & JSTOR Access</strong>
                    <p>Full access to digital databases, JSTOR, Cambridge Core, and Oxford Academic online repositories.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="image-col">
              <div className="image-card-frame">
                <img src={libraryImg} alt="Library Stacks and Carrels" className="frame-img" />
                <div className="image-caption">
                  <span>Reading Hall & Teak Wood Carrels</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Operating Hours & Rules */}
        <section className="heritage-section bg-burgundy-dark text-light">
          <div className="section-container">
            <div className="section-header center light">
              <span className="section-eyebrow">VISITOR INFORMATION</span>
              <h2 className="section-heading">Library Timings & Membership Rules</h2>
              <div className="heading-line"></div>
            </div>

            <div className="grid-3-col">
              <div className="rule-card">
                <h3>🕒 Reading Hours</h3>
                <p><strong>Monday – Saturday:</strong> 9:00 AM – 7:00 PM</p>
                <p><strong>Sundays & Holidays:</strong> Closed</p>
                <p>Extended reading room hours for residential Fellows during seminar sessions.</p>
              </div>

              <div className="rule-card">
                <h3>🎟️ External Reader Passes</h3>
                <p>Visiting scholars, university professors, and PhD candidates may apply for temporary Consultation Passes with a recommendation letter from their institution head.</p>
              </div>

              <div className="rule-card">
                <h3>📜 Library Protocol</h3>
                <p>Personal belongings and bags must be deposited at the property counter. Laptops and research notebooks are permitted inside the carrels.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
