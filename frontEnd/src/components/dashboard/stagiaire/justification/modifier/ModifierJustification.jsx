import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Justification from "../assets/form/Justification";
import { getJustification } from "../../../../../assets/api/stagiaires/justification/justification";
import { getAbsencesForJustification } from "../../../../../assets/api/stagiaires/absences/absences";
import Loading from "../../../../../assets/loading/Loading";

export default function ModifierJustification() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [absences, setAbsences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [absencesLoading, setAbsencesLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res1 = await getJustification(id);
      const res2 = await getAbsencesForJustification();
      if (res1.success) setData(res1.data);
      if (res2.success) setAbsences(res2.data || []);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <title>Modifier Justification</title>
      {!loading && data ? (
        <Justification
          update
          justificationId={id}
          data={data}
          absences={absences}
          absencesLoading={absencesLoading}
        />
      ) : (
        <div className="flex justify-center items-center size-full">
          <div>
            <Loading />
          </div>
        </div>
      )}
    </>
  );
}
