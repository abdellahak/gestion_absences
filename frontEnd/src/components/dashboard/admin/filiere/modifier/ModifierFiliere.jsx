import { useEffect, useState } from "react";
import { useToast } from "../../../../../assets/toast/Toast";
import Filiere from "../assets/form/Filiere";
import { useParams } from "react-router-dom";
import Loading from "../../../../../assets/loading/Loading";
import { getFiliere } from "../../../../../assets/api/filiere/filiere";


export default function ModifierFiliere(){
  const {toast} = useToast();
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
      const fetchFiliere = async () => {
        const res = await getFiliere(id);
        if (res) setLoading(false);
        if (res.success) {
          setData(res.data);
        } else {
          toast("error", res.error);
        }
      };
      fetchFiliere();
    }, [id]);
  return(
    <>
      <title>Modifier Filiere</title>
    
      {!loading?
      <Filiere update FiliereId = {id} data = {data} />
      :
        <div className="flex justify-center items-center size-full">
          <div className="">
            <Loading />
          </div>
          
        </div>}
    </>
  )
}