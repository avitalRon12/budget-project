import { Link, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContext } from "./context/userContext";
import { useContext } from "react";

const App = () => {
  const { users } = useContext(UserContext);
  const change = "navbar-1";
  console.log(change);

  return (
    <>
      <>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/register"}>register</Link>
          </li>
        </ul>
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
