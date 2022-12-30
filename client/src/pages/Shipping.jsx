import React, { useState, useEffect } from 'react'
import FormRow from '../components/FormRow'
import inputs from '../utils/shippingInputs'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAddress, postUserAddress, updateUserAddress } from '../features/users/userThunks'

const Shipping = () => {
  const dispatch = useDispatch()
  const { userId: user_id } = useSelector(store => store.user.user)
  const { address = '', city = '', postal = '', country = '' } = useSelector(store => store.user.userAddress) ?? {}

  useEffect(() => {
    dispatch(getUserAddress(user_id))
    setValues({ address, city, postal, country })
  }, [address])

  const [values, setValues] = useState({
    address: address || '',
    city: city || '',
    postal: postal || '',
    country: country || '',
  })

  const onChangeHandler = e =>
    setValues(prevValues => {
      const { name, value } = e.target
      return { ...prevValues, [name]: value }
    })

  const submitHandler = e => {
    const body = { ...values, user_id }
    if (!address) return dispatch(postUserAddress(body))
    else return dispatch(updateUserAddress(body))
  }

  const shippingInputs = inputs.map((input, index) => (
    <FormRow key={index} input={input} onChange={onChangeHandler} value={values[input.label]} />
  ))

  return (
    <section>
      <h3 className='text-3xl mb-4'>Shipping</h3>
      <form className='space-y-4'>
        {shippingInputs}
        <Link
          to='/checkout/payment'
          className='bg-black p-4 max-w-lg w-[400px] text-white block text-center'
          onClick={submitHandler}
        >
          Continue
        </Link>
      </form>
    </section>
  )
}

export default Shipping
