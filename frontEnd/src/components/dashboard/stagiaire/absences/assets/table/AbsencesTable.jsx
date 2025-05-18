import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";

export default function AbsencesTable({ data }) {
  return (
    <>
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
                  Date
                </div>
              </TableCell>
              <TableCell isHeader={true}>
                <div className="flex w-full items-center justify-between">
                  Heure début
                </div>
              </TableCell>
              <TableCell isHeader={true}>
                <div className="flex w-full items-center justify-between">
                  Heure fin
                </div>
              </TableCell>
              <TableCell isHeader={true}>
                <div className="flex w-full items-center justify-between">
                  Motif
                </div>
              </TableCell>
            </ThRow>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id} className="border border-gray-200">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.date_absence}</TableCell>
                  <TableCell>{item.heure_debut}</TableCell>
                  <TableCell>{item.heure_fin}</TableCell>
                  <TableCell>{item.motif}</TableCell>
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