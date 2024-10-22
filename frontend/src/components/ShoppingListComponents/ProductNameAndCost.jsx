import React from "react";

export default function ProductNameAndCost({ productName, cost, quantity }) {
  return (
    <div className="flex  w-full justify-between items-center p-2">
      <div className="flex-col ">
        <h3 className="text-black text-[14px] font-semibold">
          {productName || "RANDOM"}
        </h3>
        <p className="text-[14px] text-gray-500 ">Quantity: {quantity || 0}</p>
      </div>
      <p className="text-gray-500">
        {"₹"} {cost || 0}
      </p>
    </div>
  );
}
