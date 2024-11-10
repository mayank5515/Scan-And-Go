import TotalList from "../TotalComponents/TotalList";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import generatePDF from "../../utils/generatePdf";
import toast from "react-hot-toast";
export default function Total({ totalBill, products }) {
  const navigate = useNavigate();
  const handleCheckout = async () => {
    let data;
    try {
      const response = await axios.get("/bills/checkout");
      // console.log("RESPONSE FROM CHECKOUT", response.data, response);
      if (response.status === 200) {
        data = response.data;
      }
    } catch (err) {
      console.error("Error checking out", err);
    }
    return data;
  };

  const handleNavigate = async () => {
    //checkout , -> data fetching , pdf generation
    //logout req , navigate
    try {
      const checkoutData = await handleCheckout();
      const response = await axios.get("/auth/logout");
      console.log("CHECKOUT DATA: ", checkoutData);
      // console.log("ALSO: ", checkoutData.data);
      console.log("RESPONSE FROM LOGOUT ", response);
      if (response.status === 200) {
        generatePDF({ jsonData: checkoutData.data });
        toast.success("You have successfully logged out !!");
        navigate("/bill", { state: { checkoutData } });
      }
    } catch (err) {
      toast.error("Error logging out ");
      console.error(`Error occured while checking out ${err}`);
    }
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
