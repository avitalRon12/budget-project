import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";

const Register = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const { createNewUser } = useContext(UserContext);

  return (
    <form onSubmit={handleSubmit(createNewUser)}>
      <input
        type="text"
        placeholder="Username"
        id="username"
        {...register("username", { required: true })}
      />
      {/* {errors.username && errors.username.type} */}
      <input
        type="password"
        placeholder="Password"
        {...register("password", { required: true, minLength: 8 })}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Register;