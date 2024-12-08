"use client";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchField({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="flex items-center gap-2">
      <input
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
        placeholder={placeholder}
        className={`flex rounded-md border-2 border-slate-100 p-2 text-sm placeholder:text-gray-600 placeholder:text-sm`}
      />
      <MagnifyingGlassCircleIcon className="size-8 text-slate-600" />
    </div>
  );
}
