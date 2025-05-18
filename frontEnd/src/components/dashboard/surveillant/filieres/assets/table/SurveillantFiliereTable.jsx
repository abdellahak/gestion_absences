import { GrEdit } from "react-icons/gr";
import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";
import { Link } from "react-router-dom";


export default function SurveillantFiliereTable({ data }) {
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
                <div
                  className="flex w-full items-center justify-between"
                >
                  Code
                </div>
              </TableCell>
              <TableCell isHeader={true}>
                <div
                  className="flex w-full items-center justify-between"
                >
                  Intitule
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

                    {/* new actions column */}
                    <TableCell>
                      <div className="flex w-full items-center justify-center gap-2">
                       
                        <Link
                          to={`/surveillant/filieres/${item.id}/modifier`}
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
                    {/* <img
                      src="/assets/images/empty.png"
                      alt="empty"
                      className="h-24 w-24"
                    /> */}
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
