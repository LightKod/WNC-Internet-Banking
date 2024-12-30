'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordFormSchema = z.object({
  password: z.string({message: "Require Password"}).min(8, "Password must be at least 8 characters long"),
  retype_password: z.string({message: "Require Retype password"}).refine((retypePassword) => {}),
}).refine((data) => {data.password === data.retype_password},{
    message: 'Retype password does not match',
    
}); 

type resetPasswordFormInput = z.infer<typeof resetPasswordFormSchema>;

export default function ResetPasswordForm() {
    const {register, handleSubmit, formState: {errors}} = useForm<resetPasswordFormInput>({
        resolver: zodResolver(resetPasswordFormSchema)
    })
    const onSubmit = async (data: resetPasswordFormInput) => {
        console.log(data);
    } 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mx-auto w-[70%] mt-2">
      <div className="relative z-0 w-full flex flex-col">
        <input
          id="password"
          type="password"
          className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-blue-700 transition-colors duration-300 peer"
          {...register('password')}
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
          {...register('retype_password')}
        />
        <label
          htmlFor="retype_password"
          className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Retype Password
        </label>
        {errors.retype_password?.message && (
          <p className="text-xs text-red-700 mt-2">{errors.retype_password.message}</p>
        )}
      </div>
      <button
        className={clsx(
          "w-full mt-3 py-2 rounded text-white bg-gradient-to-tr from-blue-800 via-blue-600 to-blue-800 bg-[length:100%_300%] bg-[100%_100%] hover:bg-[100%_0%] hover:scale-[1.03] transition-all duration-300"
        )}>
        Reset Password
      </button>
    </form>
  );
}
