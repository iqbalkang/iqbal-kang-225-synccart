import React from 'react'
import { Link } from 'react-router-dom'

const Payment = () => {
  return (
    <section>
      <h3 className='text-3xl mb-4'>Payment Method</h3>
      <h4 className='text-2xl mb-2'>Select Method</h4>
      <form className='space-y-4'>
        <div className='flex gap-2'>
          <input type='radio' name='radio' id='radio' checked value='paypal' onChange={() => {}} />
          <label htmlFor='radio'>PayPal</label>
        </div>
        <div className='flex gap-2'>
          <input type='radio' name='radio' id='radio' disabled />
          <label htmlFor='radio'>Credit Card</label>
        </div>
        <Link to='/checkout/order' className='bg-black p-4 max-w-lg w-[400px] text-white block text-center'>
          Continue
        </Link>
      </form>
    </section>
  )
}

export default Payment
