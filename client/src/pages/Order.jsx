import React, { useEffect } from 'react'
import OrderSummary from '../components/OrderSummary'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAddress } from '../features/users/userThunks'

const Order = () => {
  const dispatch = useDispatch()

  const { userId: user_id } = useSelector(store => store.user.user)
  const { address, city, postal, country } = useSelector(store => store.user.userAddress) ?? {}
  const { cart } = useSelector(store => store.cart)
  const { products } = useSelector(store => store.products)

  useEffect(() => {
    dispatch(getUserAddress(user_id))
  }, [address])

  const totalItems = cart.reduce((acc, curr) => curr.quantity + acc, 0)
  const orderTotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)

  const renderCart = cart.map((item, index) => {
    const product = products.find(product => product.product_id === item.productId)
    return (
      <div key={index} className='flex text-sm md:text-base py-4 items-center'>
        <img src={product.image} className='h-10 w-10' />
        <p className='mr-auto ml-2 capitalize'>{product.name}</p>
        <p>
          {item.quantity} X ${item.price} = ${item.price * item.quantity}
        </p>
      </div>
    )
  })

  return (
    <section className='grid lg:grid-cols-[1fr,300px] lg:gap-24 xl:w-3/4 2xl:gap-48'>
      {/* left side */}
      <div className='divide-y-2'>
        <div className='pb-4'>
          <h3 className='text-2xl uppercase mb-2'>shipping</h3>
          <p>
            Address: {address}, {city} {postal}, {country}
          </p>
        </div>
        <div className='py-4'>
          <h3 className='text-2xl uppercase mb-2'>payment method</h3>
          <p>Method: PayPal</p>
        </div>
        <div className='py-4'>
          <h3 className='text-2xl uppercase mb-2'>order items</h3>
          <div className='lg:p-4 divide-y-2'>{renderCart}</div>
        </div>
      </div>

      {/* right side */}
      <OrderSummary items={totalItems} total={orderTotal} />
    </section>
  )
}

export default Order
