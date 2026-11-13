import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { FaMapMarkerAlt, FaCreditCard, FaListAlt } from "react-icons/fa";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6">
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto max-w-7xl mt-12">
        {cart.cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <Message>Your cart is empty</Message>
            <Link to="/shop" className="mt-4 text-primary hover:underline font-bold">Return to Shop</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left Column: Order Details */}
            <div className="lg:col-span-2 space-y-8">

              {/* Shipping Info */}
              <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-lg">
                <h2 className="text-xl font-bold font-heading mb-6 flex items-center gap-3">
                  <FaMapMarkerAlt className="text-primary" /> Shipping Info
                </h2>
                <div className="text-gray-300 ml-8 text-lg">
                  <p className="font-bold text-white mb-1">Method: <span className="font-normal text-gray-400">Standard Shipping</span></p>
                  <p className="font-bold text-white">Address: <span className="font-normal text-gray-400">
                    {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                  </span></p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-lg">
                <h2 className="text-xl font-bold font-heading mb-6 flex items-center gap-3">
                  <FaCreditCard className="text-primary" /> Payment Method
                </h2>
                <div className="text-gray-300 ml-8 text-lg">
                  <p className="font-bold text-white">Method: <span className="font-normal text-gray-400">{cart.paymentMethod}</span></p>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-lg">
                <h2 className="text-xl font-bold font-heading mb-6 flex items-center gap-3">
                  <FaListAlt className="text-primary" /> Order Items
                </h2>

                <div className="space-y-6">
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-6 bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <Link to={`/product/${item.product}`} className="text-lg font-bold text-white hover:text-primary transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-gray-400 text-sm mt-1">Quantity: <span className="text-white font-bold">{item.qty}</span></p>
                      </div>
                      <div className="text-xl font-heading font-bold text-primary">
                        ${(item.qty * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-xl sticky top-24">
                <h2 className="text-2xl font-heading font-bold mb-8 text-white">Order Summary</h2>

                <div className="space-y-4 mb-8 text-gray-300">
                  <div className="flex justify-between">
                    <span>Items</span>
                    <span className="text-white font-bold">${cart.itemsPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-white font-bold">${cart.shippingPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="text-white font-bold">${cart.taxPrice}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-3xl font-heading font-black text-primary">
                      ${cart.totalPrice}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-primary hover:bg-yellow-400 text-black font-bold py-4 rounded-full transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50 text-lg uppercase tracking-widest"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>

                {isLoading && <div className="mt-4 flex justify-center"><Loader /></div>}
                {error && (
                  <div className="mt-4">
                    <Message variant="danger">{error.data.message}</Message>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
