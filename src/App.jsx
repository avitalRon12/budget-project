import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./context/userContext";
import { useContext } from "react";

import Navbar from "./components/Navbar";
import WelcomePage from "./pages/WelcomePage";


const App = () => {
  const { users } = useContext(UserConange);

  return (
    <>
      <Navbar></Navbar>
      <Payment></Payment>
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
