'use client'
 
import { useEffect } from 'react'
import {
  ArrowPathIcon,
  FaceFrownIcon
} from '@heroicons/react/24/solid';
import { goToLogin } from './lib/actions/actions';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="h-screen flex flex-col p-16 gap-y-4 items-center justify-center text-gray-950 lg:px-48">
      <FaceFrownIcon className="w-16"/>
      <div className="flex flex-col gap-y-2 items-center">
        <h2 className="font-semibold">
            {error.message === "401" ? "401 - Unauthorized" : "Oops! Something went wrong!"}
        </h2>
        <p className="text-xs text-gray-500 text-center">
            {error.message === "401" ? "You don't have permission to access this page or your login session has expired. Try logging in again." : "You should try reloading the page. If this page keeps popping up, it might be that our server has encountered some problems. In that case, please try again later."}
        </p>
      </div>
      {error.message === "401" ? (
        <button className="flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors duration-300" onClick={() => goToLogin()}>
            <p>Login</p>
        </button>
      ) : (
        <button className="flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors duration-300" onClick={() => reset()}>
            <ArrowPathIcon className="w-5"/>
            <p>Reload</p>
        </button>
      )}
    </div>
  )
}