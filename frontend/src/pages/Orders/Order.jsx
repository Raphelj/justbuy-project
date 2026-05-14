import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";
import { FaBox, FaUser, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <Loader />
    </div>
  ) : error ? (
    <div className="min-h-screen bg-[#050505] p-20 flex items-center justify-center">
      <Messsage variant="danger">{error.data.message}</Messsage>
    </div>
  ) : (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-heading font-black text-white mb-2 uppercase tracking-wide">Order Details</h1>
            <p className="text-gray-400 font-mono text-sm">ID: {order._id}</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            {order.isPaid ? (
              <span className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/20 rounded-full font-bold uppercase text-xs tracking-wider">
                Paid on {order.paidAt.substring(0, 10)}
              </span>
            ) : (
              <span className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/20 rounded-full font-bold uppercase text-xs tracking-wider">
                Not Paid
              </span>
            )}
            {order.isDelivered ? (
              <span className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/20 rounded-full font-bold uppercase text-xs tracking-wider">
                Delivered
              </span>
            ) : (
              <span className="px-4 py-2 bg-yellow-500/20 text-yellow-500 border border-yellow-500/20 rounded-full font-bold uppercase text-xs tracking-wider">
                Processing
              </span>
            )}
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left Col: Details */}
          <div className="lg:col-span-2 space-y-8">

            {/* Customer Info */}
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold font-heading mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                <FaUser className="text-primary" /> Customer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Name</p>
                  <p className="font-medium text-white">{order.user.username}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Email</p>
                  <p className="font-medium text-white flex items-center gap-2">
                    <FaEnvelope className="text-gray-600" /> {order.user.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Payment Method</p>
                  <p className="font-medium text-white">{order.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold font-heading mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                <FaMapMarkerAlt className="text-primary" /> Shipping
              </h2>
              <div>
                <p className="text-gray-500 text-sm mb-1">Address</p>
                <p className="font-medium text-white text-lg">
                  {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-bold font-heading mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
                <FaBox className="text-primary" /> Items
              </h2>
              <div className="space-y-6">
                {order.orderItems.length === 0 ? (
                  <Messsage>Order is empty</Messsage>
                ) : (
                  order.orderItems.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg border border-white/10"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <Link to={`/product/${item.product}`} className="text-lg font-bold text-white hover:text-primary transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-gray-400 text-sm mt-1">
                          {item.qty} x ${item.price}
                        </p>
                      </div>
                      <div className="text-xl font-bold font-heading text-primary">
                        ${(item.qty * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Right Col: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-xl sticky top-24">
              <h2 className="text-2xl font-heading font-bold mb-8 text-white">Order Summary</h2>

              <div className="space-y-4 mb-8 text-gray-300">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span className="text-white font-bold">${order.itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white font-bold">${order.shippingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="text-white font-bold">${order.taxPrice}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-3xl font-heading font-black text-primary">
                    ${order.totalPrice}
                  </span>
                </div>
              </div>

              {/* PayPal Payment */}
              {!order.isPaid && (
                <div className="mb-6">
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div className="w-full">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                        style={{ layout: "vertical", color: "gold", shape: "pill" }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Admin Actions */}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <button
                  type="button"
                  onClick={deliverHandler}
                  className="w-full bg-white text-black font-bold py-4 rounded-full transition-all shadow-lg hover:bg-gray-200 mt-4 uppercase tracking-widest text-sm"
                >
                  Mark As Delivered
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Order;