import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

type RegisteredUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  category?: string | null;
  department?: string | null;
  created_at?: string;
};

type WhatsNewItem = {
  id: number;
  date: string;
  title: string;
  isNew?: boolean;
};

type CallForPapersItem = {
  id: number;
  badge?: string;
  title: string;
  description: string;
  deadline?: string;
  wordLimit?: string;
  email?: string;
};

export default function DashboardPage() {
  const { user, logout, token, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'research' | 'library' | 'users' | 'whatsnew' | 'cfp'>('overview');

  // Admin user state
  const [adminUsers, setAdminUsers] = useState<RegisteredUser[]>([]);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [userFetchError, setUserFetchError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Admin What's New State
  const [whatsNewList, setWhatsNewList] = useState<WhatsNewItem[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newIsNew, setNewIsNew] = useState(true);
  const [whatsNewStatus, setWhatsNewStatus] = useState('');

  // Admin Call for Papers State
  const [cfpList, setCfpList] = useState<CallForPapersItem[]>([]);
  const [cfpTitle, setCfpTitle] = useState('');
  const [cfpBadge, setCfpBadge] = useState('Journal Volume 2026');
  const [cfpDesc, setCfpDesc] = useState('');
  const [cfpDeadline, setCfpDeadline] = useState('August 31, 2026');
  const [cfpWordLimit, setCfpWordLimit] = useState('6,000 – 8,000 words');
  const [cfpEmail, setCfpEmail] = useState('publications@iias.ac.in');
  const [cfpStatus, setCfpStatus] = useState('');

  // Monograph submission state
  const [monographTitle, setMonographTitle] = useState('');
  const [monographDomain, setMonographDomain] = useState('Philosophy');
  const [monographStatus, setMonographStatus] = useState<string | null>(null);

  // Load Admin Data (Users, What's New, Call for Papers)
  useEffect(() => {
    if (user?.role !== 'admin' || !token) return;

    let isMounted = true;
    const loadAdminData = async () => {
      try {
        setFetchingUsers(true);
        setUserFetchError('');
        const res = await fetch('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to load registered users.');
        const data = await res.json();
        if (isMounted) setAdminUsers(data);
      } catch (err) {
        if (isMounted) setUserFetchError(err instanceof Error ? err.message : 'Error fetching users');
      } finally {
        if (isMounted) setFetchingUsers(false);
      }
    };

    loadAdminData();

    return () => {
      isMounted = false;
    };
  }, [user, token]);

  // Load What's New and CFP list for Admin
  useEffect(() => {
    let isMounted = true;
    fetch('/api/content/whats-new')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && Array.isArray(data)) setWhatsNewList(data);
      })
      .catch(() => {});

    fetch('/api/content/call-for-papers')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && Array.isArray(data)) setCfpList(data);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="iias-page-shell">
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Authenticating IIAS Portal Access...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const isAdmin = user.role === 'admin';

  // Add What's New item
  const handleAddWhatsNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate.trim() || !token) return;
    setWhatsNewStatus('');
    try {
      const res = await fetch('/api/admin/whats-new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: newDate.trim(),
          title: newTitle.trim(),
          isNew: newIsNew,
        }),
      });
      if (!res.ok) throw new Error('Failed to post announcement');
      const updatedList = await res.json();
      setWhatsNewList(updatedList);
      setNewTitle('');
      setNewDate('');
      setWhatsNewStatus('✅ Announcement posted successfully to the Home Page What’s New Corner!');
    } catch (err) {
      setWhatsNewStatus(err instanceof Error ? `⚠️ ${err.message}` : 'Error posting announcement');
    }
  };

  // Delete What's New item
  const handleDeleteWhatsNew = async (id: number) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/whats-new/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete announcement');
      const updatedList = await res.json();
      setWhatsNewList(updatedList);
      setWhatsNewStatus('✅ Announcement removed from Home Page.');
    } catch (err) {
      setWhatsNewStatus(err instanceof Error ? `⚠️ ${err.message}` : 'Error deleting item');
    }
  };

  // Add/Update Call for Papers
  const handleAddCfp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cfpTitle.trim() || !cfpDesc.trim() || !token) return;
    setCfpStatus('');
    try {
      const res = await fetch('/api/admin/call-for-papers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          badge: cfpBadge.trim(),
          title: cfpTitle.trim(),
          description: cfpDesc.trim(),
          deadline: cfpDeadline.trim(),
          wordLimit: cfpWordLimit.trim(),
          email: cfpEmail.trim(),
        }),
      });
      if (!res.ok) throw new Error('Failed to update Call for Papers');
      const updatedList = await res.json();
      setCfpList(updatedList);
      setCfpTitle('');
      setCfpDesc('');
      setCfpStatus('✅ Call for Papers announcement updated successfully on Home Page!');
    } catch (err) {
      setCfpStatus(err instanceof Error ? `⚠️ ${err.message}` : 'Error updating Call for Papers');
    }
  };

  // Delete Call for Papers item
  const handleDeleteCfp = async (id: number) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/call-for-papers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete Call for Papers');
      const updatedList = await res.json();
      setCfpList(updatedList);
      setCfpStatus('✅ Call for Papers entry deleted.');
    } catch (err) {
      setCfpStatus(err instanceof Error ? `⚠️ ${err.message}` : 'Error deleting item');
    }
  };

  // Admin filter calculation
  const filteredUsers = adminUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalEmployees = adminUsers.filter((u) => u.role === 'employee').length;
  const totalFellows = adminUsers.filter((u) => u.role === 'research_fellow').length;
  const totalAdmins = adminUsers.filter((u) => u.role === 'admin').length;

  const handleMonographSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!monographTitle.trim()) return;
    setMonographStatus(`Research project proposal "${monographTitle}" submitted successfully for Academic Committee review.`);
    setMonographTitle('');
  };

  return (
    <div className="iias-page-shell">
      <Navbar />

      <main className="iias-main-content bg-sandstone">
        <section className="dashboard-hero-header">
          <div className="section-container">
            <div className="dashboard-profile-banner">
              <div className="profile-badge-avatar">
                {isAdmin ? '🛡️' : user.role === 'research_fellow' ? '🎓' : '🏛️'}
              </div>
              <div className="profile-info">
                <h2>Welcome, {user.name}</h2>
                <div className="profile-meta-tags">
                  <span className="role-tag">{user.role.toUpperCase()}</span>
                  {user.department && <span className="dept-tag">Department: {user.department}</span>}
                  {user.category && <span className="dept-tag">Fellowship: {user.category}</span>}
                  <span className="email-tag">✉️ {user.email}</span>
                </div>
              </div>
              <div className="profile-actions">
                <button className="btn btn-outline-danger" onClick={logout}>
                  🔒 Sign Out
                </button>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="dashboard-tab-bar">
              <button
                className={`dash-tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                📊 Portal Overview
              </button>
              <button
                className={`dash-tab ${activeTab === 'research' ? 'active' : ''}`}
                onClick={() => setActiveTab('research')}
              >
                📝 Academic Workspace
              </button>
              <button
                className={`dash-tab ${activeTab === 'library' ? 'active' : ''}`}
                onClick={() => setActiveTab('library')}
              >
                🪪 Digital Library Pass
              </button>
              {isAdmin && (
                <>
                  <button
                    className={`dash-tab ${activeTab === 'whatsnew' ? 'active' : ''}`}
                    onClick={() => setActiveTab('whatsnew')}
                  >
                    📢 Edit What's New ({whatsNewList.length})
                  </button>
                  <button
                    className={`dash-tab ${activeTab === 'cfp' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cfp')}
                  >
                    ✍️ Edit Call for Papers ({cfpList.length})
                  </button>
                  <button
                    className={`dash-tab ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                  >
                    ⚙️ User Management ({adminUsers.length})
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Dashboard Content Body */}
        <section className="heritage-section">
          <div className="section-container">
            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="dashboard-grid-2">
                <div className="dash-card">
                  <h3>🏛️ IIAS Institutional Announcements</h3>
                  <div className="notice-list">
                    {whatsNewList.slice(0, 4).map((item) => (
                      <div key={item.id} className="notice-item">
                        <span className="date-badge">{item.date}</span>
                        <div>
                          <strong>{item.title}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="dash-card">
                  <h3>👤 Account Summary</h3>
                  <div className="account-details-list">
                    <p><strong>Account Name:</strong> {user.name}</p>
                    <p><strong>Registered Email:</strong> {user.email}</p>
                    <p><strong>Assigned Role:</strong> {user.role}</p>
                    <p><strong>Classification:</strong> {user.department || user.category || 'General Member'}</p>
                    <p><strong>System Status:</strong> <span className="status-active">Active Verified Member</span></p>
                  </div>
                  {isAdmin && (
                    <div className="admin-quick-summary" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button className="btn btn-gold-sm" onClick={() => setActiveTab('whatsnew')}>
                        📢 Manage What's New →
                      </button>
                      <button className="btn btn-gold-sm" onClick={() => setActiveTab('cfp')}>
                        ✍️ Manage Call for Papers →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Research Workspace */}
            {activeTab === 'research' && (
              <div className="dash-card">
                <h3>📝 Research Monograph & Proposal Submission</h3>
                <p>Submit project proposals or chapter drafts for Academic Committee evaluation.</p>

                <form onSubmit={handleMonographSubmit} className="monograph-form">
                  <div className="form-group">
                    <label>Monograph / Research Project Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Cultural Hermeneutics of Himalayan Manuscripts"
                      value={monographTitle}
                      onChange={(e) => setMonographTitle(e.target.value)}
                      required
                      className="dash-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Thrust Research Domain</label>
                    <select
                      value={monographDomain}
                      onChange={(e) => setMonographDomain(e.target.value)}
                      className="dash-input"
                    >
                      <option value="Philosophy">Philosophy & Religion</option>
                      <option value="History">History & Archival Records</option>
                      <option value="Literature">Literature & Linguistics</option>
                      <option value="Social Sciences">Sociology & Political Science</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-gold">
                    Submit Proposal
                  </button>
                </form>

                {monographStatus && (
                  <div className="alert-success-box" style={{ marginTop: '1rem' }}>
                    ✅ {monographStatus}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Digital Library Pass */}
            {activeTab === 'library' && (
              <div className="dash-card center-card">
                <h3>🪪 IIAS Heritage Library Digital Pass</h3>
                <div className="digital-library-pass">
                  <div className="pass-header">
                    <span className="pass-inst">INDIAN INSTITUTE OF ADVANCED STUDY</span>
                    <span className="pass-title">LIBRARY CONSULTATION PASS</span>
                  </div>
                  <div className="pass-body">
                    <div className="pass-photo-box">👤</div>
                    <div className="pass-details">
                      <h4>{user.name}</h4>
                      <p>ID: IIAS-2026-00{user.id}</p>
                      <p>Role: {user.role.toUpperCase()}</p>
                      <p>Affiliation: {user.department || user.category || 'Resident Scholar'}</p>
                    </div>
                  </div>
                  <div className="pass-barcode">
                    ||||| ||| ||||||| |||| |||||| ||||||
                  </div>
                </div>
                <button className="btn btn-gold-sm" style={{ marginTop: '1rem' }} onClick={() => window.print()}>
                  🖨️ Print Digital Pass
                </button>
              </div>
            )}

            {/* Admin Tab: Edit What's New Corner */}
            {activeTab === 'whatsnew' && isAdmin && (
              <div className="dash-card">
                <h3>📢 Edit Home Page "What's New Corner"</h3>
                <p>Post new announcements or remove outdated items. Changes immediately update the live Home Page.</p>

                <form onSubmit={handleAddWhatsNew} className="monograph-form" style={{ marginBottom: '2rem' }}>
                  <div className="form-group">
                    <label>Announcement Title / Headline</label>
                    <input
                      type="text"
                      placeholder="e.g. Call for Applications: Associate Fellowships 2026"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="dash-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Date Label</label>
                    <input
                      type="text"
                      placeholder="e.g. JULY 25, 2026"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      required
                      className="dash-input"
                    />
                  </div>

                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      id="isNewCheck"
                      checked={newIsNew}
                      onChange={(e) => setNewIsNew(e.target.checked)}
                    />
                    <label htmlFor="isNewCheck" style={{ margin: 0, cursor: 'pointer' }}>
                      Highlight with red "NEW" blinking badge
                    </label>
                  </div>

                  <button type="submit" className="btn btn-gold">
                    ➕ Post Announcement to Home Page
                  </button>
                </form>

                {whatsNewStatus && <p className="status-msg" style={{ marginBottom: '1rem' }}>{whatsNewStatus}</p>}

                <h4>Active What's New Announcements ({whatsNewList.length})</h4>
                <div className="table-responsive" style={{ marginTop: '0.75rem' }}>
                  <table className="iias-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Announcement Headline</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {whatsNewList.map((item) => (
                        <tr key={item.id}>
                          <td><strong>{item.date}</strong></td>
                          <td>{item.title}</td>
                          <td>{item.isNew ? <span className="blinking-new-tag">NEW</span> : 'Standard'}</td>
                          <td>
                            <button
                              className="btn-delete-sm"
                              onClick={() => handleDeleteWhatsNew(item.id)}
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Admin Tab: Edit Call for Papers */}
            {activeTab === 'cfp' && isAdmin && (
              <div className="dash-card">
                <h3>✍️ Edit Home Page "Call for Papers" Section</h3>
                <p>Update research paper invitations, submission deadlines, and journal submission emails.</p>

                <form onSubmit={handleAddCfp} className="monograph-form" style={{ marginBottom: '2rem' }}>
                  <div className="form-group">
                    <label>Badge / Subtitle Label</label>
                    <input
                      type="text"
                      placeholder="e.g. Journal Volume 2026"
                      value={cfpBadge}
                      onChange={(e) => setCfpBadge(e.target.value)}
                      className="dash-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Journal / Submission Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Summer Hill: IIAS Review & Studies in Humanities"
                      value={cfpTitle}
                      onChange={(e) => setCfpTitle(e.target.value)}
                      required
                      className="dash-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Call for Papers Description</label>
                    <textarea
                      rows={3}
                      placeholder="Enter submission call description..."
                      value={cfpDesc}
                      onChange={(e) => setCfpDesc(e.target.value)}
                      required
                      className="dash-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Submission Deadline Date</label>
                    <input
                      type="text"
                      placeholder="e.g. August 31, 2026"
                      value={cfpDeadline}
                      onChange={(e) => setCfpDeadline(e.target.value)}
                      className="dash-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Word Count Limit & Guidelines</label>
                    <input
                      type="text"
                      placeholder="e.g. 6,000 – 8,000 words"
                      value={cfpWordLimit}
                      onChange={(e) => setCfpWordLimit(e.target.value)}
                      className="dash-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Submission Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. publications@iias.ac.in"
                      value={cfpEmail}
                      onChange={(e) => setCfpEmail(e.target.value)}
                      className="dash-input"
                    />
                  </div>

                  <button type="submit" className="btn btn-gold">
                    💾 Save Call for Papers to Home Page
                  </button>
                </form>

                {cfpStatus && <p className="status-msg" style={{ marginBottom: '1rem' }}>{cfpStatus}</p>}

                <h4>Current Call for Papers ({cfpList.length})</h4>
                <div className="table-responsive" style={{ marginTop: '0.75rem' }}>
                  <table className="iias-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Deadline</th>
                        <th>Submission Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cfpList.map((item) => (
                        <tr key={item.id}>
                          <td><strong>{item.title}</strong></td>
                          <td>{item.deadline}</td>
                          <td>{item.email}</td>
                          <td>
                            <button
                              className="btn-delete-sm"
                              onClick={() => handleDeleteCfp(item.id)}
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Admin Tab: User Management */}
            {activeTab === 'users' && isAdmin && (
              <div className="dash-card">
                <div className="admin-header-flex">
                  <div>
                    <h3>⚙️ System User Management Panel</h3>
                    <p>Live registry of registered employees, fellows, and administrators.</p>
                  </div>
                </div>

                {/* Stats cards */}
                <div className="admin-stats-row">
                  <div className="stat-box">
                    <span className="stat-val">{adminUsers.length}</span>
                    <span className="stat-lbl">Total Users</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-val">{totalEmployees}</span>
                    <span className="stat-lbl">Employees</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-val">{totalFellows}</span>
                    <span className="stat-lbl">Research Fellows</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-val">{totalAdmins}</span>
                    <span className="stat-lbl">Admins</span>
                  </div>
                </div>

                {/* Filter Controls */}
                <div className="admin-filter-bar">
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="dash-search-input"
                  />
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="dash-filter-select"
                  >
                    <option value="all">All Roles</option>
                    <option value="employee">Employees</option>
                    <option value="research_fellow">Research Fellows</option>
                    <option value="admin">Administrators</option>
                  </select>
                </div>

                {userFetchError && <p className="error-msg">⚠️ {userFetchError}</p>}
                {fetchingUsers && <p className="loading-text">Fetching live database users...</p>}

                {/* Users Table */}
                {!fetchingUsers && (
                  <div className="table-responsive" style={{ marginTop: '1rem' }}>
                    <table className="iias-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Full Name</th>
                          <th>Email Address</th>
                          <th>Role</th>
                          <th>Dept / Category</th>
                          <th>Date Registered</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.length === 0 ? (
                          <tr>
                            <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                              No users match the search criteria.
                            </td>
                          </tr>
                        ) : (
                          filteredUsers.map((u) => (
                            <tr key={u.id}>
                              <td>#{u.id}</td>
                              <td><strong>{u.name}</strong></td>
                              <td>{u.email}</td>
                              <td>
                                <span className={`table-role-badge ${u.role}`}>
                                  {u.role}
                                </span>
                              </td>
                              <td>{u.department || u.category || '-'}</td>
                              <td>{u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
