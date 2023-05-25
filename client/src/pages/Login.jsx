import React, { useState, useEffect } from 'react'
import Heading from '../components/Heading'
import FormRow from '../components/FormRow'
import { Link } from 'react-router-dom'
import inputs from '../utils/loginInputs'
import { useDispatch, useSelector } from 'react-redux'
import { postLogin } from '../features/users/userThunks'
import { useNavigate } from 'react-router-dom'
import { postCart } from '../features/cart/cartThunks'
import Error from '../components/Error'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isError } = useSelector(store => store.user)
  const { cart } = useSelector(store => store.cart)

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const onChangeHandler = e =>
    setValues(prevValues => {
      const { name, value } = e.target
      return { ...prevValues, [name]: value }
    })

  const submitHandler = e => {
    e.preventDefault()
    dispatch(postLogin(values))
  }

  useEffect(() => {
    if (user) return navigate('/')
    dispatch(postCart(cart))
  }, [user])

  const loginInputs = inputs.map((input, index) => (
    <FormRow key={index} input={input} onChange={onChangeHandler} value={values[input.label]} />
  ))

  return (
    <section>
      <Heading span='sign' text='in' />

      <form className='flex flex-col items-center gap-8' onSubmit={submitHandler}>
        {isError && <Error text={isError} />}
        {loginInputs}
        <button className='bg-black p-4 max-w-lg w-[400px] text-white'>Login</button>
        <p className='capitalize'>
          new customer?
          <Link to='/register' className='text-red-500 ml-1'>
            Register
          </Link>
        </p>
      </form>
    </section>
  )
}

export default Login
