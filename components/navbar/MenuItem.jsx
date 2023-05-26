'use client';

import Link from "next/link";

const MenuItem = ( { label, href, hidden, onClick } ) => {
  
  return (
    <div>
      <Link
        href={href}
        className={`dropdown_link flex py-2 mb-2 justify-center ${hidden ? 'sm:hidden ' : ''}`}
        onClick={onClick}
      >
        {label}
      </Link>
    </div>
  )
}

export default MenuItem