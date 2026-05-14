import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { FaEdit, FaCloudUploadAlt, FaTrash } from "react-icons/fa";

const AdminProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(productData?.description || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Product successfully updated");
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`);
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="p-8 md:p-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-heading font-black text-white mb-8 flex items-center gap-3">
            <span className="p-3 rounded-full bg-white/5 text-primary"><FaEdit size={24} /></span> Update Product
          </h1>

          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Image Upload */}
              <div className="flex flex-col items-center justify-center">
                {image && (
                  <div className="mb-4 relative group">
                    <img
                      src={image}
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
                    <p className="text-sm text-gray-400">Click to upload new image</p>
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

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-4 bg-primary hover:bg-yellow-400 text-black font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/20 text-lg uppercase tracking-widest"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-8 py-4 bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 text-white font-bold rounded-xl transition-all hover:shadow-red-500/30 flex items-center justify-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;