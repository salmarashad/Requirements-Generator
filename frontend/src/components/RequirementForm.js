import React, { useState } from "react";
import apiService from "../apiService";

const RequirementForm = ({ users, onSubmit, projectDescription }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const storiesResponse = await apiService.generateStories(
        projectDescription,
        users
      );

      const requirementsResponse = await apiService.generateRequirements(
        storiesResponse.stories
      );

      onSubmit(requirementsResponse.requirements);
    } catch (err) {
      setError("Failed to generate requirements. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step-container">
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h4>Selected User Roles:</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {users.map((user, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: "#4a8cce",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  margin: "3px",
                }}
              >
                {user}
              </span>
            ))}
          </div>
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
        )}

        {loading ? (
          <p style={{ marginTop: "2rem" }}>
            Generating requirements... This may take a moment.
          </p>
        ) : (
          <button
            onClick={handleSubmit}
            className="styled-button"
            style={{ marginTop: "2rem" }}
          >
            Generate Requirements
          </button>
        )}
      </div>
    </div>
  );
};

export default RequirementForm;
