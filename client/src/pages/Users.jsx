import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Heading from '../components/Heading'
import { getUsers } from '../features/users/userThunks'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <section>
      <Heading text='users' span='all'></Heading>

      <div>
        <article className='py-8 grid bg-gray-50 gap-x-12 gap-y-4 place-items-center place-content-center grid-cols-[repeat(5,max-content)]'>
          <h3 className='font-bold capitalize'>id</h3>
          <h3 className='font-bold capitalize'>name</h3>
          <h3 className='font-bold capitalize'>email</h3>
          <h3 className='font-bold capitalize'>admin</h3>
          <h3 className='font-bold capitalize'>actions</h3>

          <h3 className=''>1</h3>
          <h3 className=''>iqbal singh</h3>
          <h3 className=''>iqbal.kang@yahoo.com</h3>
          <h3 className=''>admin</h3>
          <h3 className=''>actions</h3>
        </article>
        {/* <article className='grid bg-gray-50 grid-cols-5'>
          <h3 className=''>1</h3>
          <h3 className=''>iqbal singh</h3>
          <h3 className=''>iqbal.kang@yahoo.com</h3>
          <h3 className=''>admin</h3>
          <h3 className=''>actions</h3>
        </article> */}
      </div>
    </section>
  )
}

export default Users
