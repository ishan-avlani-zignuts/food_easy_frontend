import React, { useEffect, useState } from "react";
import { Box, useTheme, IconButton, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from 'axios';
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditFood from "../../components/EditFood";
import DeleteFood from "../../components/DeleteFood";

const ManageFood = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "dish", headerName: "Dish Name", width: 150 },
    { field: "imgdata", headerName: "Image", width: 200 },
    { field: "desc", headerName: "Details", width: 200 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "rating", headerName: "Rating", width: 250 },
    {
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-around" width="100%">
          <IconButton
            onClick={() => {
              setSelectedFood(params.row.id);
              setShowEditModal(true);
            }}
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() => {
              setSelectedFood(params.row.id);
              setShowDeleteModal(true);
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "https://food-easy-vp5t.onrender.com/api/admin/getfood"
        );
        const formattedData = response.data.map((food) => ({
          id: food._id,
          ...food,
        }));
        setContacts(formattedData);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <Box sx={{ marginInline: "auto" }} m="20px">
      <Typography variant="h4" fontWeight="600" color="wheat" mb="20px">
        Manage Food Items
      </Typography>
      <Box
        m="0 auto"
        width="100%"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            color: colors.grey[100],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            color: colors.grey[100],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiDataGrid-root .MuiDataGrid-container--top [role=row]": {
            backgroundColor: "#3E4396",
          },
        }}
      >
        <DataGrid
          rows={contacts}
          columns={columns}
          loading={loading}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id}
        />
      </Box>
      {showEditModal && (
        <EditFood
          foodId={selectedFood}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteFood
          foodId={selectedFood}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </Box>
  );
};

export default ManageFood;
