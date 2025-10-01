import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Eye size={32} aria-hidden="true" />
              <span>AccessibilityAnalyzer</span>
            </div>
            <p className="footer-tagline">
              Making the web accessible for everyone, one website at a time.
            </p>
            <div className="footer-social" role="navigation" aria-label="Social media links">
              <a 
                href="https://github.com/Priyadarshini-K176/accessibility-analyzer" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit our GitHub repository"
              >
                <Github size={20} aria-hidden="true" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Twitter"
              >
                <Twitter size={20} aria-hidden="true" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
              <a 
                href="mailto:support@accessibilityanalyzer.com" 
                aria-label="Email us at support@accessibilityanalyzer.com"
              >
                <Mail size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer-links">
            <nav className="footer-column" aria-labelledby="product-heading">
              <h4 id="product-heading">Product</h4>
              <Link to="/analyzer">Analyzer</Link>
              <Link to="/simulator">Simulator</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/pricing">Pricing</Link>
            </nav>

            <nav className="footer-column" aria-labelledby="resources-heading">
              <h4 id="resources-heading">Resources</h4>
              <Link to="/docs">Documentation</Link>
              <Link to="/guides">Guides</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/api">API</Link>
            </nav>

            <nav className="footer-column" aria-labelledby="company-heading">
              <h4 id="company-heading">Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/press">Press Kit</Link>
            </nav>

            <nav className="footer-column" aria-labelledby="legal-heading">
              <h4 id="legal-heading">Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
              <Link to="/security">Security</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} AccessibilityAnalyzer. All rights reserved.
          </p>
          <p className="footer-made-with">
            Made with <Heart size={14} className="heart-icon" aria-hidden="true" /> for a more accessible web
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;