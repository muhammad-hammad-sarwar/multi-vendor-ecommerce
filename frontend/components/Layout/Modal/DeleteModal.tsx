import { FiTrash2 } from "react-icons/fi";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

export default function DeleteModal({
  handleDelete,
  handleCancel,
  loading,
  text,
}) {
  return (
    <div
      onClick={handleCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <FiTrash2 className="text-red-600 text-xl" />
          </div>

          <div>
            <h2 className="text-xl font-semibold capitalize">Delete {text}</h2>

            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <p className="mt-6 text-gray-700 leading-relaxed">
          Are you sure you want to permanently delete this {text}? Once deleted,
          it cannot be recovered.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="cursor-pointer rounded-lg border px-5 py-2 font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="cursor-pointer rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70 capitalize"
          >
            {loading ? <ButtonLoader /> : `Delete ${text}`}
          </button>
        </div>
      </div>
    </div>
  );
}
