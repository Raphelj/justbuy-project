import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

import { FaPlus, FaCloudUploadAlt, FaBoxOpen } from "react-icons/fa";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-heading font-black text-white mb-8 flex items-center gap-3">
            <span className="p-3 rounded-full bg-white/5 text-primary"><FaPlus size={24} /></span> Create Product
          </h1>

          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Image Upload */}
              <div className="flex flex-col items-center justify-center">
                {imageUrl && (
                  <div className="mb-4 relative group">
                    <img
                      src={imageUrl}
                      alt="product"
                      className="w-48 h-48 object-cover rounded-2xl shadow-lg border border-white/10"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                      <p className="text-white font-bold text-sm">Preview</p>
                    </div>
                  </div>
                )}
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 hover:border-primary rounded-2xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaCloudUploadAlt className="text-3xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-400">Click to upload product image</p>
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={uploadFileHandler}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors text-white placeholder-gray-600"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Price ($)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors text-white placeholder-gray-600"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Quantity</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors text-white placeholder-gray-600"
                    placeholder="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Brand</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors text-white placeholder-gray-600"
                    placeholder="Brand Name"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Description</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors text-white placeholder-gray-600 resize-none"
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Count In Stock</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors text-white placeholder-gray-600"
                    placeholder="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Category</label>
                  <select
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors text-white cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" className="bg-[#111]">Select Category</option>
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id} className="bg-[#111]">{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-yellow-400 text-black font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/20 text-lg uppercase tracking-widest mt-4"
              >
                Submit Product
              </button>

            </form>
          </div>
        </div>
      </div>
  );
};

export default ProductList;