import { FaCheck } from "react-icons/fa";

const ProgressSteps = ({ step1, step2, step3 }) => {
  const steps = [
    { name: "Login", completed: step1 },
    { name: "Shipping", completed: step2 },
    { name: "Summary", completed: step3 },
  ];

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {/* Step Circle */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${step.completed
                    ? "bg-primary border-primary text-black scale-110 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                    : "bg-[#111] border-gray-700 text-gray-500"
                  }`}
              >
                {step.completed ? <FaCheck /> : index + 1}
              </div>
              <span
                className={`absolute -bottom-8 text-xs font-bold uppercase tracking-wider whitespace-nowrap ${step.completed ? "text-primary" : "text-gray-500"
                  }`}
              >
                {step.name}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`w-20 md:w-32 h-1 mx-2 rounded-full transition-all duration-500 ${steps[index + 1].completed ? "bg-primary" : "bg-[#111] border-t border-b border-gray-800"
                }`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;