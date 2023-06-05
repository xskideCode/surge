'use client';

import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Pagination from "@components/Pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PromotionsTable = ({ promotions }) => {
  const router = useRouter();
  const currentDate = new Date();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5); 
  const [currentPromotions, setCurrentPromotions] = useState([]);

  useEffect(() => {
    if (promotions && promotions.length > 0) {
      const lastPostIndex = currentPage * postsPerPage;
      const firstPostIndex = lastPostIndex - postsPerPage;
      const promotionsToShow = promotions.slice(firstPostIndex, lastPostIndex);
      setCurrentPromotions(promotionsToShow);
    }
  }, [promotions, currentPage, postsPerPage]);

  return (
    <section className="container mx-auto rounded-2xl">
      <div className="flex justify-between items-center gap-x-3">
        <h2 className="text-lg font-medium text-white">Promotions</h2>
        <div className="bg-zinc-700 max-w-[130px] min-w-[125px] rounded-lg">
          <Button
            label={"Promote"}
            small
            onClick={() => {
              router.push("/pricing");
            }}
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
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-400"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Promotion</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                    >
                      From
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                    >
                      To
                    </th>

                    <th
                      scope="col"
                      className="relative py-3.5 px-4 text-sm font-normal text-gray-400"
                    >
                      <span>Plan</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700 ">
                  {promotions && promotions.length > 0 ? (
                    currentPromotions.map((item , id) => (
                      <tr key={item.id}>
                        <td className="px-4 py-4 text-sm min-w-[300px] font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <Avatar
                                medium
                                src={item?.snippet?.thumbnails?.high?.url}
                              />
                              <div className="w-40 ss:w-52 ">
                                <h2 className="font-medium text-white ">
                                  {item?.snippet?.title}
                                </h2>
                                <p className="text-sm font-normal text-gray-400 truncate">
                                  {item?.snippet?.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="pl-1.5 pr-2 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {item?.status === "pending" ? (
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                              <h2 className="text-sm font-normal text-orange-500">
                                Pending
                              </h2>
                            </div>
                          ) : new Date(item.expireAt).getTime() >
                            currentDate.getTime() ? (
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                              <h2 className="text-sm font-normal text-emerald-500">
                                Active
                              </h2>
                            </div>
                          ) : (
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-800">
                              <span className="h-1.5 w-1.5 rounded-full bg-gray-500"></span>
                              <h2 className="text-sm font-normal text-gray-500">
                                Inactive
                              </h2>
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                          {new Date(item?.createdAt).toDateString()}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                          {new Date(item?.expireAt).toDateString()}
                        </td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <p className="px-3 py-1 text-xs text-purple-500 rounded-full bg-gray-800">
                              {item?.plan} Plan
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr className="animate-pulse">
                        <td className="px-4 py-4 text-sm min-w-[300px] font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <Image
                                className="opacity-30 object-cover rounded-full"
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

                        <td className="pl-1.5 pr-2 py-4 text-sm font-medium text-gray-700 whitespace-nowrap opacity-30">
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-800">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-500"></span>

                            <h2 className="text-sm font-normal text-gray-500">
                              Inactive
                            </h2>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                          <div className="w-12 h-3 my-7 bg-zinc-600 rounded-sm opacity-30" />
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                          <div className="w-12 h-3 my-7 bg-zinc-600 rounded-sm opacity-30" />
                        </td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap opacity-30">
                          <div className="flex items-center justify-center">
                            <p className="px-3 py-1 text-xs text-purple-500 rounded-full bg-gray-800">
                              3 Day Plan
                            </p>
                          </div>
                        </td>
                      </tr>

                      <tr className="animate-pulse">
                        <td className="px-4 py-4 text-sm min-w-[300px] font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <Image
                                className="opacity-30 object-cover rounded-full"
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

                        <td className="pl-1.5 pr-2 py-4 text-sm font-medium text-gray-700 whitespace-nowrap opacity-30">
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-gray-800">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                            <h2 className="text-sm font-normal text-emerald-500">
                              Active
                            </h2>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                          <div className="w-12 h-3 my-7 bg-zinc-600 rounded-sm opacity-30" />
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                          <div className="w-12 h-3 my-7 bg-zinc-600 rounded-sm opacity-30" />
                        </td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap opacity-30">
                          <div className="flex items-center justify-center">
                            <p className="px-3 py-1 text-xs text-purple-500 rounded-full bg-gray-800">
                              Weekly Plan
                            </p>
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Pagination
            totalPosts={promotions?.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
    </section>
  );
};

export default PromotionsTable;
