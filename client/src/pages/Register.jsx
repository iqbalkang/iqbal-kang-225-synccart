import React, { useState, useEffect } from 'react'
import Heading from '../components/Heading'
import FormRow from '../components/FormRow'
import { Link } from 'react-router-dom'
import inputs from '../utils/registerInputs'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postRegister } from '../features/users/userThunks'
import Error from '../components/Error'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isError } = useSelector(store => store.user)

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const onChangeHandler = e =>
    setValues(prevValues => {
      const { name, value } = e.target
      return { ...prevValues, [name]: value }
    })

  const submitHandler = e => {
    e.preventDefault()

    dispatch(postRegister(values))
  }

  useEffect(() => {
    if (user) navigate('/')
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
        <button className='bg-black p-4 max-w-lg w-[400px] text-white'>Register</button>
        <p className='capitalize'>
          returning user?
          <Link to='/login' className='text-red-500 ml-1'>
            Login
          </Link>
        </p>
      </form>
    </section>
  )
}

export default Register
