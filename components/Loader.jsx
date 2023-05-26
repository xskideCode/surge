'use client';

import { PuffLoader } from 'react-spinners';

const Loader = ({ small }) => {
  return (
    <div 
      className={`
        flex
        flex-col
        justify-center
        items-center
        ${small ? 'h-[10vh]' : 'h-[70vh]'}
       `}
    >
      <PuffLoader
        size={`${ small ? '60px' : '100px' }`}
        color="purple"
      />
    </div>
  )
}

export default Loader