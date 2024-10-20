import PropTypes from "prop-types";
import ProductItem from "./ProductItem";
export default function ProductListComp({
  products,
  handleDelete,
  handleDecrement,
  handleIncrement,
}) {
  return (
    <div className="border-2 border-gray-500 space-y-1 bg-stone-200 lg:w-[65vw] lg:h-auto p-2 overflow-y-scroll h-[60vh]">
      {products.length > 0 ? (
        products.map((product, ind) => {
          return (
            <ProductItem
              key={ind}
              id={product.id}
              productName={product.productName}
              cost={product.cost}
              quantity={product.quantity}
              currency={product.currency}
              handleDelete={handleDelete}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
            />
          );
        })
      ) : (
        <p className="text-black text-[16px] text-center h-[30%] flex justify-center items-center">
          Please Add items in your cart
        </p>
      )}
    </div>
  );
}

ProductListComp.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      productName: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  handleIncrement: PropTypes.func.isRequired,
};
