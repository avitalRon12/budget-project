import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/userContext';

const PurchaseForm = () => {
  const { users, loggedInUser, setLoggedInUser, setUsers } = useContext(UserContext)
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [currentUser, setCurrentUser] = useState('')
  const [purchaseName, setPurchaseName] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [datePurchased, setDatePurchased] = useState('');
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState('');

  useEffect(() => {
    register('unitPrice', { required: 'Price is required' });
    register('purchaseAmount', { required: 'Amount is required' });
    register('datePurchased', { required: 'Date is required' });
  }, [register]);

  useEffect(() => {
    const newTotal = unitPrice * purchaseAmount;
    setTotal(newTotal);
  }, [unitPrice, purchaseAmount]);

  const onSubmit = (data) => {
    const purchase = {
      purchaseName: data.purchaseName,
      unitPrice: data.unitPrice,
      purchaseAmount: data.purchaseAmount,
      category: data.category,
      total: total,
      datePurchased: data.datePurchased
    };
    const currentUserIndex = loggedInUser ? users.findIndex((user) => user.username === loggedInUser.username) : -1;
    if (currentUserIndex !== -1) {
      const newUsers = [...users];
      if (!newUsers[currentUserIndex].purchases) {
        newUsers[currentUserIndex].purchases = [];
      }
      newUsers[currentUserIndex].purchases.push(purchase);
      setUsers(newUsers);
       localStorage.setItem('users', JSON.stringify(newUsers));
    };
  };
  return (
    <>
      <div>
        <h2>Add new purchase</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="purchaseName">Purchase Name:</label>
          <input
            type="text"
            id="purchaseName"
            onChange={e => setPurchaseName(e.target.value)}
            {...register('purchaseName', { required: 'Purchase name is required' })}
          />
          {errors.purchaseName && <p>{errors.purchaseName.message}</p>}
        </div>

        <div>
          <label htmlFor="unitPrice">Unit Price(in ₪):</label>
          <input
            type="number"
            id="unitPrice"
            onChange={e => {
              const value = Number(e.target.value);
              setUnitPrice(value);
              setValue('unitPrice', value);
            }}
          />
          {errors.unitPrice && <p>{errors.unitPrice.message}</p>}
        </div>

        <div>
          <label htmlFor="purchaseAmount">Purchase Amount:</label>
          <input
            type="number"
            id="purchaseAmount"
            onChange={e => {
              const value = Number(e.target.value);
              setPurchaseAmount(value);
              setValue('purchaseAmount', value);
            }}
          />
          {errors.purchaseAmount && <p>{errors.purchaseAmount.message}</p>}
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            onChange={e => setCategory(e.target.value)}
            {...register('category', { required: 'Please select a category' })}
          >
            <option value="">--Select a Category--</option>
            <option value="electronics">Electronics</option>
            <option value="groceries">Groceries</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div>
          <label htmlFor="datePurchased">Purchase Amount:</label>
          <input
            type="datetime-local"
            id="datePurchased"
            onChange={e => {
              const value = (e.target.value);
              setDatePurchased(value);
              setValue('datePurchased', value);
            }}
          />
          {errors.datePurchased && <p>{errors.datePurchased.message}</p>}

        </div>

        <div>
          Total Price: {total} ₪
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default PurchaseForm;
