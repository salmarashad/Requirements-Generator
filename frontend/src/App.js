import React, { useState } from "react";
import ProjectDescription from "./components/ProjectDescription";
import UserSelection from "./components/UserSelection";
import AddCustomUsers from "./components/AddCustomUsers";
import RequirementForm from "./components/RequirementForm";

const App = () => {
  const [step, setStep] = useState(1); // Keeps track of the current step
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [customUsers, setCustomUsers] = useState([]);
  const [requirements, setRequirements] = useState([]);

  // Recommended users based on the project description
  const recommendedUsers = ["Admin", "User", "Manager"];

  const handleNext = (data) => {
    // Process data for each step and move to the next step
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
    // Here, you could generate the functional and non-functional requirements
    console.log("Generated Requirements:", data);
    setStep(6); // Move to a "success" or final step
  };

  return (
    <div className="app-container">
      <h1>Your Project Requirements Generator</h1>

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
          users={[...selectedUsers, ...customUsers]} // Combine selected and custom users
          preFilledRequirements={[]}
          onSubmit={handleSubmitRequirements}
        />
      )}

      {step === 5 && (
        <div>
          <h2>Generating Your Requirements...</h2>
          {/* You can show a loader here */}
        </div>
      )}

      {step === 6 && (
        <div>
          <h2>Your Functional and Non-Functional Requirements</h2>
          {/* Display the generated requirements here */}
          <pre>{JSON.stringify(requirements, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
