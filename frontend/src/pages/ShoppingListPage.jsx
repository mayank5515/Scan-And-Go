import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import toast from "react-hot-toast";
import io from "socket.io-client";

import ProductListComp from "../components/ShoppingListComponents/ProductListComp.jsx";
import Total from "../components/ShoppingListComponents/Total.jsx";

const URL = "http://localhost:3000";
const socket = io(URL);

export default function ShoppingListPage() {
  //CONSUMING CONTEXT
  const [products, setProducts] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  // const URL = `http://192.168.179.131:3000`;
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("" + URL + "/api/v1/products");
        const Objdata = response.data;
        const { total } = Objdata;
        console.log(Objdata, total, Objdata.data);
        // const newProducts=Objdata.data.((el,i) => { });
        setProducts(Objdata.data); //array store ho rha h
        setTotalBill(total);
        // console.log(products);
      } catch (err) {
        console.log(err);
      }
    };
    //Fetch products on component mount
    fetchAllProducts();

    // Listen for product updates from the server
    socket.on("productAdded", () => {
      console.log("Product update detected . Fetching latest products");
      fetchAllProducts();
    });

    //Cleanup the socket connection when the component unmounts
    return () => {
      // socket.disconnect();
      socket.off("productAdded");
    };
  }, []);

  return (
    <section>
      <h1 className="text-black text-[30px] text-center mb-2">
        Shopping List 🛒
      </h1>
      <div className="border-4 border-green-600 p-1 h-[85vh] flex flex-col lg:flex-row ">
        {/* LIST OF ITEMS */}
        <ProductListComp products={products} />
        {/* TOTAL BILL */}
        <Total totalBill={totalBill} products={products} />
      </div>
    </section>
  );
}

// function handleDelete(id) {
//   setProducts((prevProducts) => {
//     return prevProducts.filter((product, i) => {
//       if (product.id === id) {
//         removeProduct(id);
//         return false;
//       }
//       return true;
//     });
//   });
// }

// function handleIncrement(id) {
//   setProducts((prevProducts) => {
//     return prevProducts.reduce((acc, product) => {
//       if (product.id === id) {
//         const newQuantity = product.quantity + 1; // Increment the quantity
//         updateProductQuantity(id, newQuantity); // Update the original array
//         // Add the updated product to the new array
//         return [...acc, { ...product, quantity: newQuantity }];
//       }
//       // Keep other products in the state
//       return [...acc, product];
//     }, []); // Initial value for acc is an empty array
//   });
// }
// function handleDecrement(id) {
//   setProducts((prevProducts) => {
//     // Create a copy of the products array to modify
//     return prevProducts.reduce((acc, product) => {
//       if (product.id === id) {
//         if (product.quantity === 1) {
//           removeProduct(id); // Remove from the original array
//           return acc; // Skip adding this product to the new array
//         } else {
//           const newQuantity = product.quantity - 1;
//           updateProductQuantity(id, newQuantity); // Update the original array
//           // Add the updated product to the new array
//           return [...acc, { ...product, quantity: newQuantity }];
//         }
//       }
//       // Keep other products in the state
//       return [...acc, product];
//     }, []);
//   });
// }
