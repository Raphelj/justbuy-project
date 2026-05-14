import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[16rem] bg-black border border-gold/40 rounded-2xl shadow-md overflow-hidden m-4 transition-transform transform hover:scale-105 hover:shadow-gold/40">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover rounded-t-2xl"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4 text-gold">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-base font-semibold mb-2 hover:text-yellow-400 transition-colors">
            {product.name}
          </h2>
        </Link>
        <div className="flex justify-between items-center">
          <span className="bg-gradient-to-r from-yellow-700 to-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
