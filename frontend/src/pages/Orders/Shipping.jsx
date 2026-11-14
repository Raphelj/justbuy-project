import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  // Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <ProgressSteps step1 step2 />
        </div>

        {/* Main Content */}
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-yellow-500/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 px-8 py-6 border-b border-yellow-500/20">
            <h1 className="text-3xl font-bold text-yellow-400">Shipping Information</h1>
            <p className="text-gray-400 mt-2">Please provide your delivery details</p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="p-8">
            <div className="space-y-6">
              {/* Address Input */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Street Address
                  </span>
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 text-gray-100 placeholder-gray-500 border border-yellow-500/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all"
                  placeholder="Enter your street address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* City and Postal Code Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City Input */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      City
                    </span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 text-gray-100 placeholder-gray-500 border border-yellow-500/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all"
                    placeholder="Enter city"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                {/* Postal Code Input */}
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-300 mb-2">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Postal Code
                    </span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 text-gray-100 placeholder-gray-500 border border-yellow-500/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all"
                    placeholder="Enter postal code"
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              </div>

              {/* Country Input */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Country
                  </span>
                </label>
                <input
                  type="text"
                  id="country"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 text-gray-100 placeholder-gray-500 border border-yellow-500/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all"
                  placeholder="Enter country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              {/* Divider */}
              <div className="border-t border-yellow-500/20 pt-6"></div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Payment Method
                  </span>
                </label>

                <div className="space-y-3">
                  <label className="flex items-center p-4 rounded-xl bg-black/40 border border-yellow-500/30 cursor-pointer hover:border-yellow-400 transition-all group">
                    <input
                      type="radio"
                      className="w-4 h-4 text-yellow-500 border-yellow-500/50 focus:ring-yellow-400 focus:ring-2"
                      name="paymentMethod"
                      value="PayPal"
                      checked={paymentMethod === "PayPal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="ml-3 text-gray-200 group-hover:text-yellow-400 transition-colors flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 01-.794.679H7.72a.483.483 0 01-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502zm-2.96-5.09c.762.868.983 2.156.66 3.825-.682 3.52-2.913 4.808-5.817 4.808h-.446c-.41 0-.76.294-.82.697L9.93 17.13H7.793c-.415 0-.752-.323-.745-.738l1.322-8.406c.049-.32.326-.561.647-.561h3.755c1.878 0 3.197-.487 3.913-1.45.233-.313.415-.652.544-1.017.127-.364.199-.753.215-1.163.007-.17.006-.337-.005-.503-.01-.163-.028-.323-.055-.48z" />
                      </svg>
                      PayPal or Credit Card
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 mt-8 flex items-center justify-center group"
                type="submit"
              >
                <span>Continue to Order Review</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Security Notice */}
        <div className="mt-6 flex items-center justify-center text-gray-400 text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Your information is secure and encrypted
        </div>
      </div>
    </div>
  );
};

export default Shipping;