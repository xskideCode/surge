'use client';

import Image from "next/image";

const Avatar = ({ src, large }) => {
  return (
    <div>
      <Image
        className="rounded-full"
        height={`${large ? 80 : 30 }`}
        width={`${large ? 80 : 30 }`}
        alt="Avatar"
        src={src || '/assets/images/placeholder.png'} 
      />
    </div>
  )
}

export default Avatar