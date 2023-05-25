import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Heading from '../components/Heading'
import { deleteUser, getUsers } from '../features/users/userThunks'
import { MdDelete, MdModeEdit, MdCancel } from 'react-icons/md'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { userEdit } from '../features/users/userSlice'

const Users = () => {
  const dispatch = useDispatch()

  const { allUsers } = useSelector(store => store.user)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const deleteHandler = user_id => {
    dispatch(deleteUser(user_id))

    setTimeout(() => {
      dispatch(getUsers())
    }, 100)
  }

  const editHandler = user => {
    dispatch(userEdit(user))
  }

  return (
    <section>
      <Heading text='users' span='all'></Heading>

      <table className='w-full max-w-2xl text-center mx-auto'>
        <thead>
          <tr className='bg-gray-400 text-white'>
            <th className='capitalize'>id</th>
            <th className='capitalize'>name</th>
            <th className='capitalize'>email</th>
            <th className='capitalize'>admin</th>
            <th className='capitalize'>actions</th>
          </tr>
        </thead>
        <tbody className='[&>*:nth-child(even)]:bg-gray-200 [&>*:nth-child(odd)]:bg-gray-100'>
          {allUsers.map((user, index) => {
            const { user_id, name, email, isAdmin } = user

            return (
              <tr key={index}>
                <td>{user_id}</td>
                <td className='capitalize p-2'>{name}</td>
                <td>{email}</td>
                <td align='center'>
                  {isAdmin === 1 ? (
                    <AiFillCheckCircle className='text-green-600' />
                  ) : (
                    <MdCancel className='text-red-400' />
                  )}
                </td>
                <td align='center'>
                  <MdDelete
                    className='hover:text-red-400 duration-100 cursor-pointer inline-block'
                    onClick={deleteHandler.bind(null, user_id)}
                  />
                  <Link to='/admin/edit'>
                    <MdModeEdit
                      className='hover:text-red-400 duration-100 cursor-pointer inline-block ml-2'
                      onClick={editHandler.bind(null, user)}
                    />
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default Users
