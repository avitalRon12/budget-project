import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext";
import "../Styles/AdminUsers.css";
import "../Styles/FormStyle.css"

const AdminUsers = () => {
  const { users, setUsers, createNewUser, loggedInUser } = useContext(UserContext);
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

  const currentUserIndex = loggedInUser
    ? users.findIndex((user) => user.username === loggedInUser.username)
    : -1;

  const deleteBtn = (workerIndex) => {
    if (currentUserIndex === -1) return;
    const newUsers = [...users];
    newUsers[currentUserIndex].workers.splice(workerIndex, 1);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const onSubmit = (workerData) => {
    if (!loggedInUser) {
      alert("Please log in first.");
      return;
    }

    const regularUserData = {
      ...workerData,
      isAdmin: false,
      adminUsername: loggedInUser.username,
    };
    if (createNewUser(regularUserData, loggedInUser.username)) {
      alert("Worker registered successfully!");
      reset(); // To clear the form fields
    }
  };

  return (
    <div className="admin-users">
      <div className="users-heading">
        <h1>Hi! This is your users page</h1>
        <h2>Here you can register and manage your associated workers</h2>
      </div>
      <div className="form-container users-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Register a new Worker</h2>
          <div>
            <input
              type="text"
              placeholder="Worker Username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Worker Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
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
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div>
            <button type="submit">Register Worker</button>
          </div>
        </form>
      </div>
      <div className="registered-workers">
        <h2>Registered workers</h2>
        <ul>
          {currentUserIndex !== -1 &&
            users[currentUserIndex]?.workers &&
            users[currentUserIndex]?.workers.length > 0 ? (
            users[currentUserIndex].workers.map((worker, index) => (
              <li className="users-item" key={index}>
                <div className="purchase-info">
                  <p>Username: {worker?.username}</p>
                  <p>Email: {worker?.email} </p>
                  <p>Password: {worker?.password} </p>
                </div>
                <button className="delete-button" onClick={() => deleteBtn(index)}>Delete</button>
              </li>
            ))
          ) : (
            <p>You have no workers registered</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminUsers;
