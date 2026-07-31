import { useState } from "react";
import { X } from "lucide-react";
import dayjs from "dayjs";

const matrixOptions = [
  "Drinking Water",
  "Waste Water",
  "Surface Water",
  "Ground Water",
  "Industrial Effluent",
  "Process Water",
  "Raw Water",
  "Industrial Water",
];

export default function AddSampleModal({ onClose, onAdd }) {
  // --- form state ---
  const [sampleTypeId] = useState(1); // fixed in 1 for current phrase
  const [sampleClientId, setSampleClientId] = useState("");

  // Date & Time
  const [sampledDate, setSampledDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [sampledTime, setSampledTime] = useState(dayjs().format("HH:mm"));

  // Sampling Point
  const [samplingPointSelect, setSamplingPointSelect] = useState("Inlet");
  const [samplingPointCustom, setSamplingPointCustom] = useState("");

  const [matrix, setMatrix] = useState("Drinking Water");
  const [numberOfContainers, setNumberOfContainers] = useState(1);
  const [initialVolume, setInitialVolume] = useState(500);

  // (1 = Yes, 0 = No)
  const [isFiltered, setIsFiltered] = useState(0);
  const [isPreserved, setIsPreserved] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();

    // deal with Sampling Point
    const finalSamplingPoint =
      samplingPointSelect === "Custom..."
        ? samplingPointCustom.trim() || "Custom"
        : samplingPointSelect;

    // time format (YYYY-MM-DD HH:mm:ss)
    const formattedSampledTime = dayjs(`${sampledDate} ${sampledTime}`).format(
      "YYYY-MM-DD HH:mm:ss",
    );

    // 3. calc isFilteredAndPreserved
    const isFilteredAndPreserved =
      isFiltered === 1 && isPreserved === 1 ? 1 : 0;

    // 4. assembly Payload
    const payload = {
      sampleTypeId: sampleTypeId,
      sampleClientId: sampleClientId,
      sampledTime: formattedSampledTime,
      samplingPoint: finalSamplingPoint,
      matrix: matrix,
      numberOfContainers: parseInt(numberOfContainers, 10) || 1,
      remarks: "", // default by ""
      initialVolume: parseFloat(initialVolume) || 0,
      remainingVolume: parseFloat(initialVolume) || 0, // equals initialVolume
      isFiltered: isFiltered,
      isPreserved: isPreserved,
      isFilteredAndPreserved: isFilteredAndPreserved,
    };

    onAdd(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full shadow-2xl border border-slate-300 dark:border-slate-600 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#1c1f26] border-b border-slate-600 p-6 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Add New Sample
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-600 rounded-lg transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="overflow-y-auto p-6 bg-grid-pattern">
          <form
            id="add-sample-form"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sample Type (Fixed) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Sample Type *
                </label>
                <select
                  value={sampleTypeId}
                  disabled
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-slate-400 cursor-not-allowed"
                >
                  <option value={1}>Water</option>
                </select>
              </div>

              {/* Sample Client ID */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Sample Client ID *
                </label>
                <input
                  type="text"
                  value={sampleClientId}
                  onChange={e => setSampleClientId(e.target.value)}
                  placeholder="e.g. S_DW_03"
                  className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              {/* Sampled Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Sampled Date *
                </label>
                <input
                  type="date"
                  value={sampledDate}
                  onChange={e => setSampledDate(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 [color-scheme:light] dark:[color-scheme:dark]"
                  required
                />
              </div>

              {/* Sampled Time */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Sampled Time *
                </label>
                <input
                  type="time"
                  value={sampledTime}
                  onChange={e => setSampledTime(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 [color-scheme:light] dark:[color-scheme:dark]"
                  required
                />
              </div>

              {/* Sampling Point */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Sampling Point *
                </label>
                <select
                  value={samplingPointSelect}
                  onChange={e => {
                    setSamplingPointSelect(e.target.value);
                    if (e.target.value !== "Custom...") {
                      setSamplingPointCustom("");
                    }
                  }}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100"
                  required
                >
                  <option value="Inlet">Inlet</option>
                  <option value="Outlet">Outlet</option>
                  <option value="Custom...">Custom...</option>
                </select>

                {/* Custom Sampling Point Input */}
                {samplingPointSelect === "Custom..." && (
                  <input
                    type="text"
                    value={samplingPointCustom}
                    onChange={e => setSamplingPointCustom(e.target.value)}
                    placeholder="Enter custom sampling point"
                    className="w-full mt-2 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 animate-in fade-in slide-in-from-top-2"
                    required
                    autoFocus
                  />
                )}
              </div>

              {/* Matrix */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Matrix *
                </label>
                <select
                  value={matrix}
                  onChange={e => setMatrix(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100"
                  required
                >
                  {matrixOptions.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Number of Containers */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Number of Containers *
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={numberOfContainers}
                  onChange={e => setNumberOfContainers(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              {/* Initial Volume */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Initial Volume (mL) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={initialVolume}
                  onChange={e => setInitialVolume(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              {/* Is Filtered */}
              <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Is Filtered?
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isFiltered"
                      checked={isFiltered === 1}
                      onChange={() => setIsFiltered(1)}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                    <span className="text-slate-900 dark:text-slate-100">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isFiltered"
                      checked={isFiltered === 0}
                      onChange={() => setIsFiltered(0)}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                    <span className="text-slate-900 dark:text-slate-100">
                      No
                    </span>
                  </label>
                </div>
              </div>

              {/* Is Preserved */}
              <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                  Is Preserved?
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isPreserved"
                      checked={isPreserved === 1}
                      onChange={() => setIsPreserved(1)}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                    <span className="text-slate-900 dark:text-slate-100">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isPreserved"
                      checked={isPreserved === 0}
                      onChange={() => setIsPreserved(0)}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                    <span className="text-slate-900 dark:text-slate-100">
                      No
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Actions (Footer) */}
        <div className="p-6 border-t border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 shrink-0 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition font-medium bg-white dark:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-sample-form"
            className="flex-1 px-4 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition font-bold shadow-md"
          >
            Add Sample
          </button>
        </div>
      </div>
    </div>
  );
}
