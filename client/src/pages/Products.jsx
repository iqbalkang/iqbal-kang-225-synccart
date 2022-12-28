import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { IoAddCircle } from 'react-icons/io5'
import { deleteProduct, getAllProducts } from '../features/products/productsThunks'
import { productEdit } from '../features/products/productsSlice'

const Products = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(store => store.products)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  const deleteHandler = product_id => {
    dispatch(deleteProduct(product_id))
    setTimeout(() => {
      dispatch(getAllProducts())
    }, 100)
  }

  const editHandler = product => {
    dispatch(productEdit(product))
  }

  return (
    <section>
      <div className='flex items-center justify-between w-full max-w-5xl mx-auto mb-8'>
        <h2 className='border-b-4 border-red-500 text-center text-4xl font-bold text-black'>Products</h2>

        <Link to='/admin/products/edit' className='bg-black text-white px-10 py-2 capitalize flex items-center gap-2'>
          <IoAddCircle size={20} /> add product
        </Link>
      </div>

      <table className='w-full max-w-5xl text-center mx-auto'>
        <thead>
          <tr className='bg-gray-400 text-white'>
            <th className='capitalize'>id</th>
            <th className='capitalize'>name</th>
            <th className='capitalize'>price</th>
            <th className='capitalize'>category</th>
            <th className='capitalize'>brand</th>
            <th className='capitalize'>stock</th>
            <th className='capitalize'>actions</th>
          </tr>
        </thead>
        <tbody className='[&>*:nth-child(even)]:bg-gray-200 [&>*:nth-child(odd)]:bg-gray-100'>
          {products.map((product, index) => {
            const { product_id, brand, name, category, price, stock } = product

            return (
              <tr key={index}>
                <td>{product_id}</td>
                <td className='capitalize p-3'>{name}</td>
                <td>{price}</td>
                <td>{category}</td>
                <td>{brand}</td>
                <td>{stock}</td>
                <td align='center'>
                  <MdDelete
                    className='hover:text-red-400 duration-100 cursor-pointer inline-block'
                    onClick={deleteHandler.bind(null, product_id)}
                  />
                  <Link to='/admin/products/edit'>
                    <MdModeEdit
                      className='hover:text-red-400 duration-100 cursor-pointer inline-block ml-3'
                      onClick={editHandler.bind(null, product)}
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

export default Products
