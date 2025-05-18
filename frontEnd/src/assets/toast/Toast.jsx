import { createContext, useContext, useEffect, useState } from "react";

import { RxCross2 } from "react-icons/rx";

import { FaCheck } from "react-icons/fa";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "Pour utiliser le toast, vous devez envelopper votre application avec ToastWraper"
    );
  }

  return context;
};

export const ToastWraper = ({ children }) => {
  const [show, setShow] = useState(false);
  const [toastMsg, setToastMsg] = useState({
    type: "",
    msg: "",
  });
  const [progress, setProgress] = useState(100);

  const toast = (type, msg) => {
    setToastMsg({
      type,
      msg,
    });
    setShow(true);
    setProgress(100);
  };

  const handleClose = () => {
    setShow(false);
    setToastMsg({
      type: "",
      msg: "",
    });
  };

  useEffect(() => {
    let progressInterval;
    let timeoutId;

    if (show) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(progressInterval);
            return 0;
          }
          return prev - 0.5;
        });
      }, 25);

      timeoutId = setTimeout(() => {
        setShow(false);
        setToastMsg({
          type: "",
          msg: "",
        });
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
    };
  }, [show]);

  return (
    <ToastContext.Provider
      value={{
        toast,
      }}
    >
      {show && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[999999] animate-fadeIn"
          style={{
            animation: show ? "fadeIn 0.3s ease-out" : "fadeOut 0.3s ease-in",
          }}
        >
          <div className={`bg-white text-gray-700 rounded-lg py-3 px-4 flex items-center gap-3 border-l-4 ${toastMsg.type === "error" ? "border-red-600": "border-success-600"} shadow-lg relative overflow-hidden min-w-[320px] max-w-md`}>
            <div
              className={`h-8 w-8 flex justify-center items-center rounded-full shrink-0
                ${
                  toastMsg.type === "error"
                    ? "bg-error-50 text-error-600"
                    : "bg-success-50 text-success-600"
                }
              `}
            >
              {toastMsg.type === "error" ? (
                <RxCross2 className="size-4 font-semibold" />
              ) : (
                <FaCheck className="size-4" />
              )}
            </div>
            <p className="text-sm font-medium leading-5 flex-1 pr-2">
              {toastMsg.msg}
            </p>
            <button
              className="h-7 w-7 flex justify-center items-center rounded-full hover:bg-gray-100 transition-all duration-200 active:scale-95 text-gray-500 hover:text-gray-700 shrink-0"
              onClick={handleClose}
              aria-label="Close notification"
            >
              <RxCross2 className="size-4" />
            </button>

            {/* Progress bar */}
            <div
              className="absolute bottom-0 left-0 h-[2px] bg-brand-600"
              style={{
                width: `${progress}%`,
                transition: "width 25ms linear",
                boxShadow: "0 0 3px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        </div>
      )}
      {children}
    </ToastContext.Provider>
  );
};
