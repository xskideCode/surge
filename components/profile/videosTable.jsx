'use client';
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Button from "@components/Button";
import Thumbnail from "@components/Thumbnail";
import useVideoModal from "@hooks/useVideoModal";
import { shortenNumber } from "./channelsTable";
import useUpdateModal from "@hooks/useUpdateModal";
import useDelVidModal from "@hooks/useDelVidModal";
import DelVidModal from "@components/modals/DelVidModal";
import Pagination from "@components/Pagination";

const VideosTable = ({ videos }) => {
  const videoModal = useVideoModal();
  const updateModal = useUpdateModal();
  const delVidModal = useDelVidModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5); 
  const [currentVideos, setCurrentVideos] = useState([]);

  useEffect(() => {
    if (videos && videos.length > 0) {
      const lastPostIndex = currentPage * postsPerPage;
      const firstPostIndex = lastPostIndex - postsPerPage;
      const videosToShow = videos.slice(firstPostIndex, lastPostIndex);
      setCurrentVideos(videosToShow);
    }
  }, [videos, currentPage, postsPerPage]);

  return (
    <>
      <section className="container mx-auto rounded-2xl">
        <div className="flex justify-between items-center gap-x-3">
          <h2 className="text-lg font-medium text-white">Videos</h2>
          <div className="bg-zinc-700 max-w-[130px] min-w-[115px] rounded-lg">
            <Button
              label={"Add Video"}
              small
              onClick={() => {
                videoModal.onOpen();
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
                          {/* <input
                            type="checkbox"
                            className="text-blue-500 rounded bg-gray-900 ring-offset-gray-900 border-gray-700"
                          /> */}
                          <span>Video</span>
                        </div>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                      >
                        Channel
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                      >
                        Likes
                      </th>

                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-700 ">
                    {videos && videos.length > 0 ? (
                      currentVideos.map((item) => (
                        <tr key={item._id}>
                          <td className="px-4 py-4 text-sm min-w-[300px] font-medium text-gray-700 whitespace-nowrap text-ellipsis overflow-hidden">
                            <div className="inline-flex items-center gap-x-3">
                              {/* <input
                                type="checkbox"
                                className="text-blue-500 rounded bg-gray-900 ring-offset-gray-900 border-gray-700"
                              /> */}

                              <div className="flex items-center gap-x-2">
                                <Thumbnail
                                  src={item?.snippet.thumbnails.medium.url}
                                />
                                <div className="w-40 ss:w-52 sm:w-[250px] md:w-[340px] lg:w-[500px]">
                                  <h2 className="font-medium text-white truncate">
                                    {item?.snippet?.title}
                                  </h2>
                                  <p className="text-sm font-normal text-gray-400 truncate ">
                                    {item?.snippet?.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                            {item?.snippet.channelTitle}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                            {shortenNumber(item?.likes.length)}{" "}
                            {item?.likes.length === 1 ? "like" : "likes"}
                          </td>

                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <div className="transition-colors duration-200 text-gray-300 hover:text-red-500 focus:outline-none">
                                <MdDeleteOutline
                                  size={20}
                                  onClick={() => {
                                    delVidModal.onOpen(item);
                                  }}
                                />
                              </div>

                              <div className="transition-colors duration-200 text-gray-300 hover:text-yellow-500 focus:outline-none">
                                <FaRegEdit
                                  onClick={() => {
                                    updateModal.onOpen();
                                  }}
                                  size={20}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="animate-pulse">
                        <td className="px-4 py-4 text-sm min-w-[300px] font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <input
                              type="checkbox"
                              disabled
                              className="text-blue-500 rounded bg-gray-900 ring-offset-gray-900 border-gray-700 opacity-30"
                            />

                            <div className="flex items-center gap-x-2">
                              <div className="bg-zinc-600 rounded-sm w-[120px] h-[68px] opacity-30" />
                              <div>
                                <h2 className="font-medium text-white w-14 h-3 bg-zinc-600 rounded-sm opacity-30 mb-3"></h2>
                                <div className="text-sm font-normal w-20 h-2 bg-zinc-600 rounded-sm odivacity-30"></div>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="w-12 h-3 my-7 bg-zinc-600 rounded-sm opacity-30" />
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="w-12 h-3 my-7 bg-zinc-600 rounded-sm opacity-30" />
                        </td>

                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <div className="opacity-50 transition-colors duration-200 text-gray-300 hover:text-red-500 focus:outline-none">
                              <MdDeleteOutline size={20} />
                            </div>

                            <div className="opacity-50 transition-colors duration-200 text-gray-300 hover:text-yellow-500 focus:outline-none">
                              <FaRegEdit size={20} />
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

        <div className="overflow-x-auto">
          <Pagination
            totalPosts={videos?.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </section>
      <DelVidModal isOpen={delVidModal.isOpen} onClose={delVidModal.onClose} />
    </>
  );
};

export default VideosTable;
