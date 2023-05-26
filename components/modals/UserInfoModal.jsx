'use client';

import axios from "axios";  
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useUserInfoModal from "@hooks/useUserInfoModal";

import Modal from "./Modal";
import Heading from "@components/Heading";
import Inputs, { validateEmail, validateName } from "@components/inputs/Inputs";
import { useSession } from "next-auth/react";
import Button from "@components/Button";
import { useRouter } from "next/navigation";


const UserInfoModal = () => {
  const userInfoModal = useUserInfoModal();
  const [isLoading, setIsLoading] = useState(false); 
  const { data: session } = useSession();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const setCustomValue = (id, value) =>{
    setValue(id, value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  }

  const onSubmit = data => {
    setIsLoading(true);
    console.log(data);

    axios.patch(`/api/user/${session.user.id}`, data)
      .then(() => {
        userInfoModal.onClose();
        router.push('/profile')
        toast.success('Details Updated')
      })
      .catch((error) => {
        toast.error(error.response?.data, { style: { background: '#333', color: '#fff' } });
      })
      .finally(() => {
        setIsLoading(false);
      })

  }

  const onToggle = useCallback(() => {
    userInfoModal.onClose();
  }, [userInfoModal])

  


  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Details"
        subtitle="Update your account info"
      />
      <div className="flex flex-row gap-3">
      <Inputs 
        id="name"
        label="Username"
        disabled={isLoading}
        register={register}
        errors={errors}
        validate={...validateName}
      />
      </div>
      <Inputs 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        validate={...validateEmail}
      />
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
          onClick={() => { userInfoModal.onClose();}}          
        />
    </div>
  );


  return (
    <Modal
      disabled={isLoading}
      isOpen={userInfoModal.isOpen}
      title="Settings"
      actionLabel="Continue"
      onClose={userInfoModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default UserInfoModal