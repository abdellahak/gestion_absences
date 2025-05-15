import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthWrapper";
import Unauthorised from "../errors/401";
import Login from "../../components/Home/login/Login";




export default function RoleWrapper({role}) {
    const {auth} = useAuth()
    if (!auth) return <Login />;
    if(auth.role !== role) return (
        <Unauthorised className='h-full'/>
    )

    return (
        <>
            <Outlet />
        </>
    )
}