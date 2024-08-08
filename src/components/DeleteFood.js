import React from "react";
import { Box, Modal, Button, Typography } from "@mui/material";
import axios from 'axios';

const DeleteFood = ({ foodId, onClose }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/deletefood/${foodId}`);
      onClose();
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" mb={2}>
          Are you sure you want to delete this food item?
        </Typography>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          sx={{ mr: 2 }}
        >
          Delete
        </Button>
        <Button onClick={onClose} variant="contained" color="primary">
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteFood;
