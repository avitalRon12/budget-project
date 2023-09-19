import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./context/userContext";
import { useContext } from "react";

import Navbar from "./components/Navbar";
import WelcomePage from "./pages/WelcomePage";
// import Payment from "./components/Payment";
import AboutUs from "./pages/AboutUs";

const App = () => {
  const { users } = useContext(UserContext);

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/aboutUs" element={<AboutUs />}></Route>
      </Routes>

      {users.map((user) => (
        <p key={user.username}>{user.username}</p>
      ))}
    </>
  );
};
export default App;
