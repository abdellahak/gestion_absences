import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FaUpload,
  FaDownload,
  FaFileExcel,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useToast } from "../../../../../../assets/toast/Toast";
import { downloadTemplate, importStagiaires } from "../../../../../../assets/api/admin/stagiaire/stagiaire";

export default function StagiaireImport({ isOpen, onClose, onImportSuccess }) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
        "application/vnd.ms-excel": [".xls"],
        "text/csv": [".csv"],
      },
      maxFiles: 1,
      onDrop: (files) => {
        if (files.length > 0) {
          setUploadResult(null);
        }
      },
    });

  const handleImport = async () => {
    if (acceptedFiles.length === 0) {
      toast("error", "Veuillez sélectionner un fichier");
      return;
    }

    setUploading(true);
    setUploadResult(null);

    try {
      const res = await importStagiaires(acceptedFiles[0]);

      if (res.success) {
        setUploadResult({
          success: true,
          message: res.message,
          errors: [],
        });
        toast("success", res.message);
        onImportSuccess();
      } else {
        setUploadResult({
          success: false,
          message: res.message,
          errors: res.errors || [],
        });
        toast("error", res.message);
      }
    } catch (error) {
      setUploadResult({
        success: false,
        message: "Erreur lors de l'importation",
        errors: [],
      });
      toast("error", "Erreur lors de l'importation");
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const res = await downloadTemplate();
      if (res.success) {
        toast("success", "Template téléchargé avec succès");
      } else {
        toast("error", res.message);
      }
    } catch (error) {
      toast("error", "Erreur lors du téléchargement");
    }
  };

  const handleClose = () => {
    setUploadResult(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-99999">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Importer des stagiaires
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Download Template Section */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium text-blue-800 mb-2">
            Télécharger le template
          </h3>
          <p className="text-blue-600 mb-3 text-sm">
            Téléchargez le template Excel pour voir le format requis et les
            exemples de données.
          </p>
          <button
            onClick={handleDownloadTemplate}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaDownload />
            Télécharger le template
          </button>
        </div>

        {/* Upload Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Sélectionner le fichier
          </h3>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input {...getInputProps()} />
            <FaFileExcel className="mx-auto text-4xl text-green-600 mb-4" />
            {isDragActive ? (
              <p className="text-blue-600">Déposez le fichier ici...</p>
            ) : (
              <>
                <p className="text-gray-600 mb-2">
                  Glissez-déposez votre fichier Excel ici, ou cliquez pour
                  sélectionner
                </p>
                <p className="text-sm text-gray-500">
                  Formats acceptés: .xlsx, .xls, .csv
                </p>
              </>
            )}
          </div>

          {/* Selected File */}
          {acceptedFiles.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <FaFileExcel className="text-green-600" />
                <span className="text-gray-700">{acceptedFiles[0].name}</span>
                <span className="text-sm text-gray-500">
                  ({(acceptedFiles[0].size / 1024).toFixed(1)} KB)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Import Results */}
        {uploadResult && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              uploadResult.success
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {uploadResult.success ? (
                <FaCheckCircle className="text-green-600" />
              ) : (
                <FaExclamationTriangle className="text-red-600" />
              )}
              <span
                className={`font-medium ${
                  uploadResult.success ? "text-green-800" : "text-red-800"
                }`}
              >
                {uploadResult.message}
              </span>
            </div>

            {uploadResult.errors && uploadResult.errors.length > 0 && (
              <div className="mt-3">
                <p className="text-red-700 font-medium mb-2">
                  Erreurs détectées:
                </p>
                <div className="max-h-40 overflow-y-auto">
                  {uploadResult.errors.map((error, index) => (
                    <p key={index} className="text-sm text-red-600 mb-1">
                      • {error}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleImport}
            disabled={acceptedFiles.length === 0 || uploading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <FaUpload />
            {uploading ? "Importation..." : "Importer"}
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Instructions:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • Le fichier doit contenir les colonnes: nom, prenom,
              numero_inscription, code_groupe
            </li>
            <li>
              • Les colonnes optionnelles: email, telephone, cin, sexe,
              date_naissance, lieu_naissance, adresse
            </li>
            <li>
              • Le code_groupe doit correspondre à un groupe existant dans la
              base de données
            </li>
            <li>• Le numéro d'inscription doit être unique</li>
            <li>• Le sexe doit être "Homme" ou "Femme" (si fourni)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
