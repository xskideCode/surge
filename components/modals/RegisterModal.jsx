'use client';

import axios from "axios";  
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import useRegisterModal from "@hooks/useRegisterModal";
import useLoginModal from "@hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "@components/Heading";
import Inputs, { validateEmail, validateName } from "@components/inputs/Inputs";
import Button from "@components/Button";


const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal ();
  const [isLoading, setIsLoading] = useState(false); 
  

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  const onSubmit = data => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        registerModal.onClose();
        return signIn('credentials', {
          ...data,
          redirect: false,
        });
      })      
      .then(() => {
        toast.success('Logged in')
      })
      .catch((error) => {
        toast.error(error.response.data, { style: { background: '#333', color: '#fff' } });
      })
      .finally(() => {
        setIsLoading(false);
      })

  }

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Surge Community"
        subtitle="Create an account!"
      />
      <div className="flex flex-row gap-3">
      <Inputs 
        id="name"
        label="Username"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validate={...validateName}
      />
      </div>
      <Inputs 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validate={...validateEmail}
      />
      <Inputs 
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
        <Button
          type='button'
          label={`Continue with Google`}
          outline
          icon={FcGoogle}
          onClick={() => {
            signIn('google');
          }}          
        />
      <div 
        className="
          text-neutral-400
          text-center
          mt-4
          font-light
        "
      >
        <div className="flex flex-row justify-center items-center gap-2">
          <div>
            Already have an account?
          </div>
          <div
            onClick={onToggle}
            className="
              text-neutral-200
              cursor-pointer
              hover:underline
              hover:underline-offset-2
            "
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal