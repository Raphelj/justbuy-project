import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import { FaBox } from "react-icons/fa";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-heading font-bold text-white mb-8 flex items-center gap-3">
          <FaBox className="text-primary" /> My Orders
        </h2>

        {isLoading ? (
          <div className="flex justify-center h-64 items-center">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.error || error.error}
          </Message>
        ) : (
          <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider border-b border-white/5">
                    <th className="p-6 font-medium">Image</th>
                    <th className="p-6 font-medium">Order ID</th>
                    <th className="p-6 font-medium">Date</th>
                    <th className="p-6 font-medium">Total</th>
                    <th className="p-6 font-medium">Payment</th>
                    <th className="p-6 font-medium">Delivery</th>
                    <th className="p-6 font-medium text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="p-6">
                        <img
                          src={order.orderItems[0].image}
                          alt={order.user}
                          className="w-16 h-16 object-cover rounded-lg border border-white/10"
                        />
                      </td>
                      <td className="p-6 font-mono text-sm text-gray-300 group-hover:text-primary transition-colors">
                        {order._id}
                      </td>
                      <td className="p-6 text-gray-300">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="p-6 font-bold text-white">
                        ${order.totalPrice}
                      </td>

                      <td className="p-6">
                        {order.isPaid ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="p-6">
                        {order.isDelivered ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                            Delivered
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                            Processing
                          </span>
                        )}
                      </td>

                      <td className="p-6 text-center">
                        <Link to={`/order/${order._id}`}>
                          <button className="px-4 py-2 bg-white/10 hover:bg-white hover:text-black text-white rounded-lg text-sm font-medium transition-all">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {orders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">You haven't placed any orders yet.</p>
                <Link to="/shop" className="text-primary hover:underline mt-2 inline-block">Start Shopping</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrder;
