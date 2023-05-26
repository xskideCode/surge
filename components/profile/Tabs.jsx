'use client';

import { AiOutlineProfile, AiOutlineShoppingCart, AiOutlineYoutube } from 'react-icons/ai'
import { MdOutlineVideoLibrary } from 'react-icons/md'
import Tab from './Tab'
import { usePathname } from 'next/navigation'

export const tabOptions = [
  {
    label: 'profile',
    icon: AiOutlineProfile,
  },
  {
    label: 'content',
    icon: MdOutlineVideoLibrary,
  },
  {
    label: 'promotions',
    icon: AiOutlineShoppingCart,
  },
]

const Tabs = () => {
  const pathname = usePathname();
  const tab = pathname.split('/')[2] || pathname.split('/')[1];
  
  return (
    <div 
      className="
        flex
        flex-row
        m-auto 
        w-[90vw]
        max-w-7xl
        overflow-x-auto
        scrollbar-none     
      "
    >
      {tabOptions.map((item) => (
        <Tab
          key={item.label}
          label={item.label}
          icon={item.icon}
          selected={tab === item.label}
        />
      ))}
    </div>
  )
}

export default Tabs