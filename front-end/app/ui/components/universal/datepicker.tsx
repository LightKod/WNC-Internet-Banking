"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

type DatepickerType = "from" | "to";

export default function Datepicker({ type }: { type: DatepickerType }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const today = new Date();
  const [inputDate, setInputDate] = useState<string>(
    today.toISOString().split("T")[0]
  );

  const handleInput = (date: string) => {
    const params = new URLSearchParams(searchParams);
    if (date) {
      params.set(type, date);
    } else {
      params.delete(type);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <input
        type="date"
        value={inputDate}
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        defaultValue={searchParams.get(type)?.toString()}
        className={`flex rounded-md border-2 border-slate-100 cursor-pointer p-2 text-sm placeholder:text-gray-600 placeholder:text-sm`}
      />
    </>
  );
}
