import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { AiOutlineSearch, AiOutlineShopping, AiOutlineUser, AiOutlineHeart, AiOutlineMenu, AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import FavouritesCount from "../Products/FavouritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setDropdownOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="text-3xl font-heading font-extrabold tracking-tighter text-white hover:text-primary transition-colors flex items-center gap-1 group">
            <span>JusBuy</span>
            <span className="text-primary text-4xl group-hover:rotate-12 transition-transform">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Icons Area */}
          <div className="flex items-center space-x-6 text-gray-300">

            {/* Favorites */}
            <Link to="/favorite" className="hover:text-primary transition-transform hover:scale-110 relative">
              <AiOutlineHeart size={24} />
              <FavouritesCount />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="hover:text-primary transition-transform hover:scale-110 relative">
              <AiOutlineShopping size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black animate-pulse">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative group/dropdown">
              {userInfo ? (
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 hover:text-white transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 flex items-center justify-center border border-gray-600 shadow-md">
                    <span className="font-bold text-xs text-white">{userInfo.username.charAt(0).toUpperCase()}</span>
                  </div>
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-sm font-semibold hover:text-white transition-colors">LOGIN</Link>
                  <Link to="/register" className="text-sm font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">JOIN</Link>
                </div>
              )}

              {/* Dropdown Menu */}
              {(dropdownOpen && userInfo) && (
                <div
                  className="absolute right-0 mt-4 w-64 glass-modal rounded-xl overflow-hidden shadow-2xl z-50 transform origin-top-right transition-all duration-200 fade-in"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="p-5 border-b border-white/10 bg-white/5">
                    <p className="text-base font-bold text-white leading-none mb-1">{userInfo.username}</p>
                    <p className="text-xs text-gray-400 font-medium truncate">{userInfo.email}</p>
                  </div>
                  <ul className="py-2">
                    {userInfo.isAdmin && (
                      <>
                        <li className="px-5 py-2">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Admin Dashboard</span>
                        </li>
                        <li>
                          <Link to="/admin/dashboard" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-primary transition-colors">
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/categorylist" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-primary transition-colors">
                            Categories
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/productlist" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-primary transition-colors">
                            Create Product
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/allproductslist" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-primary transition-colors">
                            All Products
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/userlist" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-primary transition-colors">
                            Manage Users
                          </Link>
                        </li>
                        <li>
                          <Link to="/admin/orderlist" className="block px-5 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-primary transition-colors">
                            Manage Orders
                          </Link>
                        </li>
                        <div className="border-t border-white/5 my-2"></div>
                      </>
                    )}
                    <li><Link to="/profile" className="block px-5 py-2.5 text-sm text-gray-300 hover:bg-white/10 hover:text-primary transition-colors">Profile</Link></li>
                    <li>
                      <button onClick={logoutHandler} className="w-full text-left block px-5 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-medium">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <AiOutlineClose size={26} /> : <AiOutlineMenu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-3xl font-heading font-bold text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {!userInfo && (
            <div className="flex flex-col gap-4 mt-8">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-gray-300">Login</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-primary">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navigation;