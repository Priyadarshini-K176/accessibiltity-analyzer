import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import VisionSimulator from './components/VisionSimulator';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          {/* Skip Link for Keyboard Users */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          <Header />

          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analyzer" element={<Analyzer />} />
              <Route path="/simulator" element={<VisionSimulator />} />
              <Route
                path="/dashboard"
                element={
                  <div style={{ padding: '100px 20px', textAlign: 'center', color: 'var(--text-primary)' }}>
                    <h1>Dashboard Page Coming Soon</h1>
                  </div>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;