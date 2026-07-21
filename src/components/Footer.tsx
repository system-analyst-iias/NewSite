import { Link } from 'react-router-dom';
import logoImg from '../assets/IIAS_Logo.png';
import fbQr from '../assets/Facebook.png';
import xQr from '../assets/X.com.png';
import ytQr from '../assets/YouTube.png';

export default function Footer() {
  return (
    <footer className="iias-footer">
      <div className="footer-gold-border"></div>
      <div className="footer-main">
        <div className="footer-grid">
          {/* Column 1: Institute Branding */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <img src={logoImg} alt="IIAS Logo" className="footer-logo" />
              <div>
                <h4>Indian Institute of Advanced Study</h4>
                <p className="subtext">Rashtrapati Nivas, Shimla - 171005</p>
              </div>
            </div>
            <p className="institute-desc">
              An autonomous research institute set up by the Ministry of Education, Government of India. Dedicated to advanced research in Humanities, Social Sciences, and Interdisciplinary Studies.
            </p>
            <div className="social-links">
              <span className="social-icon">🌐 www.iias.ac.in</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/about">About IIAS & History</Link></li>
              <li><Link to="/academics">Fellowship Programs</Link></li>
              <li><Link to="/library">Library & Digital Catalog</Link></li>
              <li><Link to="/publications">Monographs & Publications</Link></li>
              <li><Link to="/tourists">Rashtrapati Nivas Tourist Guide</Link></li>
              <li><Link to="/administration">Administration & Officers</Link></li>
            </ul>
          </div>

          {/* Column 3: Visitor Info & Hours */}
          <div className="footer-col">
            <h5 className="footer-title">Visiting Information</h5>
            <div className="info-block">
              <p><strong>🏛️ Monument Opening Hours:</strong></p>
              <p>Tuesday - Sunday: 9:30 AM - 5:00 PM</p>
              <p>*(Monday Closed for Maintenance)*</p>
            </div>
            <div className="info-block" style={{ marginTop: '0.75rem' }}>
              <p><strong>🌲 Estate Lawns & Gardens:</strong></p>
              <p>Open for public heritage walks & tours.</p>
            </div>
          </div>

          {/* Column 4: Social Media QR Codes & Contact */}
          <div className="footer-col">
            <h5 className="footer-title">Connect on Social Media</h5>
            <p className="contact-line"><strong>Location:</strong> Observatory Hill, Shimla - 171005</p>
            <p className="contact-line"><strong>Phone:</strong> +91 (177) 2831370</p>
            <p className="contact-line"><strong>Email:</strong> info@iias.ac.in</p>

            <div className="footer-qr-strip">
              <div className="qr-mini-card">
                <img src={fbQr} alt="Facebook QR Code" />
                <span>Facebook</span>
              </div>
              <div className="qr-mini-card">
                <img src={xQr} alt="X.com QR Code" />
                <span>X (Twitter)</span>
              </div>
              <div className="qr-mini-card">
                <img src={ytQr} alt="YouTube QR Code" />
                <span>YouTube</span>
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <Link to="/auth" className="btn btn-gold-sm">
                Internal Portal Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© {new Date().getFullYear()} Indian Institute of Advanced Study (IIAS Shimla). All rights reserved.</p>
          <p className="legal-links">
            <span>Ministry of Education, Govt. of India</span> • 
            <span>RTI</span> • 
            <span>Privacy Policy</span> • 
            <span>Terms of Use</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
