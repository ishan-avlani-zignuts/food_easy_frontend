import React from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import axios from 'axios';
import Headers from "../../components/Headers";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";

const Add = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("dish", values.dish);
    formData.append("imgdata", values.imgdata);
    formData.append("desc", values.desc);
    formData.append("price", values.price);
    formData.append("rating", values.rating);

    try {
      const url = "https://food-easy-vp5t.onrender.com/api/admin/addfood";
      const { data: res } = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response from server:", res);
      navigate("/addfood");
      console.log("Food Added Successfully");
    } catch (error) {
      console.error("Error during signup:", error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box width="100%" height="100%">
      <Headers />

      <Box
        backgroundColor={colors.primary[400]}
        borderRadius="8px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        p="40px"
        m="40px auto"
        maxWidth="600px"
      >
        <Typography
          variant="h4"
          fontWeight="600"
          color={colors.grey[100]}
          align="center"
          mb="20px"
        >
          Add New Dish
        </Typography>

        <Formik
          initialValues={{
            dish: "",
            imgdata: null,
            desc: "",
            price: "",
            rating: "",
          }}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Dish Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dish}
                  name="dish"
                  error={!!touched.dish && !!errors.dish}
                  helperText={touched.dish && errors.dish}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  component="label"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p="10px"
                  border="1px dashed #ccc"
                  borderRadius="4px"
                  gridColumn="span 4"
                  cursor="pointer"
                  color={colors.grey[100]}
                >
                  <input
                    type="file"
                    onChange={(e) =>
                      setFieldValue("imgdata", e.currentTarget.files[0])
                    }
                    name="imgdata"
                    style={{ display: "none" }}
                  />
                  {values.imgdata ? values.imgdata.name : "Upload Image"}
                </Box>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Details"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.desc}
                  name="desc"
                  error={!!touched.desc && !!errors.desc}
                  helperText={touched.desc && errors.desc}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  name="price"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Ratings"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.rating}
                  name="rating"
                  error={!!touched.rating && !!errors.rating}
                  helperText={touched.rating && errors.rating}
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>
              <Box display="flex" justifyContent="center" mt="30px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Add Food
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Add;
