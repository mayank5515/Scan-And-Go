import ProductItem from "./ProductItem";
import axios from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
export default function ProductListComp({ products }) {
  const [isRemoveActive, setIsRemoveActive] = useState(false);
  // const URL = "http://localhost:3000";
  // const URL = `http://192.168.179.131:3000`;
  console.log("PRODUCTS FROM PRODUCT LIST COMP: ", products);
  const toggleStateToTrue = async () => {
    try {
      const response = await axios.patch("/toggleState/removeItems");
      console.log(response, response.data);
      if (response.status === 200) setIsRemoveActive(true);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleStateToFalse = async () => {
    try {
      const response = await axios.patch("toggleState/addItems");
      console.log(response, response.data);
      if (response.status === 200) setIsRemoveActive(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    toggleStateToFalse();
  }, []);

  return (
    <div className="h-full flex-col">
      <div className="border-2 border-gray-500 space-y-1 bg-stone-200 lg:w-[65vw]  p-2 overflow-y-scroll h-[60vh] ">
        {products.length > 0 ? (
          products.map((el, ind) => {
            return <ProductItem key={ind} id={el.id} product={el} />;
          })
        ) : (
          <p className="text-black text-[16px] text-center h-[73vh] flex justify-center items-center">
            Please Add items in your cart
          </p>
        )}
      </div>
      <div className="border-2 border-black flex-col space-y-1">
        <div className="border-2 border-black flex justify-between p-1 flex-grow ">
          <button
            className="border-2 bg-red-600 p-2 text-white font-[16px]  rounded-md"
            onClick={() => toggleStateToTrue()}
          >
            Remove Items
          </button>
          <button
            className="border-2 bg-green-600 p-2 text-white font-[16px]  rounded-md"
            onClick={() => toggleStateToFalse()}
          >
            Add Items
          </button>
        </div>
        <p className="text-center text-[20px] font-semibold p-1">
          {" "}
          {isRemoveActive ? "Items now will removed" : "Adding items to cart "}
        </p>
      </div>
    </div>
  );
}

// ProductListComp.propTypes = {
//   products: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       productName: PropTypes.string.isRequired,
//       cost: PropTypes.number.isRequired,
//       quantity: PropTypes.number.isRequired,
//       currency: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   handleDelete: PropTypes.func,
//   handleDecrement: PropTypes.func,
//   handleIncrement: PropTypes.func,
// };
