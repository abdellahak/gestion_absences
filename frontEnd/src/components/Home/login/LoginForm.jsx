import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function LoginForm({
  errors,
  handleChange,
  info,
  handleSubmit,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="flex flex-col flex-1 w-full lg:w-1/2">
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-lg sm:text-4xl">
                Connexion
              </h1>
              <p className="text-sm text-gray-500">
                Entrez votre identifiant et mot de passe pour vous connecter!
              </p>
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault()
                handleSubmit()
            }}>
              <div className="space-y-5">
                {/* identifient */}
                <div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Identifient
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="identifiant"
                      name="identifiant"
                      placeholder="Entrez votre identifiant"
                      value={info.identifiant}
                      onChange={handleChange}
                      autoComplete="on"
                      className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-blue-300 focus:outline-hidden focus:ring-3 focus:ring-blue-500/10"
                    />
                  </div>
                  <p className="text-red-500 text-lg break-words h-[20px]">
                    {errors.identifiant}
                  </p>
                </div>
                {/* password */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Mot de passe
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="flex justify-center items-center relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Entrez votre mot de passe"
                      value={info.password}
                      onChange={handleChange}
                      className={`h-11 w-full ${
                        errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : ""
                      } rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-blue-300 focus:outline-hidden focus:ring-3 focus:ring-blue-500/10`}
                    />
                    <div
                      className="absolute right-3 text-2xl text-gray-400 hover:text-gray-800 transition-all duration-300 active:scale-90 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {!showPassword ? <LuEye /> : <LuEyeOff />}
                    </div>
                  </div>
                  <p className="text-red-500 text-lg break-words h-[20px]">
                    {errors.password}
                  </p>
                </div>
                {/* submit */}
                <div>
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-blue-500 shadow-theme-xs hover:bg-blue-600">
                    Connexion
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
