'use client';

import { AiFillLike, AiOutlineLike } from "react-icons/ai";

import useLike from "@hooks/useLike";


const LikeButton = ({ 
  userId,
  currentVideo,
  size
}) => {
  const { hasLiked, toggleLike } = useLike({
    userId,
    currentVideo
  });

  return (
    <div 
      onClick={toggleLike}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineLike        
        className="
          w-[18px]
          xs:w-[24px]
          h-[18px]
          xs:h-[24px]
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillLike
        className={`
          w-[14px]
          xs:w-[20px]
          h-[14px]
          xs:h-[20px]
          ${hasLiked ? 'fill-violet-500' : 'fill-neutral-500/70'}          
        `}
      />
    </div>
   );
}
 
export default LikeButton;