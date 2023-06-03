"use client";

import { usePathname, useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";
import Loader from "./Loader";

const EmptyState = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
  loading,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      {isMainPage || loading ? (
        <Loader />
      ) : (
        <Heading center title={title} subtitle={subtitle} />
      )}
      <div className="w-48 mt-4">
        {showReset && !isMainPage && !loading && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => {
              const currentPath = pathname;
              let url;

              if (currentPath.includes("/channels")) {
                url = "/channels";
              } else if (currentPath.includes("/videos")) {
                url = "/videos";
              } else {
                return;
              }

              router.push(url);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
