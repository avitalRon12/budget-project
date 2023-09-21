import React from 'react';
import { useForm } from 'react-hook-form';

const PurchaseForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

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
          {...register('purchaseName', { required: 'Purchase name is required' })}
        />
        {errors.purchaseName && <p>{errors.purchaseName.message}</p>}
      </div>

      <div>
        <label htmlFor="purchaseAmount">Purchase Amount:</label>
        <input
          type="number"
          id="purchaseAmount"
          {...register('purchaseAmount', { required: 'Amount is required' })}
        />
        {errors.purchaseAmount && <p>{errors.purchaseAmount.message}</p>}
      </div>

      <div>
        <label htmlFor="unitPrice">Unit Price:</label>
        <input
          type="number"
          id="unitPrice"
          {...register('unitPrice', { required: 'unit price is required' })}
        />
        {errors.unitPrice && <p>{errors.unitPrice.message}</p>}
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <select 
          id="category" 
          {...register('category', { required: 'Please select a category' })} 
        >
          <option value="">--Select a Category--</option>
          <option value="electronics">Electronics</option>
          <option value="groceries">Groceries</option>
          <option value="clothing">Clothing</option>
        </select>
        {errors.category && <p>{errors.category.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PurchaseForm;
