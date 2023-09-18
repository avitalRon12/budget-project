import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import Navbar from "./components/Navbar";


const App = () => {
  const { users } = useContext(UserContext);
  const change = "navbar-1";
  console.log(change);

  return (
    <>
      <>
      <Navbar />
      </>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
      {users.map((user) => (
        <p key={user.username}>{user.username}</p>
      ))}
    </>
  );
};

export default App;
