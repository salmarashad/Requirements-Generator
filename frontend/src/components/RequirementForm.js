import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const RequirementForm = ({ users, preFilledRequirements = [], onSubmit }) => {
  const [requirements, setRequirements] = useState([
    { user: "", action: "", outcome: "" },
  ]);
  const [savedRequirements, setSavedRequirements] = useState(
    preFilledRequirements
  );

  const handleChange = (index, field, value) => {
    const updated = [...requirements];
    updated[index][field] = value;
    setRequirements(updated);
  };

  const handleAddRequirement = () => {
    const valid =
      requirements[0].user && requirements[0].action && requirements[0].outcome;
    if (!valid) return;

    setSavedRequirements([...savedRequirements, requirements[0]]);
    setRequirements([{ user: "", action: "", outcome: "" }]);
  };

  const handleDelete = (index) => {
    const updated = [...savedRequirements];
    updated.splice(index, 1);
    setSavedRequirements(updated);
  };

  const handleSubmit = () => {
    onSubmit(savedRequirements);
  };

  return (
    <div className="step-container">
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <h3>Define Requirements</h3>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            mb: 2,
            p: 1.5,
            border: "1px solid #ddd",
            borderRadius: 1,
            backgroundColor: "#f9f9f9",
            width: "600px",
          }}
        >
          <Grid container spacing={1.5} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Select
                fullWidth
                size="small"
                value={requirements[0].user}
                onChange={(e) => handleChange(0, "user", e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select user
                </MenuItem>
                {users.map((user, idx) => (
                  <MenuItem key={idx} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="I want to..."
                value={requirements[0].action}
                onChange={(e) => handleChange(0, "action", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="So that..."
                value={requirements[0].outcome}
                onChange={(e) => handleChange(0, "outcome", e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </div>

      {/* Add Button */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <button
          onClick={handleAddRequirement}
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
          Add Requirement
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Display saved requirements */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
          {savedRequirements.map((req, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ccc",
                borderRadius: 1,
                p: 1,
                backgroundColor: "#f0f0f0",
              }}
            >
              <Typography variant="body1" sx={{ fontSize: "0.95rem" }}>
                As a <strong>{req.user}</strong>, I want to{" "}
                <strong>{req.action}</strong> so that{" "}
                <strong>{req.outcome}</strong>.
              </Typography>
              <IconButton onClick={() => handleDelete(index)} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </div>

      {/* Submit button */}
      <div style={{ textAlign: "center", padding: "20px" }}>
        <button onClick={handleSubmit} className="styled-button">
          Generate
        </button>
      </div>
    </div>
  );
};

export default RequirementForm;
