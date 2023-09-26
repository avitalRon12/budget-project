import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login, loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.isAdmin) {
        navigate("/admin/adminDash");
      } else {
        navigate("/worker/workerDash");
      }
    }
}, [loggedInUser, navigate]);
  return (
    <div>
      <form onSubmit={handleSubmit(login)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        <input
          type="text"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/">Kaki</Link>
    </div>
  );
};

export default Login;
