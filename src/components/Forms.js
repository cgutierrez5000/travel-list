import React, { useState } from 'react';

export default function Forms({onAddItems}) {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    

    function handleSubmit(e) {
      e.preventDefault();

      if (!description) return;

      const newItem = {
        description,
        quantity,
        packed: false,
        id: Date.now(),
      };
      console.log(newItem);

      onAddItems(newItem);

      setDescription('');
      setQuantity(1);
    }

    return (
      <div className='form-section'>
        <form className='add-form container mx-auto md:flex-nowrap flex-wrap' onSubmit={handleSubmit}>
          <h3 className='md:w-auto w-full md:m-7 m-0 md:text-left text-center'>What do you need for your 😍 trip?</h3>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
          <input
            type='text'
            placeholder='Item..'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button>Add</button>
        </form>
      </div>
    );
  }