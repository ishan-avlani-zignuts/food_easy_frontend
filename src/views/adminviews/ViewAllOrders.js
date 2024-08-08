import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from 'axios';
import { tokens } from "../../theme";

const ViewAllOrders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "Id", width: 150 },
    { field: "createdAt", headerName: "Date", width: 150 },
    { field: "dishes", headerName: "Dish Name", width: 350 },
    { field: "totalAmount", headerName: "Amount", width: 150 },
    {
      field: "paymentStatus",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <span
          style={{
            backgroundColor: params.value === "Paid" ? "red" : "green",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          {params.value}
        </span>
      ),
    },
  ];

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `https://food-easy-vp5t.onrender.com/api/order/getallorders`
      );
      const data = response.data;
      const formattedData = data.map((order) => ({
        id: order._id,
        createdAt: new Date(order.createdAt).toLocaleDateString(),
        dishes: order.items.map((item) => item.dish).join(", "),
        totalAmount: order.totalAmount,
        paymentStatus: order.paymentStatus,
      }));
      setUserOrders(formattedData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching orders...");
    fetchOrders();
  }, []);

  return (
    <Box m="20px" sx={{ marginInline: "auto" }}>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
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
          rows={userOrders}
          columns={columns}
          loading={loading}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id}
        />
      </Box>
    </Box>
  );
};

export default ViewAllOrders;
