'use client';

import { AiFillLike, AiOutlineLike } from "react-icons/ai";

import useLike from "@hooks/useLike";


const LikeButton = ({ 
  videoId,
  currentUser
}) => {
  const { hasLiked, toggleLike } = useLike({
    videoId,
    currentUser
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
        size={25}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillLike
        size={20}
        className={
          hasLiked ? 'fill-violet-500' : 'fill-neutral-500/70'
        }
      />
    </div>
   );
}
 
export default LikeButton;