"use client";

import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [  
  {
    id: "10",
    label: "Music",
  },
  {
    id: "20",
    label: "Gaming",
  },
  {
    id: "22",
    label: "People & Blogs",
  },
  {
    id: "23",
    label: "Comedy",
  },
  {
    id: "19",
    label: "Travel & Events",
  },
  {
    id: "2",
    label: "Cars & Vehicles",
  },
  {
    id: "27",
    label: "Education",
  },
  {
    id: "24",
    label: "Entertainment",
  },
  {
    id: "1",
    label: "Film & Animation",
  },
  {
    id: "17",
    label: "Sport",
  },
  {
    id: "26",
    label: "How-to & Style",
  },
  {
    id: "25",
    label: "News & Politics",
  },
  {
    id: "29",
    label: "Non-profits & Activism",
  },
  {
    id: "15",
    label: "Pets & Animals",
  },
  {
    id: "28",
    label: "Science & Technology",
  },
  {
    id: "0",
    label: "Other",
  }  
];

const Category = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = (pathname === '/') || (pathname === '/videos');

  if (!isMainPage) {
    return null;
  }

  return (
    <div className="flex justify-center">
    <div
      className="
        flex_center 
        scrollbar_dark 
        flex-row 
        md:px-0 
        px-2 
        pt-2 
        pb-4
        xl:w-[1000px]
        md:w-[900px]
        sm:w-[700px]        
        ss:w-[600px]        
        xs:w-[450px]        
        w-[300px]
        transition
        transform 
        overflow-x-auto
      "
    >
      <div className="scrollbar_dark flex flex-row justify-between rounded-[7px] pb-2 px-4 overflow-x-auto bg-black-gradient md:mt-0 mt-10 gap-3">
        {categories.map((item) => (
          <CategoryBox
            key={item.id}
            label={item.label}
            id={item.id}
            selected={category === item.label}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Category;
