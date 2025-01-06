"use client";
import { PageContentContext } from "@/app/(auth)/reset-password/page";
import { resetPassword } from "@/app/lib/actions/api";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Spinner from "../universal/spinner";
import { useRouter } from "next/navigation";

const resetPasswordFormSchema = z
  .object({
    password: z
      .string({ message: "Require Password" })
      .min(8, "Password must be at least 8 characters long"),
    retype_password: z
      .string({ message: "Require Retype password" })
      .min(8, "Retype password must be at least 8 characters long")
  })

type resetPasswordFormInput = z.infer<typeof resetPasswordFormSchema>;

export default function ResetPasswordForm() {
  const context = useContext(PageContentContext);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues
  } = useForm<resetPasswordFormInput>({
    resolver: zodResolver(resetPasswordFormSchema),
  });
  const onSubmit = async (data: resetPasswordFormInput) => {
    console.log(data);
    if(getValues('password') !== getValues('retype_password')) {
      setError('retype_password', {message: 'Retype password does not match'});
      return;
    }
    if (context?.otpId) {
      try {
        clearErrors();
        setLoading(true);
        const response = await resetPassword({
          otp_id: context?.otpId,
          new_password: data.password,
        });
        console.log(response);
        if(response.status === 0) {
          router.push('/login');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 mx-auto w-[70%] mt-2">
      <div className="relative z-0 w-full flex flex-col">
        <input
          id="password"
          type="password"
          className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-blue-700 transition-colors duration-300 peer"
          {...register("password")}
        />
        <label
          htmlFor="password"
          className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          New Password
        </label>
        {errors.password?.message && (
          <p className="text-xs text-red-700 mt-2">{errors.password.message}</p>
        )}
      </div>

      <div className="relative z-0 w-full flex flex-col">
        <input
          id="retype_password"
          type="password"
          className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-blue-700 transition-colors duration-300 peer"
          placeholder=" "
          {...register("retype_password")}
        />
        <label
          htmlFor="retype_password"
          className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Retype Password
        </label>
        {errors.retype_password?.message && (
          <p className="text-xs text-red-700 mt-2">
            {errors.retype_password.message}
          </p>
        )}
      </div>
      <button
        className={clsx(
          "flex justify-center items-center w-full mt-3 py-2 rounded text-white bg-gradient-to-tr from-blue-800 via-blue-600 to-blue-800 bg-[length:100%_300%] bg-[100%_100%] hover:bg-[100%_0%] hover:scale-[1.03] transition-all duration-300"
        )}>
          {loading ? <Spinner heading="Please wait ..." /> : (
            <span>Reset Password</span>
          )}
      </button>
    </form>
  );
}
