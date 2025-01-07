"use client";
import React, { useRef, useState } from "react";
import { allBanks } from "@/app/lib/definitions/definition";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SelectBank() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSelectBank = (bankCode: string) => {
    console.log(bankCode);
    const params = new URLSearchParams(searchParams);
    if (bankCode === "RSA") {
      params.set("bank", bankCode);
    } else {
      params.set("bank", "");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex gap-5">
      <div key={"allBanks"} className="flex items-center gap-2">
        <label
          htmlFor={"allBanks"}
          onClick={() => handleSelectBank("")}
          className="flex relative justify-center items-center h-7 w-7 bg-slate-100 border-2 border-slate-200 peer-checked:border-blue-400 transition-colors rounded-full cursor-pointer">
          <input
            type="radio"
            id={"allBanks"}
            name="selectBank"
            className="hidden peer"
            value={""}
            defaultChecked
          />
          <div className="h-7 w-7 absolute rounded-full peer-checked:border-blue-600 border-transparent transition-colors  border-2"></div>
          <div className="h-3 w-3 bg-blue-600 scale-0 peer-checked:scale-100 transition-all rounded-full"></div>
        </label>
        <span className="text-md font-bold ">All Banks</span>
      </div>
      {Object.entries(allBanks).map(([key, value]) => (
        <div key={key} className="flex items-center gap-2">
          <label
            htmlFor={key}
            onClick={() => handleSelectBank(key)}
            className="flex relative justify-center items-center h-7 w-7 bg-slate-100 border-2 border-slate-200 peer-checked:border-blue-400 transition-colors rounded-full cursor-pointer">
            <input
              type="radio"
              id={key}
              name="selectBank"
              className="hidden peer"
              value={key}
            />
            <div className="h-7 w-7 absolute rounded-full peer-checked:border-blue-600 border-transparent transition-colors  border-2"></div>
            <div className="h-3 w-3 bg-blue-600 scale-0 peer-checked:scale-100 transition-all rounded-full"></div>
          </label>
          <span className="text-md font-bold ">{value.name}</span>
        </div>
      ))}
    </div>
  );
}
