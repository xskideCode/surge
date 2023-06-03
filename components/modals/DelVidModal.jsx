'use client';
import useDelVidModal from '@hooks/useDelVidModal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';

const DelVidModal = ({ isOpen, onClose }) => {
  const [showModal, setShowModal] = useState(isOpen);
  const { deletionObject } = useDelVidModal();
  const [video, setVideo] = useState(deletionObject);
  const [isLoading, setIsLoading] = useState(false);
  const delVidModal = useDelVidModal();
  const router = useRouter();


  useEffect(() => {
    setShowModal(isOpen);
    setVideo(deletionObject);
    
  }, [isOpen, deletionObject]);

  const handleClose = useCallback(() => {
    if (isLoading) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [isLoading, onClose]);

  useEffect(() => {
    if (!video) return;
  }, [video]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);

    axios
      .delete(`/api/videos/${video?._id}`)
      .then(() => {
        delVidModal.onClose();
      })
      .then(() => {
        toast.success("Delete successful", {
          style: { background: "#333", color: "#fff" },
        });
        router.refresh();
      })
      .catch((error) => {
        toast.error(error.response.data, {
          style: { background: "#333", color: "#fff" },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [video, delVidModal, router]);

  const handleSubmit = useCallback(() => {
    if (isLoading) {
      return;
    }

    onSubmit();
  }, [isLoading, onSubmit]);
  
  if (!isOpen) {
    return null;
  }

  return (
    <div
        className={`
            justify-center 
            items-center 
            flex 
            overflow-x-hidden 
            overflow-y-auto 
            fixed 
            inset-0 
            z-50 
            outline-none 
            focus:outline-none
            font-poppins
            text-white
            duration-300         
          `}
      >
    <div
        className={`
            w-10/12
            sm:w-4/5
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            mx-auto
            fixed
            z-50
            top-1/3

        `}
      >
        <div
          className={`
            flex
            flex-col
            items-center
            rounded-lg 
            bg-zinc-800 
            p-4 
            shadow-gray-600
            border
            border-gray-700
            translate
            transition-all
            duration-300
            ${showModal ? "scale-100" : "scale-0"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
        >
          <h2 className="text-base font-semibold">Confirm Delete?</h2>

          <div className="flex items-center text-sm text-gray-500 bg-zinc-900 py-5 px-3 rounded-lg shadow-black box2 m-5 bg-opacity-12">
            <img
              src={video?.snippet.thumbnails.default.url}
              alt={video?.snippet.title}
              className="rounded-md aspect-video h-[56px] hover:scale-125 cursor-pointer mr-3  "
            />

            <div className="flex flex-col ">
              <h4 className="font-poppins font-semibold text-xs text-white">
                {video?.snippet.title}
              </h4>
              <div className="flex flex-row ">
                <p className="font-poppins font-normal mr-1 text-xs text-dimWhite whitespace-nowrap">
                  {video?.snippet.customUrl}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 w-4/5 flex justify-between gap-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleSubmit}
              className="rounded bg-red-500 px-3 py-2 text-sm font-medium text-red-50"
            >
              Delete
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleClose}
              className="rounded bg-gray-500 px-3 py-2 text-sm font-medium text-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      </div>
  )
}

export default DelVidModal