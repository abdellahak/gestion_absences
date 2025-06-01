import { Link } from "react-router-dom";
import { FaUsers, FaUserGraduate, FaLayerGroup, FaUserShield } from "react-icons/fa";
import { useEffect, useState } from "react";
import Loading from "../../../assets/loading/Loading";
import { getGroupes } from "../../../assets/api/admin/groupe/groupe";
import { getStagiaires } from "../../../assets/api/admin/stagiaire/stagiaire";
import { getFormateurs } from "../../../assets/api/admin/formateur/fomateur";
import { getFilieres } from "../../../assets/api/admin/filiere/filiere";
import { getSurveillants } from "../../../assets/api/admin/surveillant/surveillant";
import ApexChart from "react-apexcharts";

const CARD_COLORS = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    groupes: 0,
    stagiaires: 0,
    formateurs: 0,
    filieres: 0,
    surveillants: 0,
  });

  const statCards = [
    {
      to: "groupes",
      color: "green",
      icon: <FaUsers />,
      value: stats.groupes,
      label: "Groupes",
    },
    {
      to: "stagiaires",
      color: "amber",
      icon: <FaUserGraduate />,
      value: stats.stagiaires,
      label: "Stagiaires",
    },
    {
      to: "formateurs",
      color: "cyan",
      icon: <FaUsers />,
      value: stats.formateurs,
      label: "Formateurs",
    },
    {
      to: "filieres",
      color: "blue",
      icon: <FaLayerGroup />,
      value: stats.filieres,
      label: "Filières",
    },
    {
      to: "surveillants",
      color: "indigo",
      icon: <FaUserShield />,
      value: stats.surveillants,
      label: "Surveillants généraux",
    },
  ];

  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      setLoading(true);
      const [gr, st, form, fil, surv] = await Promise.allSettled([
        getGroupes({ per_page: 100000 }),
        getStagiaires({ per_page: 100000 }),
        getFormateurs({ per_page: 100000 }),
        getFilieres({ per_page: 100000 }),
        getSurveillants(),
      ]);
      if (!mounted) return;
      setStats({
        groupes: gr.value?.success ? gr.value.data.length : 0,
        stagiaires: st.value?.success ? st.value.data.data.length : 0,
        formateurs: form.value?.success ? form.value.data.length : 0,
        filieres: fil.value?.success ? fil.value.data.length : 0,
        surveillants: surv.value?.success ? surv.value.data.length : 0,
      });
      setLoading(false);
    }
    fetchStats();
    return () => { mounted = false; };
  }, []);

  const chartOptions = {
    chart: { type: "donut" },
    labels: statCards.map((c) => c.label),
    colors: ["#22c55e", "#f59e42", "#06b6d4", "#2563eb", "#6366f1"],
    legend: { position: "bottom" },
    dataLabels: { enabled: true },
  };
  const chartSeries = statCards.map((c) => c.value || 1);
  const hasData = chartSeries.some(val => val > 0);

  return (
    <>
      <title>Tableau de bord Admin</title>
      <div className="p-4 md:p-6 max-w-[1500px] xl:mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Bienvenue sur votre tableau de bord</h2>
          <p className="text-gray-500 mt-2 text-lg">Gérez les groupes, stagiaires, formateurs, filières et surveillants généraux</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7 mb-12">
          {loading
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 p-7 shadow animate-pulse flex flex-col items-center"
                  >
                    <div className="p-4 rounded-full bg-gray-100 mb-3 w-14 h-14" />
                    <div className="h-8 w-16 bg-gray-100 rounded mb-2" />
                    <div className="h-4 w-24 bg-gray-100 rounded mb-4" />
                    <div className="h-3 w-20 bg-gray-100 rounded" />
                  </div>
                ))
            : statCards.map((card, i) => {
                const color = CARD_COLORS[card.color];
                return (
                  <Link
                    key={i}
                    to={card.to}
                    className={`group bg-white rounded-2xl border ${color.border} shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center min-h-[210px] p-0`}
                    style={{ minHeight: 210 }}
                  >
                    <div className="flex flex-col items-center justify-center w-full h-full py-7">
                      <div
                        className={`flex items-center justify-center rounded-full ${color.bg} ${color.text} mb-4 shadow-inner`}
                        style={{ width: 70, height: 70, fontSize: 36 }}
                      >
                        {card.icon}
                      </div>
                      <div className="text-5xl font-extrabold text-gray-900 mb-1 text-center">
                        {card.value}
                      </div>
                      <div className="text-gray-600 text-lg font-semibold text-center mb-2">
                        {card.label}
                      </div>
                      <div
                        className={`mt-2 text-xs font-semibold ${color.text} group-hover:underline text-center`}
                      >
                        Voir les détails →
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow mb-8 flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Répartition des activités</h3>
          <div className="w-full flex justify-center">
            {loading ? (
              <div className="w-[380px] h-[380px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-500"></div>
              </div>
            ) : hasData ? (
              <ApexChart
                 options={chartOptions}
                 series={chartSeries}
                 type="donut"
                 width={380}
               />
            ) : (
              <div className="w-[380px] h-[380px] flex items-center justify-center text-gray-500">
                <p>Aucune donnée disponible</p>
              </div>
              )}
            </div>
        </div>
      </div>
    </>
  );
}