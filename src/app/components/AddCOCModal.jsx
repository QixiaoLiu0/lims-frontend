import { X, Plus, Trash2, Calendar, User, FileText, Clock } from "lucide-react";
import { useAddCOCForm, matrixs } from "@/app/hooks/useAddCOCForm";

const sampleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AddCOCModal({ onAdd, onClose }) {
  const {
    testTypesForCocCreation, // [new]
    isSubmitting, // [new]
    totalContainers, // [new]
    receiver,
    setReceiver,
    relinquisher,
    setRelinquisher,
    cocNumberInput,
    setCocNumberInput,
    clientName,
    setClientName,
    projectName,
    setProjectName,
    dateRequired,
    setDateRequired,
    reportName,
    setReportName,
    reportEmail,
    setReportEmail,
    rushRequest,
    setRushRequest,
    rushRequestDate,
    setRushRequestDate,
    relinquishedTime,
    setRelinquishedTime,
    receivedTime,
    setReceivedTime,
    totalBottles,
    setTotalBottles,
    samples,
    addSample,
    removeSample,
    updateSample,
    toggleTest,
    handleSubmit,
  } = useAddCOCForm(onAdd, onClose);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-700 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-slate-300 dark:border-slate-600">
        {/* Header */}
        <div className="sticky top-0 bg-[#1c1f26] backdrop-blur-sm border-b border-slate-600 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Create New COC
            </h2>
            <p className="text-sm text-slate-300 font-medium mt-1">
              Enter COC details and add samples. Tests can be assigned now or
              later.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-600 rounded-lg transition text-white hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(95vh-140px)] bg-grid-pattern"
        >
          <div className="p-6 space-y-8">
            {/* Section 1: COC General Information */}
            <div className="bg-[#C0D0DF] dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-600">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                COC General Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* COC Number */}
                <div className="md:col-span-2">
                  <label className="text-base font-medium text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    COC Number *
                  </label>
                  <input
                    type="text"
                    value={cocNumberInput}
                    onChange={e => setCocNumberInput(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-500 font-mono"
                    placeholder="Enter coc number"
                    required
                  />
                </div>

                {/* Client Name */}
                <div>
                  <label className="text-base font-medium text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-500"
                    placeholder="Enter client name"
                    required
                  />
                </div>

                {/* Project Name */}
                <div>
                  <label className="flex text-base font-medium text-slate-700 dark:text-slate-200 mb-2 items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-500"
                    placeholder="Enter project name"
                  />
                </div>

                {/* Receiver */}
                <div>
                  <label className="flex text-base font-medium text-slate-700 dark:text-slate-200 mb-2 items-center gap-2">
                    <User className="w-4 h-4" />
                    Receiver
                  </label>
                  <input
                    type="text"
                    value={receiver}
                    onChange={e => setReceiver(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100"
                    required
                    placeholder="Enter receiver name"
                  />
                </div>

                {/* Received Time */}
                <div>
                  <label className="text-base font-medium text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Received Time
                  </label>
                  <input
                    type="datetime-local"
                    value={receivedTime}
                    onChange={e => setReceivedTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100"
                  />
                </div>

                {/* Report Name */}
                <div>
                  <label className="text-base font-medium text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Report Name
                  </label>
                  <input
                    type="text"
                    value={reportName}
                    onChange={e => setReportName(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-500"
                    placeholder="Name for report recipient"
                  />
                </div>

                {/* Report Email */}
                <div>
                  <label className="text-base font-medium text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Report Email
                  </label>
                  <input
                    type="email"
                    value={reportEmail}
                    onChange={e => setReportEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-500"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Rush Request + datetime fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Rush Request */}
                <div>
                  <label className="block text-base font-medium text-slate-700 dark:text-slate-200 mb-2">
                    Rush Request
                  </label>
                  <div className="flex items-center gap-6 px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rushRequest"
                        value="yes"
                        checked={rushRequest === true}
                        onChange={() => setRushRequest(true)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-slate-900 dark:text-slate-100">
                        Yes
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rushRequest"
                        value="no"
                        checked={rushRequest === false}
                        onChange={() => {
                          setRushRequest(false);
                          setRushRequestDate("");
                        }}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-slate-900 dark:text-slate-100">
                        No
                      </span>
                    </label>
                  </div>
                </div>

                {/* Rush Request Date */}
                {rushRequest && (
                  <div>
                    <label className="text-base font-medium text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Rush Request Date *
                    </label>
                    <input
                      type="date"
                      value={rushRequestDate}
                      onChange={e => setRushRequestDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100"
                      required={rushRequest}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Relinquished */}
                <div>
                  <label className="text-base font-medium text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Relinquished Time
                  </label>
                  <input
                    type="datetime-local"
                    value={relinquishedTime}
                    onChange={e => setRelinquishedTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100"
                  />
                </div>

                {/* Date Required */}
                <div>
                  <label className="text-base font-medium text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date Required
                  </label>
                  <input
                    type="date"
                    value={dateRequired}
                    onChange={e => setDateRequired(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100"
                    required
                  />
                </div>

                {/* Relinquisher */}
                <div>
                  <label className="flex text-base font-medium text-slate-700 dark:text-slate-200 mb-2 items-center gap-2">
                    <User className="w-4 h-4" />
                    Relinquisher
                  </label>
                  <input
                    type="text"
                    value={relinquisher}
                    onChange={e => setRelinquisher(e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100"
                    required
                    placeholder="Enter relinquisher name"
                  />
                </div>

                {/* Total # of Containers */}
                <div>
                  <label className="text-base font-medium text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Total # of Containers
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={totalContainers}
                    onChange={e =>
                      setTotalBottles(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-500"
                    placeholder="Enter total number of containers"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Samples & Tests Matrix */}
            <div className="bg-[#C0D0DF] dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Samples & Test Assignment
                </h3>
                <button
                  type="button"
                  onClick={addSample}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-slate-700 dark:text-slate-300 rounded-lg transition flex items-center gap-2 font-medium shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add Sample
                </button>
              </div>

              {samples.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-400 rounded-lg bg-white dark:bg-slate-700">
                  <Plus className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-600 mb-4">No samples added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {samples.map((sample, index) => (
                    <div
                      key={sample.id}
                      className="bg-white dark:bg-slate-700 rounded-lg p-5 border border-slate-300 dark:border-slate-600 hover:border-blue-400 transition shadow-md"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                            {sampleLetters[index % 26]}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                              Sample {index + 1}
                            </h4>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSample(sample.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                          title="Remove sample"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {/* Sample Client ID — manual entry */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            Sample Client ID *
                          </label>
                          <input
                            type="text"
                            value={sample.sampleClientId}
                            onChange={e =>
                              updateSample(
                                sample.id,
                                "sampleClientId",
                                e.target.value,
                              )
                            }
                            placeholder="Optional custom ID"
                            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-base font-mono"
                          />
                        </div>
                        {/* Sample Type */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            Sample Type *
                          </label>
                          <select
                            value={sample.sampleType}
                            onChange={e =>
                              updateSample(
                                sample.id,
                                "sampleType",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-base"
                            required
                          >
                            <option value="Water">Water</option>
                          </select>
                        </div>

                        {/* Matrix */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            Matrix *
                          </label>
                          <select
                            value={sample.matrix}
                            onChange={e =>
                              updateSample(sample.id, "matrix", e.target.value)
                            }
                            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-base"
                            required
                          >
                            {matrixs.map(type => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Sampling Point */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            Sampling Point *
                          </label>
                          <select
                            value={sample.samplingPoint}
                            onChange={e =>
                              updateSample(
                                sample.id,
                                "samplingPoint",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-base"
                            required
                          >
                            <option value="Inlet">Inlet</option>
                            <option value="Outlet">Outlet</option>
                            <option value="Custom">Custom…</option>
                          </select>
                          {sample.samplingPoint === "Custom" && (
                            <input
                              type="text"
                              value={sample.customSamplingPoint}
                              onChange={e =>
                                updateSample(
                                  sample.id,
                                  "customSamplingPoint",
                                  e.target.value,
                                )
                              }
                              placeholder="Enter custom sampling Point"
                              className="w-full mt-2 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-base"
                              required
                              autoFocus
                            />
                          )}
                        </div>
                        {/* Collection Date */}
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Collection Date *
                          </label>
                          <input
                            type="date"
                            value={sample.collectionDate}
                            onChange={e =>
                              updateSample(
                                sample.id,
                                "collectionDate",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-base"
                            required
                          />
                        </div>

                        {/* Collection Time */}
                        <div>
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Collection Time *
                          </label>
                          <input
                            type="time"
                            value={sample.collectionTime}
                            onChange={e =>
                              updateSample(
                                sample.id,
                                "collectionTime",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-base"
                            required
                          />
                        </div>

                        {/* Initial Volume */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            Initial Volume *
                          </label>
                          <input
                            type="number"
                            value={sample.initialVolume}
                            onChange={e =>
                              updateSample(
                                sample.id,
                                "initialVolume",
                                e.target.value,
                              )
                            }
                            placeholder="unit: ml"
                            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-base font-mono"
                          />
                        </div>

                        {/* Number of Containers */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            # of Containers
                          </label>
                          <input
                            type="number"
                            value={sample.numberOfContainers}
                            onChange={e =>
                              updateSample(
                                sample.id,
                                "numberOfContainers",
                                e.target.value,
                              )
                            }
                            className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-base font-mono"
                          />
                        </div>
                      </div>

                      {/* Filter & Preserved */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Filtered */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            Filtered
                          </label>
                          <div className="flex items-center gap-6 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`filtered-${sample.id}`}
                                checked={sample.filtered === true}
                                onChange={() =>
                                  updateSample(sample.id, "filtered", true)
                                }
                                className="w-4 h-4 accent-blue-600"
                              />
                              <span className="text-slate-900 dark:text-slate-100 text-sm">
                                Yes
                              </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`filtered-${sample.id}`}
                                checked={sample.filtered === false}
                                onChange={() =>
                                  updateSample(sample.id, "filtered", false)
                                }
                                className="w-4 h-4 accent-blue-600"
                              />
                              <span className="text-slate-900 dark:text-slate-100 text-sm">
                                No
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Preserved */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            Preserved
                          </label>
                          <div className="flex items-center gap-6 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`preserved-${sample.id}`}
                                checked={sample.preserved === true}
                                onChange={() =>
                                  updateSample(sample.id, "preserved", true)
                                }
                                className="w-4 h-4 accent-blue-600"
                              />
                              <span className="text-slate-900 dark:text-slate-100 text-sm">
                                Yes
                              </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`preserved-${sample.id}`}
                                checked={sample.preserved === false}
                                onChange={() =>
                                  updateSample(sample.id, "preserved", false)
                                }
                                className="w-4 h-4 accent-blue-600"
                              />
                              <span className="text-slate-900 dark:text-slate-100 text-sm">
                                No
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Test Assignment */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-3">
                          Assign Tests (Optional){" "}
                          <span className="text-slate-500">
                            ({sample.selectedTests.length} selected)
                          </span>
                        </label>
                        <p className="text-sm text-slate-500 mb-2">
                          Tests can be added later from the sample details page
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {testTypesForCocCreation.map(test => (
                            <button
                              key={test.testTypeId}
                              type="button"
                              onClick={() =>
                                toggleTest(sample.id, test.testTypeId)
                              }
                              className={`px-4 py-2 rounded-lg border-2 transition font-medium text-base ${
                                sample.selectedTests.includes(test.testTypeId)
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:border-blue-400"
                              }`}
                            >
                              {test.typeName}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Action Footer */}
          <div className="sticky bottom-0 bg-white dark:bg-slate-700 backdrop-blur-sm border-t border-slate-300 dark:border-slate-600 p-6 flex items-center justify-between">
            <div className="text-base text-slate-600">
              {samples.length > 0 ? (
                <span>
                  {samples.length} sample{samples.length !== 1 ? "s" : ""} •{" "}
                  {samples.reduce((sum, s) => sum + s.selectedTests.length, 0)}{" "}
                  total test
                  {samples.reduce(
                    (sum, s) => sum + s.selectedTests.length,
                    0,
                  ) !== 1
                    ? "s"
                    : ""}
                </span>
              ) : (
                <span>Add samples to continue</span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-200 transition font-medium bg-white dark:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-[#ffb800] hover:text-slate-900 dark:hover:bg-[#ffb800] dark:hover:text-slate-900 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                Create COC & Samples
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
