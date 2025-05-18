import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Groupe from "../assets/form/Groupe";
import { useParams } from "react-router-dom";
import Loading from "../../../../../assets/loading/Loading";
import {getGroupe} from "../../../../../assets/api/admin/groupe/groupe";
export default function ModifierGroupe() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchGroupe = async () => {
      const res = await getGroupe(id);
      if (res) setLoading(false);
      if (res.success) {
        setData(res.data);
      } else {
        toast("error", res.error);
      }
    };
    fetchGroupe();
  }, [id]);

  return (
    <>
      <title>Modifier Groupe</title>
      {!loading ? (
        <Groupe update GroupId={id} data={data} />
      ) : (
        <div className="flex justify-center items-center size-full">
          <div className="">
            <Loading />
          </div>
        </div>
      )}
    </>
  );
}