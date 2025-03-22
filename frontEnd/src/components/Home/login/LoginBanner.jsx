export default function LoginBanner() {
  return (
    <>
      <div className="relative items-center hidden w-full h-full bg-blue-950 lg:grid lg:w-1/2">
        <div className="flex items-center justify-center z-1">
          <div className="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
            <img src="/images/shape/grid-01.svg" alt="grid" />
          </div>
          <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
            <img src="/images/shape/grid-01.svg" alt="grid" />
          </div>
          <div className="flex flex-col items-center max-w-xs">
              <div className="block mb-4">
                <img src="/images/logo/ofppt.png" alt="Logo" className=""/>
              </div>
              <p className="text-center text-gray-400">
                Bienvenue sur notre site de gestion des absences. Gérez facilement et efficacement les absences de votre classe.
              </p>
            </div>
        </div>
      </div>
    </>
  );
}
