import { FaRegTrashCan } from "react-icons/fa6";
import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";
import { useAuth } from "../../../../../../assets/wrapper/AuthWrapper";

export default function FormateurAbsencesTable({ data, setShow }) {
  const { auth } = useAuth();
  const isToday = (dateString) => {
    const today = new Date();
    const absenceDate = new Date(dateString);
    return today.toDateString() === absenceDate.toDateString();
  };

  const getStatusInfo = (item) => {
    if (!item.justification) {
      return {
        text: "Non justifiée",
        bgColor: "bg-gray-50",
        textColor: "text-gray-600",
      };
    }

    const status = item.justification.status;
    switch (status) {
      case "valide":
        return {
          text: "Validé",
          bgColor: "bg-green-50",
          textColor: "text-green-700",
        };
      case "refuse":
        return {
          text: "Refusé",
          bgColor: "bg-red-50",
          textColor: "text-red-700",
        };
      case "en_attente":
      default:
        return {
          text: "En attente",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700",
        };
    }
  };
  return (
    <>
      <div className="overflow-x-auto shadow-sm">
        <Table>
          <thead>
            {" "}
            <ThRow>
              <TableCell isHeader={true}>N°</TableCell>
              <TableCell isHeader={true}>Stagiaire</TableCell>
              <TableCell isHeader={true}>Date</TableCell>
              <TableCell isHeader={true}>Heure de début</TableCell>
              <TableCell isHeader={true}>Heure de fin</TableCell>
              <TableCell isHeader={true}>Groupe</TableCell>
              <TableCell isHeader={true}>Statut</TableCell>
              <TableCell isHeader={true}>Actions</TableCell>
            </ThRow>{" "}
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => {
                const statusInfo = getStatusInfo(item);
                return (
                  <tr
                    key={index}
                    className={`border border-gray-200 ${statusInfo.bgColor}`}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {item.stagiaire?.user?.prenom +
                        " " +
                        item.stagiaire?.user?.nom || ""}
                    </TableCell>
                    <TableCell>{item.date_absence}</TableCell>
                    <TableCell>{item?.heure_debut}</TableCell>
                    <TableCell>{item.heure_fin}</TableCell>
                    <TableCell>{item.stagiaire?.groupe?.code || "-"}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.textColor} ${statusInfo.bgColor} border border-current border-opacity-20`}
                      >
                        {statusInfo.text}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex w-full items-center justify-center gap-2">
                        {isToday(item.date_absence) ? (
                          <button
                            className="text-red-500 hover:text-red-800"
                            onClick={setShow ? () => setShow(item.id) : null}
                          >
                            <FaRegTrashCan className="h-4 w-4" />
                          </button>
                        ) : (
                          <span className="text-gray-400 cursor-not-allowed">
                            <FaRegTrashCan className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-12 text-lg ">
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
