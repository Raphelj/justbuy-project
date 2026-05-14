import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";

import { FaClipboardList } from "react-icons/fa";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-heading font-black text-white flex items-center gap-3">
              <span className="p-3 rounded-full bg-white/5 text-primary"><FaClipboardList size={24} /></span> Manage Orders
            </h1>
            <div className="text-gray-400 font-medium">
              Total: <span className="text-white font-bold">{orders?.length || 0}</span>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader />
            </div>
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider border-b border-white/5">
                      <th className="p-6 font-medium">Image</th>
                      <th className="p-6 font-medium">Order ID</th>
                      <th className="p-6 font-medium">User</th>
                      <th className="p-6 font-medium">Date</th>
                      <th className="p-6 font-medium">Total</th>
                      <th className="p-6 font-medium">Paid</th>
                      <th className="p-6 font-medium">Delivered</th>
                      <th className="p-6 font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/5">
                    {orders?.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-white/5 transition-colors group"
                      >
                        <td className="p-6">
                          <img
                            src={order.orderItems[0]?.image}
                            alt={order._id}
                            className="w-16 h-16 object-cover rounded-lg border border-white/10"
                          />
                        </td>
                        <td className="p-6">
                          <span className="font-mono text-xs text-gray-500 group-hover:text-primary transition-colors">
                            {order._id.substring(0, 10)}...
                          </span>
                        </td>
                        <td className="p-6 text-gray-300 font-medium">
                          {order.user ? order.user.username : "N/A"}
                        </td>
                        <td className="p-6 text-gray-400 text-sm">
                          {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
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
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="p-6">
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

              {/* Empty State */}
              {(!orders || orders.length === 0) && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 grayscale opacity-50">📦</div>
                  <p className="text-gray-400 text-lg">No orders found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;