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
      <h1>Add Custom Users</h1>
      <input
        type="text"
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="Add a custom user role"
      />
      <button onClick={addUser}>Add User</button>
      <ul>
        {customUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default AddCustomUsers;
