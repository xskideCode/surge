'use client';

import Image from "next/image";

const Thumbnail = ({ src, large }) => {
  return (
    <div>
      <Image
        className={`
          object-cover
          object-center 
          rounded-md
        `}
        height={`${large ? 180 : 90 }`}
        width={`${large ? 320 : 120 }`}
        alt="Thumbnail"
        src={src || "/assets/images/demoThumbnail.png"} 
      />
    </div>
  )
}

export default Thumbnail