'use client';

import Button from '@components/Button';
import React, { useState, useEffect } from 'react'

const Pricing = () => {
  const [type, setType]= useState('');

  useEffect(() => {
    if (type === '1') {
      navigate(`/checkout?type=${type}`);
    }
    else if (type === '2') {
      navigate(`/checkout?type=${type}`);
    }
  }, [type]);

  const checkout = () => {
    
  }
  const checkout1 = () => {
    
  }

  return (
      <div className="py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-poppins font-bold tracking-tight text-gray-50 sm:text-4xl">Promotion Plans</h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">
            Give your content a boost and increase your reach to a whole new audience 
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-poppins font-bold tracking-tight text-gray-30">3-Day Promotion</h3>
            <p className="mt-6 text-base leading-7 text-gray-400">
              Get your channel on the promoted tab for a period of <span className="flex-none text-sm font-poppins font-semibold leading-6 text-purple-600">72</span> hours.
            </p>            
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-900 py-10 text-center ring-1 ring-inset ring-gray-30/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-poppins font-semibold text-gray-400">Normal</p>
                <p className="mt-6 mb-8 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-poppins font-bold tracking-tight text-gray-30">$1.5</span>
                  <span className="text-sm font-poppins font-semibold leading-6 tracking-wide text-gray-400">USD</span>
                </p>
                <Button
                  label={'Promote'}
                  small
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-poppins font-bold tracking-tight text-gray-30">7-Day Promotion</h3>
            <p className="mt-6 text-base leading-7 text-gray-400">
              Get your channel on the promoted tab for a period of <span className="flex-none text-sm font-poppins font-semibold leading-6 text-purple-600">168</span> hours.
            </p>            
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-900 py-10 text-center ring-1 ring-inset ring-gray-30/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-poppins font-semibold text-gray-400">Weekly</p>
                <p className="mt-6 mb-8 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-poppins font-bold tracking-tight text-gray-30">$3.0</span>
                  <span className="text-sm font-poppins font-semibold leading-6 tracking-wide text-gray-400">USD</span>
                </p>
                <Button
                  label={'Promote'}
                  small
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing