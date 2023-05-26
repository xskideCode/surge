'use client';

import { useRouter } from "next/navigation";


const Tab = ({ icon: Icon, label, selected }) => {
  const router = useRouter();

  const handleClick = () => {
    if (label === 'profile') {
      router.push('/profile');
    } else {
      router.push(`/profile/${label}`);      
    }
  };

  return (
    <div>
      <div
          onClick={handleClick}
          className={`
            inline-flex
            items-center
            h-12
            p-2
            text-center
            text-white
            sm:px-4
            rounded-t-md
            -px-1
            whitespace-nowrap
            cursor-pointer
            border-purple-600
            focus:outline-none
            ${selected ? 'border' : 'bg-transparent'}
            ${selected ? 'border-b-0' : 'border-b'}
            ${selected ? 'rounded-t-md' : 'hover:border-purple-300'}
          `}
        >
          <Icon className="text-sm sm:text-lg" />

          <span className="mx-1 text-xs sm:text-base">
            {label}
          </span>
        </div>
    </div>
  )
}

export default Tab