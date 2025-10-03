import React from 'react';
import './CategoryCards.css';

const CategoryCards = ({ violations }) => {
    // Categorize violations by WCAG category
    const categories = {
        visual: { count: 0, icon: '👁️', color: '#ef4444' },
        auditory: { count: 0, icon: '🔊', color: '#10b981' },
        motor: { count: 0, icon: '🖱️', color: '#3b82f6' },
        cognitive: { count: 0, icon: '🧠', color: '#8b5cf6' }
    };

    // Map WCAG tags to categories
    // Map WCAG tags to categories
violations.forEach(violation => {
    const id = violation.id || '';
    const tags = violation.tags || [];
    let counted = false;

    // Visual issues (color, images, contrast)
    if (id.includes('color') || id.includes('contrast') || 
        id.includes('image') || id.includes('alt') ||
        tags.some(tag => tag.includes('color') || tag.includes('image'))) {
        categories.visual.count++;
        counted = true;
    }

    // Auditory issues (audio, video, captions)
    if (id.includes('audio') || id.includes('video') || id.includes('caption') ||
        tags.some(tag => tag.includes('audio') || tag.includes('video'))) {
        categories.auditory.count++;
        counted = true;
    }

    // Motor issues (keyboard, focus, interactive)
    if (id.includes('keyboard') || id.includes('focus') || id.includes('tabindex') ||
        id.includes('button') || id.includes('link') ||
        tags.some(tag => tag.includes('keyboard') || tag.includes('focus'))) {
        categories.motor.count++;
        counted = true;
    }

    // Cognitive issues (labels, headings, language, structure)
    if (id.includes('label') || id.includes('heading') || id.includes('lang') ||
        id.includes('title') || id.includes('landmark') || id.includes('region') ||
        tags.some(tag => tag.includes('label') || tag.includes('structure') || tag.includes('heading'))) {
        categories.cognitive.count++;
        counted = true;
    }

    // If not counted in any category, default to visual
    if (!counted) {
        categories.visual.count++;
    }
});

    return (
        <div className="category-cards">
            <div className="category-card" style={{ borderColor: categories.visual.color }}>
                <div className="category-icon" style={{ color: categories.visual.color }}>
                    {categories.visual.icon}
                </div>
                <div className="category-info">
                    <h3>Visual</h3>
                    <p className="category-count" style={{ color: categories.visual.color }}>
                        {categories.visual.count} <span>failing checks</span>
                    </p>
                </div>
            </div>

            <div className="category-card" style={{ borderColor: categories.auditory.color }}>
                <div className="category-icon" style={{ color: categories.auditory.color }}>
                    {categories.auditory.icon}
                </div>
                <div className="category-info">
                    <h3>Auditory</h3>
                    <p className="category-count" style={{ color: categories.auditory.color }}>
                        {categories.auditory.count} <span>failing checks</span>
                    </p>
                </div>
            </div>

            <div className="category-card" style={{ borderColor: categories.motor.color }}>
                <div className="category-icon" style={{ color: categories.motor.color }}>
                    {categories.motor.icon}
                </div>
                <div className="category-info">
                    <h3>Motor</h3>
                    <p className="category-count" style={{ color: categories.motor.color }}>
                        {categories.motor.count} <span>failing checks</span>
                    </p>
                </div>
            </div>

            <div className="category-card" style={{ borderColor: categories.cognitive.color }}>
                <div className="category-icon" style={{ color: categories.cognitive.color }}>
                    {categories.cognitive.icon}
                </div>
                <div className="category-info">
                    <h3>Cognitive</h3>
                    <p className="category-count" style={{ color: categories.cognitive.color }}>
                        {categories.cognitive.count} <span>failing checks</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CategoryCards;