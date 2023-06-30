"use client";

import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { loadScript } from "@paypal/paypal-js";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Heading from "@components/Heading";
import { useSession } from "next-auth/react";
import Button from "@components/Button";
import useCheckoutModal from "@hooks/useCheckoutModal";

const CheckoutModal = ({ channel }) => {
  const checkoutModal = useCheckoutModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  let product = {};

  if (channel.plan === "3-Day") {
    product = {
      description: "3-Day Promotion",
      cost: "1.50",
    };
  } else if (channel.plan === "Weekly") {
    product = {
      description: "Weekly Promotion",
      cost: "3.00",
    };
  }

  const getPaypal = useCallback(async () => {
    let paypal;

    try {
      paypal = await loadScript({
        clientId:
          "AW-DaU8rkGb7JhU9sYyHPh-qrIObxvyHy0dwOVIHA9VnaH9KzmSZCr4jYFn0JyOvheGR-u1RTK37J3gU",
      });
    } catch (error) {
      console.error("failed to load the PayPal JS SDK script", error);
    }

    if (paypal) {
      try {
        await paypal
          .Buttons({
            style: {
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "paypal",
              tagline: false,
            },
            async createOrder() {
              const response = await fetch("/api/paypal", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  product: product,
                }),
              });
              const order = await response.json();
              return order.id;
            },
            async onApprove(data) {
              // This function captures the funds from the transaction.
              const response = await fetch("/api/paypal", {
                method: "POST",
                body: JSON.stringify({
                  orderID: data.orderID,
                }),
              });
              const details = await response.json();
              // This function shows a transaction success message to your buyer.
              console.log(details);
              onSubmit();
              axios.post("/api/order", { ...details, userId: session.user.id })                
            },
          })
          .render("#paypal_buttons");
      } catch (error) {
        console.error("failed to render the PayPal Buttons", error);
      }
    }
  }, []);

  useEffect(() => {
    if (checkoutModal.isOpen === true) {
      getPaypal();
    }
  }, [getPaypal, checkoutModal.isOpen]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);

    axios
      .post(`/api/promotion/${channel._id}`, channel)
      .then(() => {
        checkoutModal.onClose();
      })
      .then(() => {
        toast.success("Purchase successful", {
          style: { background: "#333", color: "#fff" },
        });
        router.push("/")
      })
      .catch((error) => {
        toast.error(error.response.data, {
          style: { background: "#333", color: "#fff" },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Checkout" subtitle="Complete your purchase" center />
      <div
        className="
        grid
        grid-cols-1
        gap-3
        max-h-[50vh]
        overflow-y-auto
        scrollbar-thin
        "
      >
        <div className="flex justify-center rounded-2xl p-6 bg-zinc-900 ">
          <img
            src={
              channel?.snippet?.thumbnails?.high?.url ||
              channel?.snippet?.thumbnails?.medium?.url ||
              channel?.snippet?.thumbnails?.default?.url
            }
            alt={channel?.snippet?.title}
            className="rounded-full h-[66px] w-[66px] hover:scale-125 cursor-pointer mr-3  "
          />

          <div className="flex flex-col ">
            <h4 className="font-poppins font-semibold text-base text-white">
              {channel?.snippet?.title}
            </h4>
            <div className="flex flex-row ">
              <p className="font-poppins font-normal mr-1 text-sm text-dimWhite whitespace-nowrap">
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
      <div
        id="paypal_buttons"
        className="flex justify-center bg-zinc-300 p-4 rounded-md"
      ></div>
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
      onClose={checkoutModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default CheckoutModal;
