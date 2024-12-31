"use client";
import React, { useContext, useEffect, useState } from "react";
import { OTPInput } from "../universal/otp_input";
import { PageContentContext } from "@/app/(auth)/reset-password/page";
import SendOTPEmailForm from "./send_otp_email_form";

export default function ResetPasswordOTPVerify() {
  const context = useContext(PageContentContext);
  const [otp, setOtp] = useState<string>("");
  useEffect(() => {
    console.log(otp);
    if (otp.length === 4) {
      if (otp === "1234") { // just for test :>
        context?.nextStep();
      }
    }
  }, [otp]);
  return (
    <div className="mx-auto w-[70%] mt-2">
      <div>
        <OTPInput length={4} setOtp={setOtp} />
      </div>
      <div>
        <SendOTPEmailForm />
      </div>
    </div>
  );
}
