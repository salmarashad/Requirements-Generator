import React, { useState, useEffect } from "react";
import { FaInfoCircle, FaGithub } from "react-icons/fa";
import AboutPopup from "./components/AboutPopup";
import ProjectDescription from "./components/ProjectDescription";
import UserSelection from "./components/UserSelection";
import AddCustomUsers from "./components/AddCustomUsers";
import RequirementForm from "./components/RequirementForm";
import apiService from "./apiService";
import "./App.css";
import ReactMarkdown from "react-markdown";
import { FaCopy, FaDownload } from "react-icons/fa";

const App = () => {
  const [step, setStep] = useState(1);
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [customUsers, setCustomUsers] = useState([]);
  const [requirements, setRequirements] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [generatedRoles, setGeneratedRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(requirements).then(() => {
      alert("Requirements copied to clipboard!");
    });
  };

  const downloadRequirements = () => {
    const element = document.createElement("a");
    const file = new Blob([requirements], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "requirements.md";
    document.body.appendChild(element); // Required for Firefox
    element.click();
    document.body.removeChild(element);
  };

  // default user roles as fallback
  const defaultUserRoles = [
    "Admin",
    "User",
    "Manager",
    "Guest",
    "Editor",
    "Viewer",
    "Moderator",
    "Contributor",
    "Support",
    "Developer",
  ];

  const handleNext = async (data) => {
    if (step === 1) {
      setProjectDescription(data);
      setLoading(true);

      try {
        const response = await apiService.generateRoles(data);
        if (response && response.roles && response.roles.length > 0) {
          setGeneratedRoles(response.roles);
        } else {
          setGeneratedRoles(defaultUserRoles);
        }
      } catch (err) {
        console.error("Error fetching generated roles:", err);
        setError("Failed to generate roles. Using default roles instead.");
        setGeneratedRoles(defaultUserRoles);
      } finally {
        setLoading(false);
        setStep(2);
      }
    } else if (step === 2) {
      setSelectedUsers(data);
      setStep(3);
    } else if (step === 3) {
      setCustomUsers(data);
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    }
  };

  const handleSubmitRequirements = (data) => {
    setRequirements(data);
    setStep(6);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="app-container">
      {/* Logo */}
      <div
        onClick={() => {
          setStep(1);
          setProjectDescription("");
          setSelectedUsers([]);
          setCustomUsers([]);
          setRequirements("");
          setGeneratedRoles([]);
          setError(null);
          setLoading(false);
        }}
        style={{
          fontSize: "50px",
          position: "absolute",
          top: "20px",
          left: "20px",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#658e3c76",
        }}
        title="Go back to Step 1"
      >
        〄
      </div>
      {/* Info icon */}
      <div
        onClick={togglePopup}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          cursor: "pointer",
          fontSize: "30px",
          color: "#658e3c76",
        }}
      >
        <FaInfoCircle />
      </div>
      {/* Popup Modal */}
      <AboutPopup showPopup={showPopup} togglePopup={togglePopup} />
      {/* GitHub Icon */}
      <a
        href="https://github.com/salmarashad/Thesis-Project"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed", // changed from absolute
          bottom: "20px",
          left: "60px",
          fontSize: "30px",
          cursor: "pointer",
          color: "#658e3c76",
        }}
      >
        <FaGithub />
      </a>
      {/* Main Content */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "25vh",
          fontWeight: "bold",
        }}
      >
        <h1>Requirements Generator</h1>
      </div>
      {error && (
        <div style={{ color: "red", textAlign: "center", margin: "1rem 0" }}>
          {error}
        </div>
      )}
      {loading && (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <p>Loading...</p>
        </div>
      )}
      {step === 1 && <ProjectDescription onNext={handleNext} />}
      {step === 2 && (
        <UserSelection
          recommendedUsers={
            generatedRoles.length > 0 ? generatedRoles : defaultUserRoles
          }
          onNext={handleNext}
        />
      )}
      {step === 3 && <AddCustomUsers onNext={handleNext} />}
      {step === 4 && (
        <RequirementForm
          users={[...selectedUsers, ...customUsers]}
          onSubmit={handleSubmitRequirements}
          projectDescription={projectDescription}
        />
      )}
      {step === 5 && (
        <div className="step-container">
          <h2>Generating Your Requirements...</h2>
          <p>Please wait while we process your information.</p>
        </div>
      )}
      {step === 6 && (
        <div className="step-container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>Your Functional and Non-Functional Requirements</h3>
            <button
              onClick={copyToClipboard}
              style={{
                cursor: "pointer",
                border: "none",
                background: "transparent",
                color: "#658e3c",
                opacity: 0.6,
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
              title="Copy requirements"
              aria-label="Copy requirements"
            >
              <FaCopy />
            </button>
            <button
              onClick={downloadRequirements}
              style={{
                cursor: "pointer",
                border: "none",
                background: "transparent",
                color: "#658e3c",
                opacity: 0.6,
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
              title="Download requirements"
              aria-label="Download requirements"
            >
              <FaDownload />
            </button>
          </div>

          <div
            style={{
              textAlign: "left",
              background: "linear-gradient(135deg, #f9f9f9, #eef4ec)",
              padding: "24px",
              borderRadius: "16px",
              maxWidth: "900px",
              margin: "2rem auto",
              maxHeight: "70vh",
              opacity: 0.6,
              overflowY: "auto",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
              border: "1px solid #dfe8d9",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#333",
            }}
          >
            <ReactMarkdown>{requirements}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
