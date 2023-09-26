import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/userContext';
import '../Styles/FormStyle.css'; // Import the shared CSS file

const IncomeForm = () => {
  const { users, loggedInUser, setLoggedInUser, setUsers } = useContext(UserContext);
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  const [incomeName, setIncomeName] = useState('');
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [dateIncome, setDateIncome] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    register('incomeAmount', { required: 'Amount is required' });
    register('dateIncome', { required: 'Date is required' });
  }, [register]);

  const onSubmit = (data) => {
    const income = {
      incomeName: data.incomeName,
      incomeAmount: data.incomeAmount,
      category: data.category,
      dateIncome: data.dateIncome
    };
    const currentUserIndex = loggedInUser ? users.findIndex((user) => user.username === loggedInUser.username) : -1;
    if (currentUserIndex !== -1) {
      const newUsers = [...users];
      if (!newUsers[currentUserIndex].incomes) {
        newUsers[currentUserIndex].incomes = [];
      }
      newUsers[currentUserIndex].incomes.push(income);
      setUsers(newUsers);
      localStorage.setItem('users', JSON.stringify(newUsers));
    };
    reset();
  };

  return (
    <div className="form-container">
      <h2>Add an income</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="incomeName">Income Name:</label>
          <input
            type="text"
            id="incomeName"
            onChange={e => setIncomeName(e.target.value)}
            {...register('incomeName', { required: 'Income name is required' })}
          />
          {errors.incomeName && <p>{errors.incomeName.message}</p>}
        </div>

        <div>
          <label htmlFor="incomeAmount">Income Amount:</label>
          <input
            type="number"
            id="incomeAmount"
            onChange={e => {
              const value = Number(e.target.value);
              setIncomeAmount(value);
              setValue('incomeAmount', value);
            }}
          />
          {errors.incomeAmount && <p>{errors.incomeAmount.message}</p>}
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            onChange={e => setCategory(e.target.value)}
            {...register('category', { required: 'Please select a category' })}
          >
            <option value="">--Select a Category--</option>
            <option value="check">Check</option>
            <option value="refund">Refund</option>
            <option value="donation">Donation</option>
            <option value="sales">Sales</option>
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div>
          <label htmlFor="dateIncome">Income Date:</label>
          <input
            type="datetime-local"
            id="dateIncome"
            onChange={e => {
              const value = e.target.value;
              setDateIncome(value);
              setValue('dateIncome', value);
            }}
          />
          {errors.dateIncome && <p>{errors.dateIncome.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default IncomeForm;
