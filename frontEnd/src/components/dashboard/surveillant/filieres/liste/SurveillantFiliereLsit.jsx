import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";

import { getSurveillantFilieres } from "../../../../../assets/api/surveillant/surveillant filieres/SurveillantFilieres";
import SurveillantFiliereTable from "../assets/table/SurveillantFiliereTable";

export default function SurveillantFilieresList() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSurveillantFilieres();
      if (res) setLoading(false);
      if (res.success) {
        setData(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchData();
  }, []);

  

  return (
    <>
      <title>Liste des filières</title>
      <div className="p-4 md:p-6 max-w-[1500px] xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Liste des filières
        </h2>
        <div className="space-y-6 mb-6">
          <div className="rounded border border-gray-200 bg-white">
            <div className="border-t border-gray-100 p-5 sm:p-6">
              {loading ? (
                <div className=" size-full flex justify-center items-center py-12">
                  <div className="w-fit">
                    <Loading className="!p-5" />
                  </div>
                </div>
              ) : (
                <SurveillantFiliereTable data={data} setShow={setShow} />
              )}
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
}
