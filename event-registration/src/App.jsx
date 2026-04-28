import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import RegistrationForm from './components/registration/RegistrationForm';
import SuccessPage from './components/success/SuccessPage';
import StatusPage from './components/status/StatusPage'; // Import the new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/success" element={<SuccessPage />} />
        
        {/* ADD THIS NEW ROUTE */}
        <Route path="/check" element={<StatusPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;