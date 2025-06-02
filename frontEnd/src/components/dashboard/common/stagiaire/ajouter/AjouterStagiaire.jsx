import { useState } from "react";
import { FaPlus, FaFileImport } from "react-icons/fa";
import Stagiaire from "../assets/form/Stagiaire";
import StagiaireImport from "../assets/import/StagiaireImport";

export default function AjouterStagiaire() {
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);

  const handleImportSuccess = () => {
    setShowImport(false);
    // Optionally refresh the page or show a success message
  };

  if (showForm) {
    return (
      <>
        <title>Ajouter un stagiaire</title>
        <div className="p-4 md:p-6 max-w-[1200px] xl:mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setShowForm(false)}
              className="text-blue-600 hover:text-blue-800 transition-colors mb-4"
            >
              ← Retour aux options
            </button>
          </div>
          <Stagiaire />
        </div>
      </>
    );
  }

  return (
    <>
      <title>Ajouter des stagiaires</title>
      <div className="p-4 md:p-6 max-w-[1200px] xl:mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Ajouter des stagiaires
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Individual Addition Card */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPlus className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Ajouter individuellement
              </h3>
              <p className="text-gray-600 mb-6">
                Ajoutez un stagiaire en remplissant le formulaire manuellement
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Commencer
              </button>
            </div>
          </div>

          {/* Excel Import Card */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaFileImport className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Importer depuis Excel
              </h3>
              <p className="text-gray-600 mb-6">
                Importez plusieurs stagiaires en une fois à partir d'un fichier Excel
              </p>
              <button
                onClick={() => setShowImport(true)}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Importer
              </button>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6 max-w-4xl">
          <h4 className="font-semibold text-gray-800 mb-4">Fonctionnalités disponibles :</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Ajout individuel :</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Formulaire guidé étape par étape</li>
                <li>• Validation en temps réel</li>
                <li>• Gestion des erreurs détaillée</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Import Excel :</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ajout en masse de stagiaires</li>
                <li>• Template téléchargeable</li>
                <li>• Validation et rapport d'erreurs</li>
                <li>• Support .xlsx, .xls, .csv</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      <StagiaireImport
        isOpen={showImport}
        onClose={() => setShowImport(false)}
        onImportSuccess={handleImportSuccess}
      />
    </>
  );
}
