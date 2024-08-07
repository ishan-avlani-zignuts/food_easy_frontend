import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import BarChart from "../../components/BarChart"; 
import { useEffect, useState } from "react";
import axios from "axios";
import Headers from "../../components/Headers";
import StatBox from "../../components/StatBox";
import GroupIcon from "@mui/icons-material/Group";
import PieChartIcon from "@mui/icons-material/PieChart";

const AdminDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0); 
  const [totalUsers, setTotalUsers] = useState(0); 
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/order/getallorders"
      );
      const orders = response.data;
      console.log("orders",orders)
      const totalOrders = orders.length;
      setTotalOrders(totalOrders);
      const dishMap = {};
      let total = 0;
      orders.forEach((order) => {
        order.items.forEach((item) => {
          const dishName = item.dish;
          const amount = item.price * item.quantity;
          total += amount;
          if (dishMap[dishName]) {
            dishMap[dishName].totalAmount += amount;
          } else {
            dishMap[dishName] = { dish: dishName, totalAmount: amount };
          }
        });
      });

      const processedData = Object.values(dishMap);
      setChartData(processedData);
      setTotalRevenue(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users"
      );
      const users = response.data;
      console.log("users", users);
      const totalUsers = users.length;
      setTotalUsers(totalUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
    fetchUsers();
  }, []);

  return (
    <Box width={"100%"} height={"100%"}>
      <Headers />
      <Box
        backgroundColor={colors.primary[400]}
        margin={"50px auto"}
        padding={"20px"}
        borderRadius={"8px"}
        boxShadow={"0 4px 8px rgba(0, 0, 0, 0.1)"}
        width={"80%"}
      >
        <Box
          margin={"25px"}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Revenue Generated
            </Typography>
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.greenAccent[500]}
            >
              ${totalRevenue.toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <IconButton>
              <DownloadOutlinedIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
        </Box>
        <Box height="350px" margin={"25px"}>
          <BarChart data={chartData} />
        </Box>
      </Box>

      <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", textAlign:"center", flexDirection:"column", marginInline: "auto", margin: "50px auto", width:"80%", gap:"10px"}}>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="Total Orders"
                subtitle={totalOrders}
                icon={
                  <PieChartIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              width="100%"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="Total Users"
                subtitle={totalUsers}
                icon={
                  <GroupIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
