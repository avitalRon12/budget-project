import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login,loggedInUser } = useContext(UserContext);
  
  if (loggedInUser) {
    console.log(`The currently logged-in user is ${loggedInUser.username}`);
  } else {
    console.log("No user is currently logged in.");
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