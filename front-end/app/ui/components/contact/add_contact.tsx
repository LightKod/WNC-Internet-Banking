"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import Modal, { ModalRef } from "../universal/modal";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { allBanks } from "@/app/lib/definitions/definition";
import { addContact } from "@/app/lib/actions/api";
import Toast, { ToastRef } from "../universal/toast";
import Spinner from "../universal/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../universal/tooltip";
import { getInternalUserFromBankAccount } from "@/app/lib/actions/actions";

const AddContactSchema = z.object({
  cardNumber: z
    .string({ message: "Require Card Number" })
    .min(12, { message: "Card Number must be exactly 12 character" })
    .max(12, { message: "Card Number must be exactly 12 character" }),
  nickname: z
    .string({ message: "Require Nickname" })
    .min(1, { message: "Required Nickname" }),
  bankCode: z
    .string({ message: "Require Bank" })
    .min(1, { message: "Require Bank" }),
});

type AddContactInput = z.infer<typeof AddContactSchema>;

export default function AddContact() {
  // const [userBankAcc, setUserBankAcc] = useState<>
  const modalRef = useRef<ModalRef>(null);
  const openModal = () => {
    reset();
    modalRef.current?.openModal();
  };

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
    setValue,
    clearErrors
  } = useForm<AddContactInput>({
    resolver: zodResolver(AddContactSchema),
  });

  const onSubmit: SubmitHandler<AddContactInput> = async (
    data: AddContactInput
  ) => {
    if(Object.keys(errors).length > 0) {
      reset({}, {keepErrors: true});
      return;
    }
    try {
      setLoading(true);
      const response = await addContact({
        account_number: data.cardNumber,
        nickname: data.nickname,
        bank_id: data.bankCode,
        bank_name: allBanks[data.bankCode].name,
      });
      console.log(response);
      modalRef.current?.closeModal();
      reset();
      openToast();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toastRef = useRef<ToastRef>(null);

  const openToast = () => {
    toastRef.current?.openToast();
  };

  const cardNumber = watch("cardNumber");
  const bankCode = watch("bankCode");

  const fetchUser = async (accountNumber: string) => {
    try {
      const user = await getInternalUserFromBankAccount(accountNumber);
      console.log(user);
      if(user !== null) {
        setValue('nickname', user.name);
        clearErrors('cardNumber');
        clearErrors('nickname')
      } else {
        setError('nickname', {message: 'User does not exist'});
        setError('cardNumber', {message: 'User does not exist'});
        setValue('nickname', '');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (cardNumber?.length === 12) {
      console.log("check existence");
      clearErrors('cardNumber');
      if (bankCode === "PGP") {
        fetchUser(cardNumber);
      }
    } else if (cardNumber?.length !== 12) {
      clearErrors('cardNumber');
      clearErrors('nickname');
      setValue('nickname', '');
      setError('cardNumber', {message: 'Card Number must be exactly 12 character'})
    }
  }, [cardNumber, bankCode]);

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
          <div>
            <div className="flex gap-3">
              {Object.entries(allBanks).map(([key, value]) => (
                <Tooltip key={key}>
                  <TooltipTrigger>
                    <label
                      htmlFor={`bankCode_${key}`}
                      className="group w-12 h-12 flex items-center justify-center border-2 bg-slate-50 border-slate-300 rounded-full hover:border-blue-600 has-[:checked]:border-blue-600 transition-all duration-300 cursor-pointer">
                      <input
                        {...register("bankCode")}
                        id={`bankCode_${key}`}
                        type="radio"
                        value={key}
                        className="peer hidden"
                      />
                      <span className="text-xl font-semibold text-gray-500 group-hover:text-gray-950 peer-checked:text-gray-950 transition-all duration-300">
                        {value.name[0].toUpperCase()}
                      </span>
                    </label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{value.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="flex gap-3 items-center">
              {bankCode ? (
                <p className="text-blue-600 text-sm mt-2">
                  Selected Bank:
                  <span className="font-bold">
                    {" "}
                    {allBanks[bankCode].name.toUpperCase()}
                  </span>
                </p>
              ) : (
                <h1 className="text-sm mt-2">Please select a bank</h1>
              )}
              {errors.bankCode?.message && (
                <p className="text-xs text-red-700 mt-2">
                  {errors.bankCode.message}
                </p>
              )}
            </div>
          </div>

          {/* <div className="w-full">
            <select
              defaultValue=""
              id=""
              {...register("bankCode")}
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
            {errors.bankCode?.message && (
              <p className="text-xs text-red-700 mt-2">
                {errors.bankCode.message}
              </p>
            )}
          </div> */}
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
          <button className="w-full flex justify-center items-center mt-3 py-2 font-bold rounded text-white bg-gradient-to-tr from-blue-800 via-blue-600 to-blue-800 bg-[length:100%_300%] bg-[100%_100%] hover:bg-[100%_0%] hover:scale-[1.03] transition-all duration-300">
            {loading ? (
              <Spinner heading="Adding Contact ..." />
            ) : (
              <span>Add Contact</span>
            )}
          </button>
        </form>
      </Modal>
      <Toast ref={toastRef} heading="Notification">
        <div className="flex flex-col gap-y-2">
          <p className="text-xs text-gray-950">Add new contact successfully</p>
        </div>
      </Toast>
    </div>
  );
}
