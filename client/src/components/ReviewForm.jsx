import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { removeError } from '../features/reviews/reviewsSlice'
import { getReviews, postReview } from '../features/reviews/reviewsThunks'
import { getSingleProduct } from '../features/products/productsThunks'

const ReviewForm = ({ product: { product_id } }) => {
  const inputRef = useRef()
  const dispatch = useDispatch()
  const params = useParams()
  const { user } = useSelector(store => store.user)
  const { isError } = useSelector(store => store.reviews)

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState()

  const renderWarning = (
    <p className='bg-blue-200 p-2'>
      Please
      <Link to='/login' className='text-gray-700 mx-1'>
        sign in
      </Link>
      to review.
    </p>
  )
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(postReview({ product_id, user_id: user.userId, rating, comment }))

    setRating(5)
    setComment('')

    setTimeout(() => {
      dispatch(getReviews(params.id))
      dispatch(getSingleProduct(params.id))
    }, 100)
  }

  useEffect(() => {
    const error = setTimeout(() => {
      dispatch(removeError())
    }, 2000)

    return () => clearTimeout(error)
  }, [isError])

  const renderForm = (
    <form className='space-y-4' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-1'>
        <label htmlFor='rating'>Rating</label>
        <select
          name='rating'
          id='rating'
          className='p-2 bg-gray-100'
          value={rating}
          onChange={e => setRating(e.target.value)}
        >
          <option value='5'>5 - Excellent </option>
          <option value='4'>4 - Very Good </option>
          <option value='3'>3 - Good </option>
          <option value='2'>2 - Bad </option>
          <option value='1'>1 - Very Bad </option>
        </select>
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor='rating'>Comment</label>
        <textarea
          ref={inputRef}
          className='p-2 bg-gray-100'
          value={comment}
          onChange={e => setComment(e.target.value)}
        ></textarea>
      </div>

      <button className='bg-black text-white px-6 py-2'>Submit</button>
    </form>
  )

  return (
    <article className='pt-8'>
      <h3 className='uppercase text-2xl mb-4'>write a review</h3>
      {isError && <p className='bg-red-200 p-2 mb-4'>You have already reviewed the Product</p>}
      {user ? renderForm : renderWarning}
    </article>
  )
}

export default ReviewForm
