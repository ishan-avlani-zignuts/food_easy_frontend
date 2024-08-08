import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Headers from "../../components/Headers";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


const Home = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartLength, setCartLength] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

   const { user } = useAuth();

   useEffect(() => {
     console.log("Home component mounted");
     console.log("User in Home:", user);
     if (user?.role === "admin") {
       if (location.pathname !== "/admin/admindashboard") {
         navigate("/admin/admindashboard");
     
       }
     } else {
       if (location.pathname !== "/home") {
         navigate("/home");
       }
     }
   }, [user, location.pathname, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://food-easy-vp5t.onrender.com/api/admin/getfood"
        );
        setCartData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();

    const fetchCartLength = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const userId = decodedToken._id;
          const response = await axios.get(
            `https://food-easy-vp5t.onrender.com/api/cart/${userId}`
          );
          setCartLength(response.data.length);
        }
      } catch (err) {
        console.log("Error fetching cart length:", err);
      }
    };

    fetchCartLength();
  }, []);

  const send = async (item) => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken._id;

     await axios.post(
       "https://food-easy-vp5t.onrender.com/api/cart/addtocart",
       {
         userId: userId,
         foodId: item._id,
       }
     );
      setCartLength((prev) => prev + 1);
      toast.success("Item added to your cart");
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;


  
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Headers cartLength={cartLength} />
      <ToastContainer />
      <Box sx={{ mt: 4, p: 2 }}>
        <Box>
          <Typography
            variant="h2"
            gutterBottom
            sx={{ fontWeight: 400, color: "wheat", textAlign: "center" }}
          >
            Welcome to Food Easy !
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 400,
              color: "wheat",
              textAlign: "center",
              paddingBottom: "25px",
            }}
          >
            Order your favourite items and fulfill your cravings with variety of
            muliti-cuisine menu
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {cartData.map((element, index) => (
            <Card
              key={index}
              sx={{
                width: 300,
                border: "none",
                mb: 4,
                mx: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                image={`https://food-easy-vp5t.onrender.com/${element.imgdata}`}
                alt={element.dish}
                sx={{ width: "100%", height: 200 }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  {element.dish}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {element.rating} ★
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  ₹ {element.price}
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                <IconButton>
                  <img
                    src="https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp"
                    alt="Add"
                    style={{ width: 24, height: 24 }}
                  />
                </IconButton>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#ff3054",
                    color: "#fff",
                    ml: 2,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#ff3054cc",
                    },
                  }}
                  onClick={() => send(element)}
                >
                  Add To Cart
                </Button>
                <IconButton>
                  <img
                    src="https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp"
                    alt="Delete"
                    style={{ width: 24, height: 24, ml: 2 }}
                  />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
