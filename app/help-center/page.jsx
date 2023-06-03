'use client';

import Button from '@components/Button';
import Heading from '@components/Heading';
import Inputs, { validateEmail, validateName } from '@components/inputs/Inputs';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const HelpCenter = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    },
  });
  
  const onSubmit = data => {
    setIsLoading(true);

    axios.post('/api/message', data)
      .then(() => {
        toast.success('Message sent',{ style: { background: '#333', color: '#fff' } });
      })
      .catch((error) => {
        toast.error('Something went wrong.', { style: { background: '#333', color: '#fff' } });
      })
      .finally(() => {
        setIsLoading(false);
      })

  }

  return (
    <div className="isolate px-6 pb-24 pt-10 sm:pb-32 lg:px-8">
      <div className="mx-auto xs:min-w-[350px] ss:min-w-[450px] max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">Contact Us <span className="inline-block  animate-wavingHand">👋🏻</span></h2>
      </div>
      <form  className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">   
          <div className="sm:col-span-2">
            <label htmlFor="subject" className={`block text-sm font-semibold leading-6  ${errors['name'] ? 'text-rose-500 animate-shake' : 'text-gray-50'}`}>
              Name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="name"
                { ...register('name' , {required: "Name is required", validate: validateName})}
                id="name"
                placeholder="Name"
                disabled={isLoading}
                className={`
                  block
                  w-full
                  rounded-md
                  placeholder:italic
                  placeholder:text-slate-400
                  border-0
                  px-3.5
                  py-2
                  text-gray-900
                  shadow-sm
                  ring-1
                  ring-inset
                  ring-white-300
                  placeholder:text-white-400
                  focus:ring-2
                  focus:ring-inset
                  focus:ring-indigo-600
                  sm:text-sm
                  sm:leading-6
                  ${errors["name"] ? 'border-rose-500' : 'border-neutral-300'}
                  ${errors["name"] ? 'focus:border-rose-500 animate-shake focus:ring-2 ring-rose-500' : 'focus:ring-2 ring-neutral-300'}
                `}
              />
            </div>
            {errors['name'] && (
              <>
                {errors['name'].message && (
                  <small className='text-rose-500'>{errors['name'].message}</small>
                )} 
              </>
            )}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className={`block text-sm font-semibold leading-6 ${errors['email'] ? 'text-rose-500 animate-shake' : 'text-gray-50'}`}>
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                { ...register('email', {required: "Email Address is required", validate: validateEmail})}
                id="email"
                autoComplete="email"
                placeholder="Enter your email so we can contact you back."
                disabled={isLoading}
                className={`
                  block
                  w-full
                  rounded-md
                  placeholder:italic
                  placeholder:text-slate-400
                  border-0
                  px-3.5
                  py-2
                  text-gray-900
                  shadow-sm
                  ring-1
                  ring-inset
                  ring-white-300
                  placeholder:text-white-400
                  focus:ring-2
                  focus:ring-inset
                  focus:ring-indigo-600
                  sm:text-sm
                  sm:leading-6
                  ${errors["email"] ? 'border-rose-500' : 'border-neutral-300'}
                  ${errors["email"] ? 'focus:border-rose-500 animate-shake focus:ring-2 ring-rose-500' : 'focus:ring-2 ring-neutral-300'}
                `}
              />
            </div>
            {errors['email'] && (
              <>
                {errors['email'].message && (
                  <small className='text-rose-500'>{errors['email'].message}</small>
                )} 
              </>
            )}
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="message" className={`block text-sm font-semibold leading-6 ${errors['message'] ? 'text-rose-500 animate-shake' : 'text-gray-50'}`}>
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                { ...register('message', {required: "Message is required"} )}
                rows={4}
                defaultValue={''}
                disabled={isLoading}
                className={`
                  block
                  w-full
                  rounded-md
                  placeholder:italic
                  placeholder:text-slate-400
                  border-0
                  px-3.5
                  py-2
                  text-gray-900
                  shadow-sm
                  ring-1
                  ring-inset
                  ring-white-300
                  placeholder:text-white-400
                  focus:ring-2
                  focus:ring-inset
                  focus:ring-indigo-600
                  sm:text-sm
                  sm:leading-6                
                  ${errors["message"] ? 'border-rose-500' : 'border-neutral-300'}
                  ${errors["message"] ? 'focus:border-rose-500 animate-shake focus:ring-2 ring-rose-500' : 'focus:ring-2 ring-neutral-300'}
              `}
              />
            </div>
            {errors['message'] && (
                <>
                  {errors['message'].message && (
                    <small className='text-rose-500'>{errors['message'].message}</small>
                  )} 
                </>
              )}
          </div>
        </div>
        <div className="mt-10">
        <Button
          type='button'
          label={`Let's talk`}
          onClick={handleSubmit(onSubmit)} 
          disabled={isLoading}         
        />
        </div>
      </form>
    </div>
  )
}

export default HelpCenter