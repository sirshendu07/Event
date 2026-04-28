import React from 'react';
import HeroSection from './HeroSection';
import ActionButtons from './ActionButtons';
import EventDetails from './EventDetails';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      <div className="overlay"></div>
      
      {/* Heading is at the top because of HeroSection's CSS absolute positioning */}
      <HeroSection />

      <div className="landing-content">
        <EventDetails />
        <ActionButtons />
      </div>
    </div>
  );
}