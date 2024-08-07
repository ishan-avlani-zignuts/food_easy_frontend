import React, { useEffect, useState } from "react";
import { Box, Modal, TextField, Button } from "@mui/material";
import axios from "axios";

const EditFood = ({ foodId, onClose }) => {
  const [foodData, setFoodData] = useState({
    dish: "",
    imgdata: "",
    desc: "",
    price: "",
    rating: "",
  });

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/getfood/${foodId}`
        );
        setFoodData(response.data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchFoodData();
  }, [foodId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/editfood/${foodId}`,
        foodData
      );
      onClose();
    } catch (error) {
      console.error("Error updating food data:", error);
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
        }}
      >
        <TextField
          label="Dish Name"
          name="dish"
          value={foodData.dish}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          label="Image"
          name="imgdata"
          value={foodData.imgdata}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Details"
          name="desc"
          value={foodData.desc}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          value={foodData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rating"
          name="rating"
          value={foodData.rating}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditFood;
