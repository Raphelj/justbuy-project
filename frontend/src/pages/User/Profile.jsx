import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaBoxOpen } from "react-icons/fa";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">

          {/* Left: Profile Form */}
          <div className="w-full md:w-2/3 bg-[#111] border border-white/5 rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black">
                <FaUser />
              </span>
              Update Profile
            </h2>

            <form onSubmit={submitHandler} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter name"
                      className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">New Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FaLock />
                    </div>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FaLock />
                    </div>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:border-primary focus:outline-none transition-colors text-white"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-yellow-400 text-black font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {loadingUpdateProfile ? <Loader size="sm" /> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Quick Links */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-purple-900/40 to-black border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">My Orders</h3>
              <p className="text-gray-400 mb-6 text-sm">View and track your current and past orders.</p>
              <Link
                to="/user-orders"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white font-bold flex items-center gap-2 transition-all"
              >
                <FaBoxOpen /> View Orders
              </Link>
            </div>

            {/* Additional stats or info could go here */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
