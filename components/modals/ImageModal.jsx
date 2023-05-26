'use client';

import axios from "axios";  
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useImageModal from "@hooks/useImageModal";

import Modal from "./Modal";
import Heading from "@components/Heading";
import Inputs from "@components/inputs/Inputs";
import { useSession } from "next-auth/react";
import Button from "@components/Button";
import ImageUpload from "@components/inputs/ImageUpload";
import { AiFillAlert } from "react-icons/ai";
import { useRouter } from "next/navigation";


const ImageModal = () => {
  const imageModal = useImageModal();
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();
  const { data: session } = useSession();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      image: '',
    },
  });

  const onSubmit = data => {
    setIsLoading(true);
    console.log(data);

    axios.delete(`/api/user/${session.user.id}`, data)
      .then(() => {
        imageModal.onClose();
        toast.success('Account Deleted');
        router.push('/');
      })
      .catch((error) => {
        toast.error(error.response.data, { style: { background: '#333', color: '#fff' } });
      })
      .finally(() => {
        setIsLoading(false);
      })

  }

  const onToggle = useCallback(() => {
    imageModal.onClose();
  }, [imageModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Delete your account!"
        subtitle="Confirm Delete"
      />  
      <div className="">
        <AiFillAlert size={25} className=" text-red-700" />
        <p className="">
          Are you absolutely sure that you want to delete your Surge community account? <span className="font-bold">Please note that there is no option to restore the account or it's data once it's deleted.</span><br /> If you have any concerns or issues, we encourage you to reach out to our support team who are here to assist you.
        </p>
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
          onClick={() => { imageModal.onClose();}}          
        />
    </div>
  );


  return (
    <Modal
      disabled={isLoading}
      isOpen={imageModal.isOpen}
      title="Settings"
      actionLabel="Delete "
      onClose={imageModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default ImageModal