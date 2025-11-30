import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Avatar, Divider } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";

const AboutUs = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUser();
    fetchHistory();
  }, []);

  // Fetch logged-in user details
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.error("User fetch error:", error);
    }
  };

  // Fetch user prediction history
  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/crop/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory(res.data);
    } catch (error) {
      console.error("History fetch error:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      {/* USER PROFILE SECTION */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          alignItems: "center",
          p: 3,
          borderRadius: "16px",
          boxShadow: 3,
          background: "#ffffff10",
          backdropFilter: "blur(10px)",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#4caf50",
            width: 70,
            height: 70,
          }}
        >
          <PersonIcon sx={{ fontSize: 40 }} />
        </Avatar>

        <Box>
          <Typography variant="h5" fontWeight={700}>
            {user ? `${user.firstname} ${user.lastname}` : "User"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user?.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Member since:{" "}
            {user ? new Date(user.createdAt).toLocaleDateString() : "—"}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* HISTORY SECTION */}
      <Box
        sx={{
          p: 3,
          borderRadius: "16px",
          boxShadow: 3,
          background: "#ffffff10",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <HistoryIcon />
          <Typography variant="h6" fontWeight={700}>
            Your Crop Prediction History
          </Typography>
        </Box>

        {history.length === 0 ? (
          <Typography color="text.secondary">
            You haven't made any predictions yet.
          </Typography>
        ) : (
          history.map((item, index) => (
            <Box
              key={index}
              sx={{
                mt: 2,
                p: 2,
                borderRadius: "12px",
                boxShadow: 2,
                bgcolor: "white",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Crop: {item.crop}
              </Typography>

              <Typography>Disease: {item.disease}</Typography>

              {item.cause?.length > 0 && (
                <Typography sx={{ mt: 1 }}>
                  <strong>Cause:</strong> {item.cause.join(", ")}
                </Typography>
              )}

              {item.prevention?.length > 0 && (
                <Typography sx={{ mt: 1 }}>
                  <strong>Prevention:</strong> {item.prevention.join(", ")}
                </Typography>
              )}

              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Date: {new Date(item.createdAt).toLocaleDateString()}
              </Typography>

              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt="crop"
                  style={{
                    marginTop: "10px",
                    width: "130px",
                    borderRadius: "10px",
                  }}
                />
              )}
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
};

export default AboutUs;
