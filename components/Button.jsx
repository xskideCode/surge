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
        ${red ? 'bg-red-500 ' : ''}
        ${outline ? 'bg-transparent ' : 'bg-purple-700'}
        ${outline ? 'border-white' : 'border-purple-700'}
        ${outline ? 'text-white' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {Icon && (
        <Icon
          size={`${small ? 14 : 24}`}
          className={`
            ${small ? 'inline': 'absolute'}
            ${small ? 'mb-1' : 'top-3'}
            ${small ? 'mr-1' : 'left-4'}
          `}
        />
      )}
      {label}
    </button>
  )
}

export default Button