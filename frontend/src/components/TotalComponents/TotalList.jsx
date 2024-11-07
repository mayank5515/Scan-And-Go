import React from "react";
import TotalItem from "./TotalItem";
export default function TotalList({ products }) {
  // console.log("PRODUCTS FROM TOTAL LIST", products);
  return (
    <div className=" flex-grow flex-col space-y-1 p-1 overflow-y-scroll">
      {products.map((el, i) => {
        return (
          <div key={i}>
            <TotalItem
              product_name={el.product_name}
              cost_price={el.cost_price}
              quantity={el.quantity}
            />
            {products.length - 1 !== i && <hr className="border-1 " />}
          </div>
        );
      })}
    </div>
  );
}
