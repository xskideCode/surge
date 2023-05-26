'use client';

import axios from "axios";  
import { useCallback, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import useChannelModal from "@hooks/useChannelModal";

import Modal from "./Modal";
import Heading from "@components/Heading";
import { useSession } from "next-auth/react";
import Button from "@components/Button";
import Image from "next/image";


const ChannelModal = () => {
  const channelModal = useChannelModal();
  const [isLoading, setIsLoading] = useState(false);
  const channels = useState([]); 

 

  const onSubmit = data => {
    setIsLoading(true);
    console.log(data);

    axios.post('/api/channel', data)
      .then(() => {
        channelModal.onClose();
        toast.success('Channel Added')
      })
      .catch((error) => {
        toast.error(error.response.data, { style: { background: '#333', color: '#fff' } });
      })
      .finally(() => {
        setIsLoading(false);
      })

  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Channels"
        subtitle="Pick a channel"
      />
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
        scrollbar-thin
        "
      >
      {channels.map((item) => (
          <div key={item?.id} className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-x-2">
              <Image 
              className="object-cover rounded-full" 
              src="/assets/images/placeholder.png" 
              alt="video thumbnail"
              width={40}
              height={40}
              />
              <div>
                  <h2 className="font-medium text-white ">Test Channel name</h2>
                  <p className="text-sm font-normal text-gray-400">add description</p>
              </div>
            </div>
          </div>
      ))}
      </div>
    </div>    
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
        <Button
          type='button'
          label={`Cancel`}
          red   
          outline    
          onClick={() => { channelModal.onClose();}}          
        />
    </div>
  );


  return (
    <Modal
      disabled={isLoading}
      isOpen={channelModal.isOpen}
      title="Add a new channel"
      actionLabel="Confirm"
      onClose={channelModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default ChannelModal