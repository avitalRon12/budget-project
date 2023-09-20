import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/userContext'; // Update the path accordingly

const AdminUsers = () => {
  const { createNewUser, loggedInUser } = useContext(UserContext);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (workerData) => {
    if (!loggedInUser) {
      alert('Please log in first.');
      return;
    }

    if (createNewUser(workerData, loggedInUser.username)) {
      alert('Worker registered successfully!');
      reset();  // To clear the form fields
    }
  }

  return (
    <div>
      <h1>AdminUsers</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Worker Username:</label>
          <input
            type="text"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <button type="submit">Register Worker</button>
        </div>
      </form>
    </div>
  );
}

export default AdminUsers;
