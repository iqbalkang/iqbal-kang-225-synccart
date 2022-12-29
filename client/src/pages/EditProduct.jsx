import React, { useState } from 'react'
import Heading from '../components/Heading'
import FormRow from '../components/FormRow'
import inputs from '../utils/productInputs'
import { useDispatch, useSelector } from 'react-redux'
import { postProduct } from '../features/products/productsThunks'
import { useNavigate } from 'react-router-dom'
import { resetEditProduct } from '../features/products/productsSlice'

const EditProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { productEdit: product } = useSelector(store => store.products)
  const { name, description, stock, category, brand, price, image } = product ?? {}

  const [values, setValues] = useState({
    name: name || '',
    price: price || '',
    description: description || '',
    category: category || '',
    stock: stock || '',
    brand: brand || '',
    image: '',
  })

  console.log(values)

  const onChangeHandler = e =>
    setValues(prevValues => {
      const { name, value } = e.target
      return { ...prevValues, [name]: name === 'image' ? e.target.files[0] : value }
    })

  const handleSubmit = e => {
    e.preventDefault()

    for (const [keys, enteredValue] of Object.entries(values)) if (enteredValue === '') return

    const formData = new FormData()

    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value)
    }

    dispatch(postProduct(formData))
    dispatch(resetEditProduct())
    navigate('/admin/products')
  }

  const productInputs = inputs.map((input, index) => (
    <FormRow key={index} input={input} onChange={onChangeHandler} value={values[input.label]} />
  ))

  return (
    <section>
      <Heading span='edit' text='product' />

      <form className='flex flex-col gap-4 items-center' onSubmit={handleSubmit} encType='multipart/form-data'>
        {productInputs}
        <button className='bg-black p-4 max-w-lg w-[400px] text-white'>Add Product</button>
      </form>
    </section>
  )
}

export default EditProduct
