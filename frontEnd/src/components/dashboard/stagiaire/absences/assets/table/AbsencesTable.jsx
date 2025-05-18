import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";

export default function AbsencesTable({ data }) {
  return (
    <div className="overflow-x-auto shadow-sm">
      <Table>
        <thead>
          <ThRow>
            <TableCell isHeader={true}>N°</TableCell>
            <TableCell isHeader={true}>Date</TableCell>
            <TableCell isHeader={true}>Heure début</TableCell>
            <TableCell isHeader={true}>Heure fin</TableCell>
            <TableCell isHeader={true}>Formateur</TableCell>
            <TableCell isHeader={true}>Justification</TableCell>
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
                <TableCell>
                  {item.formateur?.user
                    ? `${item.formateur.user.nom} ${item.formateur.user.prenom}`
                    : "-"}
                </TableCell>
                <TableCell>
                  {item.justifications?.length
                    ? item.justifications
                        .map(j => j.intitule)
                        .join(", ")
                    : "-"}
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