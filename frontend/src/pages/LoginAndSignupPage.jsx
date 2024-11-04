import { useState } from "react";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const appendCountryCode = (phoneNumber) => {
  let usersPhoneNumber = phoneNumber;
  if (usersPhoneNumber[0] !== "0") {
    usersPhoneNumber = "0" + usersPhoneNumber;
  }
  usersPhoneNumber = usersPhoneNumber.replace(/^0/, "+91");
  return usersPhoneNumber;
};

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
      setStep(2); // Move to OTP input
    } catch (error) {
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
      toast.success("Logged in successfully");
      if (response.status === 200) {
        navigate("/cart");
      }
      // Handle further navigation or state management as needed
    } catch (error) {
      toast.error("OTP verification failed");
      console.error("OTP verification failed", error);
    }
  };
  return (
    <div className="border-2 border-black p-2">
      <div>
        {step === 1 ? (
          <div className="border-2 border-red-400 p-1">
            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={requestOtp}>Send OTP</button>
          </div>
        ) : (
          <div className="border-2 border-green-600">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp}>Verify OTP</button>
          </div>
        )}
      </div>
    </div>
  );
}
