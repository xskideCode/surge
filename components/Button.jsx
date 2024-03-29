'use client';

import { IconType } from 'react-icons';

const Button = ({ 
  label,
  onClick,
  disabled,
  type,
  key,
  outline,
  small,
  red,
  blue,
  icon: Icon
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      key={key}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        font-poppins
        ${outline ? 'bg-transparent' : red ? 'bg-red-500 ' : blue ? 'bg-[#4285F4]' : 'bg-purple-700'}
        ${outline ? 'border-white' : red ? 'border-red-500 ' : blue ? 'border-[#4285F4] ' : 'border-purple-700'}
        ${outline ? 'text-white' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'px-1' : blue ? 'pl-4' : 'px-3'}
        ${small ? 'rounded-md' : 'rounded-lg'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {Icon && (
        <Icon
          size={`${small ? 14 : 24}`}
          className={`
            ${small ? 'inline': 'absolute'}
            ${small ? 'mb-1' : blue ? '' : 'top-3'}
            ${small ? 'mr-1' : blue ? '' : 'left-4'}
            ${blue ? 'bg-white' : ''} 
            ${blue ? 'w-12 h-11' : ''}
            ${blue ? 'top-0.5 left-0.5 rounded-md p-2' : ''} 
          `}
        />
      )}
      {label}
    </button>
  )
}

export default Button