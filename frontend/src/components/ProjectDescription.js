import React, { useState } from "react";

const ProjectDescription = ({ onNext }) => {
  const [description, setDescription] = useState("");

  const handleNext = () => {
    if (description.trim()) {
      onNext(description);
    }
  };

  return (
    <div className="step-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Describe Your Project</h3>
      </div>

      <div className="form-container">
        <textarea
          placeholder="Enter a brief description of your project"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="styled-textarea"
        />

        <button onClick={handleNext} className="styled-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectDescription;
