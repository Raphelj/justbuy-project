import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white overflow-x-hidden font-sans">
      <ToastContainer />

      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
