import { useEffect } from "react"







export const useRemover = ({className,show,setShow}) => {
    
    useEffect(() => {
        if(!show) return
        const cOverlay = (e) => {
            const overlay = document.querySelector(`.${className}`)
            if(overlay && !overlay.contains(e.target)) {
                setShow(false)
            }
        }

        document.addEventListener("click",cOverlay)
        return () => document.removeEventListener("click",cOverlay)
    },[show])
}