import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaMinus, FaPlus, FaArrowRight } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=/shipping");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6">

      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-heading font-black text-center mb-10 text-white tracking-tight uppercase">
        Shopping Bag ({cartItems.length})
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <FaArrowRight className="text-3xl text-gray-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Bag is Empty</h2>
          <p className="text-gray-400 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Discover our latest collections now.</p>
          <Link
            to="/shop"
            className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-primary transition-colors uppercase tracking-widest"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row gap-12">

          {/* Cart Items List */}
          <div className="flex-1 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="group flex flex-col sm:flex-row items-center gap-6 bg-[#111] p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300 shadow-xl"
              >
                {/* Image */}
                <div className="w-full sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-lg font-bold text-white hover:text-primary transition-colors line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">{item.brand}</div>
                  <div className="text-xl font-heading font-bold text-white">
                    ${item.price}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-center gap-6">

                  {/* Qty Selector */}
                  <div className="flex items-center bg-black border border-white/10 rounded-full px-4 py-2">
                    <button
                      onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                      disabled={item.qty <= 1}
                      className="text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="w-10 text-center font-bold text-sm">{item.qty}</span>
                    <button
                      onClick={() => addToCartHandler(item, Math.min(item.countInStock, item.qty + 1))}
                      disabled={item.qty >= item.countInStock}
                      className="text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all"
                    title="Remove item"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-[400px]">
            <div className="sticky top-24 bg-[#111] p-8 rounded-3xl border border-white/5 shadow-2xl">
              <h2 className="text-2xl font-heading font-bold mb-8 text-white">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                  <span className="text-white font-bold">
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-400 text-sm">Free</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span className="text-white font-bold">$0.00</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-300">Total</span>
                  <span className="text-3xl font-heading font-black text-primary">
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="w-full py-4 rounded-full bg-primary hover:bg-yellow-400 text-black font-bold uppercase tracking-widest shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
              >
                Checkout <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-xs text-gray-500 mt-6">
                Secure Checkout - SSL Encrypted
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
