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
import Thumbnail from "@components/Thumbnail";

const STEPS = {
  FETCH: 0,
  CONFIRM: 1,
}

const VideoModal = () => {
  const videoModal = useVideoModal();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]); 
  const BASE_URL = 'https://youtube-v31.p.rapidapi.com/videos';
  process.env.NEXT_PUBLIC_RAPID_API_KEY

  const [step, setStep] = useState(STEPS.FETCH)

  const { register, handleSubmit, setValue, watch, formState: { errors, }, reset } = useForm({
    defaultValues: {
      vidId: '',
      svideo: [],

    }
  })

  const vidId = watch('vidId');
  const svideo = watch('svideo');

  const setCustomValue = (id, value) =>{
    setValue(id, value, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  }

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = async() => {
    setIsLoading(true);

    const vidid = vidId.startsWith('http') ? extractVideoId(vidId) : vidId;
    
    const options = {
      method: 'GET',
      url: BASE_URL,
      params: {
        part: 'contentDetails,snippet,statistics',
        id: vidid,
      },
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      setVideos(response.data.items);
      setCustomValue('svideo', response.data.items)
    } catch (error) {
      console.error(error);
    }
    setStep((value) => value + 1);
    setIsLoading(false);
    
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

  

  const onSubmit = async data => {
    if (step !== STEPS.CONFIRM) {
      return onNext();
    }

    if (data && data.svideo && Array.isArray(data.svideo)) {
      const svideoIndex = data.svideo.findIndex((video) => video && video.id);
      if (svideoIndex !== -1) {
        data.svideo[svideoIndex].userId = session.user.id;
      }
    }
    
    setIsLoading(true);

    axios.post('/api/video', data)
      .then(() => {
        toast.success('Video saved!')
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
        {videos.map((item, id) => (
            <div key={id} className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-x-2">
                <Thumbnail src={item?.snippet?.thumbnails?.medium?.url} />
                <div className="w-56 ss:w-64 sm:w-96">
                    <h2 className="font-medium text-white ">{item?.snippet?.title}</h2>
                    <p className="text-sm font-normal text-gray-400 line-clamp-2 leading-normal">{item?.snippet?.description}</p>
                </div>
            </div>
            </div>
        ))}
        {(videos.length < 1 )&& (
          <div className="text-red-500">
            No video ...<br/> 
            Please Try Again
          </div>
        )}
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