import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";

const CategoryBox = ({
  label,
  id,
  selected
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      category: label,
      categoryId: id
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category;
      delete updatedQuery.categoryId;
    }

    let url;

    if (pathname === '/') {
      
      url = qs.stringifyUrl({
        url: '/videos',
        query: updatedQuery
      }, { skipNull: true });
    } else {
      
      url = qs.stringifyUrl({
        url: '/videos',
        query: updatedQuery
      }, { skipNull: true });
    }

    router.push(url, undefined, { scroll: false });
    
  }, [label, id, params, router]);

  return (
    <div 
      onClick={handleClick}
      className={`
        flex 
        flex-row 
        items-center 
        px-2
        py-1
        border-b-2
        rounded-md
        mt-2 
        feedback-card 
        cursor-pointer
        ${selected ? 'ring-2 ring-gray-300 ring-opacity-30 bg-black-gradient' : 'bg-zinc-700 bg-opacity-40'}
        ${selected ? 'border-b-slate-400' : 'border-transparent'}
      `}
    >
      <p 
        className="
          font-poppins 
          font-medium 
          text-[14px] 
          leading-[27px] 
          text-dimWhite 
          whitespace-nowrap
        "
      >
          {label}
      </p>
    </div>
  )
}

export default CategoryBox