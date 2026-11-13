import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";

import { FaTags, FaEdit } from "react-icons/fa";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <h1 className="text-3xl font-heading font-black text-white flex items-center gap-3">
              <span className="p-3 rounded-full bg-white/5 text-primary"><FaTags size={24} /></span> Manage Categories
            </h1>
            <span className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-400 border border-white/5">
              {categories?.length || 0} Categories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {/* Create Form */}
            <div className="bg-[#111] border border-white/5 p-6 rounded-3xl shadow-lg md:col-span-1">
              <h2 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Create New</h2>
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleCreateCategory}
              />
            </div>

            {/* Categories List */}
            <div className="md:col-span-1 lg:col-span-2">
              <div className="bg-[#111] border border-white/5 p-6 rounded-3xl shadow-lg min-h-[500px]">
                <h2 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-2">All Categories</h2>

                <div className="flex flex-wrap gap-3">
                  {categories?.map((category) => (
                    <button
                      key={category._id}
                      className="group relative flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/50 px-5 py-3 rounded-xl transition-all duration-300"
                      onClick={() => {
                        setModalVisible(true);
                        setSelectedCategory(category);
                        setUpdatingName(category.name);
                      }}
                    >
                      <span className="font-medium text-gray-300 group-hover:text-white transition-colors capitalize">
                        {category.name}
                      </span>
                      <FaEdit className="text-gray-500 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all text-xs" />
                    </button>
                  ))}
                </div>

                {(!categories || categories.length === 0) && (
                  <div className="text-center py-20 text-gray-500">
                    Categories you create will appear here.
                  </div>
                )}
              </div>
            </div>
          </div>

          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <CategoryForm
              value={updatingName}
              setValue={(value) => setUpdatingName(value)}
              handleSubmit={handleUpdateCategory}
              buttonText="Update"
              handleDelete={handleDeleteCategory}
            />
          </Modal>
        </div>
      </div>
  );
};

export default CategoryList;