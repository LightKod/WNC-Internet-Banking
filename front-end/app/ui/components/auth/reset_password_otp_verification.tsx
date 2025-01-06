"use client";
import React, { useContext, useEffect, useState } from "react";
import { OTPInput } from "../universal/otp_input";
import { PageContentContext } from "@/app/(auth)/reset-password/page";
import SendOTPEmailForm from "./send_otp_email_form";
import { verifyOtp } from "@/app/lib/actions/api";

export default function ResetPasswordOTPVerify() {
  const context = useContext(PageContentContext);
  const [otp, setOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const fetchVerifyOtp = async () => {
    if(context?.otpId && context?.email) {
      try {
        const response = await verifyOtp({
          otp_code: otp,
          email: context?.email,
          otp_id: context?.otpId
        })
        console.log(response);
        if(response.status === 0) {
          setOtpError(null);
          context.nextStep();
          return;
        } else if(response.status === -1) {
          setOtpError(response.message);
        }
      } catch(error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    // console.log(otp);
    console.log(context?.otpId);
    
    if (otp.length === 6 && context?.otpId && context?.email) {
      // if (otp === "1234") { // just for test :>
      //   context?.nextStep();
      // }
      console.log(context.otpId);
      console.log(context.email);
      console.log(otp);
      fetchVerifyOtp();
    }
  }, [otp, context?.otpId]);
  return (
    <div className="mx-auto w-[70%] mt-2">
      <div>
        <OTPInput length={6} setOtp={setOtp} />
        {otpError && <h1 className="text-center text-sm text-red-500 mt-2">{otpError}</h1>}
      </div>
      <div>
        <SendOTPEmailForm />
      </div>
    </div>
  );
}
