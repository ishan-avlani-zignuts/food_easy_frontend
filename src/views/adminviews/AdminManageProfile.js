import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { MdModeEdit } from "react-icons/md";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FaSave } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdminManageProfile = () => {
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    pic: "",
  });
  const [isEditable, setIsEditable] = useState(false);
  const [picLoading, setPicLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken._id;

      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`
        );
        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setEditableUser({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: "",
            pic: data.pic,
          });
        } else {
          toast.error("Failed to fetch user:", data.message);
        }
      } catch (error) {
        toast.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({
      ...editableUser,
      [name]: value,
    });
  };

  // const handleSave = async () => {
  //   const token = localStorage.getItem("token");
  //   const decodedToken = JSON.parse(atob(token.split(".")[1]));
  //   const userId = decodedToken._id;

  //   let updatedUser = { ...editableUser };
  //   if (editableUser.password === "") {
  //     delete updatedUser.password;
  //   } else {
  //    
  //     const salt = bcrypt.genSaltSync(10);
  //     updatedUser.password = bcrypt.hashSync(editableUser.password, salt);
  //   }

  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/api/users/${userId}`,
  //       updatedUser
  //     );
  //     if (response.status === 200) {
  //       setUser(response.data);
  //       setIsEditable(false);
  //       toast.success("user updated successfully");
  //     } else {
  //       toast.error("Failed to update user:", response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Error updating user:", error);
  //   }
  // };
const handleSave = async () => {
  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken._id;

  let updatedUser = { ...editableUser };
  if (editableUser.password === "") {
    delete updatedUser.password;
  }

  try {
    const response = await axios.put(
      `http://localhost:5000/api/users/${userId}`,
      updatedUser
    );
    if (response.status === 200) {
      setUser(response.data);
      setIsEditable(false);
      toast.success("User updated successfully");
    } else {
      toast.error("Failed to update user: " + response.data.message);
    }
  } catch (error) {
    toast.error("Error updating user: " + error.message);
  }
};
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      setPicLoading(false);
      return;
    }
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
          setEditableUser({
            ...editableUser,
            pic: data.url.toString(),
          });
          setPicLoading(false);
        })
        .catch((err) => {
          setPicLoading(false);
        });
    } else {
      setPicLoading(false);
      return;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      {user && (
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#1F2A40",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            gutterBottom
            color={"wheat"}
            fontWeight={"bold"}
          >
            Manage Profile
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={"15px"}
          >
            <img
              className="avater-image"
              alt="profile user"
              width="150px"
              height="150px"
              src={editableUser.pic}
              style={{ cursor: "pointer", borderRadius: "50%" }}
            />
          </Box>
          {isEditable && (
            <Button
              variant="contained"
              component="label"
              sx={{
                bgcolor: "#141B2D",
                "&:hover": {
                  bgcolor: "white",
                },
                mt: 2,
                color: "white",
                gap: 2,
                width: "200px",
                height: "auto",
                marginInline: "auto",
                mb: 2,
              }}
              disabled={!isEditable || picLoading}
            >
              Upload Profile Picture
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </Button>
          )}
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {isEditable ? (
              <>
                <TextField
                  fullWidth
                  name="firstname"
                  label="First Name"
                  value={editableUser.firstname}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={!isEditable}
                />
                <TextField
                  fullWidth
                  name="lastname"
                  label="Last Name"
                  value={editableUser.lastname}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={!isEditable}
                />
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  value={editableUser.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={!isEditable}
                />
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={editableUser.password}
                  onChange={handleInputChange}
                  variant="outlined"
                  disabled={!isEditable}
                />
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Typography variant="h4" color="wheat">
                    First Name:
                  </Typography>
                  <Typography variant="h4" color="white">
                    {editableUser.firstname}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Typography variant="h4" color="wheat">
                    <strong>Last Name:</strong>
                  </Typography>
                  <Typography variant="h4" color="white">
                    {editableUser.lastname}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Typography variant="h4" color="wheat">
                    <strong>Email:</strong>
                  </Typography>
                  <Typography variant="h4" color="white">
                    {editableUser.email}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 1,
                    mb: 2,
                  }}
                >
                  <Typography variant="h4" color="wheat">
                    <strong>Password:</strong>
                  </Typography>
                  <Typography variant="h4" color="white">
                    ********
                  </Typography>
                </Box>
              </>
            )}
            {isEditable && (
              <Button
                onClick={handleSave}
                variant="contained"
                sx={{
                  bgcolor: "#F0E650",
                  "&:hover": {
                    bgcolor: "white",
                  },
                  mt: 2,
                  color: "black",
                  gap: 2,
                  width: "200px",
                  height: "auto",
                  marginInline: "auto",
                }}
                disabled={picLoading}
              >
                <FaSave />
                {picLoading ? "Loading..." : "Save Changes"}
              </Button>
            )}

            <Button
              onClick={() => setIsEditable(!isEditable)}
              sx={{
                bgcolor: "#F0E650",
                "&:hover": {
                  bgcolor: "white",
                },
                mt: 2,
                mb: 2,
                color: "black",
                gap: 2,
                width: "200px",
                height: "auto",
                marginInline: "auto",
              }}
            >
              <MdModeEdit />
              {isEditable ? "Cancel Edit" : "Edit Details"}
            </Button>
          </Box>
        </Box>
      )}
      <ToastContainer />
    </Container>
  );
};

export default AdminManageProfile;
