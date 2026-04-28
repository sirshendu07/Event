import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StatusPage.css';

export default function StatusPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ tower: '', flat: '', phone: '' });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/check?tower=${search.tower}&flat=${search.flat}&phone=${search.phone}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      alert("Error finding details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="status-wrapper background-poet-aura">
      <div className="cosmic-dust-overlay"></div>
      <div className="status-container advanced-glass-morph cinematic-slide-up">
        <h2 className="status-titleFluctuatingNeon">CHECK STATUS</h2>
        
        <form onSubmit={handleSearch} className="status-form">
          <select required onChange={(e) => setSearch({...search, tower: e.target.value})} className="advanced-focus-glow">
            <option value="">Select Tower</option>
            <option value="Tower 1">Tower 1</option>
            <option value="Tower 2">Tower 2</option>
          </select>
          <input type="text" placeholder="Flat Number" required onChange={(e) => setSearch({...search, flat: e.target.value})} className="advanced-focus-glow" />
          <input type="tel" placeholder="Phone Number" required onChange={(e) => setSearch({...search, phone: e.target.value})} className="advanced-focus-glow" />
          <button type="submit" className="status-btn heartbeat-glow">{loading ? "SEARCHING..." : "FIND REGISTRATIONS"}</button>
        </form>

        {results && (
          <div className="results-list sequential-staggered-entry">
            {results.length > 0 ? results.map((res, i) => (
              <div key={i} className="result-card pronounced-neon-border animated-entry atmospheric-light-burst sequential-delay">
                <div className="res-header">
                   <h4>👤 {res.name}</h4>
                   <span className="res-age-tag neon-fluctuation">{res.age} Yrs</span>
                </div>
                <p className="res-phone">📞 {res.phone}</p>
                <div className="res-activities simplified-output">
                  {res.selectedActivities.map(a => (
                    <div key={a} className="res-act-item">
                      <span className="res-act-name">{a}:</span>
                      <span className="res-act-detail">{res.specifics[a]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )) : <p className="no-res fade-in-out">No records found for this flat.</p>}
          </div>
        )}

        <button className="back-link fluctuating-link-glow" onClick={() => navigate('/')}>← BACK TO HOME</button>
      </div>
    </div>
  );
}