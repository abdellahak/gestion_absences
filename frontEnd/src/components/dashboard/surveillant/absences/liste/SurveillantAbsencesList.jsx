import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Loading from "../../../../../assets/loading/Loading";
import AbsencesTable from "../assets/table/AbsencesTable";

import { getAbsences } from "../../../../../assets/api/surveillant/absences/absences";
import { getGroupes } from "../../../../../assets/api/admin/groupe/groupe";

export default function SurveillantAbsencesList() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getAbsences();
      setLoading(false);
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
      <title>Les absences</title>
      <div className="p-4 md:p-6  xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Les absences
        </h2>
        <div className="space-y-6 mb-6">
          <div className="rounded border border-gray-200 bg-white">
            <div className="border-t border-gray-100 p-5 sm:p-6">
              {loading ? (
                <div className="size-full flex justify-center items-center py-12">
                  <div className="w-fit">
                    <Loading className="!p-5" />
                  </div>
                  
                </div>
              ) : (
                
                <AbsencesTable data={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
