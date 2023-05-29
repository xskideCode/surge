'use client';

import axios from "axios";  
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useSocialsModal from "@hooks/useSocialsModal";

import Modal from "./Modal";
import Heading from "@components/Heading";
import Inputs from "@components/inputs/Inputs";
import { useSession } from "next-auth/react";
import Button from "@components/Button";
import { MdDelete } from "react-icons/md";


const SocialsModal = () => {
  const socialsModal = useSocialsModal();
  const [isLoading, setIsLoading] = useState(false); 
  const { data: session } = useSession();

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({
    defaultValues: {
      instagram: '',
      facebook: '',
      twitter: '',
      tiktok: '',
    },
  });

  const instagram = watch('instagram');
  const facebook = watch('facebook');
  const twitter = watch('twitter');
  const tiktok = watch('tiktok');

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  }

  const onSubmit = data => {
    setIsLoading(true);

    axios.patch(`/api/user/${session.user.id}`, data)
      .then(() => {
        socialsModal.onClose();
        toast.success('Details Updated')
      })
      .catch((error) => {
        toast.error(error.response.data, { style: { background: '#333', color: '#fff' } });
      })
      .finally(() => {
        setIsLoading(false);
      })

  }

  const onToggle = useCallback(() => {
    socialsModal.onClose();
  }, [socialsModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Update your socials"
        subtitle="Enter null to delete socials"
      />
      <div className="flex items-center flex-row gap-4">
      <Inputs 
        id="instagram"
        label="Instagram"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder='Enter Instagram handle'
      />
      <MdDelete 
        size={40} 
        disabled={isLoading}
        onClick={() => { setCustomValue('instagram', '');}} 
        className={`
          text-red-500
          p-1
          rounded-lg
          border-2
          border-gray-400
          hover:bg-zinc-800
          transform
          transition-all          
          ring-0
          ring-slate-300
          hover:ring-4
          group-focus:ring-4
          ring-opacity-30
          duration-200
          shadow-md
        `}
      />
      </div>
      <div className="flex items-center flex-row gap-4">
      <Inputs 
        id="facebook"
        label="Facebook"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder='Enter facebook username'
      />
      <MdDelete 
        size={40} 
        disabled={isLoading}
        onClick={() => { setCustomValue('facebook', '');}} 
        className={`
          text-red-500
          p-1
          rounded-lg
          border-2
          border-gray-400
          hover:bg-zinc-800
          transform
          transition-all          
          ring-0
          ring-slate-300
          hover:ring-4
          group-focus:ring-4
          ring-opacity-30
          duration-200
          shadow-md
        `}
      />
      </div>
      <div className="flex items-center flex-row gap-4">
      <Inputs 
        id="twitter"
        label="Twitter"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder='Enter Twitter handle'
      />
      <MdDelete 
        size={40} 
        disabled={isLoading}
        onClick={() => { setCustomValue('twitter', '');}} 
        className={`
          text-red-500
          p-1
          rounded-lg
          border-2
          border-gray-400
          hover:bg-zinc-800
          transform
          transition-all          
          ring-0
          ring-slate-300
          hover:ring-4
          group-focus:ring-4
          ring-opacity-30
          duration-200
          shadow-md
        `}
      />
      </div>
      <div className="flex items-center flex-row gap-4">
      <Inputs 
        id="tiktok"
        label="Tiktok"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder='Enter tiktok handle'
      />
      <MdDelete 
        size={40} 
        disabled={isLoading}
        onClick={() => { setCustomValue('tiktok', '');}} 
        className={`
          text-red-500
          p-1
          rounded-lg
          border-2
          border-gray-400
          hover:bg-zinc-800
          transform
          transition-all          
          ring-0
          ring-slate-300
          hover:ring-4
          group-focus:ring-4
          ring-opacity-30
          duration-200
          shadow-md
        `}
      />
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
          onClick={() => { socialsModal.onClose();}}          
        />
    </div>
  );


  return (
    <Modal
      disabled={isLoading}
      isOpen={socialsModal.isOpen}
      title="Settings"
      actionLabel="Continue"
      onClose={socialsModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default SocialsModal