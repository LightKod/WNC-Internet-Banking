"use client";
import { sendOTP } from "@/app/lib/actions/api";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const sendOTPEmailForm = z.object({
  email: z
    .string({ message: "Require Email" })
    .email({ message: "Invalid Email" }),
});

type sendOTPEmailInput = z.infer<typeof sendOTPEmailForm>;

export default function SendOTPEmailForm() {
  const [countdown, setCountdown] = useState<number | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<sendOTPEmailInput>({
    resolver: zodResolver(sendOTPEmailForm),
  });
  const onSubmit = async (data: sendOTPEmailInput) => {
    setCountdown(10);
    try {
      const response = await sendOTP(data.email);
      if (response.status === 0) {
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (countdown === undefined) {
      return;
    } else {
    }
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev && prev > 0) {
          return prev - 1;
        } else if (prev === 0) {
          clearInterval(interval);
          return undefined;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="relative z-0 w-full flex flex-col">
        <input
          id="Email"
          type="text"
          className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-blue-700 transition-colors duration-300 peer"
          placeholder=" "
          {...register("email")}
        />
        <label
          htmlFor="Email"
          className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Email
        </label>
        {errors.email?.message && (
          <p className="text-xs text-red-700 mt-2">{errors.email.message}</p>
        )}
      </div>
      <button
        className={clsx(
          {
            "bg-gradient-to-tr from-blue-800 via-blue-600 to-blue-800 bg-[length:100%_300%] bg-[100%_100%] hover:bg-[100%_0%] hover:scale-[1.03] transition-all duration-300":
              !countdown,
            "bg-blue-800": countdown,
          },
          "w-full mt-3 py-2 rounded text-white "
        )}
        disabled={countdown !== undefined}>
        {countdown
          ? `You can resend in ${countdown}`
          : "Send me a reset password email"}
      </button>
    </form>
  );
}
