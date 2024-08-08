import React, { useEffect, useState } from "react";
import { Box, Button, Modal, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from 'axios';
import { tokens } from "../../theme";
import Invoice from "../../components/Invoice";

const ViewPastOrders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "createdAt", headerName: "Date", width: 150 },
    { field: "dishes", headerName: "Dish Name", width: 250 },
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
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewInvoice(params.row)}
        >
          View Invoice
        </Button>
      ),
    },
  ];

  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken._id;

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `https://food-easy-vp5t.onrender.com/api/order/getordersbyid/${userId}`
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

  const handleViewInvoice = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

useEffect(() => {
  console.log("Fetching orders...");
  fetchOrders();
  //eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "600px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          {selectedOrder && (
            <Invoice
              order={selectedOrder}
              open={isModalOpen}
              handleClose={handleCloseModal}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ViewPastOrders;
