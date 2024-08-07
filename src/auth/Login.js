import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

const AdminLogin = () => {

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, user, loginComplete } = useAuth();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    console.log("Login effect triggered");
    console.log("User:", user);
    console.log("Login complete:", loginComplete);
    if (loginComplete && user) {
      console.log("Navigating after login");
      if (user.role === "admin") {
        navigate("/admin/admindashboard");
      } else {
        navigate("/home");
      }
    }
  }, [loginComplete, user, navigate]);
  return (
    <Box
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#141B2D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          width: "900px",
          height: "500px",
          display: "flex",
          borderRadius: "10px",
          boxShadow:
            "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
        }}
      >
        <Box
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
          >
            <Typography
              variant="h1"
              style={{ fontSize: "40px", marginBottom: "10px",color:"black" }}
            >
              Login
            </Typography>
            <TextField
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              sx={{
                marginTop: "10px",
                "& .MuiInputBase-input": { color: "black" },
                "& .MuiInputLabel-root": { color: "black" },
                "& .MuiInputBase-input::placeholder": { color: "black" },
                width: "370px",
                borderRadius: "10px",
                backgroundColor: "#edf5f3",
                margin: "5px 0",
                fontSize: "14px",
              }}
            />
            <TextField
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              sx={{
                marginTop: "10px",
                "& .MuiInputBase-input": { color: "black" },
                "& .MuiInputLabel-root": { color: "black" },
                "& .MuiInputBase-input::placeholder": { color: "black" },
                width: "370px",
                borderRadius: "10px",
                backgroundColor: "#edf5f3",
                margin: "5px 0",
                fontSize: "14px",
              }}
            />
            {error && (
              <Box
                style={{
                  width: "370px",
                  margin: "5px 0",
                  fontSize: "14px",
                  backgroundColor: "#f34646",
                  color: "white",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
              >
                {error}
              </Box>
            )}
            <Button
              type="submit"
              style={{
                border: "none",
                outline: "none",
                padding: "12px 0",
                backgroundColor: "#3bb19b",
                color: "white",
                borderRadius: "20px",
                width: "180px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                margin: "10px",
              }}
            >
              Sign In
            </Button>
          </form>
        </Box>
        <Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#3bb19b",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Typography
            variant="h1"
            style={{
              marginTop: "0",
              color: "white",
              fontSize: "40px",
              alignSelf: "center",
            }}
          >
            New Here?
          </Typography>
          <Link to="/signup">
            <Button
              type="button"
              style={{
                border: "none",
                outline: "none",
                padding: "12px 0",
                backgroundColor: "white",
                borderRadius: "20px",
                width: "180px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                margin: "10px",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLogin;
