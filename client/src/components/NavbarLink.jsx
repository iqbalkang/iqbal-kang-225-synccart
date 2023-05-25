import React from 'react'
import { Link } from 'react-router-dom'

const NavbarLink = ({ text, icon }) => {
  return (
    <div className='flex items-center gap-1 hover:text-red-500 duration-200 group'>
      <Link to={`/${text}`} className='flex gap-1 items-center capitalize'>
        {text} {icon}
      </Link>
    </div>
  )
}

export default NavbarLink
