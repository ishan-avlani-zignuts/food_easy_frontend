import "./App.css";
import Signup from "./auth/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from "./theme";
import AdminLogin from "./auth/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Add from "./views/adminviews/AddFood";
import Home from "./views/userviews/Home";
import { useState } from "react";
import ManageFood from "./views/adminviews/ManageFood";
import AdminDashboard from "./views/adminviews/AdminDashboard";
import CartDetails from "./views/userviews/CartDetails";
import { AuthProvider } from "./hooks/useAuth";
import SidebarLayout from "./layouts/SidebarLayout";
import UserSidebarLayout from "./layouts/UserSidebarLayout";
import SuccessPage from "./views/userviews/Success";
import ViewPastOrders from "./views/userviews/ViewPastOrders";
import ManageProfile from "./views/userviews/ManageProfile";
import PieChart from "./components/OrdersChartsData";
import OrdersGraph from "./views/userviews/OrdersGraph";
import FAQ from "./views/userviews/FAQPage";
import ViewAllOrders from "./views/adminviews/ViewAllOrders";
import AdminManageProfile from "./views/adminviews/AdminManageProfile";
function App() {
  const [theme] = useMode();

  const [ setCartLength] = useState(0);
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<AdminLogin />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <UserSidebarLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/vieworders" element={<ViewPastOrders />} />
              <Route path="/manageprofile" element={<ManageProfile />} />
              <Route path="/pie" element={<PieChart />} />
              <Route path="/ordergraph" element={<OrdersGraph />} />
              <Route
                path="/cartpage"
                element={<CartDetails onCartChange={setCartLength} />}
              />
              <Route path="/faq" element={<FAQ />} />
            </Route>

            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <SidebarLayout />
                </ProtectedRoute>
              }
            >
              <Route path="addfood" element={<Add />} />
              <Route path="managefood" element={<ManageFood />} />
              <Route path="admindashboard" element={<AdminDashboard />} />
              <Route path="viewallorders" element={<ViewAllOrders />} />
              <Route path="manageprofile" element={<AdminManageProfile />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
