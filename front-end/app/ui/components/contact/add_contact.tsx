"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useRef } from "react";
import Modal, { ModalRef } from "../universal/modal";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AddContactSchema = z.object({
  cardNumber: z.string().min(1, { message: "Required Field" }),
  nickname: z.string().min(1, { message: "Required Field" }),
});

type AddContactInput = z.infer<typeof AddContactSchema>;

export default function AddContact() {
  const modalRef = useRef<ModalRef>(null);
  const openModal = () => {
    modalRef.current?.openModal();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddContactInput>({
    resolver: zodResolver(AddContactSchema),
  });

  const onSubmit: SubmitHandler<AddContactInput> = (data: AddContactInput) => {
    console.log(data);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="relative group py-2 px-8 font-bold rounded text-white bg-gradient-to-tr from-blue-800 via-blue-600 to-blue-800 bg-[length:100%_300%] bg-[100%_100%] hover:bg-[100%_0%] hover:scale-105 transition-all duration-300">
        <div className="translate-x-0 group-hover:-translate-x-3 transition-transform duration-300">
          Add Contact
        </div>
        <PlusIcon className="size-7 absolute inset-y-1.5 right-10 opacity-0 group-hover:opacity-100 group-hover:right-3 rotate-0 group-hover:rotate-180 transition-all duration-300" />
      </button>
      <Modal ref={modalRef} size="sm" heading="Add new contact">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="relative z-0 w-full flex flex-col text-sm">
            <input
              id="CardNumber"
              type="text"
              className="block placeholder:text-sm mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-blue-700 transition-colors duration-300 peer"
              placeholder=" "
              {...register("cardNumber")}
            />
            <label
              htmlFor="CardNumber"
              className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Card Number
            </label>
            {errors.cardNumber?.message && (
              <p className="text-xs text-red-700 mt-2">
                {errors.cardNumber.message}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full flex flex-col text-sm">
            <input
              id="Nickname"
              type="text"
              className="block placeholder:text-sm mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-blue-700 transition-colors duration-300 peer"
              placeholder=" "
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
          <button className="w-full mt-3 py-2 font-bold rounded text-white bg-gradient-to-tr from-blue-800 via-blue-600 to-blue-800 bg-[length:100%_300%] bg-[100%_100%] hover:bg-[100%_0%] hover:scale-[1.03] transition-all duration-300">
            Add Contact
          </button>
        </form>
      </Modal>
    </div>
  );
}
