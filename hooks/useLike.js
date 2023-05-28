import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";


import useLoginModal from "./useLoginModal";


const useLike = ({ videoId, currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = currentUser?.likes || [];

    return list.includes(videoId);
  }, [currentUser, videoId]);

  const toggleLike = useCallback(async (e) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete(`/api/likes/${videoId}`);
      } else {
        request = () => axios.post(`/api/likes/${videoId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentUser, 
    hasLiked, 
    videoId, 
    loginModal,
    router
  ]);

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike;