import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const Checkout = () => {
  return (
    <section className='flex flex-col items-center'>
      <nav className='flex justify-between mb-8 w-[400px]'>
        <button disabled>Sign In</button>
        <NavLink to='shipping' className={({ isActive }) => (isActive ? 'text-black font-semibold' : '')}>
          Shipping
        </NavLink>
        <NavLink to='payment' className={({ isActive }) => (isActive ? 'text-black font-semibold' : 'inactive')}>
          payment
        </NavLink>
        <NavLink to='order' className={({ isActive }) => (isActive ? 'text-black font-semibold' : 'inactive')}>
          order
        </NavLink>
      </nav>

      <Outlet />
    </section>
  )
}

export default Checkout
