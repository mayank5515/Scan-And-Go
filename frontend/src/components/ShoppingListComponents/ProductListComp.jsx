import ProductItem from "./ProductItem";
import axios from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import RemoveAndAddButtons from "./RemoveAndAddButtons";
export default function ProductListComp({ products }) {
  const [isRemoveActive, setIsRemoveActive] = useState(false);

  console.log("PRODUCTS FROM PRODUCT LIST COMP: ", products);
  const toggleStateToTrue = async () => {
    try {
      const response = await axios.patch("/toggleState/removeItems");
      console.log("RESPONSE FROM REMOVE ACTIVE: ", response, response.data);
      if (response.status === 200) setIsRemoveActive(true);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleStateToFalse = async () => {
    try {
      const response = await axios.patch("toggleState/addItems");
      console.log("RESPONSE FROM REMOVE NOT ACTIVE: ", response, response.data);
      if (response.status === 200) setIsRemoveActive(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    toggleStateToFalse();
  }, []);

  return (
    <section className="lg:h-[90vh] h-full flex flex-col justify-between border-2 border-yellow-400">
      <div className="border-2 border-gray-500 space-y-1 bg-stone-200 lg:w-[65vw]  p-2 overflow-y-scroll h-[55vh] lg:h-[75vh] ">
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
      {/* REMOVE BTN , ADD BTN , REMOVEACTIVE STATUS */}
      <div className="border-2 border-black flex-col space-y-1 p-1">
        <div className=" flex border-2 border-b-black justify-between p-1  ">
          <RemoveAndAddButtons
            onClickFunction={toggleStateToTrue}
            bgColor="red"
            buttonText="Remove Items"
          />
          <RemoveAndAddButtons
            onClickFunction={toggleStateToFalse}
            bgColor="green"
            buttonText="Add Items"
          />
        </div>
        <RemoveStatus isRemoveActive={isRemoveActive} />
      </div>
    </section>
  );
}

function RemoveStatus({ isRemoveActive }) {
  return (
    <div className=" ">
      <p className="text-center text-[20px] font-semibold p-1">
        {isRemoveActive ? "Items now will removed" : "Adding items to cart "}
      </p>
    </div>
  );
}
