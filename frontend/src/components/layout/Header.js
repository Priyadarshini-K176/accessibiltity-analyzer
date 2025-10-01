import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Eye, Activity, BarChart3, User, LogIn } from 'lucide-react';
import './Header.css';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/analyzer', label: 'Analyzer', icon: Activity },
        { path: '/simulator', label: 'Simulator', icon: Eye },
        { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`} role="banner">
            <div className="header-container">
                {/* Logo */}
                <Link to="/" className="logo" aria-label="Accessibility Analyzer Home">
                    <Eye className="logo-icon" size={32} aria-hidden="true" />
                    <span className="logo-text">
                        Accessibility<span className="logo-highlight">Analyzer</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="desktop-nav" aria-label="Main navigation">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                            aria-current={isActive(link.path) ? 'page' : undefined}
                        >
                            {link.icon && <link.icon size={18} aria-hidden="true" />}
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Auth Buttons */}
                {/* Theme Toggle & Auth Buttons */}
                <div className="header-actions">
                    <ThemeToggle />

                    <div className="auth-buttons">
                        <Link to="/login" className="btn-secondary">
                            <LogIn size={18} aria-hidden="true" />
                            <span>Login</span>
                        </Link>
                        <Link to="/signup" className="btn-primary">
                            <User size={18} aria-hidden="true" />
                            <span>Sign Up</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
          
            {isMobileMenuOpen && (
                <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation">
                    {/* Theme Toggle for Mobile */}
                    <div className="mobile-theme-toggle">
                        <ThemeToggle />
                    </div>

                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-current={isActive(link.path) ? 'page' : undefined}
                        >
                            {link.icon && <link.icon size={18} aria-hidden="true" />}
                            {link.label}
                        </Link>
                    ))}
                    <div className="mobile-auth">
                        <Link to="/login" className="btn-secondary" onClick={() => setIsMobileMenuOpen(false)}>
                            <span>Login</span>
                        </Link>
                        <Link to="/signup" className="btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
                            <span>Sign Up</span>
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default Header;