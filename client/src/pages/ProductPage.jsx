import React, { useEffect } from 'react'
import AddToCart from '../components/AddToCart'
import ProductDetail from '../components/ProductDetail'
import { Link, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProduct } from '../features/products/productsThunks'
import Error from '../pages/Error'

export const ProductPage = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { productDetails: product } = useSelector(store => store.products)

  useEffect(() => {
    dispatch(getSingleProduct(params.id))
  }, [])

  if (!product) {
    return <Error />
  }

  return (
    <section className='grid items-start gap-8 lg:grid-cols-[1fr,max-content]'>
      <Link to='/' className='lg:col-span-2'>
        <BiArrowBack color='black' size={36} className='hover:scale-x-110 duration-100' />
      </Link>
      <ProductDetail product={product} />
      <AddToCart product={product} />
    </section>
  )
}
