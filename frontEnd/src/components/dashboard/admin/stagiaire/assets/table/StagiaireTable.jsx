import { FaRegTrashCan } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";
import { Link } from "react-router-dom";

export default function StagiaireTable({ data, setShow }) {
  return (
    <>
      <div className="overflow-x-auto shadow-sm">
        <Table>
          <thead>
            <ThRow>
              <TableCell isHeader={true}>Numéro d'inscription</TableCell>
              <TableCell isHeader={true}>Nom</TableCell>
              <TableCell isHeader={true}>Prenom</TableCell>
              <TableCell isHeader={true}>Email</TableCell>
              <TableCell isHeader={true}>Groupe</TableCell>
              <TableCell isHeader={true}>Actions</TableCell>
            </ThRow>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border border-gray-200">
                  <TableCell>{item.numero_inscription}</TableCell>
                  <TableCell>{item?.user?.nom}</TableCell>
                  <TableCell>{item.user?.prenom}</TableCell>
                  <TableCell>{item.user?.email}</TableCell>
                  <TableCell>
                    {item.groupe?.intitule || item.groupe_id || ""}
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
                        to={`/admin/stagiaires/${item.id}/modifier`}
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