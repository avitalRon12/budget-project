import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/userContext';

const IncomeForm = () => {
  const { users, loggedInUser, setLoggedInUser, setUsers, currentUserIndex } = useContext(UserContext)
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [currentUser, setCurrentUser] = useState('')
  const [incomeName, setIncomeName] = useState('');
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [dateIncome, setDateIncome] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    register('incomeAmount', { required: 'Amount is required' });
    register('dateIncome', { required: 'Date is required' });
  }, [register]);

  // useEffect(() => {
  //   const newTotal = unitPrice * purchaseAmount;
  //   setTotal(newTotal);
  // }, [unitPrice, purchaseAmount]);

  const onSubmit = (data) => {
    const income = {
      incomeName: data.incomeName,
      incomeAmount: data.incomeAmount,
      category: data.category,
      dateIncome: data.dateIncome
    };
    if (currentUserIndex !== -1) {
      const newUsers = [...users];
      if (!newUsers[currentUserIndex].incomes) {
        newUsers[currentUserIndex].incomes = [];
      }
      newUsers[currentUserIndex].incomes.push(income);
      setUsers(newUsers);
       localStorage.setItem('users', JSON.stringify(newUsers));
    };
  };

  return (
    <>
      <div>
        <h2>Add an income</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="incomeName">income Name:</label>
          <input
            type="text"
            id="incomeName"
            onChange={e => setIncomeName(e.target.value)}
            {...register('incomeName', { required: 'Income name is required' })}
          />
          {errors.incomeName && <p>{errors.incomeName.message}</p>}
        </div>

        <div>
          <label htmlFor="incomeAmount">income Amount:</label>
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
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div>
          <label htmlFor="dateIncome">Purchase Amount:</label>
          <input
            type="datetime-local"
            id="dateIncome"
            onChange={e => {
              const value = (e.target.value);
              setDateIncome(value);
              setValue('dateIncome', value);
            }}
          />
          {errors.dateIncome && <p>{errors.dateIncome.message}</p>}

        </div>

        <div>
          Total Income: {incomeAmount} ₪
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default IncomeForm;
