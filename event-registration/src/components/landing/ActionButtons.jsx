import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ActionButtons.css';

export default function ActionButtons() {
  const navigate = useNavigate();

  return (
    <div className="btn-container">
      <button className="glow-btn register" onClick={() => navigate('/register')}>
        Register to Participate
      </button>
      <button className="glow-btn status" onClick={() => navigate('/check')}>
        Check Status
      </button>
    </div>
  );
}