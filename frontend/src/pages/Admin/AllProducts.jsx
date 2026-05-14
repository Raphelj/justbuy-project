import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";

import { FaBoxOpen, FaEdit, FaArrowRight } from "react-icons/fa";
import Loader from "../../components/Loader";

const AllProducts = () => {
  const { data: products = [], isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050505]">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050505] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p className="text-gray-400">Error loading products.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <h1 className="text-3xl font-heading font-black text-white flex items-center gap-3">
              <span className="p-3 rounded-full bg-white/5 text-primary"><FaBoxOpen size={24} /></span> All Products
            </h1>
            <span className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-400 border border-white/5">
              {products.length} Products Found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="text-xs font-bold bg-white/10 backdrop-blur-md px-2 py-1 rounded text-white border border-white/10">
                      {moment(product.createdAt).format("MMM DD")}
                    </div>
                    <span className="text-xl font-heading font-bold text-primary shadow-black drop-shadow-md">
                      ${product.price}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {product.description}
                    </p>
                  </div>

                  <Link
                    to={`/admin/product/update/${product._id}`}
                    className="mt-4 w-full py-3 bg-white/5 hover:bg-white text-white hover:text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all group/btn"
                  >
                    Update <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No products found</p>
              <Link to="/admin/productlist" className="text-primary hover:underline mt-2 inline-block">Create your first product</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;