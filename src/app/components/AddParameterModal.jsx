import { useState, useEffect } from "react";
import { X, Plus, ChevronDown } from "lucide-react";
import { useTestTypes } from "@/app/contexts/TestTypesContext";

export default function AddParameterModal({
  isOpen,
  onClose,
  onAddParameter,
  testName,
}) {
  const { testTypes } = useTestTypes();
  const currentTestType = testTypes.find((t) => t.name === testName);
  const predefinedParameters = currentTestType?.parameters || [];

  const [selectedParamId, setSelectedParamId] = useState("");

  useEffect(() => {
    if (isOpen) setSelectedParamId("");
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedParam = predefinedParameters.find(
    (p) => p.id === selectedParamId,
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedParam) {
      alert("Please select a parameter");
      return;
    }

    onAddParameter({
      parameter: selectedParam.name,
      result: "",
      unit: selectedParam.unit || "",
      limit: selectedParam.limit || "",
      status: "Pass",
    });

    setSelectedParamId("");
  };

  const handleClose = () => {
    setSelectedParamId("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-2xl max-w-md w-full border border-slate-300 dark:border-slate-600 overflow-hidden">
        {/* Header */}
        <div className="bg-[#1c1f26] p-5 flex items-center justify-between border-b border-slate-600">
          <div className="flex items-center gap-3">
            <div className="bg-[#ffb800] p-2 rounded-lg">
              <Plus className="w-5 h-5 text-gray-900" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Add Parameter
              </h2>
              <p className="text-sm text-gray-500 font-medium">{testName}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:bg-slate-600 p-2 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-grid-pattern">
          {/* Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
              Select a parameter <span className="text-red-500">*</span>
            </label>
            {predefinedParameters.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-200 italic">
                No parameters defined for this test type. Add parameters in
                Settings → Test Types.
              </p>
            ) : (
              <div className="relative">
                <select
                  value={selectedParamId}
                  onChange={(e) => setSelectedParamId(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none text-gray-900 dark:text-gray-200"
                  required
                >
                  <option value="" disabled>
                    Select a parameter...
                  </option>
                  {predefinedParameters.map((param) => (
                    <option key={param.id} value={param.id}>
                      {param.name}
                      {param.unit ? ` (${param.unit})` : ""}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            )}
          </div>

          {/* Auto-populated preview */}
          {selectedParam && (
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4 border border-slate-200 dark:border-slate-600 space-y-3">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-200 uppercase tracking-wide">
                Auto-populated from definition
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-200 mb-1">
                    Unit
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {selectedParam.unit || (
                      <span className="text-gray-500 font-normal italic">
                        —
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-200 mb-1">
                    Limit
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {selectedParam.limit || (
                      <span className="text-gray-500 font-normal italic">
                        —
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2 border-t border-slate-300 dark:border-slate-600 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border-2 border-slate-300 dark:border-slate-600 text-gray-900 dark:text-gray-200 rounded-lg hover:bg-slate-200 transition font-medium bg-white dark:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedParamId}
              className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-gray-900 dark:text-gray-200 rounded-lg hover:bg-[#ffb800] hover:text-gray-900 dark:hover:bg-[#ffb800] dark:hover:text-gray-900 transition font-bold shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add Parameter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
