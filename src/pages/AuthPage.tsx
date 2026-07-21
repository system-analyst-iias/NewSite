import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="auth-shell">
      <div className="auth-card">
        <h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p>Register as an employee or research fellow of the institute.</p>
        <div className="mode-toggle">
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
            Login
          </button>
          <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>
            Sign up
          </button>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <>
              <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value, category: '', department: '' })}>
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {form.role === 'research_fellow' ? (
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
                  <option value="">Select fellow category</option>
                  {fellowCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              ) : (
                <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required>
                  <option value="">Select department</option>
                  {employeeDepartments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              )}
            </>
          )}
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="submit-btn">{mode === 'login' ? 'Login' : 'Create account'}</button>
        </form>
      </div>
    </div>
  );
}
