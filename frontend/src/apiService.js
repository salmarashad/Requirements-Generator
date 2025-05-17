const API_URL = "http://localhost:8080/api";

const apiService = {
  generateRoles: async (description) => {
    try {
      const response = await fetch(`${API_URL}/generate-roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate roles");
      }

      return await response.json();
    } catch (error) {
      console.error("Error generating roles:", error);
      throw error;
    }
  },

  generateStories: async (description, roles) => {
    try {
      const response = await fetch(`${API_URL}/generate-stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description, roles }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate user stories");
      }

      return await response.json();
    } catch (error) {
      console.error("Error generating stories:", error);
      throw error;
    }
  },

  generateRequirements: async (stories) => {
    try {
      const response = await fetch(
        `${API_URL}/generate-requirements-from-stories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stories }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate requirements");
      }

      return await response.json();
    } catch (error) {
      console.error("Error generating requirements:", error);
      throw error;
    }
  },
};

export default apiService;
