import React, { useEffect } from 'react'
import AddToCart from '../components/AddToCart'
import ProductDetail from '../components/ProductDetail'
import { Link, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProduct } from '../features/products/productsThunks'
import Error from '../pages/Error'
import Review from '../components/Review'
import ReviewForm from '../components/ReviewForm'
import { getReviews } from '../features/reviews/reviewsThunks'

export const ProductPage = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { productDetails: product } = useSelector(store => store.products)
  const { reviews } = useSelector(store => store.reviews)

  useEffect(() => {
    dispatch(getSingleProduct(params.id))
    dispatch(getReviews(params.id))
  }, [])

  if (!product) {
    return <Error />
  }

  const renderReviews = reviews.map((review, index) => <Review key={index} review={review} />)
  const renderReviewMessage = <p className='bg-blue-200 p-2'>No reviews on this product</p>

  return (
    <section>
      <div className='grid items-start gap-8 lg:grid-cols-[1fr,max-content]'>
        <Link to='/' className='lg:col-span-2'>
          <BiArrowBack color='black' size={36} className='hover:scale-x-110 duration-100' />
        </Link>
        <ProductDetail product={product} />
        <AddToCart product={product} />
      </div>

      {/* reviews */}
      <div className='mt-8'>
        <h3 className='text-2xl mb-4'>Reviews</h3>

        <div className='divide-y-2 max-w-md'>
          {reviews.length === 0 ? renderReviewMessage : renderReviews}
          <ReviewForm product={product} />
        </div>
      </div>
    </section>
  )
}
