"use client";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useRef } from "react";
import AlertDialog, { AlertDialogRef } from "../universal/alert_dialog";

export default function ContactTable() {
  const alertRef = useRef<AlertDialogRef>(null);

  const openDialog = () => {
    alertRef.current?.openDialog();
  };

  return (
    <div>
      <table className="table-auto col-span-2 w-full bg-white select-none">
        <thead>
          <tr className="border-b-2 border-slate-200">
            <th className="pb-2.5">Card Number</th>
            <th>Owner</th>
            <th>Bank</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center cursor-pointer hover:bg-blue-50 transition-colors">
            <td className="font-bold px-2 py-2.5 border-b-2 border-slate-100">
              12038123
            </td>
            <td className=" px-2 py-2.5 border-b-2 border-slate-100">
              Nguyễn Văn A
            </td>
            <td className=" px-2 py-2.5 border-b-2 border-slate-100">
              Pickle ball bank
            </td>
            <td className=" px-2 py-2.5 border-b-2 border-slate-100">
              <div className="w-2/3 mx-auto flex gap-2">
                <button
                  onClick={openDialog}
                  className="relative group overflow-hidden text-sm text-red-500 w-1/2 h-full px-2 py-1 bg-red-100 rounded border-2 border-red-500">
                  <div className="font-bold  translate-x-0 group-hover:-translate-x-2 transition-all duration-300">
                    Delete
                  </div>
                  <TrashIcon className="size-2/3 inset-y-[3.5px] absolute right-2 opacity-0 group-hover:-right-3 group-hover:opacity-100 transition-all duration-300" />
                </button>
                <button className="relative group overflow-hidden text-sm text-amber-500 w-1/2 h-full px-2 py-1 bg-amber-100 rounded border-2 border-amber-500">
                  <div className="font-bold  translate-x-0 group-hover:-translate-x-2 transition-all duration-300">
                    Edit
                  </div>
                  <PencilIcon className="size-2/3 inset-y-[3.5px] absolute right-2 opacity-0 group-hover:-right-3 group-hover:opacity-100 transition-all duration-300" />
                </button>
              </div>
            </td>
          </tr>
          <tr className="text-center cursor-pointer hover:bg-blue-50 transition-colors">
            <td className="font-bold px-2 py-2.5 border-b-2 border-slate-100">
              12038123
            </td>
            <td className=" px-2 py-2.5 border-b-2 border-slate-100">
              Nguyễn Văn A
            </td>
            <td className=" px-2 py-2.5 border-b-2 border-slate-100">
              Pickle ball bank
            </td>
            <td className=" px-2 py-2.5 border-b-2 border-slate-100">
              <div className="w-2/3 mx-auto flex gap-2">
                <button
                  onClick={openDialog}
                  className="relative group overflow-hidden text-sm text-red-500 w-1/2 h-full px-2 py-1 bg-red-100 rounded border-2 border-red-500">
                  <div className="font-bold  translate-x-0 group-hover:-translate-x-2 transition-all duration-300">
                    Delete
                  </div>
                  <TrashIcon className="size-2/3 inset-y-[3.5px] absolute right-2 opacity-0 group-hover:-right-3 group-hover:opacity-100 transition-all duration-300" />
                </button>
                <button className="relative group overflow-hidden text-sm text-amber-500 w-1/2 h-full px-2 py-1 bg-amber-100 rounded border-2 border-amber-500">
                  <div className="font-bold  translate-x-0 group-hover:-translate-x-2 transition-all duration-300">
                    Edit
                  </div>
                  <PencilIcon className="size-2/3 inset-y-[3.5px] absolute right-2 opacity-0 group-hover:-right-3 group-hover:opacity-100 transition-all duration-300" />
                </button>
              </div>
            </td>
          </tr>
          <tr className="text-center cursor-pointer hover:bg-blue-50 transition-colors">
            <td className="font-bold px-2 py-2.5 border-b-2 border-slate-100">
              12038123
            </td>
            <td className=" px-2 py-2.5 border-b-2 border-slate-100">
              Nguyễn Văn A
            </td>
            <td className=" px-2 py-2.5 border-b-2 border-slate-100">
              Pickle ball bank
            </td>
            <td className=" px-2 py-2.5 border-b-2 border-slate-100">
              <div className="w-2/3 mx-auto flex gap-2">
                <button
                  onClick={openDialog}
                  className="relative group overflow-hidden text-sm text-red-500 w-1/2 h-full px-2 py-1 bg-red-100 rounded border-2 border-red-500">
                  <div className="font-bold  translate-x-0 group-hover:-translate-x-2 transition-all duration-300">
                    Delete
                  </div>
                  <TrashIcon className="size-2/3 inset-y-[3.5px] absolute right-2 opacity-0 group-hover:-right-3 group-hover:opacity-100 transition-all duration-300" />
                </button>
                <button className="relative group overflow-hidden text-sm text-amber-500 w-1/2 h-full px-2 py-1 bg-amber-100 rounded border-2 border-amber-500">
                  <div className="font-bold  translate-x-0 group-hover:-translate-x-2 transition-all duration-300">
                    Edit
                  </div>
                  <PencilIcon className="size-2/3 inset-y-[3.5px] absolute right-2 opacity-0 group-hover:-right-3 group-hover:opacity-100 transition-all duration-300" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <AlertDialog
        ref={alertRef}
        heading="Confirm Delete"
        onConfirm={() => console.log("confirm")}
        onCancel={() => alertRef.current?.closeDialog}>
        Are you sure to delete blah... ?
      </AlertDialog>
    </div>
  );
}
