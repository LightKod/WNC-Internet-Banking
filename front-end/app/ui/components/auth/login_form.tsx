"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import { login } from "@/app/lib/actions/api";
import Spinner from "../universal/spinner";

const LoginSchema = z.object({
  username: z.string().min(1, { message: "Please enter username" }),
  password: z.string().min(1, { message: "Please enter password" }),
});

export type LoginInputs = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInputs>({ resolver: zodResolver(LoginSchema) });

  const [loading, setLoading] = useState<boolean>(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaValue(token);
    // console.log(token);
    setCaptchaError(null);
  };

  const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
    console.log(data);
    try {
      setLoading(true);
      const response = await login({
        username: data.username,
        password: data.password,
        captchaValue: captchaValue ?? ""
      });
      if (response.status === 401) {
        setError("username", { message: "Username or password is incorrect" });
        setError("password", { message: "Username or password is incorrect" });
        return;
      }
      if(response.status === -1) {
        setCaptchaError('Invalid Captcha');
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 mt-10">
      <div className="relative z-0 w-full flex flex-col">
        <input
          id="username"
          type="text"
          className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-blue-700 transition-colors duration-300 peer"
          placeholder=" "
          {...register("username")}
        />
        <label
          htmlFor="username"
          className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Username
        </label>
        {errors.username?.message && (
          <p className="text-xs text-red-700 mt-2">{errors.username.message}</p>
        )}
      </div>

      <div className="relative z-0 w-full flex flex-col">
        <input
          id="password"
          type="password"
          className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-blue-700 transition-colors duration-300 peer"
          placeholder=" "
          {...register("password")}
        />
        <label
          htmlFor="password"
          className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Password
        </label>
        {errors.password?.message && (
          <p className="text-xs text-red-700 mt-2">{errors.password.message}</p>
        )}
      </div>
      <div className="w-fit mx-auto">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          onChange={handleCaptchaChange}
        />
        {captchaError && (
          <p className="text-xs text-red-700 mt-2">{captchaError}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center items-center rounded-lg py-3 bg-blue-600 text-blue-50 font-bold hover:bg-blue-800 transition-colors duration-300">
        {loading ? <Spinner heading="Logging in ..." /> : <div>Log In</div>}
      </button>
    </form>
  );
}
