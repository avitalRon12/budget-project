import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { createNewUser } = useContext(UserContext);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [confirmPasswordInputType, setConfirmPasswordInputType] = useState("password");
  const navigate = useNavigate()

  const onSubmit = () => {
    createNewUser
    navigate('/admin/adminDash')
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createNewUser, addPaymentToUser, loggedInUser } =
    useContext(UserContext);
    const navigate = useNavigate();

  const onSubmit = (data) => {
    // First, handle user registration
    const success = createNewUser(data);
    if (!success) {
      return; // Do not proceed if user wasn't created
  }
    // Then, handle payment registration
    addPaymentToUser(data.username, {
      number: data.number,
      name: data.name,
      expiry: data.expiry,
      cvv: data.cvv,
    });
    navigate("/login");
  };
  const isValidExpiry = (expiry) => {
    // Check the format
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!regex.test(expiry)) {
      return false;
    }

    // Split the date into month and year
    const [month, year] = expiry.split("/");

    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // getMonth returns 0-11
    const currentYear = currentDate.getFullYear() % 100; // get the last two digits

    // Convert them to integers
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);

    // Check if the date is in the past
    if (
      expYear < currentYear ||
      (expYear === currentYear && expMonth < currentMonth)
    ) {
      return false;
    }

    return true;
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1>First, we need to get to know you...</h1>
      </div>
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
    <div>
      <form>
    
        
        <input
          type="text"
          placeholder="Card Number"
          {...register("number", { required: true })}
        />

        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        />

        <input
          type="text"
          placeholder="Expiry"
          {...register("expiry", {
            required: true,
            validate: (value) => isValidExpiry(value) || "Invalid expiry date",
          })}
        />
        {errors.expiry && <span>Incorrect expiry date, try using 11/22 format</span>}

        <input
          type="text"
          placeholder="3-digit CVV"
          {...register("cvv", { required: true, maxLength: 3, minLength: 3 })}
        />
        {errors.cvv && <span>3 digit security code is required</span>}

        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default Register;
