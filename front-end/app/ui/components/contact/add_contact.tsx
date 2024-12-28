"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import Modal, { ModalRef } from "../universal/modal";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkedLibraryDict } from "@/app/lib/definitions/definition";
import { addContact } from "@/app/lib/actions/api";

const AddContactSchema = z.object({
  cardNumber: z
    .string({ message: "Require Card Number" })
    .min(12, { message: "Card Number must be exactly 12 character" })
    .max(12, {message: "Card Number must be exactly 12 character"}),
  nickname: z
    .string({ message: "Require Nickname" })
    .min(1, { message: "Required Nickname" }),
  bank: z
    .string({ message: "Require Bank" })
    .min(1, { message: "Require Bank" }),
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
    watch,
  } = useForm<AddContactInput>({
    resolver: zodResolver(AddContactSchema),
  });

  const onSubmit: SubmitHandler<AddContactInput> = async (data: AddContactInput) => {
    console.log(data);
    try {
      const response = await addContact({
        account_number: data.cardNumber,
        nickname: data.nickname,
        bank_id: 1,
        bank_name: data.bank
      });
      console.log(response);
      modalRef.current?.closeModal();
    } catch(error) {
      console.log(error);
    }
  };

  const cardNumber = watch("cardNumber");
  useEffect(() => {
    if (cardNumber?.length === 12) {
      console.log('check existence')
    }
  }, [cardNumber]);

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
          <div className="w-full">
            <select
              defaultValue=""
              id=""
              {...register("bank")}
              className="focus:outline-none focus:ring-0 appearance-none bg-transparent border-2 border-gray-400 rounded w-full">
              <option value="" disabled>
                Choose a bank
              </option>
              {Object.entries(linkedLibraryDict).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name}
                </option>
              ))}
            </select>
            {errors.bank?.message && (
              <p className="text-xs text-red-700 mt-2">{errors.bank.message}</p>
            )}
          </div>
          <div className="relative z-0 w-full flex flex-col text-sm">
            <input
              id="CardNumber"
              type="text"
              className="block placeholder:text-sm mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-blue-700 transition-colors duration-300 peer"
              placeholder=" "
              onKeyDown={(e) => {
                if (
                  e.key.length === 1 &&
                  !/[0-9]/.test(e.key) &&
                  e.key !== "Backspace"
                ) {
                  e.preventDefault();
                }
              }}
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
