import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favourites/favouriteSlice";
import ProductCard from "../Products/ProductCard";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Favourites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-4 uppercase tracking-tight flex items-center justify-center gap-4">
            <FaHeart className="text-primary" /> Your Wishlist
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your curated collection of favorites. Save now, shop later.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <FaHeart className="text-4xl text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Favorites Yet</h2>
            <p className="text-gray-400 mb-8">Start exploring and save items you love!</p>
            <Link
              to="/shop"
              className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-primary transition-colors uppercase tracking-widest"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((product) => (
              <div key={product._id} className="flex justify-center">
                <ProductCard p={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
