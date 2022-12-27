import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BsFillCartFill } from 'react-icons/bs'
import { IoLogIn } from 'react-icons/io5'
import { AiFillDownCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import NavbarLink from '../components/NavbarLink'

const Navbar = () => {
  const buttonRef = useRef()
  const adminRef = useRef()
  const [isDropdownOpen, setIsDropDownOpen] = useState(false)
  const [adminDropdown, setAdminDropDown] = useState(false)

  const { user } = useSelector(store => store.user)

  const toggleDropDown = () => setIsDropDownOpen(prevState => !prevState)
  const toggleAdminDropDown = () => setAdminDropDown(prevState => !prevState)

  useEffect(() => {
    const toggleDropDown2 = e => {
      if (isDropdownOpen && !buttonRef.current.contains(e.target)) {
        setIsDropDownOpen(false)
      }
    }

    const toggleAdminDropDown2 = e => {
      if (adminDropdown && !adminRef.current.contains(e.target)) {
        setAdminDropDown(false)
      }
    }

    document.addEventListener('click', toggleDropDown2)
    document.addEventListener('click', toggleAdminDropDown2)
    return () => {
      document.removeEventListener('click', toggleDropDown2)
      document.removeEventListener('click', toggleAdminDropDown2)
    }
  }, [isDropdownOpen, adminDropdown])

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

        <div className='flex gap-4 relative '>
          <NavbarLink text='cart' icon={<BsFillCartFill />} />

          {!user ? (
            <NavbarLink text='login' icon={<IoLogIn size={22} />} />
          ) : (
            <button
              className='flex capitalize items-center gap-1 hover:text-red-500 duration-200'
              onClick={toggleDropDown}
              ref={buttonRef}
            >
              {user.name}
              <AiFillDownCircle />
            </button>
          )}

          {isDropdownOpen && (
            <div className='absolute top-full right-0 bg-gray-800 flex flex-col w-24 mt-2 text-center text-white'>
              <button className='hover:bg-gray-600 py-2'>Profile</button>
              <button className='hover:bg-gray-600 py-2'>Logout</button>
            </div>
          )}
        </div>

        {/* admin */}
        <div className='flex gap-4 relative '>
          {user?.isAdmin === 1 && (
            <button
              className='ml-4 flex capitalize items-center gap-1 hover:text-red-500 duration-200'
              onClick={toggleAdminDropDown}
              ref={adminRef}
            >
              Admin
              <AiFillDownCircle />
            </button>
          )}

          {adminDropdown && (
            <div className='absolute top-full right-0 bg-gray-800 flex flex-col w-24 mt-2 text-center text-white'>
              <Link to='users' className='hover:bg-gray-600 py-2'>
                Users
              </Link>
              <Link to='admin/products' className='hover:bg-gray-600 py-2'>
                Products
              </Link>
              <button className='hover:bg-gray-600 py-2'>Orders</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
