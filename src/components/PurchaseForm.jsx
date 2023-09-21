import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const PurchaseForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [purchaseName, setPurchaseName] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState('');

  useEffect(() => {
    register('unitPrice', { required: 'Price is required' });
    register('purchaseAmount', { required: 'Amount is required' });
  }, [register]);


  useEffect(() => {
    console.log('unitPrice:', unitPrice);
    console.log('purchaseAmount:', purchaseAmount);

    const newTotal = unitPrice * purchaseAmount;
    setTotal(newTotal);

    console.log('newTotal:', newTotal);
  }, [unitPrice, purchaseAmount]);

  const onSubmit = (data) => {
    console.log('Submitted Data:', data);
    // Here you can send your data to an API or handle it accordingly
  };

  return (
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
        Total Price: {total} ₪
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PurchaseForm;
