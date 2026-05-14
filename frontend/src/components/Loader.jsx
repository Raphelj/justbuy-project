const Loader = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-t-primary border-r-transparent border-b-primary border-l-transparent`}
      ></div>
    </div>
  );
};

export default Loader;
