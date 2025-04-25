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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Select Users for Your System</h3>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center", // Center vertically within the parent
          alignItems: "center", // Center horizontally
          flexWrap: "wrap", // Allow items to wrap onto the next line if necessary
          gap: "8px", // Add some spacing between checkboxes
          width: "90%", // Allow it to expand within the container
          margin: "0 auto", // Center the div horizontally
          height: "auto", // Let the height adjust based on the content
          marginTop: "3vh",
        }}
      >
        {recommendedUsers.map((user) => (
          <FormControlLabel
            key={user}
            control={<Checkbox name={user} onChange={handleChange} />}
            label={user}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5vh",
        }}
      >
        <button onClick={handleNext} className="styled-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default UserSelection;
