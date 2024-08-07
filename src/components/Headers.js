import React, { useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Headers = ({ cartLength }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AppBar position="static" style={{ background: "#1F2A40" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <NavLink
            to="/"
            className="text-decoration-none text-light mx-2"
            style={{ textDecoration: "none" }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <Typography variant="h4" color="wheat" fontWeight={"bold"}>
                <img
                  src="data:image/png;base64,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"
                  alt="logo"
                  width={"40px"}
                  height={"auto"}
                />
              </Typography>
              <Typography
                variant="h4"
                color="wheat"
                fontWeight={"bold"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                Food Easy
              </Typography>
            </Box>
          </NavLink>
        </Box>

        {!user && !admin && (
          <>
            <Button
              sx={{ color: "wheat", backgroundColor: "grey" }}
              aria-controls={anchorEl ? "login-menu" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              Login
            </Button>
            <Menu
              id="login-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <NavLink
                  to="/userlogin"
                  className="text-decoration-none text-light"
                >
                  User Login
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink
                  to="/adminlogin"
                  className="text-decoration-none text-light"
                >
                  Admin Login
                </NavLink>
              </MenuItem>
            </Menu>
            <NavLink
              to="/signup"
              className="text-decoration-none text-light mx-2"
            >
              <Button sx={{ color: "wheat", backgroundColor: "grey" }}>
                Signup
              </Button>
            </NavLink>
          </>
        )}

        {user && (
          <NavLink
            to="/cartpage"
            className="text-decoration-none text-light mx-2"
          >
            <IconButton sx={{ color: "wheat" }}>
              <Badge badgeContent={cartLength} color="success">
                <ShoppingCartIcon sx={{ fontSize: "30px" }} />
              </Badge>
            </IconButton>
          </NavLink>
        )}

        {user && (
          <Button
            sx={{ color: "black", backgroundColor: "wheat", ml: 2 }}
            onClick={handleLogout}
          >
            <IoMdLogOut style={{ fontSize: "large" }} />{" "}
            <Typography sx={{ fontSize: "medium", fontWeight: "bold" }}>
              Logout
            </Typography>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Headers;
