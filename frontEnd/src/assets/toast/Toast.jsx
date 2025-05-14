import { createContext, useContext, useEffect, useState } from "react";

import { RxCross2 } from "react-icons/rx";

import { FaCheck } from "react-icons/fa";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "Pour utiliser le toast, vous devez envelopper le site avec ToastWraper"
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
  const toast = (type, msg) => {
    setToastMsg({
      type,
      msg,
    });
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setToastMsg({
      type: "",
      msg: "",
    });
  };
  useEffect(() => {
    const id = setTimeout(() => {
      setShow(false);
      setToastMsg({
        type: "",
        msg: "",
      });
    }, 5000);

    return () => clearTimeout(id);
  }, [show]);
  return (
    <ToastContext.Provider
      value={{
        toast,
      }}
    >
      {show && (
        <div className="flex items-center justify-between gap-3 w-full sm:max-w-[340px] rounded-md border-b-4 border-success-500 bg-white p-3 shadow-theme-sm dark:bg-[#1E2634]">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg text-success-600 dark:text-success-500 bg-success-50 dark:bg-success-500/[0.15]">
              <FaCheck />
            </div>
            <h4 className="sm:text-base text-sm text-gray-800 dark:text-white/90">
              {toastMsg}
            </h4>
          </div>
        </div>
      )}
      {/* {show&&
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999]">
                    <div className="bg-blue-10/80 text-white rounded-md p-2 flex items-center gap-2">
                        
                        <div className={`p-1 w-6 flex justify-center items-center bg-white rounded-full 
                            ${toastMsg.type == "error"?"text-red-600":"text-green-500"}
                            `}>
                                {toastMsg.type == "error"?
                                <RxCross2 />
                                :
                                <FaCheck />
                                }
                            
                        </div>
                        <p className="max-w-[300px] text-sm sm:max-w-[400px]">{toastMsg.msg}</p>
                        <div className="cursor-pointer p-1 rounded-full hover:bg-white/10 transition-all duration-300 active:scale-90" onClick={handleClose}>
                            <RxCross2 />
                        </div>
                    </div>
                </div>} */}
      {children}
    </ToastContext.Provider>
  );
};
