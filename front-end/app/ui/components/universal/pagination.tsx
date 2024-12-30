"use client";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  let currentPage = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";
  const ArrowButton = ({
    direction,
    isDisabled,
    handleClick,
  }: {
    direction: string;
    isDisabled: boolean;
    handleClick: () => void;
  }) => {
    if (direction === "left") {
      return (
        <li>
          <div
            onClick={() => {
              handleClick();
            }}
            className={clsx(
              {
                "bg-gray-300 cursor-default": isDisabled,
                "bg-white hover:bg-blue-100 transition-colors cursor-pointer hover:text-gray-700":
                  !isDisabled,
              },
              "flex items-center justify-center px-4 h-12 ms-0 leading-tight text-gray-700 border-2 border-e-0 border-slate-100 rounded-s-lg "
            )}>
            <svg
              className="w-4 h-4 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 1 1 5l4 4"
              />
            </svg>
          </div>
        </li>
      );
    } else {
      return (
        <li>
          <div
            onClick={handleClick}
            className={clsx(
              {
                "bg-gray-300 cursor-default": isDisabled,
                "bg-white hover:bg-blue-100 transition-colors cursor-pointer hover:text-gray-700":
                  !isDisabled,
              },
              "flex items-center justify-center px-4 h-12 leading-tight text-gray-700 border-2 border-slate-100 rounded-e-lg"
            )}>
            <svg
              className="w-4 h-4 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 9 4-4-4-4"
              />
            </svg>
          </div>
        </li>
      );
    }
  };
  
  if(totalPages !== 0) {
    return (
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <ArrowButton
            direction="left"
            isDisabled={currentPage <= 1}
            handleClick={() => {
              if (currentPage > 1) {
                currentPage--;
                const params = new URLSearchParams(searchParams);
                params.set("page", currentPage.toString());
                replace(`${pathname}?${params.toString()}`);
              }
            }}
          />
          <li className="cursor-default flex items-center justify-center px-4 h-12 leading-tight text-gray-700 bg-white border-2 border-slate-100">
            <span className=" select-none">
              {/* {currentPage + 1} /{" "}
              {totalPages === 0 ? currentPage + 1 : totalPages} */}
              {totalPages === 0 ? '1/1' : currentPage + '/' + totalPages}
            </span>
          </li>
          <ArrowButton
            direction="right"
            isDisabled={currentPage >= totalPages}
            handleClick={() => {
              if (currentPage < totalPages) {
                currentPage++;
                const params = new URLSearchParams(searchParams);
                params.set("page", currentPage.toString());
                replace(`${pathname}?${params.toString()}`);
              }
            }}
          />
        </ul>
      </nav>
    );
  }
}
