export default function ProductItem({ id, product }) {
  // console.log("PRODUCT FROM PRODUCT ITEM: ", product);
  //IN THIS COMPONENT I CAN ADD OTHER DETAILS AS WELL LIKE PRODUCT DETAILS ,
  return (
    <div className="flex-col border-2 rounded-xl p-2 bg-white">
      {/* PRODUCT NAME , COST , QUANTITY  */}
      <ProductNameAndCost
        productName={product.product_name}
        cost={product.cost_price}
        quantity={product.quantity}
      />
    </div>
  );
}

function ProductNameAndCost({ productName, cost, quantity }) {
  return (
    <div className="flex  w-full justify-between items-center p-2 ">
      <div className="flex-col ">
        <h3 className="text-black text-[14px] font-semibold">
          {productName || "RANDOM"}
        </h3>
        <p className="text-[14px] text-gray-500 ">Quantity: {quantity || 0}</p>
      </div>
      <p className="text-gray-500">
        {"₹"} {cost || 0}
      </p>
    </div>
  );
}
