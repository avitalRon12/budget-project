import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext"; // Update the path accordingly

const AdminUsers = () => {
  const { createNewUser, loggedInUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (workerData) => {
    if (!loggedInUser) {
      alert("Please log in first.");
      return;
    }

    const regularUserData = { ...workerData, isAdmin: false }; // set the isAdmin attribute to false
    if (createNewUser(regularUserData, loggedInUser.username)) {
      alert("Worker registered successfully!");
      reset(); // To clear the form fields
    }
  };

  return (
    <div>
      <h1>AdminUsers</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Worker Username:</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password:</label>
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
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <button type="submit">Register Worker</button>
        </div>
      </form>
    </div>
  );
};

export default AdminUsers;
