'use client';

import useSearchModal from "@hooks/useSearchModal";
import { ImSearch } from "react-icons/im";


const Search = () => {
  const searchModal = useSearchModal();
  return (
    <div
      onClick={searchModal.onOpen}
      className="
        bg-zinc-800
        w-[30vw]
        sm:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
        "
      >
        <div
          className="
            text-sm
            font-semibold
            font-poppins
            pl-4
            pr-3
            text-gray-400
            flex
            flex-row
            items-center
            gap-3
          "
        >
          <div className="hidden sm:block">Search</div>
          <div
            className="
              text-white
            "
          >
            <ImSearch size={18}/>
          </div>
        </div>
      </div>      
    </div>
  )
}

export default Search