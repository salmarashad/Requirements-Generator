import React, { useState } from "react";
import { FaInfoCircle, FaGithub } from "react-icons/fa";
import AboutPopup from "./components/AboutPopup"; // Importing the new component
import ProjectDescription from "./components/ProjectDescription";
import UserSelection from "./components/UserSelection";
import AddCustomUsers from "./components/AddCustomUsers";
import RequirementForm from "./components/RequirementForm";
import "./App.css";

const App = () => {
  const [step, setStep] = useState(1);
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [customUsers, setCustomUsers] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const recommendedUsers = [
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
    "Designer",
    "Project Manager",
    "Team Lead",
    "Quality Assurance",
    "Product Owner",
    "Business Analyst",
    "Customer",
    "Sales Representative",
    "HR",
    "Finance",
  ];

  const handleNext = (data) => {
    if (step === 1) {
      setProjectDescription(data);
      setStep(2);
    } else if (step === 2) {
      setSelectedUsers(data);
      setStep(3);
    } else if (step === 3) {
      setCustomUsers(data);
      setStep(4);
    } else if (step === 4) {
      setRequirements(data);
      setStep(5);
    }
  };

  const handleSubmitRequirements = (data) => {
    console.log("Generated Requirements:", data);
    setStep(6);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="app-container">
      <div
        //  onClick={}
        style={{
          fontSize: "50px",
          position: "absolute",
          top: "20px",
          left: "20px",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#658e3c76",
        }}
      >
        〄
      </div>
      {/* Info icon */}
      <div
        onClick={togglePopup}
        style={{
          position: "absolute",
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
      <div>
        <a
          href="https://github.com/salmarashad/Thesis-Project"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "60px",
            fontSize: "30px",
            cursor: "pointer",
            color: "#658e3c76",
          }}
        >
          <FaGithub />
        </a>
      </div>

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

      {step === 1 && <ProjectDescription onNext={handleNext} />}
      {step === 2 && (
        <UserSelection
          recommendedUsers={recommendedUsers}
          onNext={handleNext}
        />
      )}
      {step === 3 && <AddCustomUsers onNext={handleNext} />}
      {step === 4 && (
        <RequirementForm
          users={[...selectedUsers, ...customUsers]}
          onSubmit={handleSubmitRequirements}
        />
      )}
      {step === 5 && (
        <div>
          <h2>Generating Your Requirements...</h2>
        </div>
      )}
      {step === 6 && (
        <div>
          <h2>Your Functional and Non-Functional Requirements</h2>
          <pre>{JSON.stringify(requirements, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
