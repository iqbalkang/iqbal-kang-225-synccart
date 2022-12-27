import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../features/products/productsThunks'
import Error from './Error'
import Heading from '../components/Heading'

const Landing = () => {
  const dispatch = useDispatch()
  const { products, isLoading, isError } = useSelector(store => store.products)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  if (isError) {
    return <Error />
  }

  const productList = products.map(product => {
    return <ProductCard key={product.product_id} product={product} />
  })

  return (
    <section className='text-black'>
      <Heading span='latest' text='products' />

      <div className='flex justify-center gap-8 md:gap-12 flex-wrap'>{productList}</div>
    </section>
  )
}

export default Landing
