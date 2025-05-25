import { FaRegTrashCan } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../../../assets/wrapper/AuthWrapper";

export default function FormateurAbsencesTable({ data, setShow }) {
  const {auth} = useAuth();
  return (
    <>
      <div className="overflow-x-auto shadow-sm">
        <Table>
          <thead>
            <ThRow>
              <TableCell isHeader={true}>N°</TableCell>
              <TableCell isHeader={true}>Stagiaire</TableCell>
              <TableCell isHeader={true}>Date</TableCell>
              <TableCell isHeader={true}>Heure de début</TableCell>
              <TableCell isHeader={true}>Heure de fin</TableCell>
              <TableCell isHeader={true}>Groupe</TableCell>
              <TableCell isHeader={true}>Actions</TableCell>
            </ThRow>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border border-gray-200">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.stagiaire?.user?.prenom + " " + item.stagiaire?.user?.nom || ""}</TableCell>
                  <TableCell>{item.date_absence}</TableCell>
                  <TableCell>{item?.heure_debut}</TableCell>
                  <TableCell>{item.heure_fin}</TableCell>
                  <TableCell>
                    {item.stagiaire?.groupe?.code || "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex w-full items-center justify-center gap-2">
                      <button
                        className="text-red-500 hover:text-red-800"
                        onClick={setShow ? () => setShow(item.id) : null}
                      >
                        <FaRegTrashCan className="h-4 w-4" />
                      </button>
                      <Link
                        to={`/${auth.role}/stagiaires/${item.id}/modifier`}
                        className="text-green-500 hover:text-green-800"
                      >
                        <GrEdit className="h-4 w-4" />
                      </Link>
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
    </>
  );
}