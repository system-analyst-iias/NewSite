import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LibraryPage from './pages/LibraryPage';
import AcademicsPage from './pages/AcademicsPage';
import PublicationsPage from './pages/PublicationsPage';
import AdministrationPage from './pages/AdministrationPage';
import TouristsPage from './pages/TouristsPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/administration" element={<AdministrationPage />} />
          <Route path="/tourists" element={<TouristsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
