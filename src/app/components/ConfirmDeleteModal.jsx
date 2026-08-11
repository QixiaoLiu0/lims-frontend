import { X, AlertTriangle } from "lucide-react";

export default function ConfirmDeleteModal({
  title,
  message,
  itemName,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-700 rounded-xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-300 dark:border-slate-600">
        {/* Header */}
        <div className="border-b border-slate-600 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {title}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-600 rounded-lg transition text-white hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 bg-grid-pattern">
          <p className="text-gray-900 dark:text-gray-200 mb-4">{message}</p>
          {itemName && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-800 dark:text-red-400 font-medium">
                {itemName}
              </p>
            </div>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-200">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-300 dark:border-slate-600 p-6 flex gap-3 justify-end mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border-2 border-slate-300 dark:border-slate-600 text-gray-900 dark:text-gray-200 rounded-lg hover:bg-slate-200 transition font-medium bg-white dark:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-bold shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
