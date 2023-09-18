import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import WelcomePage from "./pages/WelcomePage";


const App = () => {
  const { users } = useContext(UserContext);
  const change = "navbar-1";
  console.log(change);

  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
};

export default App;
