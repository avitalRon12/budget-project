import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./context/userContext";
import { useContext } from "react";

import WelcomePage from "./pages/WelcomePage";
// import Payment from "./components/Payment";
import AboutUs from "./pages/AboutUs";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRequests from "./pages/AdminRequests";
import AdminUsers from "./pages/AdminUsers"
import AdminCalendar from "./pages/AdminCalendar"
import AdminLayout from "./components/AdminLayout";
import AdminPurchase from "./pages/AdminPurchase";

const App = () => {
  const { users } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/aboutUs" element={<AboutUs />}></Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="adminDash" element={<AdminDashboard />}></Route>
          <Route path="adminRequests" element={<AdminRequests />}></Route>
          <Route path="adminUsers" element={<AdminUsers />}></Route>
          <Route path="adminCalendar" element={<AdminCalendar />}></Route>
          <Route path="adminPurchase" element={<AdminPurchase />}></Route>
        </Route>
      </Routes>
    </>
  );
};
export default App;
