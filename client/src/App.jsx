import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StartPage from './pages/StartPage';
import HomePage from './pages/HomePage';
import Watchlist from './pages/Watchlist';
import Signals from './pages/Signals';
import AccountPage from './pages/AccountPage';
import DirectoryPage from './pages/DirectoryPage';
import CompanyProfilePage from './pages/CompanyProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in" element={<StartPage />} />
      <Route path="/signup" element={<StartPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/signals" element={<Signals />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/directory" element={<DirectoryPage />} />
      <Route path="/companies/:slug" element={<CompanyProfilePage />} />
    </Routes>
  );
}

export default App;
