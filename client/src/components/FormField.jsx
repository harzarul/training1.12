import React from 'react'

const FormField = ( {
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name}
          className="block text-sm font-medium text-yellow">
          {labelName}
        </label>
        {isSurpriseMe && (
          <button 
            type='button'
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black">
            Surprise Me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='bg-white border border-yellow text-black text-sm rounded-lg w-full p-3'/>
    </div>
  )
}

export default FormField