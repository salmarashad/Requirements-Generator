import React, { useState } from "react";
import apiService from "../apiService";

const ProjectDescription = ({ onNext }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNext = async () => {
    if (description.trim()) {
      setLoading(true);
      setError(null);

      try {
        localStorage.setItem("projectDescription", description);

        const response = await apiService.generateRoles(description);

        onNext(description);
      } catch (err) {
        setError("Failed to process your description. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
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

        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
        )}

        {loading ? (
          <div style={{ marginTop: "1rem" }}>
            <p>Processing your description...</p>
          </div>
        ) : (
          <button onClick={handleNext} className="styled-button">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectDescription;
