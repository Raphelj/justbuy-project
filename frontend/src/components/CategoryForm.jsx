const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors text-white placeholder-gray-500 mb-4"
            placeholder="Enter category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-primary hover:bg-yellow-400 text-black font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/20"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              type="button"
              className="px-6 py-3 bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 text-white font-bold rounded-xl transition-all"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
