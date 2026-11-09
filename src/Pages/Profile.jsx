import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { plantsData } from '../data';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  
  // Mocking user's plant collection for the care dashboard
  const [myPlants, setMyPlants] = useState([
    { ...plantsData[0], nextWater: 'Today', status: 'Needs Water', health: 80 },
    { ...plantsData[1], nextWater: 'In 2 Days', status: 'Thriving', health: 95 },
    { ...plantsData[2], nextWater: 'Tomorrow', status: 'Good', health: 85 }
  ]);

  const handleWater = (id) => {
    setMyPlants(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, nextWater: 'In 7 Days', status: 'Thriving', health: 100 };
      }
      return p;
    }));
  };

  if (!user) {
    return (
      <div className="profile-container not-logged-in">
        <h2>Please log in to view your profile and care dashboard.</h2>
        <Link to="/login" className="btn-primary">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="profile-container fade-in">
      <div className="profile-header">
        <div className="profile-info">
          <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
          <div>
            <h1>Hi, {user.username}!</h1>
            <p>Welcome back to your Plantora Dashboard.</p>
          </div>
        </div>
        <button onClick={logout} className="btn-secondary logout-btn">Log Out</button>
      </div>

      <div className="care-dashboard slide-up">
        <div className="dashboard-header">
          <h2>💧 My Plant Care Dashboard</h2>
          <p>Stay on top of your watering schedules.</p>
        </div>

        <div className="care-grid">
          {myPlants.map(plant => (
            <div key={plant.id} className="care-card">
              <img src={plant.image} alt={plant.name} className="care-img" />
              <div className="care-details">
                <h3>{plant.name}</h3>
                <p className="care-requirement">Requires: {plant.care.water}</p>
                <div className="status-indicators">
                  <span className={`status-badge ${plant.status === 'Needs Water' ? 'urgent' : 'good'}`}>
                    {plant.status}
                  </span>
                  <span className="health-badge">Health: {plant.health}%</span>
                </div>
                <div className="action-row">
                  <p className="next-water"><strong>Next Water:</strong> {plant.nextWater}</p>
                  <button 
                    className="btn-water" 
                    onClick={() => handleWater(plant.id)}
                    disabled={plant.nextWater === 'In 7 Days'}
                  >
                    {plant.nextWater === 'In 7 Days' ? 'Watered ✓' : 'Water Now 💦'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
