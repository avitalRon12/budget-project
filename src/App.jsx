import { Link, Route, Routes } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { useContext } from "react";

import WelcomePage from "./pages/WelcomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRequests from "./pages/AdminRequests";
import AdminUsers from "./pages/AdminUsers"
import AdminCalendar from "./pages/AdminCalendar"
import AdminPurchase from "./pages/AdminPurchase";
import AdminIncome from "./pages/AdminIncome";
import WorkerLayout from "./components/WorkerLayout";
import WorkerDashboard from "./pages/WorkerDashboard";
import WorkerPurchase from "./pages/WorkerPurchase";
import WorkerIncome from "./pages/WorkerIncome";

const App = () => {
  const { users } = useContext(UserContext);
  // localStorage.clear();

  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/aboutUs" element={<AboutUs />}></Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="adminDash" element={<AdminDashboard />}></Route>
          {/* <Route path="adminRequests" element={<AdminRequests />}></Route> */}
          <Route path="adminUsers" element={<AdminUsers />}></Route>
          <Route path="adminCalendar" element={<AdminCalendar />}></Route>
          <Route path="adminPurchase" element={<AdminPurchase />}></Route>
          <Route path="adminIncome" element={<AdminIncome />}></Route>
        </Route>
        <Route path="/worker" element={<WorkerLayout />}>
          <Route path="workerDash" element={<WorkerDashboard />}></Route>
          <Route path="workerPurchase" element={<WorkerPurchase />}></Route>
          <Route path="workerIncome" element={<WorkerIncome />}></Route>
        </Route>
      </Routes>
    </>
  );
};
export default App;
