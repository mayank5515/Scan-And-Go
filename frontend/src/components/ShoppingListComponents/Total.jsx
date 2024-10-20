import Item from "../TotalComponents/Item";
export default function Total({ totalBill }) {
  return (
    <div className="border-2 border-black p-1 lg:w-[30vw] flex flex-col">
      <div className=" hidden border-2 p-1 border-purple-400 lg:flex flex-col h-[75vh] overflow-y-scroll">
        <Item />
      </div>
      <div className="border-2  border-yellow-400 flex justify-between items-center p-1 ">
        <h1 className="text-black text-[20px] font-semibold">Total</h1>
        <p className="text-black text-[20px]"> Rs: {totalBill || 0}</p>
      </div>
      <div className="border-2 border-green-400 flex justify-center">
        <button className="text-white bg-orange-600 text-[20px] font-semibold rounded-md  px-2 py-1">
          Checkout
        </button>
      </div>
    </div>
  );
}
