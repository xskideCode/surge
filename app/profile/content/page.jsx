import Button from '@components/Button'
import ChannelsTable from '@components/profile/channelsTable'
import VideosTable from '@components/profile/videosTable'
import React from 'react'

const UserContent = () => {
  return (
    <div className='flex flex-col gap-8 w-[90vw] overflow-x-auto scrollbar-none  justify-center p-4'>
       <div>
        <ChannelsTable />
       </div>
       <hr class="my-2 border-gray-600"/>
       <div>
        <VideosTable />
       </div>
    </div>
  )
}

export default UserContent