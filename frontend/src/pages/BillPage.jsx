import React from "react";
import { Link } from "react-router-dom";
export default function BillPage() {
  return (
    <div className=" h-full w-full bg-gray-100">
      <section className="border-2 border-purple-400 h-full w-full flex justify-center items-center">
        <div className="text-center space-y-10  flex flex-col  p-2 ">
          <h1 className="text-4xl font-Arima font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Thank you for shopping with us!
          </h1>
          <Link to="/" className="mt-5 font-[16px] ">
            Go back to homepage ?
          </Link>
        </div>
      </section>
    </div>
  );
}
