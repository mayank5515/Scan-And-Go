import { useState } from "react";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import appendCountryCode from "../utils/appendCountryCode";
import Login_And_SignupBlock from "../components/LoginAndSignupComponents/LoginComponents/Login_And_SignupBlock";
import LoginSideBar from "../components/LoginAndSignupComponents/LoginComponents/LoginSideBar";
export default function LoginAndSignupPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // To manage stages: 1 - Phone, 2 - OTP
  const navigate = useNavigate();

  const requestOtp = async () => {
    try {
      const actualPhoneNumber = appendCountryCode(phoneNumber);

      const res = await axios.post(
        "/auth/send-otp",
        { phone_number: actualPhoneNumber },
        {
          withCredentials: true, // Send cookies along with the request
        }
      );
      console.log("RESPONSE FROM SEND OTP", res.data, res);
      if (res.status === 200) {
        toast.success("OTP sent successfully");
      }
      setStep(2); // Move to OTP input
    } catch (error) {
      toast.error("Error requesting OTP");
      console.error("Error requesting OTP", error);
    }
  };

  const verifyOtp = async () => {
    try {
      const actualPhoneNumber = appendCountryCode(phoneNumber);
      const response = await axios.post(
        "/auth/verify-otp",
        {
          phone_number: actualPhoneNumber,
          otp: otp,
        },
        {
          withCredentials: true, // Send cookies along with the request
        }
      );
      console.log("RESPONSE FROM VERIFY OTP", response.data, response);
      // Store JWT in HTTP-only cookie managed by the server
      if (response.status === 200) {
        toast.success("Logged in successfully");
        navigate("/cart");
      }
      // Handle further navigation or state management as needed
    } catch (error) {
      toast.error("OTP verification failed");
      console.error("OTP verification failed", error);
    }
  };
  return (
    <div className="border-2 border-black p-1 bg-gray-100  h-full w-full flex flex-col lg:flex-row justify-between">
      <LoginSideBar step={step} phoneNumber={phoneNumber} />
      <div className="border-2 border-blue-500 h-full w-full flex flex-col">
        <div className="py-7">
          {step === 1 ? (
            <h1 className="text-center font-Barlow font-normal  text-[2rem]">
              Login / Signup
            </h1>
          ) : (
            <h1 className="text-center font-Barlow  text-[2rem]">
              Please provide OTP, sent to your mobile !📲
            </h1>
          )}
        </div>
        <section className=" mt-2 border-2 border-black h-full">
          {step === 1 ? (
            <Login_And_SignupBlock
              dynamicValue={phoneNumber}
              requestFuncion={requestOtp}
              onChangeFunction={setPhoneNumber}
              placeholderText="Enter Phone Number"
              buttonText="Request OTP"
              buttonColor="red"
            />
          ) : (
            <Login_And_SignupBlock
              dynamicValue={otp}
              requestFuncion={verifyOtp}
              onChangeFunction={setOtp}
              placeholderText="Enter OTP here"
              buttonText="Verify OTP"
              buttonColor="green"
            />
          )}
        </section>
      </div>
    </div>
  );
}
