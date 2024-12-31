'use client';
import React, { useRef } from "react";
import AlertDialog, { AlertDialogRef } from "../universal/alert_dialog";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteContact } from "@/app/lib/actions/api";

export default function DeleteContact({contactId, nickname}: {contactId: number, nickname: string}) {
  const alertRef = useRef<AlertDialogRef>(null);

  const openDialog = () => {
    alertRef.current?.openDialog();
  };

  const handleDeleteContact = async () => {
    try {
        const response = await deleteContact(contactId);
        console.log(response);
        alertRef.current?.closeDialog;
    } catch(error) {
        console.log(error);
    }
  }

  return (
    <>
      <button
        onClick={openDialog}
        className="relative group overflow-hidden text-sm text-red-500 w-1/2 h-full px-2 py-1 bg-red-100 rounded border-2 border-red-500">
        <div className="font-bold  translate-x-0 group-hover:-translate-x-2 transition-all duration-300">
          Delete
        </div>
        <TrashIcon className="size-2/3 inset-y-[3.5px] absolute right-2 opacity-0 group-hover:-right-3 group-hover:opacity-100 transition-all duration-300" />
      </button>
      <AlertDialog
        ref={alertRef}
        heading="Confirm Delete"
        onConfirm={() => {
            handleDeleteContact();
        }}
        onCancel={() => alertRef.current?.closeDialog}>
        Are you sure to delete {nickname} ?
      </AlertDialog>
    </>
  );
}