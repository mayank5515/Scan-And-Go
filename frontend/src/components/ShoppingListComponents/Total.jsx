import Item from "../TotalComponents/TotalItem";
import TotalList from "../TotalComponents/TotalList";
export default function Total({ totalBill, products }) {
  return (
    <div className="  lg:h-auto border-2 border-gray-500 lg:ml-1 p-1 lg:w-[30vw] flex flex-col  flex-grow">
      <div className=" hidden  lg:flex flex-col h-[75vh] overflow-y-scroll">
        <TotalList products={products} />
      </div>

      {/* CHECKOUT */}
      <section className="">
        <hr className="border-[1px] border-black" />
        <div className="mt-1 flex-grow   flex justify-between items-center p-1 ">
          <h1 className="text-black text-[20px] font-semibold">Total</h1>
          <p className="text-black text-[20px]"> Rs: {totalBill || 0}</p>
        </div>
        <div className=" flex justify-center p-1 mt-2 ">
          {/* <button className="text-white bg-orange-600 text-[20px] font-semibold rounded-md  px-2 py-1">
          Checkout
          </button> */}
          <button className="w-full  flex justify-center items-center text-white bg-green-600 text-[20px] font-semibold rounded-sm  px-2 py-1 hover:bg-green-500 active:bg-green-700 transition duration-200 ease-in-out">
            Checkout
          </button>
        </div>
      </section>
    </div>
  );
}
