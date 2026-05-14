import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

const Message = ({ variant = "info", children }) => {
  const styles = {
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-400",
      icon: <FaInfoCircle />,
    },
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      text: "text-green-400",
      icon: <FaCheckCircle />,
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      text: "text-yellow-400",
      icon: <FaExclamationTriangle />,
    },
    danger: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
      icon: <FaTimesCircle />,
    },
    error: { // Alias for danger
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
      icon: <FaTimesCircle />,
    }
  };

  const currentStyle = styles[variant] || styles.info;

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-xl border ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} backdrop-blur-sm`}
    >
      <span className="text-xl">{currentStyle.icon}</span>
      <span className="font-medium">{children}</span>
    </div>
  );
};

export default Message;