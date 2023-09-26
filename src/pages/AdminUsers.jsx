import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/userContext"; // Update the path accordingly

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

    const regularUserData = { ...workerData, isAdmin: false, adminUsername: loggedInUser.username }; // set the isAdmin attribute to false
    if (createNewUser(regularUserData, loggedInUser.username)) {
      alert("Worker registered successfully!");
      reset(); // To clear the form fields
    }
  };

  return (
    <div>
      <h1>Worker Management</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Register a new Worker</h3>
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
      <div>
        <h2>Registered workers</h2>
        <ul>
          {currentUserIndex !== -1 && users[currentUserIndex]?.workers && users[currentUserIndex]?.workers.length > 0 ? (
            users[currentUserIndex].workers.map((worker, index) => (
              <li key={index}>
                <div>
                  <p>Username: {worker?.username}</p>
                  <p>Email: {worker?.email} </p>
                  <p>Password: {worker?.password} </p>
                </div>
                <button onClick={() => deleteBtn(index)}>delete</button>
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
