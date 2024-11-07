import React from "react";

export default function Login_And_SignupBlock({
  requestFuncion,
  placeholderText = "Default placeholder",
  buttonText = "button",
  onChangeFunction,
  dynamicValue,
  buttonColor = "green",
}) {
  return (
    <div className="border-2 border-yellow-300 h-full">
      <div className="border-2 border-red-400 p-4 flex flex-col items-center justify-between space-y-4 h-full">
        <input
          type="text"
          placeholder={`${placeholderText}`}
          value={dynamicValue}
          onChange={(e) => onChangeFunction(e.target.value)}
          className="p-2 text-[16px] text-center border-[1px] w-full border-black rounded-sm "
        />
        <button
          onClick={requestFuncion}
          className={`border-2 w-[50%] rounded-md py-2 px-1 bg-${buttonColor}-600 text-white font-[16px]`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
