import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


import useLoginModal from "./useLoginModal";


const useLike = ({ currentVideo, userId }) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = currentVideo.likes || [];

    return list.includes(userId);
  }, [currentVideo, userId]);

  const toggleLike = useCallback(async (e) => {
    e.stopPropagation();
    console.log(currentVideo.likes);
    console.log(userId);
    

    if (!userId) {
      return loginModal.onOpen();
    }

    try {
      let request;
     
      request = () => axios.post(`/api/video/like/${currentVideo._id}`, { params: { userId: userId, id: currentVideo._id } });      

      await request();
      router.refresh();
      if (hasLiked) {
        toast.success('Video unliked');
      } else {
      toast.success('Video liked');
      }
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentVideo,  
    userId, 
    hasLiked,
    loginModal,
    router
  ]);

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike;