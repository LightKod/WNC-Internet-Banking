import {
  SparklesIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";

export default function Page() {
  return (
    <div className="flex justify-center items-center relative overflow-hidden h-screen bg-slate-100">
     
      <div className="flex justify-center items-center">
        <div className="relative w-[43vw] flex flex-col justify-between bg-white shadow-2xl rounded-xl px-8 py-10 overflow-hidden">
          <KeyIcon className="absolute size-20 text-blue-600 left-1 top-1 rotate-180" />
          <SparklesIcon className="size-20 text-blue-600 absolute -right-8 -bottom-7 rotate-[30deg]" />
          <h1 className="font-bold text-3xl text-gray-600 text-center">
            Recover Password
          </h1>
          <h2 className="text-center font-light mt-3">
            It&apos;s okay, we got this !
          </h2>
          <form>
              <div className="relative z-0 w-full flex flex-col">
                <input
                  id="Email"
                  type='email'
                  className="block mt-0 w-full px-0 font-medium bg-transparent border-0 border-b-2 border-gray-500 focus:ring-0 focus:border-blue-700 transition-colors duration-300 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="Email"
                  className="after:content-['*'] after:ml-1 after:text-red-500 absolute font-medium text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Email
                </label>
              </div>
              <button className="w-full mt-3 py-2 rounded text-white bg-gradient-to-tr from-blue-800 via-blue-600 to-blue-800 bg-[length:100%_300%] bg-[100%_100%] hover:bg-[100%_0%] hover:scale-[1.03] transition-all duration-300">
                Send me a reset password email
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}
