import Item from "../TotalComponents/TotalItem";
import TotalList from "../TotalComponents/TotalList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
export default function Total({ totalBill, products }) {
  const navigate = useNavigate();
  // const URL = `http://192.168.179.131:3000`;
  // const URL = `http://localhost:3000`;
  const deleteAllProducts = async () => {
    try {
      const response = axios.delete("/products/checkout");
      console.log("DELETE RESPONSE: ", response);
      console.log("DELETE RESPONSE DATA: ", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigate = () => {
    deleteAllProducts();
    navigate("/bill");
  };

  return (
    <div className="  lg:h-auto border-2 border-gray-500 lg:ml-1 p-1 lg:w-[30vw] flex flex-col  flex-grow">
      <div className=" hidden  lg:flex flex-col h-[75vh] overflow-y-scroll border-b-2  border-black">
        <TotalList products={products} />
      </div>

      {/* CHECKOUT */}
      <section className="">
        <TotalAmount totalBill={totalBill} />
        <CheckoutButton totalBill={totalBill} handleNavigate={handleNavigate} />
      </section>
    </div>
  );
}

function CheckoutButton({ totalBill, handleNavigate }) {
  return (
    <button
      onClick={handleNavigate}
      disabled={totalBill === 0}
      className={`${
        totalBill === 0 && "disabled:opacity-75 cursor-not-allowed"
      } w-full mt-2 flex justify-center items-center text-white bg-green-600 text-[20px] font-semibold rounded-sm  px-2 py-1 hover:bg-green-500 active:bg-green-700 transition duration-200 ease-in-out`}
    >
      Checkout
    </button>
  );
}

function TotalAmount({ totalBill }) {
  return (
    <div className="flex justify-between p-2">
      <h3 className="text-black text-[20px] font-semibold">Total Amount</h3>
      <p className="text-black text-[20px] font-semibold">
        {"₹ "}
        {totalBill}
      </p>
    </div>
  );
}
