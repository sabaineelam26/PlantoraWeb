import React, { useState } from "react";
import { plantsData } from "../data";
import ProductCard from "../Components/ProductCard";
import "./PlantFinder.css";

const PlantFinder = () => {
  const [answers, setAnswers] = useState({
    room: "",
    sunlight: "",
    watering: "",
    size: "",
    experience: "",
  });
  
  const [showResults, setShowResults] = useState(false);
  const [recommendedPlants, setRecommendedPlants] = useState([]);

  const handleChange = (question, value) => {
    setAnswers({
      ...answers,
      [question]: value,
    });
    setShowResults(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allAnswered = Object.values(answers).every((val) => val !== "");
    if (!allAnswered) {
      alert("Please answer all questions to find your perfect plant!");
      return;
    }

    const scoredPlants = plantsData.map((plant) => {
      let score = 0;
      const light = plant.care.light.toLowerCase();
      const water = plant.care.water.toLowerCase();

      if (answers.sunlight === "Low Light" && light.includes("low")) score += 3;
      else if (answers.sunlight === "Bright Light" && light.includes("bright")) score += 3;
      else if (answers.sunlight === "Medium Light" && (light.includes("medium") || light.includes("indirect"))) score += 2;

      if (answers.watering === "Rarely" && water.includes("weeks")) score += 3;
      else if (answers.watering === "Once a Week" && water.includes("1-2 weeks")) score += 3;
      else if (answers.watering === "Several Times a Week" && water.includes("moist")) score += 3;

      if (answers.experience === "I'm a Beginner" && (plant.category === "Easy-Care Plants" || plant.category === "Low-Light Plants")) score += 3;
      else if (answers.experience === "Plant Parent") score += 1;

      if ((answers.room === "Office" || answers.room === "Bedroom") && plant.category === "Air-Purifying Plants") score += 2;
      
      // simple size heuristic based on categories or price just for demonstration
      if (answers.size === "Small" && plant.price < 30) score += 1;
      if (answers.size === "Large" && plant.price > 60) score += 1;

      return { plant, score };
    });

    scoredPlants.sort((a, b) => b.score - a.score);
    const topPicks = scoredPlants.slice(0, 3).map((p) => p.plant);
    
    setRecommendedPlants(topPicks);
    setShowResults(true);
  };

  return (
    <section className="plant-finder">
      <div className="finder-header">
        <span>PLANTORA PLANT FINDER</span>
        <h1>Find Your Perfect Plant</h1>
        <p>Tell us a little about your space and lifestyle, and we'll help you find plants that are right for you.</p>
      </div>

      <form className="finder-form" onSubmit={handleSubmit}>
        {/* Question 1 */}
        <div className="finder-question">
          <h2>01. Where will you keep your plant?</h2>
          <div className="options">
            {["Bedroom", "Living Room", "Office", "Balcony"].map((option) => (
              <label key={option} className={`option ${answers.room === option ? "selected" : ""}`}>
                <input type="radio" name="room" value={option} onChange={() => handleChange("room", option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 2 */}
        <div className="finder-question">
          <h2>02. How much sunlight does your space get?</h2>
          <div className="options">
            {["Low Light", "Medium Light", "Bright Light"].map((option) => (
              <label key={option} className={`option ${answers.sunlight === option ? "selected" : ""}`}>
                <input type="radio" name="sunlight" value={option} onChange={() => handleChange("sunlight", option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 3 */}
        <div className="finder-question">
          <h2>03. How often can you water your plant?</h2>
          <div className="options">
            {["Rarely", "Once a Week", "Several Times a Week"].map((option) => (
              <label key={option} className={`option ${answers.watering === option ? "selected" : ""}`}>
                <input type="radio" name="watering" value={option} onChange={() => handleChange("watering", option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 4 */}
        <div className="finder-question">
          <h2>04. What size plant are you looking for?</h2>
          <div className="options">
            {["Small", "Medium", "Large"].map((option) => (
              <label key={option} className={`option ${answers.size === option ? "selected" : ""}`}>
                <input type="radio" name="size" value={option} onChange={() => handleChange("size", option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 5 */}
        <div className="finder-question">
          <h2>05. How experienced are you with plants?</h2>
          <div className="options">
            {["I'm a Beginner", "Some Experience", "Plant Parent"].map((option) => (
              <label key={option} className={`option ${answers.experience === option ? "selected" : ""}`}>
                <input type="radio" name="experience" value={option} onChange={() => handleChange("experience", option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="find-button" type="submit" disabled={!Object.values(answers).every((val) => val !== "")}>
          Find My Plants →
        </button>
      </form>

      {showResults && (
        <div className="finder-results" style={{ marginTop: "60px", padding: "40px 0", borderTop: "2px solid #eee" }}>
          <div className="finder-header">
            <h2>Your Perfect Matches</h2>
            <p>Based on your lifestyle and space, we recommend these plants for you.</p>
          </div>
          <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '30px' }}>
            {recommendedPlants.map((plant) => (
              <ProductCard key={plant.id} plant={plant} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default PlantFinder;
