import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";


import useLoginModal from "./useLoginModal";


const useLike = ({ userId, currentVideo }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useMemo(() => {
    const list = currentVideo?.likes || [];

    setHasLiked(list.includes(userId));
    setLikeCount(currentVideo?.likes?.length);
  }, [currentVideo, userId]);

  

  const toggleLike = useCallback(async (e) => {
    e.stopPropagation();
  
    if (!userId) {
      return loginModal.onOpen();
    }
  
    try {
      const response = await axios.post(`/api/videos/like/${currentVideo._id}/${userId}`);
      const data = response.data;

      setHasLiked(data.hasLiked);
      setLikeCount(data.likes.length);
      
      toast.success('Success', {
        style: { background: "#333", color: "#fff" },
      })
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong.');
      console.error(error);
    }
  }, [currentVideo, userId, loginModal, router]);

  return {
    hasLiked,
    likeCount,
    toggleLike,
  }
}

export default useLike;