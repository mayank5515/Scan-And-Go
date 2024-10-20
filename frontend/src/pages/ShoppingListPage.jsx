import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  removeProduct,
  updateProductQuantity,
  productData,
} from "../data/productData.js";

import ProductListComp from "../components/ShoppingListComponents/ProductListComp.jsx";
import TotalComponent from "../components/ShoppingListComponents/TotalComponent.jsx";
export default function ShoppingListPage() {
  const [products, setProducts] = useState([...productData]);
  const [totalBill, setTotalBill] = useState(0);
  function handleDelete(id) {
    setProducts((prevProducts) => {
      return prevProducts.filter((product, i) => {
        if (product.id === id) {
          removeProduct(id);
          return false;
        }
        return true;
      });
    });
  }

  function handleIncrement(id) {
    setProducts((prevProducts) => {
      return prevProducts.reduce((acc, product) => {
        if (product.id === id) {
          const newQuantity = product.quantity + 1; // Increment the quantity
          updateProductQuantity(id, newQuantity); // Update the original array
          // Add the updated product to the new array
          return [...acc, { ...product, quantity: newQuantity }];
        }
        // Keep other products in the state
        return [...acc, product];
      }, []); // Initial value for acc is an empty array
    });
  }
  function handleDecrement(id) {
    setProducts((prevProducts) => {
      // Create a copy of the products array to modify
      return prevProducts.reduce((acc, product) => {
        if (product.id === id) {
          if (product.quantity === 1) {
            removeProduct(id); // Remove from the original array
            return acc; // Skip adding this product to the new array
          } else {
            const newQuantity = product.quantity - 1;
            updateProductQuantity(id, newQuantity); // Update the original array
            // Add the updated product to the new array
            return [...acc, { ...product, quantity: newQuantity }];
          }
        }
        // Keep other products in the state
        return [...acc, product];
      }, []);
    });
  }

  return (
    <section>
      <h1 className="text-black text-[30px] text-center mb-2">
        Shopping List 🛒
      </h1>
      <div className="border-4 border-green-600 p-10">
        {/* LIST OF ITEMS */}
        <ProductListComp
          products={products}
          handleDelete={handleDelete}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
        />
        {/* TOTAL BILL */}
        <TotalComponent />
      </div>
    </section>
  );
}
