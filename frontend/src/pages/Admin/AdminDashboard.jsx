import Chart from "react-apexcharts";
import { useGetUsersCountQuery } from "../../redux/api/usersApiSlice";
import { useGetTotalProductsQuery } from "../../redux/api/productApiSlice";
import { useGetTotalOrdersQuery, useGetTotalSalesQuery, useGetTotalSalesByDateQuery } from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { FaUser, FaBoxOpen, FaClipboardList, FaDollarSign } from "react-icons/fa";

const AdminDashboard = () => {
    const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
    const { data: customers, isLoading: loadingCustomers } = useGetUsersCountQuery();
    const { data: products, isLoading: loadingProducts } = useGetTotalProductsQuery();
    const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
    const { data: salesDetail } = useGetTotalSalesByDateQuery();

    const [state, setState] = useState({
        options: {
            chart: {
                type: "area",
                toolbar: { show: false },
                foreColor: "#9ca3af",
            },
            tooltip: {
                theme: "dark",
            },
            colors: ["#FBBF24"],
            dataLabels: { enabled: false },
            stroke: { curve: "smooth" },
            xaxis: {
                categories: [],
            },
            grid: {
                show: true,
                borderColor: "#374151",
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 90, 100]
                }
            }
        },
        series: [
            {
                name: "Sales",
                data: [],
            },
        ],
    });

    useEffect(() => {
        if (salesDetail) {
            const formattedSalesDate = salesDetail.map((item) => ({
                x: item._id,
                y: item.totalSales,
            }));

            setState((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: formattedSalesDate.map((item) => item.x),
                    },
                },
                series: [
                    {
                        name: "Sales",
                        data: formattedSalesDate.map((item) => item.y),
                    },
                ],
            }));
        }
    }, [salesDetail]);

    const isLoading = loadingSales || loadingCustomers || loadingProducts || loadingOrders;

    return (
        <div className="min-h-screen bg-[#050505] text-white p-18">
            <section className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-white">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Sales Card */}
                    <div className="bg-[#111] p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Sales</p>
                            <h2 className="text-3xl font-bold mt-2 text-primary">
                                $ {isLoading ? <span className="text-xs animate-pulse">...</span> : sales?.totalSales.toFixed(2)}
                            </h2>
                        </div>
                        <div className="p-4 bg-primary/20 rounded-full text-primary">
                            <FaDollarSign size={24} />
                        </div>
                    </div>

                    {/* Customers Card */}
                    <div className="bg-[#111] p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Customers</p>
                            <h2 className="text-3xl font-bold mt-2 text-white">
                                {isLoading ? <span className="text-xs animate-pulse">...</span> : customers?.total}
                            </h2>
                        </div>
                        <div className="p-4 bg-blue-500/20 rounded-full text-blue-500">
                            <FaUser size={24} />
                        </div>
                    </div>

                    {/* Orders Card */}
                    <div className="bg-[#111] p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">All Orders</p>
                            <h2 className="text-3xl font-bold mt-2 text-white">
                                {isLoading ? <span className="text-xs animate-pulse">...</span> : orders?.totalOrders}
                            </h2>
                        </div>
                        <div className="p-4 bg-green-500/20 rounded-full text-green-500">
                            <FaClipboardList size={24} />
                        </div>
                    </div>

                    {/* Products Card */}
                    <div className="bg-[#111] p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">All Products</p>
                            <h2 className="text-3xl font-bold mt-2 text-white">
                                {isLoading ? <span className="text-xs animate-pulse">...</span> : products?.total}
                            </h2>
                        </div>
                        <div className="p-4 bg-purple-500/20 rounded-full text-purple-500">
                            <FaBoxOpen size={24} />
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="mt-8 bg-[#111] p-6 rounded-2xl border border-white/5">
                    <h3 className="text-xl font-bold mb-6 text-white">Sales Trend</h3>
                    <div className="w-full h-[400px]">
                        <Chart
                            options={state.options}
                            series={state.series}
                            type="area"
                            height="100%"
                            width="100%"
                        />
                    </div>
                </div>

            </section>
        </div>
    );
};

export default AdminDashboard;
