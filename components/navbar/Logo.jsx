'use client';

import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <div>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/icons/logo2.svg'
          alt='logo'
          width={100}
          height={31}
          className='object-contain cursor-pointer'
        />
      </Link>
    </div>
  )
}

export default Logo