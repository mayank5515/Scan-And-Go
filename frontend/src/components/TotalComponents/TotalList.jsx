/* eslint-disable react/prop-types */
export default function TotalList({ products }) {
  // console.log("PRODUCTS FROM TOTAL LIST", products);
  return (
    <div className=" flex-grow flex-col space-y-1 p-1 overflow-y-scroll">
      {products.map((el, i) => {
        return (
          <div key={i}>
            <TotalItem
              product_name={el.product_name}
              cost_price={el.cost_price}
              quantity={el.quantity}
            />
            {products.length - 1 !== i && <hr className="border-1 " />}
          </div>
        );
      })}
    </div>
  );
}

function TotalItem({ product_name, cost_price = 0, quantity = 0 }) {
  const total = cost_price * quantity;
  return (
    <div
      className={`py-1  flex justify-between ${total === 0 ? "hidden" : ""}`}
    >
      <p className=" text-[16px] font-medium">{product_name}</p>
      <div className="flex space-x-1 font-medium">
        <p>Rs: {cost_price || 0}</p>
        <p>x</p>
        <p>{quantity || 0}</p>
        <p>=</p>
        <p>{total || 0}</p>
      </div>
    </div>
  );
}
