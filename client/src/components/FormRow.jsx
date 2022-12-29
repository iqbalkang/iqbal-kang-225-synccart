import React from 'react'
import { useSelector } from 'react-redux'

const FormRow = ({ input, onChange, value }) => {
  const userState = useSelector(store => store.user)

  const userId = userState?.user?.userId
  const user_id = userState?.userEdit?.user_id

  if (input.type === 'textarea')
    return (
      <div className={`${input.type === 'checkbox' && 'flex gap-2'}`}>
        <label htmlFor={input.label} className='capitalize block mb-1'>
          {input.labelText ? input.labelText : input.label}
        </label>
        <textarea
          className={`bg-gray-200 p-2 outline-gray-300 w-[400px] ${input.type === 'checkbox' && 'w-auto'}`}
          name={input.label}
          id={input.label}
          onChange={onChange}
          value={value}
        ></textarea>
      </div>
    )

  if (input.type === 'file')
    return (
      <div className={`${input.type === 'checkbox' && 'flex gap-2'}`}>
        <label htmlFor={input.label} className='capitalize block mb-1'>
          {input.labelText ? input.labelText : input.label}
        </label>
        <input
          type={input.type}
          className={`bg-gray-200 p-2 outline-gray-300 w-[400px] ${input.type === 'checkbox' && 'w-auto'}`}
          placeholder={input.placeholder}
          name={input.label}
          id={input.label}
          onChange={onChange}
          required={true}
        />
      </div>
    )

  return (
    <div className={`${input.type === 'checkbox' && 'flex gap-2'}`}>
      <label htmlFor={input.label} className='capitalize block mb-1'>
        {input.labelText ? input.labelText : input.label}
      </label>
      <input
        type={input.type}
        className={`bg-gray-200 p-2 outline-gray-300 w-[400px] ${input.type === 'checkbox' && 'w-auto'}`}
        placeholder={input.placeholder}
        name={input.label}
        id={input.label}
        onChange={onChange}
        value={value}
        checked={value}
        disabled={userId === user_id && input.type === 'checkbox'}
      />
    </div>
  )
}

export default FormRow
