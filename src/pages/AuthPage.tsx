import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const roleOptions = [
  { value: 'employee', label: 'Employee' },
  { value: 'research_fellow', label: 'Research Fellow' },
];

const fellowCategories = ['National Fellow', 'Tagore Fellow', 'Fellow', 'Associate'];
const employeeDepartments = ['Admin', 'Sales and Public Relations', 'Store and Supply', 'Estate Section', 'Horticulture', 'Library', 'Director Office'];

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    category: '',
    department: '',
  });
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await signup(form);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    }
  };

  return (
    <div className="iias-page-shell">
      <Navbar />

      <main className="iias-main-content bg-sandstone">
        <div className="auth-container-shell">
          <div className="auth-card-heritage">
            <div className="auth-header">
              <span className="section-eyebrow">PORTAL AUTHENTICATION</span>
              <h2>{mode === 'login' ? 'Staff & Fellow Sign In' : 'Register Portal Account'}</h2>
              <p>Access IIAS academic research tools, library passes, and administrative services.</p>
            </div>

            <div className="mode-toggle">
              <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
                Sign In
              </button>
              <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="auth-form-heritage">
              {mode === 'signup' && (
                <>
                  <div className="form-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Ananya Sharma"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Account Role</label>
                    <select
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value, category: '', department: '' })}
                    >
                      {roleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {form.role === 'research_fellow' ? (
                    <div className="form-field">
                      <label>Fellowship Scheme</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        required
                      >
                        <option value="">Select Fellow Category</option>
                        {fellowCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="form-field">
                      <label>Assigned Department</label>
                      <select
                        value={form.department}
                        onChange={(e) => setForm({ ...form, department: e.target.value })}
                        required
                      >
                        <option value="">Select Department</option>
                        {employeeDepartments.map((department) => (
                          <option key={department} value={department}>
                            {department}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              )}

              <div className="form-field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. user@iias.ac.in"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              {error && <p className="auth-error-msg">⚠️ {error}</p>}

              <button type="submit" className="btn btn-gold btn-block" style={{ marginTop: '1rem' }}>
                {mode === 'login' ? 'Sign In to Portal' : 'Register Account'}
              </button>
            </form>

            <div className="auth-footer-help">
              <p>Need help logging in? Contact Institute IT Support at <strong>admin@iias.ac.in</strong></p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
