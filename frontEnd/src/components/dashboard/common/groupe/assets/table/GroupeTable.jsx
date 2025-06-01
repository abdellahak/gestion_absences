import { FaRegTrashCan } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../../../assets/wrapper/AuthWrapper";

export default function GroupeTable({ data, setShow }) {
  const {auth} = useAuth()
  return (
    <>
      {/* table */}
      <div className="overflow-x-auto shadow-sm">
        <Table>
          <thead>
            <ThRow>
              <TableCell isHeader={true}>
                <div className="flex w-full items-center justify-between">
                  Numéro d'ordre
                </div>
              </TableCell>
              <TableCell isHeader={true}>
                <div className="flex w-full items-center justify-between">
                  Code
                </div>
              </TableCell>
              <TableCell isHeader={true}>
                <div className="flex w-full items-center justify-between">
                  Intitulé
                </div>
              </TableCell>
              <TableCell isHeader={true}>
                <div className="flex w-full items-center justify-between">
                  Filière
                </div>
              </TableCell>
              <TableCell isHeader={true}>Actions</TableCell>
            </ThRow>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <tr key={index} className="border border-gray-200">
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.intitule}</TableCell>
                    <TableCell>{item.filiere?.intitule || ""}</TableCell>
                    <TableCell>
                      <div className="flex w-full items-center justify-center gap-2">
                        <button
                          className="text-red-500 hover:text-red-800"
                          onClick={
                            setShow
                              ? () => setShow(item.id)
                              : null
                          }
                        >
                          <FaRegTrashCan className="h-4 w-4" />
                        </button>
                        <Link
                          to={`/${auth.role}/groupes/${item.id}/modifier`}
                          className="text-green-500 hover:text-green-800"
                        >
                          <GrEdit className="h-4 w-4" />
                        </Link>
                      </div>
                    </TableCell>
                  </tr>
                );
              })
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