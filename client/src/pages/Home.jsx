import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className='container mx-auto text-gray-500 p-8 sm:px-0 sm:py-8'>
        <Outlet />
      </main>
    </>
  )
}

export default Home
