
const AuthLayout = ({ title, children }) => {
  return (
    <div className="flex min-h-screen w-full bg-black text-white overflow-hidden font-sans">
      {/* Left Side - Image/Art */}
      <div className="hidden lg:flex lg:w-1/2 relative justify-center items-center bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-black to-black z-10" />
        <img
          src="https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=2787&auto=format&fit=crop"
          alt="Auth Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-20 p-12 text-left">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4 tracking-tighter">
            JusBuy
          </h1>
          <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
            Discover the extraordinary. Elevate your shopping experience with curated collections and premium finds.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-black relative">
        <div className="absolute top-0 right-0 p-8 lg:hidden">
          <h1 className="text-2xl font-bold text-yellow-500">JusBuy</h1>
        </div>

        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
              {title}
            </h2>
            <p className="text-gray-400">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;