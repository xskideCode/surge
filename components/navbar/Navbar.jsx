"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import useTempChannels from "@hooks/useTempChannels";

const Nav = () => {
  const { data: session } = useSession();
  const tempChannels = useTempChannels();

  useEffect(() => {
    const user = session?.user    
  }, [session?.user])

  useEffect(() => {
    if (session?.user.channels && session?.user.channels.length !== 0 ) { // Check if session.channels is an empty array
      localStorage.setItem("tempChannels", JSON.stringify(session?.user.channels))
      sessionStorage.setItem("userId", JSON.stringify(session?.user.id))
    }    
  }, [session])  
  
  

  return (
    <nav className='flex justify-between items-center py-6 gap-3 w-full mb-1 sm:mb-4'>
      <Logo />   

      {/* Desktop Navigation */}
      <div className='sm:flex hidden items-center'>
        <Link href='/' className='white_link'>
          Home
        </Link>
        <Link href='/videos' className='white_link'>
          Videos
        </Link>
        <Link href='/channels' className='white_link'>
          Channels
        </Link>
        <div className="flex flex-row items-center gap-3">
          <Search />
          <UserMenu user={session?.user} />
        </div>       
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        <div className="flex flex-row items-center gap-2">
          <Search />
          <UserMenu user={session?.user} />
        </div>
      </div>

    </nav>
  );
};

export default Nav;