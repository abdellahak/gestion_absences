import { FaRegTrashCan } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";
import { Link } from "react-router-dom";
import { useToast } from "../../../../../../assets/toast/Toast";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { LuLoaderCircle } from "react-icons/lu";
import {
  download,
  updateStatus,
} from "../../../../../../assets/api/surveillant/DemandesAuth/demandes";

export default function SurveillantDemandesAuthTable({ data }) {
  const { toast } = useToast();
  const [downloadingId, setDownloadingId] = useState(null);
  const [localStatuses, setLocalStatuses] = useState(
    data.reduce((acc, item) => ({ ...acc, [item.id]: item.status }), {})
  );
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

  return (
    <div className="overflow-x-auto shadow-sm">
      <Table>
        <thead>
          <ThRow>
            <TableCell isHeader={true}>N°</TableCell>
            <TableCell isHeader={true}>Stagiaire Nom </TableCell>
            <TableCell isHeader={true}>Groupe</TableCell>
            <TableCell isHeader={true}>Description</TableCell>
            <TableCell isHeader={true}>Date</TableCell>
            <TableCell isHeader={true}>Heure début</TableCell>
            <TableCell isHeader={true}>Heure fin</TableCell>
            <TableCell isHeader={true}>Statut</TableCell>
            <TableCell isHeader={true}>Document</TableCell>
          </ThRow>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id} className="border border-gray-200">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`${item.stagiaire.user.nom} ${item.stagiaire.user.prenom}`}</TableCell>
                <TableCell>
                  {item.stagiaire.groupe?.intitule || "N/A"}
                </TableCell>  
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.heure_debut}</TableCell>
                <TableCell>{item.heure_fin}</TableCell>
                <TableCell>
                  <select
                    value={localStatuses[item.id] || item.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setLocalStatuses((prev) => ({
                        ...prev,
                        [item.id]: newStatus,
                      }));
                      updateStatus(item.id, newStatus)
                        .then(() => {
                          toast("success", "Statut mis à jour avec succès");
                        })
                        .catch(() => {
                          // Revert if API call fails
                          setLocalStatuses((prev) => ({
                            ...prev,
                            [item.id]: item.status,
                          }));
                        });
                    }}
                    className={`px-4 py-1 text-sm w-28 rounded-full font-semibold focus:outline-none ${
                      (localStatuses[item.id] || item.status) === "en_attente"
                        ? "bg-yellow-50 text-yellow-700"
                        : (localStatuses[item.id] || item.status) === "refuse"
                        ? "bg-error-50 text-error-700"
                        : (localStatuses[item.id] || item.status) === "valide"
                        ? "bg-success-50 text-success-700"
                        : ""
                    }`}
                  >
                    <option value="en_attente">En attente</option>
                    <option value="valide">Validé</option>
                    <option value="refuse">Refusé</option>
                  </select>
                </TableCell>
                <TableCell>
                  {downloadingId === item.id ? (
                    <div className="flex items-center justify-center h-10">
                      <LuLoaderCircle className="text-xl animate-spin text-brand-500" />
                    </div>
                  ) : (
                    <button
                      className=" hover:text-gray-500 flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-200"
                      onClick={() => handleDownload(item.id, item.intitule)}
                    >
                      Télecharger
                      <FaDownload className="h-4 w-4" />
                    </button>
                  )}
                </TableCell>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center p-12 text-lg ">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-gray-500">Aucun résultat trouvé</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
