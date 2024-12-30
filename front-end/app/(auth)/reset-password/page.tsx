"use client";
import {
  PageSlider,
  PageSliderRef,
} from "@/app/ui/components/universal/page_slider";
import {
  StepIndicator,
  StepIndicatorRef,
} from "@/app/ui/components/universal/step_indicator";
import { KeyIcon } from "@heroicons/react/24/solid";
import { createContext, useRef } from "react";
import { Page } from "../../ui/components/universal/page_slider";
import ResetPasswordOTPVerify from "@/app/ui/components/auth/reset_password_otp_verification";
import ResetPasswordForm from "@/app/ui/components/auth/reset_password_form";
import { LockClosedIcon } from "@heroicons/react/24/solid";

interface PageContentContextType {
  nextStep: () => void;
  prevStep: () => void;
}

export const PageContentContext = createContext<PageContentContextType | null>(null);

export default function ResetPassword() {
  const stepIndicatorRef = useRef<StepIndicatorRef>(null);
  const pageSliderRef = useRef<PageSliderRef>(null);
  const nextStep = () => {
    stepIndicatorRef.current?.nextStep();
    pageSliderRef.current?.nextPage();
  };

  const prevStep = () => {
    stepIndicatorRef.current?.prevStep();
    pageSliderRef.current?.prevPage();
  };
  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <div className="relative overflow-hidden w-[50vw] flex flex-col gap-y-8 bg-white rounded-md shadow-sm border-2 border-slate-100 py-6">
        <LockClosedIcon className="size-96 absolute -bottom-16 -right-20 text-blue-600/15"/>
        <KeyIcon className="size-16 absolute top-2 left-2 rotate-180 text-blue-600"/>
        <div className="px-12 md:px-24 pt-5">
            <h1 className="font-bold text-3xl text-gray-600 text-center">
              Recover Password
            </h1>
            <h2 className="text-center font-light mt-2 mb-4">
              It&apos;s okay, we got this !
            </h2>
          <StepIndicator
            ref={stepIndicatorRef}
            steps={["OTP Verification", "Set new password"]}
          />
        </div>
        <PageContentContext.Provider
          value={{
            nextStep,
            prevStep,
          }}>
          <PageSlider ref={pageSliderRef}>
            <Page>
              <ResetPasswordOTPVerify />
            </Page>
            <Page>
              <ResetPasswordForm />
            </Page>
          </PageSlider>
        </PageContentContext.Provider>
      </div>
    </div>
  );

  // return (
  //   <div className="flex justify-center items-center relative overflow-hidden h-screen bg-slate-100">
  //     <div className="flex justify-center items-center">
  //       <div className="relative w-[43vw] flex flex-col justify-between bg-white shadow-2xl rounded-xl px-8 py-7 overflow-hidden">
  //         <KeyIcon className="absolute size-16 text-blue-600 left-1 top-1 rotate-180" />
  //         <h1 className="font-bold text-3xl text-gray-600 text-center">
  //           Recover Password
  //         </h1>
  //         <h2 className="text-center font-light mt-3 mb-2">
  //           It&apos;s okay, we got this !
  //         </h2>
  //         <ResetPasswordForm />
  //         <div className="text-center text-sm mt-2">
  //           Back to{" "}
  //           <Link
  //             href={"/login"}
  //             className="font-bold hover:text-blue-600 hover:scale-105 transition-all inline-block">
  //             <span>log in</span>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
