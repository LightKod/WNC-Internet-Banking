import { PencilIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function EditContact() {
  return (
    <>
      <button className="relative group overflow-hidden text-sm text-amber-500 w-1/2 h-full px-2 py-1 bg-amber-100 rounded border-2 border-amber-500">
        <div className="font-bold  translate-x-0 group-hover:-translate-x-2 transition-all duration-300">
          Edit
        </div>
        <PencilIcon className="size-2/3 inset-y-[3.5px] absolute right-2 opacity-0 group-hover:-right-3 group-hover:opacity-100 transition-all duration-300" />
      </button>
    </>
  );
}
