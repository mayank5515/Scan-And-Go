import React from "react";

export default function RemoveAndAddButtons({
  onClickFunction,
  buttonText,
  bgColor = "blue",
}) {
  return (
    <button
      className={`border-2 bg-${bgColor}-600 p-2 text-white font-[16px]  rounded-md`}
      onClick={() => onClickFunction()}
    >
      {buttonText}
    </button>
  );
}
