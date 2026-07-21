import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="dashboard-shell">
      <div className="dashboard-card">
        <h1>Welcome, {user.name}</h1>
        <p>You are logged in as <strong>{user.role}</strong>.</p>
        <p>{user.department ? `Department: ${user.department}` : `Category: ${user.category}`}</p>
        <button className="submit-btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
