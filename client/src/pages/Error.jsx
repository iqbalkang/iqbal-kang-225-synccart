import React from 'react'

const Error = () => {
  return (
    <div className='flex justify-center items-center flex-col'>
      <img src='/images/error.gif' alt='' className='w-[700px]' />
      <div className='flex flex-col items-center -mt-10'>
        <h2 className='text-6xl'>Oops</h2>
        <h3 className='text-xl'>Something Went Wrong</h3>
      </div>
    </div>
  )
}

export default Error
