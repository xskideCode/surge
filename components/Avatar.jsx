'use client';

import Image from "next/image";

const Avatar = ({ src, large, xl, medium }) => {
  return (
    <div>
      <Image
        className="rounded-full"
        height={`${large ? 80 : medium ? 40 : xl ? 120 : 30}`}
        width={`${large ? 80 : medium ? 40 : xl ? 120 : 30}`}
        alt="Avatar"
        src={src || '/assets/images/placeholder.png'} 
      />
    </div>
  )
}

export default Avatar