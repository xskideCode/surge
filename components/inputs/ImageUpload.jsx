'use client';

import { TbPhotoPlus } from 'react-icons/tb'

const ImageUpload = () => {
  return (
    <div>
      <div
            onClick={() => {}}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus
              size={50}
            />
            <div className="font-semibold text-lg">
              Click to upload
            </div>
      </div>
    </div>
  )
}

export default ImageUpload