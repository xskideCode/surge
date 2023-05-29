import Avatar from '@components/Avatar'
import Button from '@components/Button'
import useChannelModal from '@hooks/useChannelModal'
import Image from 'next/image'
import { FaRegEdit } from 'react-icons/fa'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'

export function shortenNumber(str) {
    const num = Number(str);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return str;
    }
  }

const ChannelsTable = ({ channels }) => {    
  const channelModal = useChannelModal();

  return (
    <section className="container mx-auto rounded-2xl">
      <div className="flex justify-between items-center gap-x-3">
          <h2 className="text-lg font-medium text-white">Channels</h2>
          <div className="bg-zinc-700 max-w-[130px] min-w-[125px] rounded-lg">
            <Button 
            label={'Add Channel'}
            small 
            onClick={() => {channelModal.onOpen(); }}          
            />
          </div>
      </div>

    <div className="flex flex-col mt-6">
        <div className="-mx-3 -my-2 overflow-x-auto md:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-700 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-800">
                            <tr>
                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-400">
                                    <div className="flex items-center gap-x-3">
                                        <input type="checkbox" className="text-blue-500 rounded bg-gray-900 ring-offset-gray-900 border-gray-700"/>
                                        <span>Channel</span>
                                    </div>
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400">Videos</th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400">Subscribers
                                </th>

                                <th scope="col" className="relative py-3.5 px-4">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-900 divide-y divide-gray-700 ">
                            {(channels && channels.length > 0) ? (
                                channels.map((item) => (
                                    <tr>
                                        <td className="px-4 py-4 text-sm min-w-[300px] font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                <input type="checkbox" className="text-blue-500 rounded bg-gray-900 ring-offset-gray-900 border-gray-700"/>

                                                <div className="flex items-center gap-x-2">
                                                    <Avatar src={item?.snippet.thumbnails.medium.url}
                                                    />
                                                    <div className='w-40 ss:w-52 '>
                                                        <h2 className="font-medium text-white ">{item?.snippet.title}</h2>
                                                        <p className="text-sm font-normal text-gray-400 truncate">{item?.snippet.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{shortenNumber(item?.statistics.videoCount)} {item?.statistics.videoCount === '1' ? 'Video' : 'Videos'}</td>

                                        <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">{shortenNumber(item?.statistics.subscriberCount)} {item?.statistics.videoCount === '1' ? 'sub' : 'subs'}</td>
                                        
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">
                                                <div className="transition-colors duration-200 text-gray-300 hover:text-red-500 focus:outline-none">
                                                    <MdDeleteOutline size={20} />
                                                </div>

                                                <div className="transition-colors duration-200 text-gray-300 hover:text-yellow-500 focus:outline-none">
                                                    <FaRegEdit size={20}/>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                
                            ) : (                            
                            <tr className='animate-pulse'>
                                <td className="px-4 py-4 text-sm min-w-[300px] font-medium text-gray-700 whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                        <input type="checkbox" disabled className="text-blue-500 rounded bg-gray-900 ring-offset-gray-900 border-gray-700 opacity-30"/>

                                        <div className="flex items-center gap-x-2">
                                            <Image 
                                            className=" opacity-30 object-cover rounded-full" 
                                            src="/assets/images/placeholder.png" 
                                            alt="video thumbnail"
                                            width={40}
                                            height={40}
                                            />
                                            <div>
                                                <h2 className="font-medium text-white w-14 h-3 bg-zinc-600 rounded-sm opacity-30 mb-3"></h2>
                                                <div className="text-sm font-normal w-20 h-2 bg-zinc-600 rounded-sm odivacity-30"></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                
                                <td className="px-4 py-1"><div className='w-12 h-3 my-7 bg-zinc-600 rounded-sm opacity-30' /></td>

                                <td className="px-4 py-1"><div className='w-12 h-3 my-7 bg-zinc-600 rounded-sm opacity-30' /></td>
                                
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div className="flex items-center gap-x-6">
                                        <div className="opacity-50 transition-colors duration-200 text-gray-300 hover:text-red-500 focus:outline-none">
                                            <MdDeleteOutline size={20} />
                                        </div>

                                        <div className="opacity-50 transition-colors duration-200 text-gray-300 hover:text-yellow-500 focus:outline-none">
                                            <FaRegEdit size={20}/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div className="flex items-center justify-between mt-6">
        <a href="#" className="flex items-center px-5 py-2 text-sm capitalize transition-colors duration-200  border rounded-md gap-x-2 bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800">
            <HiArrowNarrowLeft />

            <span>
                previous
            </span>
        </a>

        <div className="items-center hidden lg:flex gap-x-3">
            <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md bg-gray-800">1</a>
            <a href="#" className="px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300 ">2</a>
            <a href="#" className="px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300 ">3</a>
            <a href="#" className="px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300 ">...</a>
            <a href="#" className="px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300 ">5</a>
            <a href="#" className="px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300 ">6</a>
            <a href="#" className="px-2 py-1 text-sm rounded-md hover:bg-gray-800 text-gray-300 ">7</a>
        </div>

        <a href="#" className="flex items-center px-5 py-2 text-sm  capitalize transition-colors duration-200 border rounded-md gap-x-2 bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800">
            <span>
                Next
            </span>

            <HiArrowNarrowRight />
        </a>
    </div>
</section>
  )
}

export default ChannelsTable