import { FaDownload, FaEye } from "react-icons/fa6";
import { Table, TableCell, ThRow } from "../../../../../../assets/table/Table";
import { downloadDemandeDocument } from "../../../../../../assets/api/formateur/demandes/demandes";
import { useToast } from "../../../../../../assets/toast/Toast";

export default function FormateurDemandesTable({ data }) {
  const { toast } = useToast();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'en_attente':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full whitespace-nowrap">
            En attente
          </span>
        );
      case 'approuvee':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full  whitespace-nowrap">
            Approuvée
          </span>
        );
      case 'refusee':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full whitespace-nowrap"> 
            Refusée
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full whitespace-nowrap">
            {status}
          </span>
        );
    }
  };

  const handleDownload = async (demandeId, intitule) => {
    try {
      const res = await downloadDemandeDocument(demandeId);
      if (res.success) {
        // Create blob URL and trigger download
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `demande_${intitule}_${demandeId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast("success", "Document téléchargé avec succès");
      } else {
        toast("error", res.error);
      }
    } catch (error) {
      toast("error", "Erreur lors du téléchargement");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatTime = (timeString) => {
    return timeString ? timeString.slice(0, 5) : '';
  };

  return (
    <>
      <div className="overflow-x-auto shadow-sm">
        <Table>
          <thead>
            <ThRow>
              <TableCell isHeader={true}>N°</TableCell>
              <TableCell isHeader={true}>Stagiaire</TableCell>
              <TableCell isHeader={true}>Intitulé</TableCell>
              <TableCell isHeader={true}>Date</TableCell>
              <TableCell isHeader={true}>Horaire</TableCell>
              <TableCell isHeader={true}>Groupe</TableCell>
              <TableCell isHeader={true}>Statut</TableCell>
            </ThRow>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border border-gray-200">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {`${item.stagiaire?.user?.prenom || ''} ${item.stagiaire?.user?.nom || ''}`}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="font-medium">{item.intitule}</div>
                      {item.description && (
                        <div className="text-sm text-gray-500 truncate" title={item.description}>
                          {item.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(item.date)}</TableCell>
                  <TableCell>
                    {`${formatTime(item.heure_debut)} - ${formatTime(item.heure_fin)}`}
                  </TableCell>
                  <TableCell>{item.stagiaire?.groupe?.code || "-"}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </tr>
              ))
            ) : (
              <tr>
                <TableCell colSpan="8" className="text-center py-8 text-gray-500">
                  Aucune demande d'autorisation trouvée
                </TableCell>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}
