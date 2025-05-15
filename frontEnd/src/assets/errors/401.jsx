import { Link } from "react-router-dom";





export default function Unauthorised({className}) {

    return (
        <div className={`w-full flex justify-center items-center ${className}`}
        >
            <div className="size-[500px] flex rounded-md p-4 py-6 bg-white">
                <div className="size-full flex flex-col items-center gap-10 justify-center">
                    <h4 className="text-5xl font-medium">401</h4>
                    <p className="text-xl">Vous n'avez pas l'autorisation</p>
                    <div className="flex items-center gap-2">
                        <Link to={"/"} className="bg-blue-10 rounded-md p-2 px-8 text-white active:scale-95 hover:bg-blue-10/50 transition-all duration-300">
                            Accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}