"use client";
import useDelChannelModal from "@hooks/useDelChannelModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const DelChannelModal = ({ isOpen, onClose }) => {
  const [showModal, setShowModal] = useState(isOpen);
  const { deletionObject } = useDelChannelModal();
  const [channel, setChannel] = useState(deletionObject);
  const [isLoading, setIsLoading] = useState(false);
  const delChannelModal = useDelChannelModal();
  const router = useRouter();

  useEffect(() => {
    setShowModal(isOpen);
    setChannel(deletionObject);

    console.log(channel);
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
    if (!channel) return;
  }, [channel]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);

    axios
      .delete(`/api/channels/${channel?._id}`)
      .then(() => {
        delChannelModal.onClose();
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
  }, [channel, delChannelModal, router]);

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
        class={`
              w-10/12
              sm:w-3/5
              md:w-2/6
              lg:w-2/6
              xl:w-1/5
              mx-auto
              fixed
              z-50
              top-1/3
  
          `}
      >
        <div
          class={`
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
          <h2 class="text-base font-semibold">Confirm Delete?</h2>
          <p className="font-poppins font-normal m-1 text-xs text-dimWhite whitespace-nowrap">All correponing channel videos will be deleted!</p>

          <div class="flex items-center text-sm text-gray-500 bg-zinc-900 py-5 px-3 rounded-lg shadow-black box2 m-5 bg-opacity-12">
            <img
              src={channel?.snippet?.thumbnails?.high?.url || channel?.snippet?.thumbnails?.medium?.url || channel?.snippet?.thumbnails?.default?.url}
              alt={channel?.snippet.title}
              className="rounded-full aspect-channel h-[56px] hover:scale-125 cursor-pointer mr-3  "
            />

            <div className="flex flex-col ">
              <h4 className="font-poppins font-semibold text-xs text-white">
                {channel?.snippet.title}
              </h4>
              <div className="flex flex-row ">
                <p className="font-poppins font-normal mr-1 text-xs text-dimWhite whitespace-nowrap">
                  {channel?.snippet.customUrl}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-4 w-4/5 flex justify-between gap-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleSubmit}
              class="rounded bg-red-500 px-3 py-2 text-sm font-medium text-red-50"
            >
              Delete
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleClose}
              class="rounded bg-gray-500 px-3 py-2 text-sm font-medium text-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelChannelModal;
