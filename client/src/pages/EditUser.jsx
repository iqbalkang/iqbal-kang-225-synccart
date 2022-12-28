import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormRow from '../components/FormRow'
import Heading from '../components/Heading'
import { updateUser } from '../features/users/userThunks'

const inputs = [
  {
    label: 'name',
    type: 'text',
    required: true,
  },
  {
    label: 'email',
    type: 'email',
    required: true,
  },
  {
    label: 'admin',
    type: 'checkbox',
  },
]

const EditUser = () => {
  const dispatch = useDispatch()

  const { userEdit: user } = useSelector(store => store.user)
  const { user_id, name, email, isAdmin } = user

  const [values, setValues] = useState({
    name: name || '',
    email: email || '',
    admin: isAdmin || 0,
  })

  const onChangeHandler = e =>
    setValues(prevValues => {
      const { name, value } = e.target
      return {
        ...prevValues,
        [name]: name === 'admin' ? (prevValues.admin === 0 ? 1 : 0) : value,
      }
    })

  const handleSubmit = () => {
    dispatch(updateUser({ body: values, user_id }))
  }

  const editInputs = inputs.map((input, index) => (
    <FormRow key={index} input={input} onChange={onChangeHandler} value={values[input.label]} />
  ))

  return (
    <section className='flex flex-col items-center'>
      <Heading span='edit' text='user' />

      <form className='flex flex-col gap-8'>
        {editInputs}
        <Link to='/admin/users'>
          <button className='bg-black text-white p-4 w-[400px]' onClick={handleSubmit}>
            Update
          </button>
        </Link>
      </form>
    </section>
  )
}

export default EditUser
