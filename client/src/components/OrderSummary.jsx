import React from 'react'

const OrderSummary = ({ total, items }) => {
  const calculateTax = () => Math.round((7.25 / 100) * total)
  return (
    <article className='border-2 flex flex-col max-w-md self-start'>
      <h3 className=' p-2 text-2xl border-b-2 py-4 uppercase'>Order Summary</h3>
      <div className='border-b-2 p-2 grid grid-cols-[50%,1fr] capitalize'>
        <p>items</p>
        <p>{items}</p>
      </div>
      <div className='border-b-2 p-2 grid grid-cols-[50%,1fr] capitalize'>
        <p>shipping</p>
        <p>$0.00</p>
      </div>
      <div className='border-b-2 p-2 grid grid-cols-[50%,1fr] capitalize'>
        <p>tax</p>
        <p>${calculateTax()}</p>
      </div>
      <div className='border-b-2 p-2 grid grid-cols-[50%,1fr] capitalize'>
        <p>total</p>
        <p>${total}</p>
      </div>
      <button className='uppercase bg-black text-white py-2 m-2'>Place order</button>
    </article>
  )
}

export default OrderSummary
