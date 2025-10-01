import React, { useState, useRef, useEffect } from 'react';
import {
    applyColorBlindnessFilter,
    getColorBlindnessInfo,
    getAvailableTypes
} from '../utils/colorVisionSimulation';
import {
    applyBlurVision,
    applyCataractVision,
    applyLowContrast,
    applyTunnelVision,
    applyMacularDegeneration,
    applyDiabeticRetinopathy,
    getLowVisionInfo,
    applyMagnifier
} from '../utils/lowVisionSimulation';
import './VisionSimulator.css';
import { Eye, Upload, Loader, Info, ZoomIn } from 'lucide-react';

const VisionSimulator = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [simulationType, setSimulationType] = useState('normal');
    const [simulationCategory, setSimulationCategory] = useState('color');
    const [intensity, setIntensity] = useState(0.5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [magnifierActive, setMagnifierActive] = useState(false);
    const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });

    const canvasRef = useRef(null);
    const originalImageRef = useRef(null);
    const fileInputRef = useRef(null);

    // Color blindness types
    const colorBlindnessTypes = [
        'normal', 'protanopia', 'deuteranopia', 'tritanopia',
        'protanomaly', 'deuteranomaly', 'tritanomaly', 'achromatopsia'
    ];

    // Low vision types
    const lowVisionTypes = [
        'blur', 'cataract', 'lowContrast', 'tunnelVision',
        'macularDegeneration', 'diabeticRetinopathy'
    ];

    // Load image from URL
    const loadImageFromUrl = async () => {
        if (!imageUrl) {
            setError('Please enter a URL');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // For demo purposes, we'll use a proxy or fetch the image
            // In production, you'd want to handle CORS properly
            const response = await fetch(`http://localhost:5000/api/screenshot/capture`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: imageUrl })
            });

            const data = await response.json();

            if (data.success) {
                loadImageToCanvas(data.screenshot);
            } else {
                setError('Failed to load image from URL');
            }
        } catch (err) {
            console.error('Error loading image:', err);
    
            // More helpful error message
            if (err.message && err.message.includes('Failed to fetch')) {
                setError('Cannot connect to backend. Make sure the server is running on port 5000.');
            } else {
                setError('Failed to load image. This website may block automated browsers. Try uploading a screenshot instead.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Load image from file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            loadImageToCanvas(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    // Load image to canvas
    const loadImageToCanvas = (imageSrc) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            originalImageRef.current = img;
            const canvas = canvasRef.current;
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Apply current simulation
            applySimulation();
        };

        img.onerror = () => {
            setError('Failed to load image');
        };

        img.src = imageSrc;
    };

    // Apply simulation based on current settings
    const applySimulation = () => {
        if (!originalImageRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let resultCanvas;

        if (simulationCategory === 'color') {
            // Apply color blindness simulation
            resultCanvas = applyColorBlindnessFilter(originalImageRef.current, simulationType);
        } else {
            // Apply low vision simulation
            switch (simulationType) {
                case 'blur':
                    resultCanvas = applyBlurVision(originalImageRef.current, intensity * 10);
                    break;
                case 'cataract':
                    resultCanvas = applyCataractVision(originalImageRef.current, intensity);
                    break;
                case 'lowContrast':
                    resultCanvas = applyLowContrast(originalImageRef.current, intensity);
                    break;
                case 'tunnelVision':
                    resultCanvas = applyTunnelVision(originalImageRef.current, 1 - intensity);
                    break;
                case 'macularDegeneration':
                    resultCanvas = applyMacularDegeneration(originalImageRef.current, intensity);
                    break;
                case 'diabeticRetinopathy':
                    resultCanvas = applyDiabeticRetinopathy(originalImageRef.current, intensity);
                    break;
                default:
                    ctx.drawImage(originalImageRef.current, 0, 0);
                    return;
            }
        }

        // Draw result to main canvas
        ctx.drawImage(resultCanvas, 0, 0);
    };

    // Handle magnifier
    const handleMouseMove = (e) => {
        if (!magnifierActive) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMagnifierPos({ x, y });

        // Reapply simulation and add magnifier
        applySimulation();
        applyMagnifier(canvas, x, y, 100, 2);
    };

    // Effect to reapply simulation when settings change
    useEffect(() => {
        applySimulation();
    }, [simulationType, simulationCategory, intensity]);

    // Get current simulation info
    const getCurrentSimulationInfo = () => {
        if (simulationCategory === 'color') {
            return getColorBlindnessInfo(simulationType);
        } else {
            return getLowVisionInfo(simulationType);
        }
    };

    const simulationInfo = getCurrentSimulationInfo();

    return (
        <div className="vision-simulator">
            <div className="simulator-header">
                <h2>Vision Simulation Tool</h2>
                <p>Experience how people with different vision conditions see your website</p>
            </div>

            <div className="simulator-controls">
                <div className="input-section">
                    <div className="url-input-group">
                        <input
                            type="text"
                            placeholder="Enter website URL (e.g., https://example.com)"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && loadImageFromUrl()}
                        />
                        <button onClick={loadImageFromUrl} disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <Eye size={18} />
                                    Load URL
                                </>
                            )}
                        </button>
                    </div>

                    <div className="file-upload-group">
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                        <button onClick={() => fileInputRef.current.click()}>
                            <Upload size={18} />
                            Upload Screenshot
                        </button>
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="simulation-controls">
                    <div className="control-group">
                        <label>Simulation Category:</label>
                        <div className="button-group">
                            <button
                                className={simulationCategory === 'color' ? 'active' : ''}
                                onClick={() => {
                                    setSimulationCategory('color');
                                    setSimulationType('normal');
                                }}
                            >
                                Color Vision
                            </button>
                            <button
                                className={simulationCategory === 'lowVision' ? 'active' : ''}
                                onClick={() => {
                                    setSimulationCategory('lowVision');
                                    setSimulationType('blur');
                                }}
                            >
                                Low Vision
                            </button>
                        </div>
                    </div>

                    <div className="control-group">
                        <label>Simulation Type:</label>
                        <select
                            value={simulationType}
                            onChange={(e) => setSimulationType(e.target.value)}
                        >
                            {simulationCategory === 'color'
                                ? colorBlindnessTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {getColorBlindnessInfo(type).name}
                                    </option>
                                ))
                                : lowVisionTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {getLowVisionInfo(type).name || type}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {simulationCategory === 'lowVision' && (
                        <div className="control-group">
                            <label>Intensity: {(intensity * 100).toFixed(0)}%</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={intensity}
                                onChange={(e) => setIntensity(parseFloat(e.target.value))}
                            />
                        </div>
                    )}

                    <div className="control-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={magnifierActive}
                                onChange={(e) => setMagnifierActive(e.target.checked)}
                            />
                            Enable Magnifier (hover over image)
                        </label>
                    </div>
                </div>
            </div>

            <div className="simulator-content">
                <div className="canvas-container">
                    <canvas
                        ref={canvasRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => magnifierActive && applySimulation()}
                    />
                    {!originalImageRef.current && (
                        <div className="canvas-placeholder">
                            <p>Load a website URL or upload a screenshot to begin simulation</p>
                        </div>
                    )}
                </div>

                {simulationInfo && originalImageRef.current && (
                    <div className="simulation-info">
                        <h3>{simulationInfo.name}</h3>
                        <p>{simulationInfo.description}</p>
                        {simulationInfo.prevalence && (
                            <p><strong>Prevalence:</strong> {simulationInfo.prevalence}</p>
                        )}
                        {simulationInfo.affectedColors && simulationInfo.affectedColors.length > 0 && (
                            <p><strong>Affected Colors:</strong> {simulationInfo.affectedColors.join(', ')}</p>
                        )}
                        {simulationInfo.characteristics && (
                            <div>
                                <strong>Characteristics:</strong>
                                <ul>
                                    {simulationInfo.characteristics.map((char, idx) => (
                                        <li key={idx}>{char}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VisionSimulator;
