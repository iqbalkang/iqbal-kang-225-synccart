import React, { useEffect } from 'react'
import Heading from '../components/Heading'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, onCartToggler, selectedQuantityHandler } from '../features/cart/cartSlice'
import SubTotal from '../components/SubTotal'
import { getCartProduct } from '../features/cart/cartThunks'
import { Link } from 'react-router-dom'

const Cart = () => {
  const dispatch = useDispatch()
  const { cart } = useSelector(store => store.cart)
  const { products } = useSelector(store => store.products)

  const renderOptions = count => {
    return [...Array(count)].map((_, index) => {
      return (
        <option key={index} value={index + 1}>
          {index + 1}
        </option>
      )
    })
  }

  const selectHandler = (e, productId) => {
    dispatch(selectedQuantityHandler(+e.target.value))
    dispatch(onCartToggler())
    dispatch(getCartProduct(productId))
  }

  const deleteHandler = productId => {
    dispatch(deleteProduct(productId))
  }

  return (
    <section className='max-w-5xl'>
      <Heading span='your' text='cart' />

      <div className='grid items-start lg:grid-cols-[1fr,300px]'>
        <div className='divide-y-2 max-w-xl py-8'>
          {cart.length === 0 && <h3 className='text-2xl'>Your cart is empty</h3>}

          {cart.map((item, index) => {
            const product = products.find(product => product.product_id === item.productId)
            return (
              <article key={index} className='flex gap-4 items-center py-4'>
                <img src={product?.image} alt='' className='w-24 h-20 object-cover' />
                <div className='grow'>
                  <Link to={`/product/${product.product_id}`}>
                    <h3 className='w-40 hover:underline'>{product?.name}</h3>
                  </Link>
                </div>
                <p className='font-bold mr-4'>${product?.price}</p>
                <select
                  className='bg-gray-100 p-2 px-4 mr-4'
                  onChange={e => selectHandler(e, product?.product_id)}
                  value={item?.quantity}
                >
                  {renderOptions(product?.stock)}
                </select>
                <button className='group' onClick={deleteHandler.bind(null, product?.product_id)}>
                  <AiFillDelete className='group-hover:text-black' />
                </button>
              </article>
            )
          })}
        </div>
        <SubTotal />
      </div>
    </section>
  )
}

export default Cart
