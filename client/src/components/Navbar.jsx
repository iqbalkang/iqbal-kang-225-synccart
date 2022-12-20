import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillCartFill } from 'react-icons/bs'
import { IoLogIn } from 'react-icons/io5'

const Navbar = () => {
  return (
    <nav className='bg-black text-white p-4 px-8'>
      <div className='container mx-auto flex items-center'>
        <Link to='/' className='text-2xl mr-auto'>
          SyncCart
        </Link>

        <form className='xs: hidden'>
          <input
            type='text'
            placeholder='Search'
            className='outline-none text-gray-600 py-1 px-2 mr-8 w-80 duration-200 focus:w-96'
          />
        </form>

        <div className='flex gap-4'>
          <div className='flex items-center gap-1 hover:text-red-500 duration-200 group'>
            <BsFillCartFill />
            <Link to='/cart'>Cart</Link>
          </div>
          <div className='flex items-center gap-1 hover:text-red-500 duration-200 group'>
            <IoLogIn />
            <Link to='/cart'>Login</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
