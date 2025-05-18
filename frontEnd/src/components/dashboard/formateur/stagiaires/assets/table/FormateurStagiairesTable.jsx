import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";

export default function FormateurStagiairesTable({ data }) {
  return (
    <>
      <div className="overflow-x-auto shadow-sm">
        <Table>
          <thead>
            <ThRow>
              <TableCell isHeader={true}>N°</TableCell>
              <TableCell isHeader={true}>Nom</TableCell>
              <TableCell isHeader={true}>Prénom</TableCell>
              <TableCell isHeader={true}>Email</TableCell>
              <TableCell isHeader={true}>Numéro d'inscription</TableCell>
            </ThRow>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border border-gray-200">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.user?.nom}</TableCell>
                  <TableCell>{item.user?.prenom}</TableCell>
                  <TableCell>{item.user?.email}</TableCell>
                  <TableCell>{item.numero_inscription}</TableCell>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-12 text-lg">
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