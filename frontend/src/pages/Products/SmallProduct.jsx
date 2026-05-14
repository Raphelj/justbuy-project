import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="bg-[#1c1c1c] text-white rounded-2xl shadow-lg border border-yellow-700/40 overflow-hidden flex-1 min-w-[18rem] max-w-[20rem] hover:shadow-2xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[14rem] object-cover"
        />
        <HeartIcon product={product} className="absolute top-3 right-3" />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-base font-semibold hover:text-yellow-400 transition-colors duration-200 truncate">
            {product.name}
          </h2>
        </Link>

        <div className="mt-2 flex justify-between items-center">
          <span className="bg-yellow-400 text-black text-xs font-semibold px-2.5 py-0.5 rounded-full">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
