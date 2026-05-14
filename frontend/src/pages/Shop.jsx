import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { FaFilter, FaRedo } from "react-icons/fa";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) =>
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-12">

        {/* Sidebar / Filters */}
        <div className="lg:w-1/4">
          <div className="bg-[#111] p-6 rounded-3xl border border-white/5 shadow-xl sticky top-24">
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/10">
              <FaFilter className="text-primary" />
              <h2 className="text-xl font-heading font-bold text-white">Filters</h2>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Categories</h3>
              <div className="space-y-3">
                {categories?.map((c) => (
                  <label key={c._id} className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/20 bg-black/50 transition-all checked:border-primary checked:bg-primary"
                      />
                      <svg
                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity peer-checked:opacity-100 text-black"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-300 group-hover:text-white transition-colors capitalize font-medium">
                      {c.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Brands</h3>
              <div className="space-y-3">
                {uniqueBrands?.map((brand) => (
                  <label key={brand} className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        id={brand}
                        onChange={() => handleBrandClick(brand)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-white/20 bg-black/50 transition-all checked:border-primary checked:bg-primary"
                      />
                      <div className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black opacity-0 transition-opacity peer-checked:opacity-100"></div>
                    </div>
                    <span className="ml-3 text-gray-300 group-hover:text-white transition-colors font-medium">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Price</h3>
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-white placeholder-gray-500"
              />
            </div>

            {/* Reset */}
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2"
            >
              <FaRedo size={14} /> Reset Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <h1 className="text-3xl font-heading font-bold text-white">Full Catalog</h1>
            <span className="text-gray-400 font-medium bg-white/5 px-4 py-1 rounded-full border border-white/5">{products?.length} Items Found</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.length === 0 ? (
              <div className="col-span-full h-64 flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              products?.map((p) => (
                <div key={p._id} className="flex justify-center">
                  <ProductCard p={p} />
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Shop;
