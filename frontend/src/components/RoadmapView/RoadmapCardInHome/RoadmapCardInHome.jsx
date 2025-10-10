import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./RoadmapCardInHome.css";

const RoadmapCard = ({
  id,
  name = "",
  description = "",
  author = "",
  learning = 0,
  teaching = 0,
  isUserCard = false,
  isMarked = false,
  onBookmarkToggle,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [cardRect, setCardRect] = useState(null);
  const cardRef = useRef();

  useEffect(() => {
    setIsBookmarked(isMarked);
  }, []);

  const truncate = (text, max = 16) => {
    if (typeof text !== "string" || !text) return "";
    return text.length <= max ? text : text.slice(0, max) + "...";
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    const next = !isBookmarked;
    setIsBookmarked(next);
    if (onBookmarkToggle) {
      onBookmarkToggle(id, next);
    }
  };

  // Update card position when hovered
  useEffect(() => {
    if (hovered && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardRect({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [hovered]);

  // Portal overlay
  const overlayPortal =
    hovered &&
    cardRect &&
    ReactDOM.createPortal(
      <div
        className="card-overlay-portal"
        style={{
          top: cardRect.top - 20,
          left: cardRect.left - 20,
          width: cardRect.width + 40,
          height: cardRect.height + 120,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="overlay-content">
          <div className="overlay-header">
            <h3 className="overlay-title">{name}</h3>
            <div
              className={`bookmark-icon ${isBookmarked ? "bookmarked" : ""}`}
              onClick={handleBookmarkClick}
              title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={isBookmarked ? "#ff6b6b" : "none"}
                stroke={isBookmarked ? "#ff6b6b" : "#64748b"}
                strokeWidth="2"
              >
                <polygon
                  points="12,2 15.09,8.26 22,9 17,14.74 
                                18.18,21.02 12,17.77 5.82,21.02 
                                7,14.74 2,9 8.91,8.26"
                />
              </svg>
            </div>
          </div>

          <p className="overlay-desc">{description}</p>

          <div className="overlay-row">
            <svg
              className="overlay-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
            >
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4
                     -4 1.79-4 4 1.79 4 4 4z"
              />
              <path
                d="M6 20v-1c0-2.76 2.24-5 5-5h2
                     c2.76 0 5 2.24 5 5v1"
              />
            </svg>
            <span className="overlay-label">{author}</span>
          </div>

          <div className="overlay-row">
            <svg
              className="overlay-icon learning-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path
                d="m22 21-3-3m0 0a2 2 0 0 0 0-4
                     a2 2 0 0 0 0 4"
              />
            </svg>
            <span className="overlay-label">
              {learning !== null && learning !== undefined && (
                <>{learning.toLocaleString()} learning</>
              )}
            </span>
          </div>

          <div className="overlay-row">
            <svg
              className="overlay-icon teaching-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
            >
              <path
                d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6
                     a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
              />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              <path d="m9 14 2 2 4-4" />
            </svg>
            <span className="overlay-label">{teaching} teaching</span>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <>
      <div
        ref={cardRef}
        className={`roadmap-card ${isUserCard ? "user-card" : "guest-card"}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Card Header */}
        <div className="card-header">
          <h3 className="card-title" title={name}>
            {truncate(name)}
          </h3>
          <div
            className={`bookmark-icon ${isBookmarked ? "bookmarked" : ""}`}
            onClick={handleBookmarkClick}
            title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isBookmarked ? "#ff6b6b" : "none"}
              stroke={isBookmarked ? "#ff6b6b" : "#64748b"}
              strokeWidth="2"
            >
              <polygon
                points="12,2 15.09,8.26 22,9 17,14.74 
                                18.18,21.02 12,17.77 5.82,21.02 
                                7,14.74 2,9 8.91,8.26"
              />
            </svg>
          </div>
        </div>

        {/* Author */}
        <div className="card-author">
          <svg
            className="author-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
            <path d="M6 20v-1c0-2.76 2.24-5 5-5h2c2.76 0 5 2.24 5 5v1" />
          </svg>
          <span className="author-text">{truncate(author, 20)}</span>
        </div>
      </div>

      {overlayPortal}
    </>
  );
};

export default RoadmapCard;
