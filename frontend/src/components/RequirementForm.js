import React, { useState } from "react";

const RequirementForm = ({ users, preFilledRequirements, onSubmit }) => {
  const [requirements, setRequirements] = useState(preFilledRequirements || []);

  const handleChange = (index, field, value) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index][field] = value;
    setRequirements(updatedRequirements);
  };

  const handleAddRequirement = () => {
    setRequirements([...requirements, { user: "", action: "", outcome: "" }]);
  };

  const handleSubmit = () => {
    onSubmit(requirements);
  };

  return (
    <div className="step-container">
      <h1>Define Requirements</h1>
      {requirements.map((req, index) => (
        <div key={index}>
          <select
            value={req.user}
            onChange={(e) => handleChange(index, "user", e.target.value)}
          >
            {users.map((user, idx) => (
              <option key={idx} value={user}>
                {user}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="I want to..."
            value={req.action}
            onChange={(e) => handleChange(index, "action", e.target.value)}
          />
          <input
            type="text"
            placeholder="So that..."
            value={req.outcome}
            onChange={(e) => handleChange(index, "outcome", e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleAddRequirement}>Add Another Requirement</button>
      <button onClick={handleSubmit}>Generate Requirements</button>
    </div>
  );
};

export default RequirementForm;
