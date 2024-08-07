import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  CardContent,
  Divider,
  CircularProgress,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const SuccessPage = () => {
  const [order, setOrder] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/checkout/success?session_id=${sessionId}`
        );
        const data = await response.json();
        if (response.ok) {
          setOrder(data.order);
        } else {
          console.error("Failed to fetch order:", data.message);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (sessionId) {
      fetchOrder();
    }
  }, [sessionId]);

  if (!order) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#f5f5f5"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      marginTop={"210px"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      maxHeight="600px"
      minWidth="500px"
      bgcolor="#1F2A40"
      marginInline={"auto"}
    >
      <CheckCircleIcon sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
      <Typography variant="h3" gutterBottom>
        Order Confirmed!
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Thank you for your purchase.
      </Typography>
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 800, mt: 4, p: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Order Summary
          </Typography>
          <Divider sx={{ my: 3 }} />
          {order.items.map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              my={2}
            >
              <Box display="flex" alignItems="center">
                <ShoppingCartIcon sx={{ mr: 2, color: "#ff9800" }} />
                <Typography variant="h6">{item.dish}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" sx={{ mr: 3 }}>
                  ₹{item.price}
                </Typography>
                <Typography variant="h6">x{item.quantity}</Typography>
              </Box>
            </Box>
          ))}
          <Divider sx={{ my: 3 }} />
          <Box display="flex" justifyContent="space-between" my={3}>
            <Typography variant="h5">Total Amount:</Typography>
            <Typography variant="h5">₹{order.totalAmount}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Payment Status:</Typography>
            <Typography
              variant="h5"
              sx={{
                color: order.paymentStatus === "Paid" ? "#4caf50" : "#f44336",
              }}
            >
              {order.paymentStatus}
            </Typography>
          </Box>
        </CardContent>
      </Paper>
    </Box>
  );
};

export default SuccessPage;
