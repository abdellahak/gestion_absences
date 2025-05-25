import { useState } from "react";
import { LuLoaderCircle, LuEye, LuEyeOff } from "react-icons/lu";

export default function PasswordForm({
  passwordData,
  setPasswordData,
  errors,
  setErrors,
  handleSubmit,
  buttonLoading,
}) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Modifier le mot de passe
            </h4>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
              {/* Current Password */}
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500">
                  Mot de passe actuel <span className="text-red-500">*</span>
                </p>
                <div className="relative">
                  <input
                    placeholder="Mot de passe actuel..."
                    className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3 pr-10"
                    type={showCurrentPassword ? "text" : "password"}
                    name="current_password"
                    id="current_password"
                    value={passwordData.current_password}
                    onChange={(e) => {
                      setPasswordData((prev) => ({
                        ...prev,
                        current_password: e.target.value,
                      }));
                      if (errors.current_password) {
                        setErrors((prev) => ({ ...prev, current_password: "" }));
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <LuEyeOff /> : <LuEye />}
                  </button>
                </div>
                <p className="text-red-500 text-xs mt-1 h-4">
                  {errors.current_password}
                </p>
              </div>

              {/* New Password */}
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500">
                  Nouveau mot de passe <span className="text-red-500">*</span>
                </p>
                <div className="relative">
                  <input
                    placeholder="Nouveau mot de passe..."
                    className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3 pr-10"
                    type={showNewPassword ? "text" : "password"}
                    name="new_password"
                    id="new_password"
                    value={passwordData.new_password}
                    onChange={(e) => {
                      setPasswordData((prev) => ({
                        ...prev,
                        new_password: e.target.value,
                      }));
                      if (errors.new_password) {
                        setErrors((prev) => ({ ...prev, new_password: "" }));
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <LuEyeOff /> : <LuEye />}
                  </button>
                </div>
                <p className="text-red-500 text-xs mt-1 h-4">
                  {errors.new_password}
                </p>
              </div>

              {/* Confirm New Password */}
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500">
                  Confirmer le nouveau mot de passe <span className="text-red-500">*</span>
                </p>
                <div className="relative">
                  <input
                    placeholder="Confirmer le nouveau mot de passe..."
                    className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3 pr-10"
                    type={showConfirmPassword ? "text" : "password"}
                    name="new_password_confirmation"
                    id="new_password_confirmation"
                    value={passwordData.new_password_confirmation}
                    onChange={(e) => {
                      setPasswordData((prev) => ({
                        ...prev,
                        new_password_confirmation: e.target.value,
                      }));
                      if (errors.new_password_confirmation) {
                        setErrors((prev) => ({ ...prev, new_password_confirmation: "" }));
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                  </button>
                </div>
                <p className="text-red-500 text-xs mt-1 h-4">
                  {errors.new_password_confirmation}
                </p>
              </div>
            </div>
          </div>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto"
            onClick={handleSubmit}
            disabled={buttonLoading}
          >
            {buttonLoading ? (
              <LuLoaderCircle className="text-xl animate-spin text-brand-500" />
            ) : (
              <>
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 1.5C6.51472 1.5 4.5 3.51472 4.5 6V7.5H3.75C2.92157 7.5 2.25 8.17157 2.25 9V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V9C15.75 8.17157 15.0784 7.5 14.25 7.5H13.5V6C13.5 3.51472 11.4853 1.5 9 1.5ZM12 7.5V6C12 4.34315 10.6569 3 9 3C7.34315 3 6 4.34315 6 6V7.5H12ZM9 10.5C8.58579 10.5 8.25 10.8358 8.25 11.25V12.75C8.25 13.1642 8.58579 13.5 9 13.5C9.41421 13.5 9.75 13.1642 9.75 12.75V11.25C9.75 10.8358 9.41421 10.5 9 10.5Z"
                    fill=""
                  />
                </svg>
                Modifier
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}