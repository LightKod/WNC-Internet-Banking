import {
  BanknotesIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/solid";
import LoginForm from "../../ui/components/auth/login_form";

export default function Page() {
  return (
    <div className="grid relative overflow-hidden h-screen grid-cols-1 md:grid-cols-[2fr_3fr] bg-slate-100">
      <CurrencyDollarIcon className="size-40 absolute text-blue-600 opacity-50 animate-TienVaoNhuNuoc_1 -translate-y-[20vh] left-[40%]" />
      <CurrencyDollarIcon className="size-28 absolute text-blue-600 opacity-50 animate-TienVaoNhuNuoc_2 -translate-y-[20vh] left-[50%]" />
      <CurrencyDollarIcon className="size-36 absolute text-blue-600 opacity-50 animate-TienVaoNhuNuoc_3 -translate-y-[20vh] left-[60%]" />
      <CurrencyDollarIcon className="size-44 absolute text-blue-600 opacity-50 animate-TienVaoNhuNuoc_4 -translate-y-[20vh] left-[70%]" />
      <CurrencyDollarIcon className="size-28 absolute text-blue-600 opacity-50 animate-TienVaoNhuNuoc_5 -translate-y-[20vh] left-[80%]" />
      <CurrencyDollarIcon className="size-36 absolute text-blue-600 opacity-50 animate-TienVaoNhuNuoc_6 -translate-y-[20vh] left-[90%]" />
      <CurrencyDollarIcon className="size-32 absolute text-blue-600 opacity-50 animate-TienVaoNhuNuoc_7 -translate-y-[20vh] left-[100%]" />
      <div className="bg-blue-600 rounded-r-md hidden md:block ">
        <div className="h-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4">
              <BanknotesIcon className="size-20 text-blue-50 -rotate-12" />
              <h1 className="font-bold text-8xl text-blue-50">Bank It!</h1>
            </div>
            <div className="font-normal text-blue-50 text-xl mt-2">
              Seamless banking for a digital world
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="relative w-[43vw] flex flex-col justify-between bg-white shadow-2xl rounded-xl px-8 py-10 overflow-hidden">
          <CurrencyDollarIcon className="absolute size-32 text-blue-600 -left-8 -top-8 rotate-45" />
          <SparklesIcon className="size-20 text-blue-600 absolute -right-8 -bottom-7 rotate-[30deg]" />

          <h1 className="font-bold text-3xl text-gray-600 text-center">
            Welcome to Bankit!
          </h1>
          <LoginForm />
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
