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
      <h1>Describe Your Project</h1>
      <textarea
        placeholder="Enter a brief description of your project"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ProjectDescription;
