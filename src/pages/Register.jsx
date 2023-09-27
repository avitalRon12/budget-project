import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import PaymentModal from "../components/PaymentModal";
import "./../Styles/Login.css";


const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [isAdmin, setIsAdmin] = useState(true);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const { createNewUser, addPaymentToUser } = useContext(UserContext);
  const [paymentData, setPaymentData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (!isPaymentComplete) {
      return;
    }
    const adminData = { ...data, isAdmin: true }; // set the isAdmin attribute to true
    const success = createNewUser({...adminData});

    if (success) {
      addPaymentToUser(data.username, paymentData);
      navigate("/login");
    }
  };

  // const success = createNewUser({...data, purchases:[]});


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="register-container">
          <h1>First, we need to get to know you...</h1>
      </div>
      <div>
        <form className="login-form register-login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-row">
              <input
                id="username"
                className="lf--input"
                type="text"
                placeholder="Username"
                {...register("username", { required: true })}
              />
              {errors.username && <span>this field is required</span>}
          </div>
          <div className="flex-row">
              <input
                id="email"
                className="lf--input"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && <span>this field is required</span>}
          </div>
          <div className="flex-row">
              <input
                id="password"
                className="lf--input"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
              {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className="flex-row">
              <input
                id="confirmPassword"
                className="lf--input"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", { required: true })}
              />
            
              {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
          </div>
          <PaymentModal
            setIsPaymentComplete={setIsPaymentComplete}
            setPaymentData={setPaymentData}
          />
          <button className='lf--submit' type="submit">Submit</button>
        </form>
      </div>
    </>
  );
  
};

export default Register;