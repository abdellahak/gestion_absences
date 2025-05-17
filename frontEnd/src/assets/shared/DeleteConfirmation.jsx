import ReactDOM from "react-dom";
import { FaTrash } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function DeleteConfirmation({
  setShow,
  action,
  handleDelete,
  text,
}) {
  return (
    <>
      {ReactDOM.createPortal(
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md mx-4 overflow-hidden rounded-xl bg-white shadow-theme-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error-50 mb-6">
                <FaTrash className="h-6 w-6 text-error-500" />
              </div>

              <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
                Confirmer la suppression
              </h2>

              <p className="text-center text-gray-600 mb-4">
                Voulez-vous vraiment supprimer{" "}
                <span className="font-semibold text-gray-800">{text}</span> ?
              </p>

              <div className="bg-warning-50 border border-warning-100 rounded-lg p-3 mb-6">
                <p className="text-sm text-warning-700 text-center">
                  Cette action est irréversible et les données ne pourront pas
                  être récupérées.
                </p>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-center gap-3 mt-6">
                <button
                  onClick={() => setShow(action)}
                  className="inline-flex justify-center items-center px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-all duration-300"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex justify-center items-center px-5 py-2.5 rounded-lg bg-error-600 text-white font-medium shadow-sm hover:bg-error-700 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2 transition-all duration-300"
                >
                  Confirmer la suppression
                </button>
              </div>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </>
  );
}
