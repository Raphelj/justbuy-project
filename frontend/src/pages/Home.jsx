import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "./Products/ProductCarousel";
import ProductCard from "./Products/ProductCard";
import { FaArrowRight, FaFilter } from "react-icons/fa";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="min-h-screen bg-transparent text-white w-full overflow-x-hidden relative">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-purple-900/10 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-full h-[500px] bg-yellow-900/5 blur-[120px] pointer-events-none -z-10" />

      {/* Hero Section */}
      {!keyword && (
        <ProductCarousel />
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-12 py-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 animate-fade-in-up">
          <div>
            <h2 className="text-yellow-500 font-bold uppercase tracking-widest text-sm mb-2">Discover</h2>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
              {keyword ? `Results for "${keyword}"` : "Latest Collection"}
            </h1>
          </div>

          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <Link
              to="/shop"
              className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all font-medium"
            >
              <span>View All</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Loader / Error Handling */}
        {isLoading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : isError ? (
          <Message variant="danger">
            {isError?.data?.message || isError.error}
          </Message>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
            {data?.products?.map((p) => (
              <ProductCard key={p._id} p={p} />
            ))}
          </div>
        )}
      </div>

      {/* Newsletter / CTA Section (Optional) */}
      {!keyword && (
        <section className="container mx-auto px-6 lg:px-12 mb-20">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-black border border-white/10 p-12 text-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Join Our Exclusive Club</h2>
              <p className="text-gray-400 mb-8">Sign up for our newsletter to receive early access to new collections and special offers.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-6 py-3 bg-black/50 border border-white/20 rounded-full focus:outline-none focus:border-primary w-full sm:w-80"
                />
                <button className="px-8 py-3 bg-primary text-black font-bold rounded-full hover:bg-yellow-400 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
