import TotalList from "../TotalComponents/TotalList";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import generatePDF from "../../utils/generatePdf";
export default function Total({ totalBill, products }) {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const response = await axios.get("/bills/checkout");
      console.log("RESPONSE FROM CHECKOUT", response.data, response);
      generatePDF({ jsonData: response.data.data });
    } catch (err) {
      console.error("Error checking out", err);
    }
  };

  const handleNavigate = () => {
    handleCheckout();
    // navigate("/bill");
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
