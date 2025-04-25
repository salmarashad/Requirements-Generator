import React, { useState } from "react";
import { Chip } from "@mui/material";

const UserSelection = ({ recommendedUsers, onNext }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(user)) {
        // Remove user from selectedUsers
        return prevSelectedUsers.filter((u) => u !== user);
      } else {
        // Add user to selectedUsers
        return [...prevSelectedUsers, user];
      }
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
          width: "80%", // Allow it to expand within the container
          margin: "0 auto", // Center the div horizontally
          height: "auto", // Let the height adjust based on the content
          marginTop: "3vh",
        }}
      >
        {recommendedUsers.map((user) => (
          <Chip
            key={user}
            label={user}
            clickable
            color={selectedUsers.includes(user) ? "#658e3c76" : "primary"}
            onClick={() => handleChange(user)}
            style={{
              margin: "4px",
              fontFamily: "IBM Plex Mono",
              backgroundColor: selectedUsers.includes(user)
                ? "#4a8cce" // if selected
                : "#6caad7", //  unselected state
              color: "#fff",
              fontSize: "18px",
            }}
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
