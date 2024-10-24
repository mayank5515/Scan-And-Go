import Item from "../TotalComponents/TotalItem";
import TotalList from "../TotalComponents/TotalList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Total({ totalBill, products }) {
  const navigate = useNavigate();
  const deleteAllProducts = async () => {
    try {
      const response = axios.delete(
        "http://localhost:3000/api/v1/products/checkout"
      );
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
        <div className="mt-1 flex-grow   flex justify-between items-center p-1 ">
          <h1 className="text-black text-[20px] font-semibold">Total</h1>
          <p className="text-black text-[20px]"> Rs: {totalBill || 0}</p>
        </div>
        <div className=" flex justify-center p-1 mt-2 ">
          {/* <button className="text-white bg-orange-600 text-[20px] font-semibold rounded-md  px-2 py-1">
          Checkout
          </button> */}
          <button
            onClick={handleNavigate}
            disabled={totalBill === 0}
            className={`${
              totalBill === 0 && "disabled:opacity-75 cursor-not-allowed"
            } w-full  flex justify-center items-center text-white bg-green-600 text-[20px] font-semibold rounded-sm  px-2 py-1 hover:bg-green-500 active:bg-green-700 transition duration-200 ease-in-out`}
          >
            Checkout
          </button>
        </div>
      </section>
    </div>
  );
}
