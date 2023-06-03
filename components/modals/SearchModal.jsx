"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import Modal from "./Modal";

import useSearchModal from "@hooks/useSearchModal";
import { IoMdOptions } from "react-icons/io";
import { useForm } from "react-hook-form";
import Button from "@components/Button";

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search_query: "",
      sort: "upload-date",
      type: "video",
    },
  });

  const sort = watch("sort");
  const type = watch("type");
  const search_query = watch("search_query");

  const setCustomValue = useCallback(
    (id, value) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      });
    },
    [setValue]
  );

  const onSubmit = useCallback(
    async (data) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery = {
        ...currentQuery,
        search_query: data.search_query,
        type: data.type,
        sort: data.sort,
      };

      if (updatedQuery.type === "video") {
        delete updatedQuery.type;
      }
      if (updatedQuery.sort === "upload-date") {
        delete updatedQuery.sort;
      }
      if (updatedQuery.search_query === "") {
        delete updatedQuery.search_query;
      }

      let url;

      if (updatedQuery.type === "channel") {
        url = qs.stringifyUrl(
          {
            url: "/channels",
            query: updatedQuery,
          },
          { skipNull: true }
        );
      } else {
        url = qs.stringifyUrl(
          {
            url: "/videos",
            query: updatedQuery,
          },
          { skipNull: true }
        );
      }

      searchModal.onClose();

      router.push(url, undefined, { scroll: false });
    },
    [searchModal, router, params]
  );

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="bg-primary items-center justify-between flex p-2">
        <input
          {...register("search_query")}
          className="font-bold rounded-lg w-full py-2 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-base text-sm"
          type="text"
          placeholder="Search"
        />
        <div
          onClick={handleSubmit(onSubmit)}
          className="bg-gray-600 p-2 hover:bg-secondary cursor-pointer mx-2 rounded-full"
        >
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="flex-col gap-1">
        <div className="flex flex-row p-2 gap-1 items-center">
          <h2 className="text-lg font-semibold ">Filters</h2>
          <IoMdOptions />
          <div className="ml-9 min-w-[150px]" >
          <Button
            type="button"
            label={`Reset filters`}
            outline
            small
            onClick={() => {
              reset(); // Reset form values to their default values
              handleSubmit(onSubmit)();
            }}
          />
          </div>
        </div>
        {/* Filters */}
        <div className="relative flex flex-col gap-8 p-2">
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center max-w-min gap-2 border-b border-gray-400 pb-1 transition hover:border-gray-600 text-white">
              <h2 className="text-sm whitespace-nowrap font-medium">Sort By</h2>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
              <div className="w-64 rounded border border-gray-400 bg-gray-600 focus:ring-offset-gray-900">
                <h2 className="flex items-center justify-between p-4 text-sm text-gray-200">
                  Sort By
                </h2>
                <ul className="space-y-1 border-t p-4 border-gray-400">
                  <li>
                    <div
                      onClick={() => setCustomValue("sort", "upload-date")}
                      className="inline-flex items-center gap-2"
                    >
                      <span
                        className={`text-sm cursor-pointer font-medium hover:text-white ${
                          sort === "upload-date"
                            ? "text-neutral-200"
                            : "text-neutral-400"
                        }`}
                      >
                        Upload Date
                      </span>
                    </div>
                  </li>

                  <li>
                    <div
                      onClick={() => setCustomValue("sort", "likes")}
                      className="inline-flex items-center gap-2"
                    >
                      <span
                        className={`text-sm cursor-pointer font-medium hover:text-white ${
                          sort === "likes"
                            ? "text-neutral-200"
                            : "text-neutral-400"
                        }`}
                      >
                        Likes
                      </span>
                    </div>
                  </li>

                  <li>
                    <div
                      onClick={() => setCustomValue("sort", "view-count")}
                      className="inline-flex items-center gap-2"
                    >
                      <span
                        className={`text-sm cursor-pointer font-medium hover:text-white ${
                          sort === "view-count"
                            ? "text-neutral-200"
                            : "text-neutral-400"
                        }`}
                      >
                        View Count
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center max-w-min gap-2 border-b border-gray-400 pb-1 transition hover:border-gray-600 text-white">
              <h2 className="text-sm whitespace-nowrap font-medium">Type</h2>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
              <div className="w-60 rounded border border-gray-400 bg-gray-600 focus:ring-offset-gray-900">
                <h2 className="flex items-center justify-between p-4 text-sm text-gray-200">
                  Type
                </h2>
                <div className="border-t p-4 border-gray-400 flex justify-between gap-4">
                  <span
                    onClick={() => setCustomValue("type", "video")}
                    className={`text-sm cursor-pointer hover:text-white ${
                      type === "video" ? "text-neutral-200" : "text-neutral-400"
                    }`}
                  >
                    Videos
                  </span>

                  <span
                    onClick={() => setCustomValue("type", "channel")}
                    className={`text-sm cursor-pointer hover:text-white ${
                      type === "channel"
                        ? "text-neutral-200"
                        : "text-neutral-400"
                    }`}
                  >
                    Channels
                  </span>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Search"
      actionLabel="Search"
      body={bodyContent}
    />
  );
};

export default SearchModal;
