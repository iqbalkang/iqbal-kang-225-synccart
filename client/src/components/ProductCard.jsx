import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from './Rating'
const ProductCard = ({ product }) => {
  const { product_id: id, price, rating, name, num_reviews: numReviews } = product

  // const { reviews } = useSelector(store => store.reviews)
  // console.log(reviews)

  return (
    <Link
      to={`product/${id}`}
      className=' sm:w-96 shadow-lg rounded-xl overflow-hidden hover:shadow-md duration-100 group'
    >
      <img src={product.image} alt='' className='h-80 w-full object-cover' />
      <div className='p-4 pb-8'>
        <p>{name}</p>
        <div className='flex items-center gap-2 mt-2 mb-4'>
          {<Rating rating={rating} />} {numReviews}
          <span className='text-sm'>Reviews</span>
        </div>
        <p className='text-2xl font-bold text-black'>${price}</p>
      </div>
    </Link>
  )
}

export default ProductCard
