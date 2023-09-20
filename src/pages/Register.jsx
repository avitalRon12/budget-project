import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../components/PaymentModal";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const navigate = useNavigate();
  const { createNewUser, addPaymentToUser } = useContext(UserContext);
  const [paymentData, setPaymentData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    if (!isPaymentComplete) {
      alert("Please fill out payment fields");
      return;
    }
    const success = createNewUser(data);
    if (success) {
      addPaymentToUser(data.username, paymentData); // Store the payment details for the user
      navigate("/login");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
                  message:
                    "Password must contain one number, one uppercase letter and one lowercase letter",
                },
              })}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </div>
          <PaymentModal
            setIsPaymentComplete={setIsPaymentComplete}
            setPaymentData={setPaymentData}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Register;
