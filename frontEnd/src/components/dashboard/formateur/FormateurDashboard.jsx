import { Link } from "react-router-dom";
import { FaCalendarTimes, FaUsers, FaFileAlt, FaUserGraduate } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAbsences } from "../../../assets/api/formateur/absences/absences";
import { getFormateurGroupes } from "../../../assets/api/formateur/formateur groupes/formateurGroupes";
import { getDemandes } from "../../../assets/api/formateur/demandes/demandes";
import { getFormateurStagiaires } from "../../../assets/api/formateur/formateur stagiaires/formateurStagiaires";
import ApexChart from "react-apexcharts";

const CARD_COLORS = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
};

export default function FormateurDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    absences: 0,
    groupes: 0,
    demandes: 0,
    stagiaires: 0,
  });

  const statCards = [
    {
      to: "absences",
      color: "blue",
      icon: <FaCalendarTimes />,
      value: stats.absences,
      label: "Absences",
    },
    {
      to: "groupes",
      color: "purple",
      icon: <FaUsers />,
      value: stats.groupes,
      label: "Groupes",
    },
    {
      to: "demandes",
      color: "green",
      icon: <FaFileAlt />,
      value: stats.demandes,
      label: "Demandes",
    },
    {
      to: "stagiaires",
      color: "amber",
      icon: <FaUserGraduate />,
      value: stats.stagiaires,
      label: "Mes stagiaires",
    },
  ];

  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      setLoading(true);

      const [abs, gr, dem, stag] = await Promise.allSettled([
        getAbsences(undefined,{ per_page: 100000 }),
        getFormateurGroupes(),
        getDemandes(),
        getFormateurStagiaires(undefined, { per_page: 100000 }),
      ]);

      if (!mounted) return;

      console.log("getAbsences response:", abs);
      console.log("getFormateurStagiaires response:", stag);

      setStats({
        absences: abs.status === 'fulfilled' && abs.value?.success
          ? Array.isArray(abs.value.data)
            ? abs.value.data.length
            : abs.value.data?.data?.length || abs.value.data?.total || 0
          : 0,
        groupes: gr.status === 'fulfilled' && gr.value?.success
          ? Array.isArray(gr.value.data)
            ? gr.value.data.length
            : gr.value.data?.length || gr.value.data?.total || 0
          : 0,
        demandes: dem.status === 'fulfilled' && dem.value?.success
          ? Array.isArray(dem.value.data)
            ? dem.value.data.length
            : dem.value.data?.length || dem.value.data?.total || 0
          : 0,
        stagiaires: stag.status === 'fulfilled' && stag.value?.success
          ? Array.isArray(stag.value.data)
            ? stag.value.data.length
            : stag.value.data?.data?.length || stag.value.data?.total || stag.value.data?.length || 0
          : 0,
      });
      setLoading(false);
    }
    fetchStats();
    return () => { mounted = false; };
  }, []);

  const chartOptions = {
    chart: { type: "donut" },
    labels: statCards.map((c) => c.label),
    colors: ["#2563eb", "#22c55e", "#a21caf", "#f59e42"],
    legend: { position: "bottom" },
    dataLabels: { enabled: true },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    }
  };

  const chartSeries = statCards.map((c) => c.value || 1);
  const hasData = chartSeries.some(val => val > 0);

  return (
    <>
      <title>Tableau de bord Formateur</title>
      <div className="p-4 md:p-6 max-w-[1500px] xl:mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Bienvenue sur votre tableau de bord</h2>
          <p className="text-gray-500 mt-2 text-lg">Gérez vos activités et consultez vos statistiques</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-12">
          {loading
            ? Array(4)
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
          <h3 className="text-xl font-bold text-gray-800 mb-4">Répartition de vos activités</h3>
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