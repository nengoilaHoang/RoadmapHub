import React, { useState } from 'react';
import './RoadmapCardInHome.css';

const RoadmapCard = ({ 
  id, 
  name, 
  description, 
  learning, 
  teaching, 
  isUserCard = false,
  onBookmarkToggle 
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    if (isUserCard) {
      const newBookmarkState = !isBookmarked;
      setIsBookmarked(newBookmarkState);
      if (onBookmarkToggle) {
        onBookmarkToggle(id, newBookmarkState);
      }
    }
  };

  // Truncate name if too long
  const truncateName = (text, maxLength = 16) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className={`roadmap-card ${isUserCard ? 'user-card' : 'guest-card'}`}>
      <div className="card-header">
        <div className="card-title-section">
          <h3 className="card-title" title={name}>
            {truncateName(name)}
          </h3>
          {isUserCard && (
            <div 
              className={`bookmark-icon ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={handleBookmarkClick}
              title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill={isBookmarked ? '#ff6b6b' : 'none'}
                stroke={isBookmarked ? '#ff6b6b' : '#64748b'}
                strokeWidth="2"
              >
                <polygon points="12,2 15.09,8.26 22,9 17,14.74 18.18,21.02 12,17.77 5.82,21.02 7,14.74 2,9 8.91,8.26"/>
              </svg>
            </div>
          )}
        </div>
      </div>
      
      <div className="card-stats">
        <div className="stat-item">
          <div className="stat-icon learning-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="m22 21-3-3m0 0a2 2 0 0 0 0-4a2 2 0 0 0 0 4"/>
            </svg>
          </div>
          <div className="stat-text">
            <span className="stat-number">{learning.toLocaleString()}</span>
            <span className="stat-label">learning</span>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon teaching-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              <path d="m9 14 2 2 4-4"/>
            </svg>
          </div>
          <div className="stat-text">
            <span className="stat-number">{teaching}</span>
            <span className="stat-label">teaching</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;