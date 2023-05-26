'use client';

import axios from "axios";  
import { useCallback, useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

import useChannelModal from "@hooks/useChannelModal";
import useVideoModal from "@hooks/useVideoModal";

import Modal from "./Modal";
import Heading from "@components/Heading";
import { useSession } from "next-auth/react";
import Button from "@components/Button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Inputs from "@components/inputs/Inputs";

const STEPS = {
  FETCH: 0,
  CONFIRM: 1,
}

const VideoModal = () => {
  const videoModal = useVideoModal();
  const [isLoading, setIsLoading] = useState(false);
  const videos = useState([]); 

  const [step, setStep] = useState(STEPS.FETCH)

  const { register, handleSubmit, setValue, watch, formState: { errors, }, reset } = useForm({
    defaultValues: {
      vidId: '',
    }
  })

  const vidId = watch('vidId');

  const setCustomValue = (id, value) =>{
    setValue(id, value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  }

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.CONFIRM) {
      return 'Confirm';
    } else {
      return 'Next';
    }
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.FETCH) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  

  const onSubmit = data => {
    if (step !== STEPS.CONFIRM) {
      return onNext();
    }
    
    setIsLoading(true);
    console.log(data);

    axios.post('/api/video', data)
      .then(() => {
        toast.success('Channel Added!')
        reset();
        setStep(STEPS.FETCH);
        videoModal.onClose();
      })
      .catch((error) => {
        toast.error(error.response.data, { style: { background: '#333', color: '#fff' } });
      })
      .finally(() => {
        setIsLoading(false);
      })

  }

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Videos"
        subtitle="Enter your video Id"
      />
      <Inputs 
        id="vidId"
        label="Video ID"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      
    </div>    
  );

  if (step === STEPS.CONFIRM) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Video"
          subtitle="Confirm selected video"
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
        {videos.map((item) => (
            <div key={item?.id} className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-x-2">
                <Image 
                className="object-cover rounded-md" 
                src="/assets/images/demoThumbnail.png" 
                alt="video thumbnail"
                width={120}
                height={68}
                />
                <div>
                    <h2 className="font-medium text-white ">Test vid name</h2>
                    <p className="text-sm font-normal text-gray-400">add description</p>
                </div>
            </div>
            </div>
        ))}
        </div>
      </div>
    )
  }

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
        <Button
          type='button'
          label={`Cancel`}
          red   
          outline    
          onClick={() => { videoModal.onClose();}}          
        />
    </div>
  );


  return (
    <Modal
      disabled={isLoading}
      isOpen={videoModal.isOpen}
      title="Add a new video"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.FETCH ? undefined : onBack}
      onClose={videoModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default VideoModal