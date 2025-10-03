import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import {
    Eye, Activity, BarChart3, Zap, Shield, Users,
    ArrowRight, CheckCircle, Sparkles
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Home.css';

const Home = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content fade-in">
                        <h1 className="hero-title">
                            Make Your Website
                            <span className="gradient"> Accessible</span>
                            <br />For Everyone
                        </h1>
                        <p className="hero-subtitle">
                            Comprehensive accessibility analysis, vision simulations, and actionable insights
                            to ensure your website meets WCAG standards.
                        </p>
                        <div className="hero-actions">
                            <Link to="/analyzer" className="btn-primary">
                                <Activity size={20} />
                                Start Analyzing
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/simulator" className="btn-secondary">
                                <Eye size={20} />
                                Try Simulator
                            </Link>
                        </div>
                    </div>

                    <div className="hero-visual fade-in">
                        <div className="feature-box box-1">
                            <Eye size={32} />
                            <h4>Vision Simulator</h4>
                            <p>14 types</p>
                        </div>
                        <div className="feature-box box-2">
                            <Activity size={32} />
                            <h4>WCAG Analysis</h4>
                            <p>100+ checks</p>
                        </div>
                        <div className="feature-box box-3">
                            <BarChart3 size={32} />
                            <h4>Reports</h4>
                            <p>Export & share</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <div className="section-header fade-in">
                        <h2>Powerful Features</h2>
                        <p>Everything you need to build accessible websites</p>
                    </div>

                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={24}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        navigation={true}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                        className="features-slider"
                    >
                        <SwiperSlide>
                            <div className="feature-card">
                                <div className="icon-wrapper">
                                    <Activity size={32} />
                                </div>
                                <h3>Comprehensive Analysis</h3>
                                <p>Scan your website for WCAG 2.1 AAA compliance with detailed reports.</p>
                                <ul>
                                    <li><CheckCircle size={16} /> Color contrast checking</li>
                                    <li><CheckCircle size={16} /> Semantic HTML validation</li>
                                    <li><CheckCircle size={16} /> ARIA attributes review</li>
                                </ul>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="feature-card">
                                <div className="icon-wrapper">
                                    <Eye size={32} />
                                </div>
                                <h3>Vision Simulations</h3>
                                <p>See your website through different vision conditions.</p>
                                <ul>
                                    <li><CheckCircle size={16} /> 8 color blindness types</li>
                                    <li><CheckCircle size={16} /> 6 low vision conditions</li>
                                    <li><CheckCircle size={16} /> Real-time preview</li>
                                </ul>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="feature-card">
                                <div className="icon-wrapper">
                                    <BarChart3 size={32} />
                                </div>
                                <h3>Detailed Reports</h3>
                                <p>Get actionable insights with prioritized fixes.</p>
                                <ul>
                                    <li><CheckCircle size={16} /> PDF/CSV export</li>
                                    <li><CheckCircle size={16} /> Historical tracking</li>
                                    <li><CheckCircle size={16} /> Team collaboration</li>
                                </ul>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="feature-card">
                                <div className="icon-wrapper">
                                    <Zap size={32} />
                                </div>
                                <h3>Fast & Accurate</h3>
                                <p>Powered by industry-leading tools for reliable results.</p>
                                <ul>
                                    <li><CheckCircle size={16} /> Axe-core integration</li>
                                    <li><CheckCircle size={16} /> Real browser testing</li>
                                    <li><CheckCircle size={16} /> Instant feedback</li>
                                </ul>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="feature-card">
                                <div className="icon-wrapper">
                                    <Shield size={32} />
                                </div>
                                <h3>Privacy First</h3>
                                <p>Your data stays secure with enterprise-grade protection.</p>
                                <ul>
                                    <li><CheckCircle size={16} /> No data storage</li>
                                    <li><CheckCircle size={16} /> Encrypted connections</li>
                                    <li><CheckCircle size={16} /> GDPR compliant</li>
                                </ul>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="feature-card">
                                <div className="icon-wrapper">
                                    <Users size={32} />
                                </div>
                                <h3>Team Collaboration</h3>
                                <p>Work together to improve accessibility.</p>
                                <ul>
                                    <li><CheckCircle size={16} /> Shared workspaces</li>
                                    <li><CheckCircle size={16} /> Role-based access</li>
                                    <li><CheckCircle size={16} /> Activity tracking</li>
                                </ul>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>

            {/* Demo Section */}
            <section className="demo">
                <div className="container">
                    <div className="section-header fade-in">
                        <h2>See It In Action</h2>
                        <p>Explore our powerful tools and intuitive interface</p>
                    </div>

                    <div className="demo-grid">
                        <div className="demo-item fade-in">
                            <div className="demo-info">
                                <span className="badge">Analyzer</span>
                                <h3>Accessibility Analysis</h3>
                                <p>Scan websites for WCAG compliance with detailed violation reports and fix suggestions.</p>
                                <Link to="/analyzer" className="link-btn">
                                    Try Analyzer <ArrowRight size={18} />
                                </Link>
                            </div>
                            <div className="demo-preview">
                                <div className="preview-card">
                                    <div className="preview-header">
                                        <div className="dots">
                                            <span></span><span></span><span></span>
                                        </div>
                                        <span>Accessibility Report</span>
                                    </div>
                                    <div className="preview-body">
                                        <Activity size={48} />
                                        <div className="preview-stats">
                                            <div><strong>23</strong><span>Issues</span></div>
                                            <div><strong>87%</strong><span>Score</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="demo-item fade-in">
                            <div className="demo-info">
                                <span className="badge">Simulator</span>
                                <h3>Vision Simulations</h3>
                                <p>Experience your website through different vision conditions including color blindness.</p>
                                <Link to="/simulator" className="link-btn">
                                    Try Simulator <ArrowRight size={18} />
                                </Link>
                            </div>
                            <div className="demo-preview">
                                <div className="preview-card">
                                    <div className="preview-header">
                                        <div className="dots">
                                            <span></span><span></span><span></span>
                                        </div>
                                        <span>Vision Simulator</span>
                                    </div>
                                    <div className="preview-body">
                                        <Eye size={48} />
                                        <div className="preview-chips">
                                            <span>Protanopia</span>
                                            <span>Deuteranopia</span>
                                            <span>Cataracts</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content fade-in">
                        <Sparkles size={48} className="cta-icon" />
                        <h2>Ready to Make Your Website Accessible?</h2>
                        <p>Join thousands of developers building inclusive web experiences</p>
                        <div className="cta-actions">
                            <Link to="/signup" className="btn-primary">
                                Get Started Free
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/analyzer" className="btn-secondary">
                                Try Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
