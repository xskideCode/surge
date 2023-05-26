'use client';

import { MdCheckCircle } from 'react-icons/md';
import Link from 'next/link';

import Avatar from '@components/Avatar';
import { useState } from 'react';
import Loader from '@components/Loader';
//import ChannelCard from './ChannelCard'

const Promoted = () => {
    const [allpromotions, setAllpromotions] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    return (

        <section className='flex_center padding_y flex-col'>
            <div className="flex flex-row justify-center items-center py-[3px] px-4 bg-discount-gradient rounded-[10px] mb-2 ">
                <p className='font-poppins font-normal text-dimWhite xs:text-[18px] text-[12px] m-2 text-center'>
                    <span className="  text-gray-200">PROMOTED CHANNELS</span>
                </p>
            </div>
            <div className='flex flex-row items-center py-[6px] px-2 bg-discount-gradient rounded-[10px] mb-2 w-11/12 overflow-x-auto'>
            {isLoading ? (
                <div className='flex justify-center w-full'>
                    <Loader small />
                </div>
                ) : (
                allpromotions.map((promotion) => (
                    <div className="flex flex-row justify-center px-5 py-1 ">
                    <div className="flex flex-col items-center">
                        <Link href={`/channel/${promotion?.id}`}>
                            <div className='flex flex-col justify-center items-center'>
                            <Avatar src={promotion?.snippet?.thumbnails?.high?.url} />
                                <h6 className='px-auto my-1 truncate font-poppins font-semibold xs:text-[14px] text-[12px]'>
                                    {promotion?.snippet?.title}
                                    <MdCheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '4px' }} />
                                </h6>
                            </div>
                        </Link>
                        <button
                            type="button" 
                            className='py-1 px-2 bg-red-600 font-poppins font-semibold text-[12px] text-white outline-none rounded-md'
                            onClick={() => {
                                const url = `https://www.youtube.com/channel/${promotion.id}?sub_confirmation=1`;
                                window.open(url, '_blank');
                            }}
                            >
                            Subscribe
                        </button>
                    </div>
                    </div>
                ))
            )}
            </div>
        </section>
    )
}


export default Promoted