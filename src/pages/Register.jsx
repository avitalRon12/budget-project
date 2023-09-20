import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../components/PaymentModal";

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState("password");
  const navigate = useNavigate()
  const { createNewUser  } = useContext(UserContext);

  const onSubmit = (data) => {
    const success = createNewUser(data);
    if (!success) {
      return;
    }
    navigate("/login");
  };

  return (
    <>
      <div>
        <h1>First, we need to get to know you...</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Username"
              id="username"
              {...register("username", { required: true })}
            />
            {errors.username && <span>this field is required</span>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email && <span>this field is required</span>}
          </div>
          <div>
            <input
              type={passwordInputType}
              placeholder="Password"
              id="password"
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
                  message: "Password must contain one number, one uppercase letter and one lowercase letter"
                }
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <button type="button" onClick={() => setPasswordInputType(passwordInputType === "password" ? "text" : "password")}>
              Toggle
            </button>
          </div>
          <div>
            <input
              type={confirmPasswordInputType}
              placeholder="Confirm Password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) => value === watch("password") || "Passwords do not match"
              })
              }
            />
            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
            <button type="button" onClick={() => setConfirmPasswordInputType(confirmPasswordInputType === "password" ? "text" : "password")}>
              Toggle
            </button>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <PaymentModal />
    </>
  );
};

export default Register;
