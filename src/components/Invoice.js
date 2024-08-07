import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Invoice = ({ order }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box m="20px" p="20px" border="1px solid #ddd" borderRadius="8px">
      <Typography variant="h4" gutterBottom>
        Invoice
      </Typography>
      <Typography variant="h6">Order ID: {order.id}</Typography>
      <Typography variant="body1">Date: {order.createdAt}</Typography>
      <Typography variant="body1">Dishes: {order.dishes}</Typography>
      <Typography variant="body1">
        Total Amount: ${order.totalAmount}
      </Typography>
      <Typography variant="body1">
        Payment Status: {order.paymentStatus}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrint}
        sx={{ mt: 2 }}
      >
        Print Invoice
      </Button>
    </Box>
  );
};

export default Invoice;
