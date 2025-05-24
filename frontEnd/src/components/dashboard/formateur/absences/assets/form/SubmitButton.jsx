import { FaPlus } from "react-icons/fa";

export default function SubmitButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex items-center justify-center w-full gap-2 p-3 text-sm font-medium transition-colors rounded-lg bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-60"
    >
      <FaPlus />
      {loading ? "Envoi..." : "Enregistrer l'absence"}
    </button>
  );
}