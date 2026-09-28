import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { plantsData } from "../data";
import "./plantCare.css";

const PlantCare = () => {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Mock delivered plants for logged-in user
  const myPlants = user ? [
    {
      ...plantsData[0], // Monstera
      deliveredDate: "21 Sep 2026",
      lastWatered: "18 Sep",
      nextWatering: "Today",
      status: "Healthy",
    },
    {
      ...plantsData[6], // Snake Plant
      deliveredDate: "15 Sep 2026",
      lastWatered: "17 Sep",
      nextWatering: "In 3 days",
      status: "Healthy",
    },
  ] : [];

  // Use plantsData for the global library
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

  const tasks = [
    {
      id: 1,
      icon: "💧",
      title: "Water Monstera",
      description: "Your Monstera is ready for watering.",
    },
    {
      id: 2,
      icon: "☀️",
      title: "Check sunlight",
      description: "Make sure your plants get enough indirect light.",
    },
    {
      id: 3,
      icon: "🍃",
      title: "Check plant leaves",
      description: "Look for yellow, dry, or damaged leaves.",
    },
  ];

  const filteredPlants = plantLibrary.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleTask = (id) => {
    setCompletedTasks((previous) =>
      previous.includes(id)
        ? previous.filter((taskId) => taskId !== id)
        : [...previous, id],
    );
  };

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
          MY PLANTS
      ============================== */}

      {user && (
        <section className="care-section">
          <div className="section-top">
            <div>
              <span className="section-eyebrow">YOUR COLLECTION</span>
              <h2>My Plants</h2>
              <p>Plants you've received from Plantora.</p>
            </div>
            <span className="plant-count">{myPlants.length} Plants</span>
          </div>

          {myPlants.length > 0 ? (
            <div className="my-plants-grid">
              {myPlants.map((plant) => (
                <article className="my-plant-card" key={plant.id}>
                  <div className="my-plant-image">
                    <img src={plant.image} alt={plant.name} />
                    <span className="healthy-badge">● {plant.status}</span>
                  </div>

                  <div className="my-plant-body">
                    <div className="plant-title-row">
                      <div>
                        <h3>{plant.name}</h3>
                        <p>{plant.type}</p>
                      </div>

                      <button
                        className="round-care-button"
                        onClick={() =>
                          setSelectedPlant(
                            plantLibrary.find((item) => item.name === plant.name),
                          )
                        }
                        aria-label={`View ${plant.name} care`}
                      >
                        →
                      </button>
                    </div>

                    <div className="delivery-line">
                      <span>📦</span>
                      <p>
                        Delivered <strong>{plant.deliveredDate}</strong>
                      </p>
                    </div>

                    <div className="watering-row">
                      <div>
                        <span className="care-icon">💧</span>
                        <div>
                          <small>Last watered</small>
                          <strong>{plant.lastWatered}</strong>
                        </div>
                      </div>

                      <div>
                        <span className="care-icon">🌱</span>
                        <div>
                          <small>Next watering</small>
                          <strong>{plant.nextWatering}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      className="primary-care-button"
                      onClick={() =>
                        setSelectedPlant(
                          plantLibrary.find((item) => item.name === plant.name),
                        )
                      }
                    >
                      View Plant Care
                      <span>→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-plants">
              <div className="empty-plant-icon">🌱</div>
              <h3>Your plant family is empty</h3>
              <p>
                Once your Plantora order is delivered, your plants will appear
                here.
              </p>
            </div>
          )}
        </section>
      )}

      {/* ==============================
          TODAY'S CARE
      ============================== */}

      {myPlants.length > 0 && (
        <section className="care-section dashboard-section">
          <div className="dashboard-grid">
            {/* Tasks */}

            <div className="tasks-card">
              <div className="section-top compact">
                <div>
                  <span className="section-eyebrow">TODAY</span>

                  <h2>Care Tasks</h2>
                </div>

                <span className="today-date">21 September</span>
              </div>

              <div className="task-list">
                {tasks.map((task) => {
                  const completed = completedTasks.includes(task.id);

                  return (
                    <div
                      className={`care-task ${
                        completed ? "task-completed" : ""
                      }`}
                      key={task.id}
                    >
                      <div className="task-icon">{task.icon}</div>

                      <div className="task-info">
                        <h3>{task.title}</h3>

                        <p>{task.description}</p>
                      </div>

                      <button
                        className="task-check"
                        onClick={() => toggleTask(task.id)}
                      >
                        {completed ? "✓" : ""}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress */}

            <div className="progress-card">
              <span className="section-eyebrow">THIS WEEK</span>

              <h2>Care Progress</h2>

              <div className="progress-ring">
                <div className="progress-inner">
                  <strong>82%</strong>

                  <span>Complete</span>
                </div>
              </div>

              <p>
                You're doing a great job keeping your plants happy and healthy.
              </p>

              <div className="progress-stats">
                <div>
                  <strong>18</strong>
                  <span>Completed</span>
                </div>

                <div>
                  <strong>4</strong>
                  <span>Remaining</span>
                </div>
              </div>
            </div>
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
