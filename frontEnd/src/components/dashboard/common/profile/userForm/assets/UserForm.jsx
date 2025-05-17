import { LuLoaderCircle } from "react-icons/lu";
import { useAuth } from "../../../../../../assets/wrapper/AuthWrapper";

export default function UserForm({
  data,
  setData,
  errors,
  setErrors,
  handleSubmit,
  buttonLoading,
}) {
  const { auth } = useAuth();
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              Informations Personnelles
            </h4>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500">
                  Adresse e-mail
                </p>
                <input
                  placeholder="Email..."
                  className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                  type="text"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                />
              </div>
              {auth.role === "stagiaire" && (
                <>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500">
                      Téléphone
                    </p>
                    <input
                      placeholder="Téléphone..."
                      className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                      type="text"
                      name="telephone"
                      id="telephone"
                      value={data.telephone}
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          telephone: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500">
                      Sexe
                    </p>
                    <select
                      className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                      name="sexe"
                      id="sexe"
                      value={data.sexe || ""}
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          sexe: e.target.value,
                        }));
                      }}
                    >
                      <option value="" disabled>
                        Sélectionner...
                      </option>
                      <option value="Homme">Homme</option>
                      <option value="Femme">Femme</option>
                    </select>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500">
                      Date de naissance
                    </p>
                    <input
                      className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3 cursor-pointer"
                      type="date"
                      name="date_naissance"
                      id="date_naissance"
                      value={data.date_naissance || ""}
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          date_naissance: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500">
                      Lieu de naissance
                    </p>
                    <input
                      placeholder="Lieu de naissance..."
                      className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 h-11 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                      type="text"
                      name="lieu_naissance"
                      id="lieu_naissance"
                      value={data.lieu_naissance || ""}
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          lieu_naissance: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500">
                      Adresse
                    </p>
                    <textarea
                      placeholder="Adresse..."
                      className="shadow-sm focus:outline-0 border border-gray-300 focus:border-brand-600 focus:ring-brand-600 w-full rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:ring-3"
                      name="adresse"
                      id="adresse"
                      rows="3"
                      value={data.adresse || ""}
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          adresse: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto"
            onClick={handleSubmit}
          >
            {
              buttonLoading ? 
              <LuLoaderCircle  className="text-xl animate-spin text-brand-500"/> :
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
                    d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                    fill=""
                  />
                </svg>
                Modifier
              </>
            }
          </button>
        </div>
      </div>
    </>
  );
}
