import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { createNewUser } = useContext(UserContext);

  return (
    <form onSubmit={handleSubmit(createNewUser)}>
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

export default Register;