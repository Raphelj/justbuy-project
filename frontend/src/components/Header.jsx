import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-center text-red-500 mt-10">Error loading products</h1>;
  }

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center py-10 px-5">
      {/* Carousel */}
      <div className="w-full max-w-5xl mb-10">
        <ProductCarousel />
      </div>

      {/* Product Grid */}
      <div className="w-full max-w-6xl grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center">
        {data.map((product) => (
          <SmallProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Header;
