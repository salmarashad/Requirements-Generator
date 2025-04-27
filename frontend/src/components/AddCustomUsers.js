import React, { useState } from "react";

const AddCustomUsers = ({ onNext }) => {
  const [newUser, setNewUser] = useState("");
  const [customUsers, setCustomUsers] = useState([]);

  const addUser = () => {
    if (newUser.trim()) {
      setCustomUsers((prevState) => [...prevState, newUser]);
      setNewUser("");
    }
  };

  const handleNext = () => {
    onNext(customUsers);
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
        <h3>Add Users</h3>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "1rem",
            }}
          >
            <input
              type="text"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              placeholder="Add a custom user role"
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "250px",
                fontSize: "16px",
              }}
            />
            <button
              onClick={addUser}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#4a8cce",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Add User
            </button>
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {customUsers.map((user, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "8px",
                  fontSize: "16px",
                  color: "#4a8cce",
                  fontWeight: "500",
                }}
              >
                {user}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button onClick={handleNext} className="styled-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default AddCustomUsers;
