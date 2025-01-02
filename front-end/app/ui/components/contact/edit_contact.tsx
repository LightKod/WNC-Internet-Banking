"use client";
import { PencilIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";
import Modal, { ModalRef } from "../universal/modal";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateContact } from "@/app/lib/actions/api";
import Toast, { ToastRef } from "../universal/toast";
import Spinner from "../universal/spinner";

const UpdateContactForm = z.object({
  nickname: z
    .string({ message: "Require Nickname" })
    .min(1, { message: "Required Nickname" }),
});

type UpdateContactInputs = z.infer<typeof UpdateContactForm>;

export default function EditContact({
  contactId,
  nickname,
}: {
  contactId: number;
  nickname: string;
}) {
  const modalRef = useRef<ModalRef>(null);
  const openModal = () => {
    modalRef.current?.openModal();
  };
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateContactInputs>({
    resolver: zodResolver(UpdateContactForm),
  });

  const onSubmit: SubmitHandler<UpdateContactInputs> = async (
    data: UpdateContactInputs
  ) => {
    try {
      setLoading(true);
      const response = await updateContact(contactId, {
        nickname: data.nickname,
      });
      console.log(response);
      modalRef.current?.closeModal();
      openToast();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const successToastRef = useRef<ToastRef>(null);

  const openToast = () => {
    successToastRef.current?.openToast();
  };



  return (
    <>
      <button
        onClick={openModal}
        className="relative group overflow-hidden text-sm text-amber-500 w-1/2 h-full px-2 py-1 bg-amber-100 rounded border-2 border-amber-500">
        <div className="font-bold  translate-x-0 group-hover:-translate-x-2 transition-all duration-300">
          Edit
        </div>
        <PencilIcon className="size-2/3 inset-y-[3.5px] absolute right-2 opacity-0 group-hover:-right-3 group-hover:opacity-100 transition-all duration-300" />
      </button>
      <Modal ref={modalRef} size="sm" heading="Update contact">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="relative z-0 w-full flex flex-col text-sm">
            <input
              id="Nickname"
              type="text"
              className="block placeholder:text-sm mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-blue-700 transition-colors duration-300 peer"
              placeholder=" "
              defaultValue={nickname}
              {...register("nickname")}
            />
            <label
              htmlFor="Nickname"
              className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Nickname
            </label>
            {errors.nickname?.message && (
              <p className="text-xs text-red-700 mt-2">
                {errors.nickname.message}
              </p>
            )}
          </div>
          <button className="w-full flex justify-center items-center mt-3 py-2 font-bold rounded text-white bg-gradient-to-tr from-blue-800 via-blue-600 to-blue-800 bg-[length:100%_300%] bg-[100%_100%] hover:bg-[100%_0%] hover:scale-[1.03] transition-all duration-300">
            {loading ? <Spinner heading="Updating ..."/> : <span>Update Contact</span>}
          </button>
        </form>
      </Modal>
      <Toast ref={successToastRef} heading="Notification">
        <div className="flex flex-col gap-y-2">
          <p className="text-xs text-gray-950">
            Update Contact Successfully
          </p>
        </div>
      </Toast>
    </>
  );
}
