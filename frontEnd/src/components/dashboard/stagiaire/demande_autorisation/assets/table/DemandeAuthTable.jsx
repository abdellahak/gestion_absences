import { FaRegTrashCan } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";
import { Link } from "react-router-dom";
import { useToast } from "../../../../../../assets/toast/Toast";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { LuLoaderCircle } from "react-icons/lu";
import { download } from "../../../../../../assets/api/stagiaires/demande_autorisation/demande_autorisation";

export default function DemandeAuthTable({ data, setShow }) {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);
  const handleDownload = async (id, file_name) => {
    if (downloading) return;
    setDownloading(true);
    const res = await download(id, file_name);
    if (res) setDownloading(false);
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
            <TableCell isHeader={true}>Objet</TableCell>
            <TableCell isHeader={true}>Description</TableCell>
            <TableCell isHeader={true}>Date</TableCell>
            <TableCell isHeader={true}>Heure début</TableCell>
            <TableCell isHeader={true}>Heure fin</TableCell>
            <TableCell isHeader={true}>Statut</TableCell>
            <TableCell isHeader={true}>Document</TableCell>
            <TableCell isHeader={true}>Actions</TableCell>
          </ThRow>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id} className="border border-gray-200">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.intitule}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.heure_debut}</TableCell>
                <TableCell>{item.heure_fin}</TableCell>
                <TableCell>
                  <span
                    className={
                      item.status === "en_attente"
                        ? "px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 font-semibold"
                        : item.status === "refuse"
                        ? "px-2 py-1 rounded-full bg-error-50 text-error-700 font-semibold"
                        : item.status === "valide"
                        ? "px-2 py-1 rounded-full bg-success-50 text-success-700 font-semibold"
                        : ""
                    }
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>
                    {
                      downloading ? 
                      <LuLoaderCircle  className="text-xl animate-spin text-brand-500"/> : 
                      <button
                              className=" hover:text-gray-500 flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-200"
                              onClick={() => handleDownload(item.id, item.intitule)}
                              >
                              Télecharger
                              <FaDownload className="h-4 w-4" />
                      </button>
                      }
                </TableCell>
                <TableCell>
                  <div className="flex w-full items-center justify-center gap-2">
                    {item.status === "en_attente" && (
                      <>
                        <button
                          className="text-red-500 hover:text-red-800"
                          onClick={setShow ? () => setShow(item.id) : null}
                        >
                          <FaRegTrashCan className="h-4 w-4" />
                        </button>
                        <Link
                          to={`/stagiaire/demandes/${item.id}/modifier`}
                          className="text-green-500 hover:text-green-800"
                        >
                          <GrEdit className="h-4 w-4" />
                        </Link>
                      </>
                    )}
                  </div>
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
  );
}