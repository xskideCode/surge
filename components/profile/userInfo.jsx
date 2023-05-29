'use client';

import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Socials from "@components/home/Socials";
import useImageModal from "@hooks/useImageModal";
import useSocialsModal from "@hooks/useSocialsModal";
import useUserInfoModal from "@hooks/useUserInfoModal";
import { BsFacebook, BsInstagram, BsTiktok, BsTwitter } from "react-icons/bs";
import { MdDelete, MdDeleteForever, MdEdit } from "react-icons/md";

export const socialMedia = [
  {
    id: "instagram",
    icon: BsInstagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "facebook",
    icon: BsFacebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "twitter",
    icon: BsTwitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "tiktok",
    icon: BsTiktok,
    link: "https://www.tiktok.com/",
  },
];

const UserInfo = ({ user, isLoading }) => {
  const userInfoModal = useUserInfoModal();
  const socialsModal = useSocialsModal();
  const imageModal = useImageModal();


  return (
    <div className="flex flex-col gap-6 overflow-hidden shadow rounded-2xl">
      {/* User Photo */}
      <div className="flex flex-row justify-start items-center gap-4">
        <div className="relative max-w-[80px] my-6">
          <Avatar src={user?.image} alt={user?.name || user?.username} large />
          <div onClick={() => {imageModal.onOpen(); }} className="absolute top-0 right-1 rounded-full p-[2px] text-black bg-[#8387A1] ring-[3px] ring-zinc-900 hover:scale-125"><MdDelete size={14} /></div>
        </div>
        <div>
          <h3 className={`heading3 text-lg  font-semibold leading-6 mb-4`}>
            {((user?.name || user?.username) && !isLoading ) ? (
              <>
              {user?.name || user?.username }
              </>
            ):(
              <div className="bg-zinc-700 opacity-30 rounded-sm w-32 h-6 animate-pulse" />
            )}
          </h3>
        </div>
      </div>
      {/* Basic Info */}
      <div className="bg-zinc-800 rounded-t-2xl rounded-b-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-500">
          <h3 className={`heading4 text-base font-semibold leading-6`}>
            Basic Info
          </h3>
          <p className={`paragraph2 max-w-2xl text-slate-300`}>
            Personal info and options to manage it.
          </p>
        </div>
        <div className="mb-4 mt-2">
          <dl>
            <div className="px-4 grid grid-cols-3 grid-flow-row sm:px-6">
              <dt className={`heading5 text-sm text-slate-400 col-span-3 `}>Username</dt>
              <dd className={`paragraph2 mt-1 text-sm sm:mt-0 col-span-2`}>
              {((user?.name || user?.username) && !isLoading ) ? (
                  user?.name || user?.username 
                ) : (
                  <div className="w-32 h-4 rounded-sm opacity-25 bg-zinc-700 animate-pulse" />
                )}
              </dd>
              
            </div>
            <div className="px-4 grid grid-cols-3 grid-flow-row sm:px-6">
              <dt className={`heading5 text-sm text-slate-400 col-span-3`}>Email</dt>
              <dd className={`paragraph2 mt-1 text-sm sm:mt-0 col-span-3`}>
              {(user?.email || user?.username) && !isLoading ? (
                user.email
              ) : (
                <div className="w-52 h-4 rounded-sm opacity-25 bg-zinc-700 animate-pulse" />
              )}
              </dd>
              <div className="bg-zinc-700 col-span-3 max-w-[100px] min-w-[85px] mt-2 rounded-lg justify-self-end">
                <Button
                  label={'Update'}
                  outline
                  small
                  onClick={() => {userInfoModal.onOpen(); }}
                />
              </div>
            </div>
          </dl>
        </div>
      </div>
      {/* Contacts */}
      <div className=" bg-zinc-800 rounded-lg pt-3 pb-5">
        <div className="px-4 pb-3 sm:px-6">
          <h3 className={`heading4 text-base font-semibold leading-6 `}>
            Contact Info
          </h3>
          <p className={`paragraph2 max-w-2xl text-slate-300`}>
            Share your socials to other users.
          </p>
        </div>
        <div className="border-t border-gray-500">
          <dl>
            <div className="px-4 pt-1 grid grid-cols-4 gap-4 sm:px-6 ">
              <dt className={`heading5 text-sm text-slate-400 col-span-4`}>Socials</dt>
              <div className={`flex flex-row mt-1 gap-5 col-span-3 ${isLoading ? 'animate-pulse' : ''}`}>
                {socialMedia.map((social) => (
                  <Socials
                    key={social.id}
                    icon={social.icon}
                    label={social.id}
                    link={social.link}
                    user={user}
                  />
                ))}
              </div> 
              <div className="bg-zinc-700 max-w-[100px] min-w-[75px] rounded-lg justify-self-end">
                <Button
                  label={'Add'}
                  outline
                  small
                  onClick={() => {socialsModal.onOpen(); }}
                />
              </div>            
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
