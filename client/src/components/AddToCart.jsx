import React from 'react'

const AddToCart = ({ product }) => {
  const { _id: id, image, brand, category, countInStock, price, rating, description, name, numReviews } = product

  return (
    <article className='border-2'>
      <div className='grid grid-cols-2 border-b-2 p-2'>
        <p>Price</p>
        <p>{price}</p>
      </div>
      <div className='grid grid-cols-2 border-b-2 p-2'>
        <p>Status</p>
        <p>In stock</p>
      </div>
      <div className='grid grid-cols-2 border-b-2 p-2'>
        <p>Quantity</p>
        <select>
          <option value='1'>1</option>
        </select>
      </div>
      <button className='p-4 bg-black text-white w-full min-w-[300px]'>Add to cart</button>
    </article>
  )
}

export default AddToCart
