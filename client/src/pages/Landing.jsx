import React from 'react'
import ProductCard from '../components/ProductCard'
import products from '../products'

const Landing = () => {
  const productList = products.map(product => {
    return <ProductCard key={product._id} product={product} />
  })

  return (
    <section className='text-black'>
      <h2 className='text-center text-4xl font-bold pb-6'>
        <span className='border-b-4 border-red-500'>Latest</span> Products
      </h2>

      <div className='flex justify-center gap-8 md:gap-12 flex-wrap'>{productList}</div>
    </section>
  )
}

export default Landing
