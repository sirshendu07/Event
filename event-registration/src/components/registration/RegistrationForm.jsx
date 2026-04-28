import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

const activitiesList = [
  "Music", "Dance", "Drama", "Recitation", "Guitar", "Singing", "Stand-up"
];

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // Submitting state

  const [formData, setFormData] = useState({
    name: '',
    age: '', // Age added
    tower: '',
    flatNumber: '',
    phone: '',
    residentType: '',
  });

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [specifics, setSpecifics] = useState({});

  // Smart Label Helper
  const getPlaceholder = (activity) => {
    switch (activity) {
      case 'Music': return "Song Name";
      case 'Guitar': return "Song Name";
      case 'Dance': return "Song Name or Dance Type";
      case 'Drama': return "Drama Name";
      default: return "Performance Details";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const val = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: val });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((item) => item !== activity));
      const newSpecifics = { ...specifics };
      delete newSpecifics[activity];
      setSpecifics(newSpecifics);
    } else {
      if (selectedActivities.length < 3) {
        setSelectedActivities([...selectedActivities, activity]);
      } else {
        alert("You can select a maximum of 3 activities.");
      }
    }
  };

  const handleSpecificsChange = (activity, value) => {
    setSpecifics({ ...specifics, [activity]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true); // START SUBMITTING ANIMATION

    const registrationData = { ...formData, selectedActivities, specifics };

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData)
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Server rejected the request");
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        navigate('/success', { state: result.data });
      } else {
        alert("Registration saved, but received invalid response format.");
        setIsSubmitting(false);
      }

    } catch (error) {
      console.error("The exact error is:", error);
      alert("Error: " + error.message);
      setIsSubmitting(false); // RE-ENABLE BUTTON ON ERROR
    }
  };

  return (
    <div className="registration-wrapper">
      <div className="form-card">
        <div className="border-line line-top"></div>
        <div className="border-line line-right"></div>
        <div className="border-line line-bottom"></div>
        <div className="border-line line-left"></div>

        <h2 className="form-title">Event Registration</h2>
        
        <form onSubmit={handleSubmit} className="actual-form">
          <div className="input-row multi">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Enter Name" />
            </div>
            <div className="input-group age-input">
              <label>Age</label>
              <input type="number" name="age" required value={formData.age} onChange={handleInputChange} placeholder="Age" />
            </div>
          </div>

          <div className="input-row multi">
            <div className="input-group">
              <label>Tower</label>
              <select name="tower" required value={formData.tower} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Tower 1">Tower 1</option>
                <option value="Tower 2">Tower 2</option>
              </select>
            </div>
            <div className="input-group">
              <label>Flat Number</label>
              <input type="text" name="flatNumber" required value={formData.flatNumber} onChange={handleInputChange} placeholder="Flat No" />
            </div>
          </div>

          <div className="input-row multi">
            <div className="input-group">
              <label>Phone (10 Digits)</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="Phone number" />
            </div>
            <div className="input-group">
              <label>Resident Type</label>
              <select name="residentType" required value={formData.residentType} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Owner">Owner</option>
                <option value="Tenant">Tenant</option>
              </select>
            </div>
          </div>

          <div className="activities-section">
            <p className="section-label">Select Activities (Max 3)</p>
            <div className="checkbox-container">
              {activitiesList.map((activity) => (
                <label key={activity} className={`checkbox-item ${selectedActivities.includes(activity) ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={selectedActivities.includes(activity)}
                    onChange={() => handleCheckboxChange(activity)}
                  />
                  <span>{activity}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedActivities.length > 0 && (
            <div className="specifics-container">
              {selectedActivities.map((activity) => (
                <div key={activity} className="input-group fade-in">
                  <label>SPECIFY {getPlaceholder(activity).toUpperCase()} FOR {activity.toUpperCase()}</label>
                  <input
                    type="text"
                    required
                    placeholder={`Enter ${getPlaceholder(activity)}...`}
                    value={specifics[activity] || ''}
                    onChange={(e) => handleSpecificsChange(activity, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'loading' : ''}`} 
            disabled={isSubmitting}
          >
            {isSubmitting ? "SECURING YOUR SPOT..." : "REGISTER NOW"}
          </button>
        </form>
      </div>
    </div>
  );
}