import { useEffect, useState } from "react";
import { FaPlus, FaPen } from "react-icons/fa6";
import { useAuth } from "../../../../../../assets/wrapper/AuthWrapper";
export default function SurveillantFiliereForm({
  handleSubmit,
  errors,
  formData,
  setFormData,
  setErrors,
  update,
}) {
  const {auth} = useAuth()

  return (
    <>
      <div className="p-4 md:p-6  max-w-[1200px] xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {update ? "Modifier filière" : "Ajouter une filière"}
        </h2>
        <div className="space-y-6 mb-6">
          <div className="rounded  border border-gray-200 bg-white ">
            <div className="border-t border-gray-100 p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Element */}
              <div className="mb-4">
                <label
                  htmlFor="intitule"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Intitule
                </label>
                <div className="relative">
                  <div className="flex  flex-col gap-1 w-full">
                    <input
                      placeholder="Intitule..."
                      className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                      type="text"
                      name="intitule"
                      id="intitule"
                      value={formData.intitule}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          intitule: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-red-500 text-md break-words h-[20px]">
                      {errors.intitule}
                    </p>
                  </div>
                </div>
              </div>
              {/* Element */}
              <div className="mb-4">
                <label
                  htmlFor="code"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Code
                </label>
                <div className="relative">
                  <div className="flex  flex-col gap-1 w-full">
                    <input
                      placeholder="(DEV, TSGC, AA, AAOC ...)"
                      className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                      type="text"
                      name="code"
                      id="code"
                      value={formData.code}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          code: e.target.value,
                        }));
                      }}
                    />
                    <p className="text-red-500 text-md break-words h-[20px]">
                      {errors.code}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center justify-center w-full gap-2 p-3 text-sm font-medium transition-colors rounded-lg bg-brand-500 text-white hover:bg-brand-600"
          >
            {update ? <FaPen /> : <FaPlus />}
            {update ? "modifier la filière" : "ajouter la filière"}
          </button>
        </div>
      </div>
    </>
  );
}
