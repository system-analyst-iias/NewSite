import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import adminImg from '../assets/interior (2).JPG';

export default function AdministrationPage() {
  const departmentsList = [
    { name: 'Director Office', head: 'Prof. Himanshu Kumar Chaturvedi', contact: 'director@iias.ac.in', ext: 'Ext. 101' },
    { name: 'Administration & Estate', head: 'Shri Meher Chand Negi (Secretary)', contact: 'secretary@iias.ac.in', ext: 'Ext. 102' },
    { name: 'Library & Documentation', head: 'Dr. Rajiv Kumar Mishra (Librarian)', contact: 'library@iias.ac.in', ext: 'Ext. 108' },
    { name: 'Finance & Accounts Section', head: 'Finance Officer', contact: 'fo@iias.ac.in', ext: 'Ext. 105' },
    { name: 'Sales & Public Relations', head: 'Public Relations Officer', contact: 'pro@iias.ac.in', ext: 'Ext. 112' },
    { name: 'Horticulture & Grounds Section', head: 'Estate Officer', contact: 'estate@iias.ac.in', ext: 'Ext. 115' },
  ];

  return (
    <div className="iias-page-shell">
      <Navbar />

      <main className="iias-main-content">
        {/* Page Banner */}
        <section className="page-banner" style={{ backgroundImage: `url(${adminImg})` }}>
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-breadcrumb"><Link to="/">Home</Link> / Administration</span>
            <h1>IIAS Administration & Governance</h1>
            <p>Organizational Hierarchy, Statutory Bodies & Department Directory</p>
          </div>
        </section>

        {/* Leadership Cards */}
        <section className="heritage-section">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">LEADERSHIP</span>
              <h2 className="section-heading">Institutional Leadership</h2>
              <div className="heading-line"></div>
            </div>

            <div className="grid-3-col">
              <div className="leader-card">
                <div className="avatar-placeholder">📜</div>
                <h3>Chairperson, Governing Body</h3>
                <p className="role-title">Prof. ShashiPrabha Kumar</p>
                <p className="desc">Chairperson, IIAS Governing Body & Society</p>
              </div>

              <div className="leader-card">
                <div className="avatar-placeholder">🎓</div>
                <h3>Director, IIAS</h3>
                <p className="role-title">Prof. Himanshu Kumar Chaturvedi</p>
                <p className="desc">Executive & Academic Head</p>
              </div>

              <div className="leader-card">
                <div className="avatar-placeholder">🏛️</div>
                <h3>Secretary, IIAS</h3>
                <p className="role-title">Shri Meher Chand Negi</p>
                <p className="desc">Head of Administration & Estate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Department Directory Table */}
        <section className="heritage-section bg-sandstone">
          <div className="section-container">
            <div className="section-header">
              <span className="section-eyebrow">DEPARTMENTS & SECTIONS</span>
              <h2>Administrative Directory</h2>
              <p>Key administrative divisions managing estate maintenance, fellowship grants, publications, and visitor services.</p>
            </div>

            <div className="table-responsive">
              <table className="iias-table">
                <thead>
                  <tr>
                    <th>Department / Section</th>
                    <th>Officer / Head</th>
                    <th>Email Contact</th>
                    <th>Phone Extension</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentsList.map((dept) => (
                    <tr key={dept.name}>
                      <td><strong>{dept.name}</strong></td>
                      <td>{dept.head}</td>
                      <td><a href={`mailto:${dept.contact}`} className="table-link">{dept.contact}</a></td>
                      <td>{dept.ext}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Statutory Committees */}
        <section className="heritage-section">
          <div className="section-container">
            <div className="section-header center">
              <span className="section-eyebrow">STATUTORY COMMITTEES</span>
              <h2 className="section-heading">Governance Committees</h2>
              <div className="heading-line"></div>
            </div>

            <div className="grid-3-col">
              <div className="committee-card">
                <h4>Governing Body</h4>
                <p>Chaired by Prof. ShashiPrabha Kumar; responsible for overall governance, policy formulation, and institutional direction.</p>
              </div>

              <div className="committee-card">
                <h4>Academic Committee</h4>
                <p>Under Director Prof. Himanshu Kumar Chaturvedi; oversees fellowship selections and evaluates research proposals.</p>
              </div>

              <div className="committee-card">
                <h4>Finance Committee</h4>
                <p>Examines annual financial statements, government grant allocation, and audit compliance.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
