import React from 'react'
import Rating from './Rating'

const Review = ({ review }) => {
  const { name, rating, comment } = review

  return (
    <article className='py-2'>
      <h4 className='capitalize'>{name}</h4>
      <Rating rating={rating} />
      <p className='mt-2'>{comment}</p>
    </article>
  )
}

export default Review
