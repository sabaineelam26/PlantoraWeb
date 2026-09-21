import React, { useState } from "react";
import "./PlantFinder.css";

const PlantFinder = () => {
  const [answers, setAnswers] = useState({
    room: "",
    sunlight: "",
    watering: "",
    size: "",
    experience: "",
  });

  const handleChange = (question, value) => {
    setAnswers({
      ...answers,
      [question]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Plant Finder Answers:", answers);

    // Later you can send these answers to your backend
    // and get personalized plant recommendations.
  };

  return (
    <section className="plant-finder">
      <div className="finder-header">
        <span>PLANTORA PLANT FINDER</span>

        <h1>Find Your Perfect Plant</h1>

        <p>
          Tell us a little about your space and lifestyle, and we'll help you
          find plants that are right for you.
        </p>
      </div>

      <form className="finder-form" onSubmit={handleSubmit}>
        {/* Question 1 */}
        <div className="finder-question">
          <h2>01. Where will you keep your plant?</h2>

          <div className="options">
            {["Bedroom", "Living Room", "Office", "Balcony"].map((option) => (
              <label
                key={option}
                className={`option ${
                  answers.room === option ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="room"
                  value={option}
                  onChange={() => handleChange("room", option)}
                />
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
              <label
                key={option}
                className={`option ${
                  answers.sunlight === option ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="sunlight"
                  value={option}
                  onChange={() => handleChange("sunlight", option)}
                />
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
              <label
                key={option}
                className={`option ${
                  answers.watering === option ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="watering"
                  value={option}
                  onChange={() => handleChange("watering", option)}
                />
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
              <label
                key={option}
                className={`option ${
                  answers.size === option ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="size"
                  value={option}
                  onChange={() => handleChange("size", option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Question 5 */}
        <div className="finder-question">
          <h2>05. How experienced are you with plants?</h2>

          <div className="options">
            {["I'm a Beginner", "Some Experience", "Plant Parent"].map(
              (option) => (
                <label
                  key={option}
                  className={`option ${
                    answers.experience === option ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="experience"
                    value={option}
                    onChange={() => handleChange("experience", option)}
                  />
                  <span>{option}</span>
                </label>
              ),
            )}
          </div>
        </div>

        <button className="find-button" type="submit">
          Find My Plants →
        </button>
      </form>
    </section>
  );
};

export default PlantFinder;
