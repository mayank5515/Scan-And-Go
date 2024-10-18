import React from "react";
import { useNavigate } from "react-router-dom";
import productData from "../data/productData";
import ProductItem from "../components/ShoppingListComponents/ProductItem";
export default function ShoppingListPage() {
  // function handleDelete (){

  // }

  return (
    <section>
      <h1 className="text-black text-[30px] text-center mb-2">
        Shopping List 🛒
      </h1>
      <div className="border-4 border-green-600 p-10">
        {/* LIST OF ITEMS */}
        <div className="border-2 border-gray-500 bg-stone-200  p-2 overflow-y-scroll h-[75vh]">
          {productData.map((product, ind) => {
            return (
              <ProductItem
                key={ind}
                productName={product.productName}
                cost={product.cost}
                quantity={product.quantity}
              />
            );
          })}
        </div>
        {/* TOTAL BILL */}
      </div>
    </section>
  );
}
