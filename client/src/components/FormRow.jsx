import React from 'react'

const FormRow = ({ input, onChange, value }) => {
  return (
    <div>
      <label htmlFor={input.label} className='capitalize block mb-1'>
        {input.labelText ? input.labelText : input.label}
      </label>
      <input
        type={input.type}
        className='bg-gray-200 p-2 outline-gray-300 w-[400px]'
        placeholder={input.placeholder}
        name={input.label}
        id={input.label}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default FormRow
