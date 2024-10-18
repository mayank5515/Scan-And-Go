import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import React from "react";

export default function ProductItem({
  productName,
  cost,
  quantity,
  handleDelete,
  handleIncrement,
  handleDecrement,
}) {
  return (
    <div className="flex-col border-2 rounded-xl p-2 bg-white">
      <div className="flex border-2 border-yellow-400 w-full justify-between items-center p-2">
        <h3 className="text-black text-[14px] font-semibold">{productName}</h3>
        <p className="text-gray-500">Rs {cost} </p>
      </div>
      <div className="flex justify-between items-center border-2 border-green-500 p-1">
        <button className="flex justify-center  rounded-lg p-2 items-center hover:bg-gray-200 ">
          <RiDeleteBin7Line size={15} />
        </button>
        <div className="border-2 border-black px-1 space-x-2 rounded-lg bg-zinc-200 flex items-center h-min">
          <button className="hover:text-blue-500">
            <BiMinus size={15} />
          </button>
          <span className="text-[14px]">{quantity}</span>
          <button className="hover:text-blue-500">
            <BiPlus size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
