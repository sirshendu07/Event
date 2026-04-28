import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SuccessPage.css';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) return <div className="error-msg">No data found.</div>;

  return (
    <div className="success-wrapper">
      <div className="starfield-overlay"></div>
      <div className="confetti-particles"></div>
      <div className="success-card cinematic-entry">
        <h1 className="success-header fluctuating-neon">CONGRATULATIONS!</h1>
        
        <div className="user-hero-badge pulse-effect">
          <p className="hero-name">{data.name}</p>
          <span className="hero-age">{data.age} Years Old</span>
        </div>

        <div className="grid-container staggered-fade">
          <div className="grid-item"><span>TOWER</span><p>{data.tower}</p></div>
          <div className="grid-item"><span>FLAT</span><p>{data.flatNumber}</p></div>
          <div className="grid-item"><span>PHONE</span><p>{data.phone}</p></div>
        </div>

        <div className="confirmation-tag blur-fade-in sequential-delay-1">
          REGISTRATION SECURED ✅
        </div>

        <div className="activity-breakdown sequential-delay-2">
          <h3>Your Performances:</h3>
          {data.selectedActivities.map((act) => (
            <div key={act} className="activity-row simplified-output list-item-entry">
              <span className="act-type">{act}:</span>
              <span className="act-val">{data.specifics[act] || "N/A"}</span>
            </div>
          ))}
        </div>

        <button className="neon-home-btn constant-heartbeat-glow" onClick={() => navigate('/')}>BACK TO HOME</button>
      </div>
    </div>
  );
}