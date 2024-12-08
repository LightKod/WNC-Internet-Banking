"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

const LoginSchema = z.object({
  username: z.string().min(1, { message: "Please enter username" }),
  password: z.string().min(1, { message: "Please enter password" }),
});

export type LoginInputs = z.infer<typeof LoginSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginInputs> = (data: LoginInputs) => {
    console.log(data);
  };

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-[2fr_3fr] bg-slate-50">
      <div className="bg-blue-600 rounded-r-md hidden md:block ">
        <div className="h-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="flex gap-4">
              <BanknotesIcon className="size-16 text-blue-50 -rotate-12" />
              <h1 className="font-bold text-6xl text-blue-50">Bank It!</h1>
            </div>
            <div className="font-normal text-blue-50 text-lg mt-2">
              Seamless banking for a digital world
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="relative w-[30vw] flex flex-col justify-between bg-blue-50 shadow-2xl rounded-xl px-8 py-10 overflow-hidden">
          <CurrencyDollarIcon className="absolute size-32 text-blue-600 -left-8 -top-8 rotate-45" />
          <SparklesIcon className="size-20 text-blue-600 absolute -right-8 -bottom-7 rotate-[30deg]" />

          <h1 className="font-bold text-3xl text-gray-600 text-center">
            Welcome to Bankit!
          </h1>
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
                htmlFor="Username"
                className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Username
              </label>
              {errors.username?.message && (
                <p className="text-xs text-red-700 mt-2">
                  {errors.username.message}
                </p>
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
                <p className="text-xs text-red-700 mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg py-3 bg-blue-600 text-blue-50 font-bold hover:bg-blue-800 transition-colors duration-300">
              Log In
            </button>
            {/* {state.message && (
                            <p className="text-xs text-red-700">{state.message}</p>
                        )} */}
          </form>
          <p className="text-sm text-center text-gray-500 mt-8">
            Forgotten your password? Click{" "}
            <a
              href="/"
              className="underline hover:text-blue-500 hover:font-bold transition-colors duration-300">
              here
            </a>{" "}
            to reset your password.
          </p>
        </div>
      </div>
    </div>
  );
}
