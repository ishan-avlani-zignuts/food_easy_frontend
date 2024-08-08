import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField, Tabs, Tab } from "@mui/material";


const Signup = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [firstname, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const [role, setRole] = useState("user");
  const [tabIndex, setTabIndex] = useState(0);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!firstname || !lastname || !email || !password) {
      console.log("Please fill all fields");
      setPicLoading(false);
      return;
    }
    console.log(firstname, lastname, email, password, pic, role);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://food-easy-vp5t.onrender.com/api/users",
        {
          firstname,
          lastname,
          email,
          password,
          pic,
          role,
        },
        config
      );
      console.log(data);
      console.log("success");
      setPicLoading(false);
      navigate("/login");
    } catch (error) {
      console.log("error", error.response.data.message);
      setError(error.response.data.message);
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      console.log("Please select an image");
      setPicLoading(false);
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      console.log("Please select an image");
      setPicLoading(false);
      return;
    }
  };

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
          height: "600px",
          display: "flex",
          borderRadius: "10px",
          boxShadow:
            "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
        }}
      >
        <Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#3bb19b",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
        >
          <Typography
            variant="h1"
            style={{
              marginTop: 0,
              color: "white",
              fontSize: "35px",
              alignSelf: "center",
            }}
          >
            Welcome Back
          </Typography>
          <Link to="/login">
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
              }}
            >
              Sign in
            </Button>
          </Link>
        </Box>
        <Box
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={(e, newValue) => {
              setTabIndex(newValue);
              setRole(newValue === 0 ? "user" : "admin");
            }}
            indicatorColor="primary"
            textColor="primary"
            centered
            sx={{
              marginBottom: "20px",
              "& .MuiTab-root": {
                color: "black",
              },
              "& .Mui-selected": {
                color: "black",
                backgroundColor: "wheat",
              },
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
            }}
          >
            <Tab label="User" />
            <Tab label="Admin" />
          </Tabs>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h1" style={{ fontSize: "40px", marginTop: 0 }}>
              {tabIndex === 0 ? "User Signup" : "Admin Signup"}
            </Typography>
            <TextField
              variant="outlined"
              type="text"
              placeholder="First Name"
              name="first-name"
              id="first-name"
              onChange={(e) => setName(e.target.value)}
              required
              sx={{
                marginTop: "10px",
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "black",
                },
                width: "370px",
                borderRadius: "10px",
                backgroundColor: "#edf5f3",
                margin: "5px 0",
                fontSize: "14px",
              }}
            />
            <TextField
              sx={{
                marginTop: "10px",
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "black",
                },
                width: "370px",
                borderRadius: "10px",
                backgroundColor: "#edf5f3",
                margin: "5px 0",
                fontSize: "14px",
              }}
              type="text"
              placeholder="Last Name"
              name="last-name"
              id="last-name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <TextField
              sx={{
                marginTop: "10px",
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "black",
                },
                width: "370px",
                borderRadius: "10px",
                backgroundColor: "#edf5f3",
                margin: "5px 0",
                fontSize: "14px",
              }}
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              sx={{
                marginTop: "10px",
                "& .MuiInputBase-input": {
                  color: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "black",
                },
                width: "370px",
                borderRadius: "10px",
                backgroundColor: "#edf5f3",
                margin: "5px 0",
                fontSize: "14px",
              }}
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant="contained"
              component="label"
              style={{
                marginTop: "10px",
                backgroundColor: "#3bb19b",
                color: "white",
                margin: "10px",
                width: "375px",
                border: "none",
                outline: "none",
                padding: "12px 0",
                borderRadius: "20px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Upload Profile Picture
              <input
                id="pic"
                type="file"
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </Button>
            {error && (
              <Box
                style={{
                  width: "370px",
                  padding: "15px",
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
                backgroundColor: "#3bb19b",
                color: "white",
                margin: "10px",
                width: "375px",
                border: "none",
                outline: "none",
                padding: "12px 0",
                borderRadius: "20px",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
              }}
              disabled={picLoading}
            >
              {picLoading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
