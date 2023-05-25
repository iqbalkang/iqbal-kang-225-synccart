import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

const SubTotal = () => {
  const navigate = useNavigate()

  const { cart } = useSelector(store => store.cart)
  const { user } = useSelector(store => store.user)

  const cartItemsTotal = cart.reduce((acc, curr) => acc + curr.quantity, 0)
  const cartPriceTotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)

  const handleClick = () => {
    if (!user) return navigate('/login')
    navigate('/checkout/shipping')
  }

  return (
    <article className='border-2 flex flex-col max-w-md'>
      <h3 className=' p-2 text-2xl'>
        Subtotal ({cartItemsTotal}) {cartItemsTotal === 1 ? 'item' : 'items'}
      </h3>
      <p className='border-b-2 p-2'>${cartPriceTotal}</p>
      <button
        className='uppercase bg-black text-white py-2 m-2 disabled:bg-black/50 disabled:cursor-not-allowed'
        onClick={handleClick}
        disabled={cart.length === 0}
      >
        proceed to checkout
      </button>
    </article>
  )
}

export default SubTotal
