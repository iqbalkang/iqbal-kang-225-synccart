import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

const SubTotal = () => {
  const navigate = useNavigate()
  const { cart } = useSelector(store => store.cart)

  const cartItemsTotal = cart.reduce((acc, curr) => acc + curr.quantity, 0)
  const cartPriceTotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)

  const handleClick = () => {
    console.log('ss')
    navigate('/login?redirect=/product')
  }

  return (
    <article className='border-2 flex flex-col max-w-md'>
      <h3 className=' p-2 text-2xl'>
        Subtotal ({cartItemsTotal}) {cartItemsTotal === 1 ? 'item' : 'items'}
      </h3>
      <p className='border-b-2 p-2'>${cartPriceTotal}</p>
      <button className='uppercase bg-black text-white py-2 m-2' onClick={handleClick}>
        proceed to checkout
      </button>
    </article>
  )
}

export default SubTotal
