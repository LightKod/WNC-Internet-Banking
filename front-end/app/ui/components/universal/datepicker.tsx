"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type DatepickerType = "from" | "to";

export default function Datepicker({ type }: { type: DatepickerType }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [inputDate, setInputDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);
    console.log(today);
    console.log(lastMonth);
    const fromDate = lastMonth.toISOString().split("T")[0];
    const endDate = today.toISOString().split("T")[0];
    switch (type) {
      case "from":
        setInputDate(fromDate);
        break;
      case "to":
        setInputDate(endDate);
        break;
    }
  }, []);

  const handleInput = (date: string) => {
    setInputDate(date);
    const params = new URLSearchParams(searchParams);
    if (date) {
      params.set(type, date);
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
        className={`flex rounded-md border-2 border-slate-100 cursor-pointer p-2 text-sm placeholder:text-gray-600 placeholder:text-sm`}
      />
    </>
  );
}
