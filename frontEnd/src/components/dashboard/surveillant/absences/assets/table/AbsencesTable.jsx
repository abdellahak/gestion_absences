import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";
import { LuLoaderCircle } from "react-icons/lu";
import { FaDownload } from "react-icons/fa";
import { useState } from "react";
import { download, updateStatus } from "../../../../../../assets/api/surveillant/absences/absences";
import { useToast } from "../../../../../../assets/toast/Toast";

export default function AbsencesTable({ data }) {
  const { toast } = useToast();

  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = async (id, file_name) => {
    if (downloadingId === id) return;
    setDownloadingId(id);
    const res = await download(id, file_name);
    setDownloadingId(null);
    if (res.success) {
      toast("success", "la document a été techargé avec succées");
    } else {
      toast("error", res.error);
    }
  };


  const [statuses, setStatuses] = useState(
  data.reduce((acc, item) => {
    acc[item.id] = item.justification?.status || "en_attente";
    return acc;
  }, {})
   );
   const changeStatus = (id, newStatus) => {
  setStatuses(prev => ({ ...prev, [id]: newStatus }));
};

  return (
<>
    
    <div className="overflow-x-auto shadow-sm">
      <Table>
        <thead>
          <ThRow>
            <TableCell isHeader={true}>N°</TableCell>
            <TableCell isHeader={true}>Nom prenom</TableCell>
            <TableCell isHeader={true}>Date</TableCell>
            <TableCell isHeader={true}>Heure début</TableCell>
            <TableCell isHeader={true}>Heure fin</TableCell>
            <TableCell isHeader={true}>Formateur</TableCell>
            <TableCell isHeader={true}>Intitulé</TableCell>
            <TableCell isHeader={true}>Justification</TableCell>
            <TableCell isHeader={true}>Status</TableCell>

          </ThRow>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id} className="border border-gray-200">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`${item.stagiaire.user.nom} ${item.stagiaire.user.prenom}`}</TableCell>
                <TableCell>{item.date_absence}</TableCell>
                <TableCell>{item.heure_debut}</TableCell>
                <TableCell>{item.heure_fin}</TableCell>
                <TableCell>
                  {item.formateur?.user
                    ? `${item.formateur.user.nom} ${item.formateur.user.prenom}`
                    : "-"}
                </TableCell>
                <TableCell>{item.justification ? item.justification.intitule : "-"}</TableCell>
                 <TableCell>
                  {downloadingId === item.id ? (
                    <div className="flex items-center justify-center h-10">
                      <LuLoaderCircle className="text-xl animate-spin text-brand-500" />
                    </div>
                  ) : (
                    <button
                      className="hover:text-gray-500 flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-200"
                      onClick={() => handleDownload(item.justification.id, item.intitule)}
                    >
                      Télecharger
                      <FaDownload className="h-4 w-4" />
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  <span
                    className={
                      statuses[item.id] === "en_attente"
                        ? "px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 font-semibold"
                        : statuses[item.id] === "refuse"
                        ? "px-2 py-1 rounded-full bg-red-100 text-red-700 font-semibold"
                        : statuses[item.id] === "valide"
                        ? "px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold"
                        : "px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold"
                    }
                  >
                    
                    <select name="" id=""onChange={
                      (e)=>updateStatus(item.id, e.target.value).then(() => changeStatus(item.id, e.target.value))
                    }>
                      <option className="px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 font-semibold" value="en_attente" selected={statuses[item.id] === "en_attente"} onChange={() => changeStatus(item.id, "en_attente")}>En attente</option>
                      <option className="px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold" value="valide" selected={statuses[item.id] === "valide"} onChange={() => changeStatus(item.id, "valide")}>Validé</option>
                      <option className="px-2 py-1 rounded-full bg-red-100 text-red-700 font-semibold" value="refuse" selected={statuses[item.id] === "refuse"} onChange={() => changeStatus(item.id, "refuse")}>Refusé</option>
                    </select>
                  </span>
                </TableCell>
          </tr>
            ))
          ) : (
            <tr>
              <td colSpan={15} className="text-center p-12 text-lg ">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-gray-500">Aucun résultat trouvé</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
    </>
  );
}