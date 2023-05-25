import React from 'react'

const Heading = ({ span, text }) => {
  return (
    <h2 className='text-center text-4xl font-bold mb-10 capitalize text-black'>
      <span className='border-b-4 border-red-500'>{span}</span> {text}
    </h2>
  )
}

export default Heading
