"use client";

import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Heading from "@components/Heading";
import { useSession } from "next-auth/react";
import Button from "@components/Button";
import useCheckoutModal from "@hooks/useCheckoutModal";

const CheckoutModal = ({ channel }) => {
  const checkoutModal = useCheckoutModal();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();


  const onSubmit = useCallback(async () => {
    setIsLoading(true);

    console.log(channel);
    console.log("payload");

    axios
      .post("/api/promotion", channel)
      .then(() => {
        checkoutModal.onClose();
      })
      .then(() => {
        toast.success("Purchase successful", {
          style: { background: "#333", color: "#fff" },
        });
      })
      .catch((error) => {
        toast.error(error.response.data, {
          style: { background: "#333", color: "#fff" },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  },[]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Checkout" subtitle="Complete your purchase" center />
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
        scrollbar-thin
        "
      >
        <div className="flex justify-center rounded-2xl p-6 bg-zinc-900 ">
          <img
            src={channel?.snippet?.thumbnails?.default?.url}
            alt={channel?.snippet?.title}
            className="rounded-full h-[36px] w-[36px] hover:scale-125 cursor-pointer mr-3  "
          />

          <div className="flex flex-col ">
            <h4 className="font-poppins font-semibold text-xs text-white">
              {channel?.snippet?.title}
            </h4>
            <div className="flex flex-row ">
              <p className="font-poppins font-normal mr-1 text-xs text-dimWhite whitespace-nowrap">
                {channel?.snippet?.customUrl}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        type="button"
        label={`Cancel`}
        outline
        onClick={() => {
          checkoutModal.onClose();
        }}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={checkoutModal.isOpen}
      title="Add a new channel"
      actionLabel="Confirm"
      onClose={checkoutModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default CheckoutModal;
