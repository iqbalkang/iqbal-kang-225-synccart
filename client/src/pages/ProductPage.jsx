import React from 'react'
import AddToCart from '../components/AddToCart'
import ProductDetail from '../components/ProductDetail'
import products from '../products'
import { Link, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

export const ProductPage = () => {
  const params = useParams()
  const product = products.find(product => product._id === params.id)

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
