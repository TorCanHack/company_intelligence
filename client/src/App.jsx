import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import StartPage from './pages/StartPage';
import HomePage from './pages/HomePage';
import Watchlist from './pages/Watchlist';
import Signals from './pages/Signals';
import DirectoryPage from './pages/DirectoryPage';
import CompanyProfilePage from './pages/CompanyProfilePage';

function AppLayout() {
  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in" element={<StartPage />} />
      <Route path="/signup" element={<StartPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/watchlist" element={<Watchlist />} />
      <Route path="/signals" element={<Signals />} />
      <Route element={<AppLayout />}>
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/companies/:slug" element={<CompanyProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
