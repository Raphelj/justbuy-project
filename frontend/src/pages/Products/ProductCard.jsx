import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 w-full max-w-sm">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Link to={`/product/${p._id}`}>
          <img
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            src={p.image}
            alt={p.name}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-white/10">
            {p?.brand}
          </span>
          {p.countInStock === 0 && (
            <span className="bg-red-500/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              Sold Out
            </span>
          )}
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button
            onClick={() => addToCartHandler(p, 1)}
            className="p-3 bg-white text-black rounded-full hover:bg-primary hover:text-black transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-100"
            title="Add to Cart"
            disabled={p.countInStock === 0}
          >
            <AiOutlineShoppingCart size={20} />
          </button>
          <Link
            to={`/product/${p._id}`}
            className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-200"
            title="View Details"
          >
            <AiOutlineEye size={20} />
          </Link>
        </div>

        {/* Heart Icon - Fixed pos */}
        <div className="absolute top-3 right-3">
          <HeartIcon product={p} />
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${p._id}`}>
            <h5 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
              {p?.name}
            </h5>
          </Link>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm font-medium text-gray-400">{p.rating}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]" title={p?.description}>
          {p?.description?.length > 60
            ? `${p.description.substring(0, 60).trim()}...`
            : p?.description}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <p className="text-xl font-heading font-bold text-white">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>

          <button
            onClick={() => addToCartHandler(p, 1)}
            disabled={p.countInStock === 0}
            className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {p.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
