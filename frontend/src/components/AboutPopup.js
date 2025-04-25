import React from "react";

const AboutPopup = ({ togglePopup, showPopup }) => {
  if (!showPopup) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "30px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        maxWidth: "500px",
        width: "80%",
        borderRadius: "8px",
      }}
    >
      <h2>About the Project</h2>
      <p>
        This is the Requirements Generator tool. It helps you create a list of
        functional and non-functional requirements for your project.
      </p>
      <p>
        <strong>How to use:</strong> Follow the prompts to select user roles,
        add custom users, and define your project's requirements. Click "Next"
        to move through each step.
      </p>
      <button
        onClick={togglePopup}
        style={{
          padding: "10px",
          backgroundColor: "#658e3c76",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default AboutPopup;
