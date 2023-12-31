import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/userContext';
import "../Styles/FormStyle.css"

const WorkerIncomeForm = () => {
  const { users, loggedInUser, setLoggedInUser, setUsers } = useContext(UserContext)
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

  const onSubmit = (data) => {
    const income = {
      incomeName: data.incomeName,
      incomeAmount: data.incomeAmount,
      category: data.category,
      dateIncome: data.dateIncome
    };
    const currentUserIndex = loggedInUser ? users.findIndex((user) => user.username === loggedInUser.adminUsername) : -1;
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
      <div className='form-container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              id="incomeName"
              placeholder='Income Name'
              onChange={e => setIncomeName(e.target.value)}
              {...register('incomeName', { required: 'Income name is required' })}
            />
            {errors.incomeName && <p>{errors.incomeName.message}</p>}
          </div>

          <div>
            <input
              type="number"
              id="incomeAmount"
              placeholder='Income Amount'
              onChange={e => {
                const value = Number(e.target.value);
                setIncomeAmount(value);
                setValue('incomeAmount', value);
              }}
            />
            {errors.incomeAmount && <p>{errors.incomeAmount.message}</p>}
          </div>

          <div>
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

          <div className='total-price'>
            Total Income: {incomeAmount} ₪
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>


    </>
  );
};

export default WorkerIncomeForm;
