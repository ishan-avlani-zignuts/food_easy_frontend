
import { Box, Typography } from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["lightblue", "silver", "wheat", "gray", "pink", "lightgreen"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const OrdersGraph = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userId = decodedToken ? decodedToken._id : null;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        console.error("No userId found in the token.");
        setLoading(false);
        return;
      }

      console.log("user id", userId);
      try {
        const response = await axios.get(
          `https://food-easy-vp5t.onrender.com/api/order/getordersbyid/${userId}`
        );
        const data = response.data;
        console.log("data", data);

        const formattedData = data.map((order) => ({
          id: order._id,
          createdAt: new Date(order.createdAt).toLocaleDateString(),
          dishes: order.items.map((item) => item.dish).join(", "),
          totalAmount: order.totalAmount,
          paymentStatus: order.paymentStatus,
          items: order.items,
        }));
        setUserOrders(formattedData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const aggregateFoodQuantities = (orders) => {
    const foodQuantities = {};

    if (!orders) return [];
    console.log("foodquantities", foodQuantities);
    orders.forEach((order) => {
      if (order.items) {
        order.items.forEach((item) => {
          if (foodQuantities[item.dish]) {
            foodQuantities[item.dish] += item.quantity;
          } else {
            foodQuantities[item.dish] = item.quantity;
          }
        });
      }
    });

    return Object.keys(foodQuantities).map((dish) => ({
      name: dish,
      value: foodQuantities[dish],
    }));
  };

  const data = aggregateFoodQuantities(userOrders);

  console.log("data of aggregate", data);

  return (
    <div style={{ width: "100%", height: 800 }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginInline: "auto",
          }}
        >
          <img
            src="https://miraaf.com/assets/images/no_order1.png"
            alt="loading"
          />
        </Box>
      ) : (
        <>
          <Box>
            <Typography
              variant="h1"
              sx={{ color: "wheat", textAlign: "center", paddingTop: "50px" }}
            >
              View your top choices !!
            </Typography>
          </Box>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={200}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                formatter={(value, entry) =>
                  `${entry.payload.name}: ${entry.payload.value}`
                }
                align="center"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default OrdersGraph;
