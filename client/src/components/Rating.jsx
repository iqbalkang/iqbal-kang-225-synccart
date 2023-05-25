import React from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

const Rating = ({ rating }) => {
  const stars = [...Array(5)].map((star, index) => {
    return index >= rating ? <AiOutlineStar key={index} /> : <AiFillStar key={index} />
  })
  return (
    <div className='flex items-center text-yellow-500 group-hover:scale-x-105 origin-left duration-100'>{stars}</div>
  )
}

export default Rating
