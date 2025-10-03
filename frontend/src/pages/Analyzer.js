import React, { useState } from "react";
import './Analyzer.css';
import SeverityChart from '../components/SeverityChart';
import CategoryCards from '../components/CategoryCards';

const Analyzer = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [wcagLevel, setWcagLevel] = useState('AA'); // Default to AA
    const [aiChatOpen, setAiChatOpen] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    // Remove unused AI suggestion state and function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        if (!url || !url.trim()) {
            setError('Please enter a valid URL.');
            setLoading(false);
            return;
        }

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            setError('Please enter a valid URL.');
            setLoading(false);
            return;
        }


        //TODO : call API
        //TODO : Handle response
        try {
            const response = await fetch('http://localhost:5000/api/analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, wcagLevel }),
            });

            // Check if response is OK
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Backend error:', errorText);
                setError(`Backend error: ${response.status} - ${response.statusText}`);
                return;
            }

            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setResult(data);
            }
        } catch (error) {
            console.error('Error analyzing website:', error);
            setError(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;
    
        // Add user message to chat
        const newMessage = { role: 'user', content: userMessage };
        setChatMessages(prev => [...prev, newMessage]);
        setUserMessage('');
    
        try {
            // Call your AI endpoint
            const response = await fetch('http://localhost:5000/api/ai-suggestion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });
            
            const data = await response.json();
            
            // Add AI response to chat
            if (data.success) {
                setChatMessages(prev => [
                    ...prev,
                    { role: 'ai', content: data.suggestion }
                ]);
            }
        } catch (error) {
            console.error('AI Chat Error:', error);
            setChatMessages(prev => [
                ...prev,
                { 
                    role: 'ai', 
                    content: 'Sorry, I encountered an error. Please try again later.' 
                }
            ]);
        }
    };

    

    return (
        <div className="analyzer-page">
            <div className="container">
                <h1>Accessibility Analyzer</h1>

                <form onSubmit={handleSubmit}>
                    <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" />
                    <div className="wcag-selector">
                        <label>WCAG Level:</label>
                        <div className="radio-group">
                            <label>
                                <input type="radio" value="A" checked={wcagLevel === 'A'} onChange={(e) => setWcagLevel(e.target.value)} />
                                A
                            </label>
                            <label>
                                <input type="radio" value="AA" checked={wcagLevel === 'AA'} onChange={(e) => setWcagLevel(e.target.value)} />
                                AA
                            </label>
                            <label>
                                <input type="radio" value="AAA" checked={wcagLevel === 'AAA'} onChange={(e) => setWcagLevel(e.target.value)} />
                                AAA
                            </label>
                        </div>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Analyzing...' : 'Analyze Website'}
                    </button>
                </form>
                {loading && <div className="loading-message">🔄 Analyzing your website...</div>}
                {error && <div className="error-message">❌ {error}</div>}
                {result && (
                    <div className="results-section">
                        <div className="results-header">
                            <h2>Analysis Results</h2>
                            <p className="analyzed-url">Analyzed: {result.url}</p>
                        </div>

                        <div className="results-summary">
                            <div className="summary-card">
                                <span className="summary-number">{result.violations?.length || 0}</span>
                                <span className="summary-label">Issues Found</span>
                            </div>
                            <div className="summary-card">
                                <span className="summary-number">{result.passes?.length || 0}</span>
                                <span className="summary-label">Passed Checks</span>
                            </div>
                        </div>

                        <CategoryCards violations={result.violations || []} />

                        {result.violations && result.violations.length > 0 ? (
                            <div className="violations-list">


                                <h3>Accessibility Violations</h3>

                                {result.violations.map((violation, index) => (
                                    <div key={index} className="violation-card">
                                        <div className="violation-header">
                                            <span className={`severity-badge ${violation.impact}`}>
                                                {violation.impact}
                                            </span>
                                            <h4>{violation.help}</h4>
                                        </div>
                                        <p className="violation-description">{violation.description}</p>

                                        <div className="violation-actions">
                                            <a href={violation.helpUrl} target="_blank" rel="noopener noreferrer" className="learn-more">
                                                Learn more →
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-violations">
                                ✅ Great! No accessibility violations found!
                            </div>
                        )}
                    </div>
                )}

                {/* AI Chat Interface */}
                <div className={`ai-chat-container ${aiChatOpen ? 'visible' : ''}`}>
                    <div className="ai-chat-header">
                        <h4>AI Accessibility Assistant</h4>
                        <button onClick={() => setAiChatOpen(false)}>✕</button>
                    </div>
                    <div className="ai-chat-messages">
                        {chatMessages.length === 0 ? (
                            <div className="ai-welcome-message">
                                <p>Hello! I'm your AI Accessibility Assistant. I can help you understand and fix accessibility issues on this page.</p>
                                <p>Try asking me about any accessibility concerns or how to fix specific issues.</p>
                            </div>
                        ) : (
                            chatMessages.map((msg, i) => (
                                <div key={i} className={`chat-message ${msg.role}`}>
                                    {msg.content}
                                </div>
                            ))
                        )}
                    </div>
                    <div className="ai-chat-input">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Ask about accessibility issues..."
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={!userMessage.trim()}
                        >
                            Send
                        </button>
                    </div>
                </div>

                {/* AI Chat Toggle Button */}
                <button 
                    className="ai-chat-toggle" 
                    onClick={() => setAiChatOpen(!aiChatOpen)}
                    aria-label={aiChatOpen ? 'Close chat' : 'Open chat'}
                >
                    {aiChatOpen ? '✕' : '🤖'}
                </button>





            </div>
        </div>
    )
};

export default Analyzer;