import { useAuth } from "../../assets/wrapper/AuthWrapper"
import Login from "./login/Login"




export default function Home() {
    const {auth} = useAuth()
    
    return (
        <div className=" size-full" style={{
            backgroundImage:"url(/images/bg.jpg)"
        }}>
            {!auth?
            <Login />
            :
            <h1>Dashboard</h1>}
        </div>
    )
}