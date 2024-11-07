import ProductNameAndCost from "./productNameAndCost";

export default function ProductItem({ id, product }) {
  console.log("PRODUCT FROM PRODUCT ITEM: ", product);
  return (
    <div className="flex-col border-2 rounded-xl p-2 bg-white">
      {/* PRODUCT NAME , COST , QUANTITY  */}
      <ProductNameAndCost
        productName={product.product_name}
        cost={product.cost_price}
        quantity={product.quantity}
      />
      {/* <hr className="border-t " /> */}
      {/* REMOVE BUTTON , DECREMENT BUTTON AND INCREMENT BUTTON */}
      {/* <div className="flex justify-between items-center  p-1">
        <button
          className="flex justify-center  rounded-lg p-2 items-center hover:bg-gray-200 "
          onClick={() => handleDelete(id)}
        >
          <RiDeleteBin7Line size={15} />
        </button>
        <IncAndDecButtons
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          quantity={quantity}
          id={id}
        />
      </div> */}
      {/* REMOVE BUTTON , DECREMENT BUTTON AND INCREMENT BUTTON */}
    </div>
  );
}
