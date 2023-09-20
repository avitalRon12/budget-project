import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login,loggedInUser } = useContext(UserContext);
  const navigate=useNavigate();

  if (loggedInUser) {
    navigate('/admin');
  } else {

  }

  return (
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
  );
};

export default Login;