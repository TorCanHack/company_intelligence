import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import StartPage from './pages/StartPage';
import DirectoryPage from './pages/DirectoryPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import SignInPage from './pages/SignInPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/directory" element={<DirectoryPage />} />
          <Route path="/companies/:slug" element={<CompanyProfilePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
