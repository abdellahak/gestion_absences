import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";
import { useToast } from "../../../../../../assets/toast/Toast";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { LuLoaderCircle } from "react-icons/lu";
import { download } from "../../../../../../assets/api/stagiaires/justification/justification";
import { FaRegTrashCan } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { Link } from "react-router-dom";
import { FaSort } from "react-icons/fa6";

export default function JustificationTable({ data, setShow, sortStatus, setSortStatus }) {
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

  return (
    <div className="overflow-x-auto shadow-sm">
      <Table>
        <thead>
          <ThRow>
            <TableCell isHeader={true}>N°</TableCell>
            <TableCell isHeader={true}>Surveillant Général</TableCell>
            <TableCell isHeader={true}>Intitulé</TableCell>
            <TableCell isHeader={true}>Document</TableCell>
            <TableCell isHeader={true}>
              <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setSortStatus(sortStatus === "valide" ? "en_attente" : "valide")}
                title="Trier par statut"
              >
                Statut
                <FaSort
                  className={`text-gray-400 transition-transform ${
                    sortStatus === "valide" ? "rotate-0" : "rotate-180"
                  }`}
                />
              </div>
            </TableCell>
            {data.some(item => item.status === "en_attente") && (
              <TableCell isHeader={true}>Actions</TableCell>
            )}
          </ThRow>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={`${item.id}-${index}`} className="border border-gray-200">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {item.surveillant_general && item.surveillant_general.user
                    ? item.surveillant_general.user.nom
                    : "-"}
                </TableCell>
                <TableCell>{item.intitule}</TableCell>
                <TableCell>
                  {downloadingId === item.id ? (
                    <div className="flex items-center justify-center h-10">
                      <LuLoaderCircle className="text-xl animate-spin text-brand-500" />
                    </div>
                  ) : (
                    <button
                      className="hover:text-gray-500 flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-200"
                      onClick={() => handleDownload(item.id, item.intitule)}
                    >
                      Télecharger
                      <FaDownload className="h-4 w-4" />
                    </button>
                  )}
                </TableCell>
                <TableCell className="text-center align-middle">
                  <div className="flex justify-center items-center h-full w-full">
                    <span
                      className={
                        item.status === "en_attente"
                          ? "px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 font-semibold"
                          : item.status === "refuse"
                          ? "px-2 py-1 rounded-full bg-error-50 text-error-700 font-semibold"
                          : item.status === "valide"
                          ? "px-2 py-1 rounded-full bg-success-50 text-success-700 font-semibold"
                          : "px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold"
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                </TableCell>
                {item.status === "en_attente" && ( 
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
                  
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-12 text-lg">
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