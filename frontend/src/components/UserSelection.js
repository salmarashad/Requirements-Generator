import React, { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const UserSelection = ({ recommendedUsers, onNext }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (event) => {
    const user = event.target.name;
    setSelectedUsers((prevState) => {
      if (prevState.includes(user)) {
        return prevState.filter((item) => item !== user);
      }
      return [...prevState, user];
    });
  };

  const handleNext = () => {
    onNext(selectedUsers);
  };

  return (
    <div className="step-container">
      <h1>Select Users for Your System</h1>
      {recommendedUsers.map((user) => (
        <FormControlLabel
          key={user}
          control={<Checkbox name={user} onChange={handleChange} />}
          label={user}
        />
      ))}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default UserSelection;
