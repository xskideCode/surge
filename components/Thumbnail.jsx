'use client';

import Image from "next/image";

const Thumbnail = ({ src, large }) => {
  return (
    <div>
      <Image
        className="object-cover rounded-md"
        height={`${large ? 480 : 90 }`}
        width={`${large ? 640 : 120 }`}
        alt="Thumbnail"
        src={src || "/assets/images/demoThumbnail.png"} 
      />
    </div>
  )
}

export default Thumbnail