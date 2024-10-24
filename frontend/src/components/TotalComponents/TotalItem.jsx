import React from "react";

export default function TotalItem({
  product_name,
  cost_price = 0,
  quantity = 0,
}) {
  const total = cost_price * quantity;
  return (
    <div
      className={`py-1  flex justify-between ${total === 0 ? "hidden" : ""}`}
    >
      <p className=" text-[16px] font-medium">{product_name}</p>
      <div className="flex space-x-1 font-medium">
        <p>Rs: {cost_price || 0}</p>
        <p>x</p>
        <p>{quantity || 0}</p>
        <p>=</p>
        <p>{total || 0}</p>
      </div>
    </div>
  );
}
