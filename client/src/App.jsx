import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StartPage from './pages/StartPage';
import HomePage from './pages/HomePage';
import Watchlist from './pages/Watchlist';
import Signals from './pages/Signals';
import AccountPage from './pages/AccountPage';
import DirectoryPage from './pages/DirectoryPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in" element={<StartPage />} />
      <Route path="/signup" element={<StartPage />} />
      <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
      <Route path="/watchlist" element={<RequireAuth><Watchlist /></RequireAuth>} />
      <Route path="/signals" element={<RequireAuth><Signals /></RequireAuth>} />
      <Route path="/account" element={<RequireAuth><AccountPage /></RequireAuth>} />
      <Route path="/directory" element={<RequireAuth><DirectoryPage /></RequireAuth>} />
      <Route path="/companies/:slug" element={<RequireAuth><CompanyProfilePage /></RequireAuth>} />
    </Routes>
  );
}

export default App;
