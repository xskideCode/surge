'use client';

import axios from "axios";  
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";

import useChannelModal from "@hooks/useChannelModal";

import Modal from "./Modal";
import Heading from "@components/Heading";
import { useSession } from "next-auth/react";
import Button from "@components/Button";
import Avatar from "@components/Avatar";
import { useFieldArray, useForm } from "react-hook-form";


const ChannelModal = () => {
  const channelModal = useChannelModal();
  const [isLoading, setIsLoading] = useState(false);
  const [channels, setChannels] = useState([]);
  const { data: session } = useSession();
  const [selectedChannels, setSelectedChannels] = useState([]);

  useEffect(() => {
    if (channels !== []) {
      setChannels(JSON.parse(localStorage.getItem("tempChannels")))
    }
  }, [channelModal.isOpen])


  const { control, register, handleSubmit, setValue, watch, formState: { errors, }, reset } = useForm({
    defaultValues: {
      schannel: [],
    }
  })
  const { fields, append, remove } = useFieldArray({
    control, 
    name: "schannel", 
  });

  const schannel = watch('schannel');

  const onSubmit = (data) => {
    setIsLoading(true); 
    
    if (data && data.schannel && Array.isArray(data.schannel)) {
      const schannelIndex = data.schannel.findIndex((channel) => channel && channel.id);
      if (schannelIndex !== -1) {
        data.schannel[schannelIndex].userId = session.user.id;
      }
    }

    console.log(data)
    console.log('payload')
 
    axios.post('/api/channel', data)
      .then(() => {
        channelModal.onClose();
      })      
      .then(() => {
        toast.success('Channel saved')
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
        subtitle="Select your channel then click confirm"
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
        {(channels && channels.length > 0) ? (
          <>
          {channels.map((item ,id) => (
              <div key={id} className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-x-4">
                  <input 
                    type="checkbox"
                    {...register(`schannel[${id}]`)} 
                    onClick={() => {
                      const existingIndex = schannel.findIndex((channel) => channel.id === item.id);
                      if (existingIndex === -1) {
                        append(item);
                      } else {
                        remove(existingIndex);
                      }
                    }}
                    checked={schannel.some((channel) => channel?.id === item.id)}
                    //onChange={(item) => setCustomValue('schannel', item)} 
                    className="w-4 h-4 text-blue-500 rounded bg-gray-900 ring-offset-gray-900 border-gray-700"
                  />
                  <Avatar large src={item?.snippet?.thumbnails?.medium?.url} />
                  <div className="w-56 ss:w-64 sm:w-96">
                      <h2 className="font-medium text-white ">{item.snippet.title}</h2>
                      <p className="text-sm font-normal text-gray-400 line-clamp-2 leading-normal">{item.snippet.description}</p>
                  </div>
                </div>
              </div>
          ))}
          </> ) : ( <>
            <Button
            type='button'
            label={`Log Out`}  
            disabled={isLoading} 
            red
            onClick={async () => {
              signOut({ callbackUrl: '/' });
              
            }}                 
          />  
          <p className="text-gray-400">Sign in with the google account that contains your channel</p>
          </>)}
      </div>
    </div>    
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
        <Button
          type='button'
          label={`Cancel`}
          disabled={isLoading}
          red   
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
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default ChannelModal