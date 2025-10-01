import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import VisionSimulator from './components/VisionSimulator';
import './App.css';

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
              <Route 
                path="/" 
                element={
                  <div style={{padding: '100px 20px', textAlign: 'center', color: 'var(--text-primary)'}}>
                    <h1>Home Page Coming Soon</h1>
                    <p>Header and Footer are working!</p>
                  </div>
                } 
              />
              <Route 
                path="/analyzer" 
                element={
                  <div style={{padding: '100px 20px', textAlign: 'center', color: 'var(--text-primary)'}}>
                    <h1>Analyzer Page Coming Soon</h1>
                  </div>
                } 
              />
              <Route path="/simulator" element={<VisionSimulator />} />
              <Route 
                path="/dashboard" 
                element={
                  <div style={{padding: '100px 20px', textAlign: 'center', color: 'var(--text-primary)'}}>
                    <h1>Dashboard Page Coming Soon</h1>
                  </div>
                } 
              />
              <Route 
                path="/login" 
                element={
                  <div style={{padding: '100px 20px', textAlign: 'center', color: 'var(--text-primary)'}}>
                    <h1>Login Page Coming Soon</h1>
                  </div>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <div style={{padding: '100px 20px', textAlign: 'center', color: 'var(--text-primary)'}}>
                    <h1>Signup Page Coming Soon</h1>
                  </div>
                } 
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;