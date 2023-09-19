import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import WelcomePage from "./pages/WelcomePage";
import AboutUs from "./pages/AboutUs";
import AdminDashboard from "./pages/AdminDashboard";


const App = () => {
  const { users } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/aboutUs" element={<AboutUs />}></Route>
        <Route path="/adminDash" element={<AdminDashboard/>}></Route>
      </Routes>
    </>
  );
};

export default App;
