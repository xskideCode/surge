'use client';

import axios from "axios";  
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn, getProviders } from "next-auth/react";

import useRegisterModal from "@hooks/useRegisterModal";
import useLoginModal from "@hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "@components/Heading";
import Inputs, { validateEmail } from "@components/inputs/Inputs";
import Button from "@components/Button";
import { useRouter } from "next/navigation";


const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal ();
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, [])
  

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit = data => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.error) {        
        toast.error(callback.error);

      } else if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }
    })

  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
      />
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
            Don't have an account?
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
            Sign Up
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal