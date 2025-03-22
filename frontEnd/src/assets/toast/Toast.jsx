import { createContext, useContext, useEffect, useState } from "react";

import { RxCross2 } from "react-icons/rx";

import { FaCheck } from "react-icons/fa";



const ToastContext = createContext(null)



export const useToast = () => {
    const context = useContext(ToastContext)
    if(!context) {
        throw new Error("Pour utiliser le toast, vous devez envelopper le site avec ToastWraper")
    }

    return context
}

export const ToastWraper = ({children}) => {
    const [show,setShow] = useState(false)
    const [toastMsg,setToastMsg] = useState({
        type:"",
        msg:""
    })
    const toast = (type,msg) => {
        setToastMsg({
            type,
            msg
        })
        setShow(true)

    }

    const handleClose = () => {
        setShow(false)
            setToastMsg({
                type:"",
                msg:""
            })
    }
    useEffect(() => {
        const id = setTimeout(() => {
            setShow(false)
            setToastMsg({
                type:"",
                msg:""
            })
        },5000)

        return () => clearTimeout(id)
    },[show])
    return (
        <ToastContext.Provider value={{
            toast
        }}>
                {show&&
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
                </div>}
                {children}
        </ToastContext.Provider>
    )
}