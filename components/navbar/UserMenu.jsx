'use client';

import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";

import useRegisterModal from "@hooks/useRegisterModal";
import useLoginModal from "@hooks/useLoginModal";

import MenuItem from "./MenuItem";
import Avatar from '@components/Avatar';

const UserMenu = ({ user }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, [])  

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div 
          onClick={toggleOpen}
          className='
            p-2
            md:py-1
            md:px-2
            bg-zinc-800
            border-neutral-200
            text-white
            flex 
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover: shadow-md
            transition
          '
        >
          
          {/* Menu Animation */}
          
          <button class="text-white rounded-md w-6  h-6  relative focus:outline-none transform transition-all  ring-0 ring-gray-300 hover:ring-2 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
              <span class="sr-only">Open main menu</span>
              <div class="block w-4 absolute left-1/2 top-1/2 transform  -translate-x-1/2 -translate-y-1/2">
                  <span ariaHidden="true" class={`block absolute h-0.5 w-4 bg-current transform transition duration-500 ease-in-out ${isOpen ? 'rotate-45': ' -translate-y-1.5'}`}></span>
                  <span ariaHidden="true" class={`block absolute  h-0.5 w-4 bg-current   transform transition duration-500 ease-in-out" ${isOpen ? 'opacity-0': '' } `}></span>
                  <span aria-hidden="true" class={`block absolute  h-0.5 w-4 bg-current transform  transition duration-500 ease-in-out" ${isOpen ? '-rotate-45': ' translate-y-1.5'}`}></span>
              </div>
          </button>

          <div className='hidden md:block'>
            <Avatar src={user?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className='
            absolute
            rounded-md
            shadow-md
            w-[40vw]
            sm:[30vw]
            md:w-[15vw]
            lg:w-[10vw]
            bg-black-gradient
            overflow-hidden
            right-0
            top-12
            text-sm
            sidebar
            z-10
          '
        >
          <div className='flex flex-col items-center gap-3 cursor-pointer'>
            {user ? (
              <>
                <div className="flex flex-col mt-2 px-2 py-2 justify-center">
                  < MenuItem
                    label='Home'
                    href='/'
                    hidden={true}
                    onClick={toggleOpen}
                  />
                  < MenuItem
                    label='Videos'
                    href='/videos'
                    hidden={true}
                    onClick={toggleOpen}
                  />
                  < MenuItem
                    label='Channels'
                    href='/channels'
                    hidden={true}
                    onClick={toggleOpen}
                  />
                  < MenuItem
                    label='Promotions'
                    href='/pricing'
                    hidden={false}
                    onClick={toggleOpen}
                  />
                  < MenuItem
                    label='Profile'
                    href={`/profile`}
                    hidden={false}
                    onClick={toggleOpen}
                  />
                  <button
                    type='button'
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className='mb-3 mt-1 purple_btn'
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
              <div className="flex flex-col mt-2 px-2 py-2 justify-center">
                < MenuItem
                  label='Home'
                  href='/'
                  hidden={true}
                  onClick={toggleOpen}
                />
                < MenuItem
                  label='Videos'
                  href='/videos'
                  hidden={true}
                  onClick={toggleOpen}
                />
                < MenuItem
                  label='Channels'
                  href='/channels'
                  hidden={true}
                  onClick={toggleOpen}
                />
                < MenuItem
                  label='Promotions'
                  href='/pricing'
                  onClick={toggleOpen}
                /> 
                <button
                    type='button'
                    onClick={() => {loginModal.onOpen(); toggleOpen();}}
                    className='purple_btn mb-3'
                    >
                      Login
                    </button>
                <button
                    type='button'
                    onClick={() => {registerModal.onOpen(); toggleOpen();}}
                    className='purple_btn mb-3'
                    >
                      Sign up
                    </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu