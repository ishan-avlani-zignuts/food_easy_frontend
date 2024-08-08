import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { FaCcMastercard } from "react-icons/fa6";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CartDetails = ({ onCartChange }) => {
  const [carts, setCarts] = useState([]);
  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);

  const token = localStorage.getItem("token");
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken._id;

  const fetchCart = async () => {
    try {
      const response = await fetch(
        `https://food-easy-vp5t.onrender.com/api/cart/getcart/${userId}`
      );
      const data = await response.json();
      if (response.ok) {
        setCarts(data.items);
        calculateTotal(data.items);
        calculateTotalQuantity(data.items);
        onCartChange(data.items.length);
      } else {
        toast.error("Failed to fetch cart:", data.message);
      }
    } catch (error) {
      toast.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIncrement = async (item) => {
    try {
      const response = await fetch(
        "https://food-easy-vp5t.onrender.com/api/cart/addtocart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, foodId: item.foodId._id }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCarts(data.items);
        calculateTotal(data.items);
        calculateTotalQuantity(data.items);
        fetchCart();
      } else {
        toast.error("Failed to increment item in cart:", data.message);
      }
    } catch (error) {
      toast.error("Failed to increment item in cart:", error);
    }
  };

  const handleDecrement = async (item) => {
    try {
      if (item.quantity <= 1) {
        await removeFromCart(item);
      } else {
        const response = await fetch(
          "https://food-easy-vp5t.onrender.com/api/cart/updatecart",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              foodId: item.foodId._id,
              quantity: item.quantity - 1,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setCarts(data.items);
          calculateTotal(data.items);
          calculateTotalQuantity(data.items);
          fetchCart();
        } else {
          toast.error("Failed to update cart item quantity:", data.message);
        }
      }
    } catch (error) {
      toast.error("Error updating cart item quantity:", error);
    }
  };

  const removeFromCart = async (item) => {
    try {
      const response = await fetch(
        "https://food-easy-vp5t.onrender.com/api/cart/removefromcart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, foodId: item.foodId._id }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCarts(data.items);
        calculateTotal(data.items);
        calculateTotalQuantity(data.items);
        toast.success("Item removed from cart");
        fetchCart();
      } else {
        toast.error("Failed to remove item from cart:", data.message);
      }
    } catch (error) {
      toast.error("Error removing item from cart:", error);
    }
  };

  const emptyCart = async () => {
    try {
      for (const item of carts) {
        await removeFromCart(item);
      }
      toast.success("Your cart is empty");
    } catch (error) {
      toast.error("Error emptying cart:", error);
    }
  };

  const calculateTotal = (items) => {
    let totalprice = 0;
    items.forEach((item) => {
      totalprice += item.foodId.price * item.quantity;
    });
    setPrice(totalprice);
  };

  const calculateTotalQuantity = (items) => {
    let totalquantity = 0;
    items.forEach((item) => {
      totalquantity += item.quantity;
    });
    setTotalQuantity(totalquantity);
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51PdUX5RqIUA2dCaKEfliNbtHnymo7QJrCFKx6ouMjQB9dOEKeXe08crCjJmY7352rKahNZjbKmq9B57ocsJOabBB00jset48WV"
    );

    try {
      const body = {
        userId,
        products: carts.map((item) => ({
          dish: item.foodId.dish,
          imgdata: item.foodId.imgdata,
          price: item.foodId.price,
          qnty: item.quantity,
          foodId: item.foodId._id,
        })),
      };

      const headers = { "Content-Type": "application/json" };
      const response = await fetch(
        "https://food-easy-vp5t.onrender.com/api/checkout",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create Stripe Checkout session");
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while processing your payment.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={5}
      mb={5}
      sx={{ marginInline: "auto" }}
    >
      <ToastContainer />
      <Box width="100%">
        <Paper style={{ backgroundColor: "#1F2A40" }}>
          <Box
            bgcolor=""
            p={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" color="wheat">
              Cart Items {carts.length > 0 ? `(${carts.length})` : ""}
            </Typography>
            {carts.length > 0 && (
              <Button
                variant="contained"
                color="error"
                size="medium"
                onClick={emptyCart}
              >
                <MdDelete style={{ marginRight: "10px", fontSize: "large" }} />
                Empty Cart
              </Button>
            )}
          </Box>
          <TableContainer>
            {carts.length === 0 ? (
              <Box textAlign="center" py={5}>
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
                    src="https://www.ruuhbythebrandstore.com/images/cart_is_empty.png"
                    alt="loading"
                  />
                </Box>
              </Box>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "wheat", fontSize: "16px" }}>
                      Action
                    </TableCell>
                    <TableCell sx={{ color: "wheat", fontSize: "16px" }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ color: "wheat", fontSize: "16px" }}>
                      Price
                    </TableCell>
                    <TableCell sx={{ color: "wheat", fontSize: "16px" }}>
                      Qty
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "wheat", fontSize: "16px" }}
                    >
                      Total Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {carts.map((data) => (
                    <TableRow key={data.foodId._id}>
                      <TableCell>
                        <Button
                          style={{ color: "yellow", fontSize: "x-large" }}
                          onClick={() => removeFromCart(data)}
                        >
                          <MdDelete />
                        </Button>
                      </TableCell>
                      <TableCell>{data.foodId.dish}</TableCell>
                      <TableCell>₹ {data.foodId.price}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleDecrement(data)}
                            sx={{
                              minWidth: 30,
                              height: 30,
                              bgcolor: "#f9f9f9",
                              color: "#000",
                              "&:hover": { bgcolor: "#eee" },
                              mr: 1,
                            }}
                          >
                            -
                          </Button>
                          <Typography>{data.quantity}</Typography>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleIncrement(data)}
                            sx={{
                              minWidth: 30,
                              height: 30,
                              bgcolor: "#f9f9f9",
                              color: "#000",
                              "&:hover": { bgcolor: "#eee" },
                              ml: 1,
                            }}
                          >
                            +
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        ₹ {data.quantity * data.foodId.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3}></TableCell>
                    <TableCell sx={{ color: "wheat", fontSize: "medium" }}>
                      Total Quantity <span>:</span>
                      <Typography
                        component="span"
                        color="cyan"
                        sx={{ fontSize: "medium", marginLeft: "5px" }}
                      >
                        {totalquantity}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "wheat", fontSize: "large" }}
                    >
                      Total Price <span>:</span>
                      <Typography
                        component="span"
                        color="cyan"
                        sx={{ fontSize: "large", marginLeft: "5px" }}
                      >
                        ₹ {totalprice}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </TableContainer>
          {carts.length > 0 && (
            <Box textAlign="right" p={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={makePayment}
              >
                <FaCcMastercard style={{ marginRight: 8 }} />
                Checkout
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default CartDetails;
