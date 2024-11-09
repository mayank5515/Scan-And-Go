import React from "react";

export default function LoginSideBar({
  step = 1,
  phoneNumber = "+91XXXXXXXXX",
}) {
  const last4Digits = phoneNumber.slice(-4);
  return (
    <div className="border-2 border-green-400 p-6  flex flex-col space-y-10  lg:w-[220%] md:w-[100%]">
      <p className="text-[38px] font-Barlow font-semibold text-black text-center ">
        Welcome to{" "}
        <span className="bg-yellow-400 p-1 border-[1px] overflow-hidden rounded-md ">
          Scan
        </span>{" "}
        &{" "}
        <span className="bg-green-500 p-1 border-[1px] overflow-hidden rounded-md ">
          {" "}
          Go
        </span>{" "}
        🛒
      </p>
      <div className="hidden lg:block">
        <p className="text-[20px] font-Doto text-black font-bold tracking-normal">
          Scan & Go is a one stop solution for all your shopping needs.
        </p>
        <p className="text-[20px] mt-4 font-Doto text-black font-bold tracking-normal">
          No need to wait in Queues , just put items in the cart and checkout !!
          🛒
        </p>
        {step === 1 ? (
          <div className="mt-36  ">
            <p className="text-[24px] tracking-normal">
              First time user or recurring one ?
            </p>
            <p className="text-[24px] tracking-tight leading-7 mt-10 mb-2 ">
              Please login/sign up using your phone number
            </p>
            <p className="text-[18px] tracking-tighter text-gray-400">
              Your bill will be sent to your phone number !!
            </p>
          </div>
        ) : (
          <div className="mt-36">
            <p className="text-[24px] tracking-normal font-normal">
              An OTP has been sent to your phone number :
              {`+91XXXXXX${last4Digits}`}
            </p>

            <p className="text-[20px] tracking-normal mt-10 font-normal">
              OTP is vaid for 3 mins
            </p>
            <p className="text-[20px] tracking-normal font-normal">
              Please provide OTP within 3 mins for verification
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
