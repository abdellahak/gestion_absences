import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";
import { GrEdit } from "react-icons/gr";
import { Link } from "react-router-dom";



export default function SurveillantGroupeTable({ data }) {
  return (
    <>
      {/* table */}
      <div className="overflow-x-auto shadow-sm">
        <Table>
          <thead>
            <ThRow>
              <TableCell isHeader={true}>
                <div className="flex w-full items-center justify-between">
                  N°
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
               <TableCell isHeader={true}>
                <div className="flex w-full items-center justify-between">
                  Actions
                </div>
              </TableCell>
            </ThRow>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <tr key={index} className="border border-gray-200">
                    <TableCell>{index +1}</TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.intitule}</TableCell>
                    <TableCell>{item.filiere?.intitule || ""}</TableCell>
                    <TableCell>
                        <div className="flex w-full items-center justify-center gap-2">
                        
                        <Link
                            to={`/surveillant/groupes/${item.id}/modifier`}
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