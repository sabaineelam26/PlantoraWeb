import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { plantsData } from "../data";
import "./plantCare.css";

const PlantCare = () => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Interactive Watering Dashboard state
  const [dashboardPlants, setDashboardPlants] = useState(user ? [
    { ...plantsData[0], nextWater: 'Today', status: 'Needs Water', health: 80 },
    { ...plantsData[1], nextWater: 'In 2 Days', status: 'Thriving', health: 95 },
    { ...plantsData[2], nextWater: 'Tomorrow', status: 'Good', health: 85 }
  ] : []);

  const handleWater = (id) => {
    setDashboardPlants(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, nextWater: 'In 7 Days', status: 'Thriving', health: 100 };
      }
      return p;
    }));
  };

  const plantLibrary = plantsData.map(p => ({
    id: p.id,
    name: p.name,
    type: p.category,
    image: p.image,
    sunlight: p.care.light,
    watering: p.care.water,
    humidity: p.care.humidity,
    temperature: "18°C – 30°C", // default mock
    fertilizer: "Once a month", // default mock
    description: p.description
  }));

  const filteredPlants = plantLibrary.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="plant-care-page">
      {/* ==============================
          HERO
      ============================== */}

      <section className="care-hero">
        <div className="care-hero-content">
          <span className="care-eyebrow">PLANTORA • PLANT CARE</span>

          <h1>
            A little care
            <br />
            <em>goes a long way.</em>
          </h1>

          <p>
            Keep your plants healthy with personalized care schedules, simple
            reminders, and helpful guides.
          </p>
        </div>

        <div className="care-hero-decoration">
          <div className="hero-leaf leaf-one">🌿</div>
          <div className="hero-leaf leaf-two">🍃</div>

          <div className="hero-plant-circle">🌱</div>
        </div>
      </section>

      {/* ==============================
          WATERING & CARE DASHBOARD
      ============================== */}

      {user && (
        <section className="care-section slide-up">
          <div className="dashboard-header">
            <h2>💧 My Plant Care Dashboard</h2>
            <p>Stay on top of your watering schedules.</p>
          </div>

          <div className="care-grid">
            {dashboardPlants.map(plant => (
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
        </section>
      )}

      {/* ==============================
          PLANT CARE LIBRARY
      ============================== */}

      <section className="care-section library-section">
        <div className="library-header">
          <div>
            <span className="section-eyebrow">EXPLORE PLANTS</span>

            <h2>Plant Care Guide</h2>

            <p>
              Don't own a plant yet? Explore its care requirements before
              bringing it home.
            </p>
          </div>

          <div className="plant-search">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredPlants.length > 0 ? (
          <div className="library-grid">
            {filteredPlants.map((plant) => (
              <article className="library-card" key={plant.id}>
                <div className="library-image">
                  <img src={plant.image} alt={plant.name} />
                </div>

                <div className="library-body">
                  <span className="plant-category">{plant.type}</span>

                  <h3>{plant.name}</h3>

                  <p>{plant.description}</p>

                  <button
                    className="text-care-button"
                    onClick={() => setSelectedPlant(plant)}
                  >
                    Explore Care Guide
                    <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span>🌿</span>
            <h3>No plant found</h3>
            <p>Try searching for another plant.</p>
          </div>
        )}
      </section>

      {/* ==============================
          CARE MODAL
      ============================== */}

      {selectedPlant && (
        <div
          className="care-modal-overlay"
          onClick={() => setSelectedPlant(null)}
        >
          <div className="care-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setSelectedPlant(null)}
            >
              ×
            </button>

            <div className="modal-image">
              <img src={selectedPlant.image} alt={selectedPlant.name} />
            </div>

            <div className="modal-body">
              <span className="modal-category">{selectedPlant.type}</span>

              <h2>{selectedPlant.name}</h2>

              <p className="modal-description">{selectedPlant.description}</p>

              <div className="care-detail-grid">
                <div className="care-detail">
                  <span>☀️</span>

                  <div>
                    <small>Sunlight</small>
                    <strong>{selectedPlant.sunlight}</strong>
                  </div>
                </div>

                <div className="care-detail">
                  <span>💧</span>

                  <div>
                    <small>Watering</small>
                    <strong>{selectedPlant.watering}</strong>
                  </div>
                </div>

                <div className="care-detail">
                  <span>💦</span>

                  <div>
                    <small>Humidity</small>
                    <strong>{selectedPlant.humidity}</strong>
                  </div>
                </div>

                <div className="care-detail">
                  <span>🌡️</span>

                  <div>
                    <small>Temperature</small>
                    <strong>{selectedPlant.temperature}</strong>
                  </div>
                </div>

                <div className="care-detail full-detail">
                  <span>🌱</span>

                  <div>
                    <small>Fertilizer</small>
                    <strong>{selectedPlant.fertilizer}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PlantCare;
