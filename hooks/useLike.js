import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


import useLoginModal from "./useLoginModal";


const useLike = ({ userId, currentVideo }) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = request.data.likes || currentVideo?.likes || [];

    return list.includes(userId);
  }, [currentVideo, userId]);

  const toggleLike = useCallback(async (e) => {
    e.stopPropagation();

    if (!currentVideo) {
      return loginModal.onOpen();
    }

    try {
      let request;

      request = () => axios.post(`/api/videos/like/${currentVideo._id}/${userId}`);      

      await request();
      router.refresh();
      if (hasLiked) {
        toast.success('Video unliked');
      } else {
      toast.success('Video liked');
      }
    } catch (error) {
      toast.error('Something went wrong.');
      console.error(error);
    }
  }, 
  [
    currentVideo, 
    hasLiked, 
    userId, 
    loginModal,
    router
  ]);

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike;