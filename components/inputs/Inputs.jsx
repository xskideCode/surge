'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

export const validateEmail = {
  matchPattern: (v) => {
    if (v !== '') {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Email address must be a valid address";
    }
    return true; // Return true for an empty string
  },    
  maxLength: (v) =>
    v.length <= 50 || "The email should have at most 50 characters",
} 
export const validateName = {
  matchPattern: (v) => {
    if (v !== '') {
      return /^(?=.{3,20}$)(?![_. ])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_. ])$/.test(v) || "Username must contain only  letters, numbers, . and _ !";
    }
    return true;
  },
  minLength: (v) =>{
    if (v !== '') {
      return v.length >= 3 || 'Username should have at least 3 characters';
    }
    return true;
  } 
}

const Inputs = ({ 
  id,
  label,
  type, 
  placeholder,
  disabled, 
  validate, 
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )} 
      <input 
        id={id}
        disabled={disabled}
        { ...register(id, { 
          required, 
          validate
        })}
        placeholder={placeholder ? `${placeholder}` : ' '}
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-zinc-900
          border-[3px]
          rounded-md
          outline-none
          transition
          placeholder-neutral-600
          placeholder-shown:italic
          placeholder:text-sm
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500 focus:ring-2 ring-rose-500' : 'focus:ring-2 ring-neutral-300'}
        `}
      />  
      {errors[id] && (
        <>
          {errors[id].message && (
            <small>{errors[id].message}</small>
          )} 
        </>
      )}
            
      <label
        className={`
          absolute
          text-md
          duration-150
          transform
          z-10
          origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          ${placeholder ? 'top-2' : 'top-5' }
          ${placeholder ? '-translate-y-2.5' : '-translate-y-3' }
          ${placeholder ? 'peer-focus:scale-75' : 'peer-focus:scale-75' }
          ${placeholder ? 'peer-focus:-translate-y-2.5' : 'peer-focus:-translate-y-4' }
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>   
    </div>
  )
}

export default Inputs