import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";

export default function FormateurGroupesTable({ data }) {
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