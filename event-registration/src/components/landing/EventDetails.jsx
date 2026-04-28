import React, { useState } from 'react';
import './EventDetails.css';

export default function EventDetails() {
  const [isOpen, setIsOpen] = useState(false);

  const events = [
    "Music (গান)", "Dance (নাচ)", "Drama (নাটক)", 
    "Recitation (আবৃত্তি)", "Guitar (গিটার)", 
    "Singing (সংগীত)", "Stand-up (কৌতুক)"
  ];

  return (
    <div className="details-container">
      {/* THE DANCING VENUE BOX */}
      <div className="venue-box dancing-effect">
        <p className="venue-text">SOLARIS BONHOOGLY PHASE 1 COMMUNITY HALL / GAMES ROOM</p>
        <p className="event-date-small">23RD MAY 2026 | 6:00 PM ONWARDS</p>
      </div>

      <div className="event-list-wrapper">
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "HIDE EVENTS ▲" : "SHOW EVENTS ▼"}
        </button>
        
        {/* The fix: This div MUST have the open class when isOpen is true */}
        <div className={`collapsible-list ${isOpen ? "open" : ""}`}>
          <ul>
            {events.map((item, index) => (
              <li key={index}>✦ {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}