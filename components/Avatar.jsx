'use client';

import Image from "next/image";

const Avatar = ({ src, large, medium }) => {
  return (
    <div>
      <Image
        className="rounded-full"
        height={`${large ? medium ? 40 : 80 : 30 }`}
        width={`${large ? medium ? 40 : 80 : 30 }`}
        alt="Avatar"
        src={src || '/assets/images/placeholder.png'} 
      />
    </div>
  )
}

export default Avatar