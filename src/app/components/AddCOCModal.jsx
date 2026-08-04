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
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 dark:bg-slate-950 backdrop-blur-sm border-b border-slate-800 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-tight">
              Create New COC
            </h2>
            <p className="text-sm text-slate-400 font-medium mt-1 leading-tight">
              Enter COC details and add samples. Tests can be assigned now or
              later.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(95vh-140px)] bg-grid-pattern"
        >
          <div className="p-6 space-y-6">
            {/* Section 1: COC General Information */}
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-5 flex items-center gap-2 leading-tight">
                <FileText className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                COC General Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* COC Number */}
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5 leading-tight">
                    <FileText className="w-3.5 h-3.5" />
                    COC Number *
                  </label>
                  <input
                    type="text"
                    value={cocNumberInput}
                    onChange={e => setCocNumberInput(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-mono text-sm transition-colors"
                    placeholder="Enter coc number"
                    required
                  />
                </div>

                {/* Client Name */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5 leading-tight">
                    <User className="w-3.5 h-3.5" />
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-colors"
                    placeholder="Enter client name"
                    required
                  />
                </div>

                {/* Project Name */}
                <div>
                  <label className="flex text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 items-center gap-1.5 leading-tight">
                    <FileText className="w-3.5 h-3.5" />
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-colors"
                    placeholder="Enter project name"
                  />
                </div>

                {/* Receiver */}
                <div>
                  <label className="flex text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 items-center gap-1.5 leading-tight">
                    <User className="w-3.5 h-3.5" />
                    Receiver
                  </label>
                  <input
                    type="text"
                    value={receiver}
                    onChange={e => setReceiver(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-colors"
                    required
                    placeholder="Enter receiver name"
                  />
                </div>

                {/* Received Time */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5 leading-tight">
                    <Clock className="w-3.5 h-3.5" />
                    Received Time
                  </label>
                  <input
                    type="datetime-local"
                    value={receivedTime}
                    onChange={e => setReceivedTime(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm transition-colors"
                  />
                </div>

                {/* Report Name */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5 leading-tight">
                    <User className="w-3.5 h-3.5" />
                    Report Name
                  </label>
                  <input
                    type="text"
                    value={reportName}
                    onChange={e => setReportName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-colors"
                    placeholder="Name for report recipient"
                  />
                </div>

                {/* Report Email */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5 leading-tight">
                    <FileText className="w-3.5 h-3.5" />
                    Report Email
                  </label>
                  <input
                    type="email"
                    value={reportEmail}
                    onChange={e => setReportEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Rush Request + datetime fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                {/* Rush Request */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
                    Rush Request
                  </label>
                  <div className="flex items-center gap-6 px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg transition-colors">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="rushRequest"
                        value="yes"
                        checked={rushRequest === true}
                        onChange={() => setRushRequest(true)}
                        className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                        Yes
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="rushRequest"
                        value="no"
                        checked={rushRequest === false}
                        onChange={() => {
                          setRushRequest(false);
                          setRushRequestDate("");
                        }}
                        className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                        No
                      </span>
                    </label>
                  </div>
                </div>

                {/* Rush Request Date */}
                {rushRequest && (
                  <div>
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5 leading-tight">
                      <Calendar className="w-3.5 h-3.5" />
                      Rush Request Date *
                    </label>
                    <input
                      type="date"
                      value={rushRequestDate}
                      onChange={e => setRushRequestDate(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm transition-colors"
                      required={rushRequest}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                {/* Relinquished */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5 leading-tight">
                    <Clock className="w-3.5 h-3.5" />
                    Relinquished Time
                  </label>
                  <input
                    type="datetime-local"
                    value={relinquishedTime}
                    onChange={e => setRelinquishedTime(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm transition-colors"
                  />
                </div>

                {/* Date Required */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5 leading-tight">
                    <Calendar className="w-3.5 h-3.5" />
                    Date Required
                  </label>
                  <input
                    type="date"
                    value={dateRequired}
                    onChange={e => setDateRequired(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm transition-colors"
                    required
                  />
                </div>

                {/* Relinquisher */}
                <div>
                  <label className="flex text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 items-center gap-1.5 leading-tight">
                    <User className="w-3.5 h-3.5" />
                    Relinquisher
                  </label>
                  <input
                    type="text"
                    value={relinquisher}
                    onChange={e => setRelinquisher(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm transition-colors placeholder-slate-400 dark:placeholder-slate-500"
                    required
                    placeholder="Enter relinquisher name"
                  />
                </div>

                {/* Total # of Containers */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5 leading-tight">
                    <FileText className="w-3.5 h-3.5" />
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
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-colors"
                    placeholder="Enter total number of containers"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Samples & Tests Matrix */}
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2 leading-tight">
                  <Plus className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  Samples & Test Assignment
                </h3>
                <button
                  type="button"
                  onClick={addSample}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-slate-700 dark:text-slate-200 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm border border-slate-300 dark:border-slate-600 hover:border-transparent"
                >
                  <Plus className="w-4 h-4" />
                  Add Sample
                </button>
              </div>

              {samples.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800/50">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Plus className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    No samples added yet
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {samples.map((sample, index) => (
                    <div
                      key={sample.id}
                      className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-5 border-b border-slate-100 dark:border-slate-700 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-sm border border-blue-200 dark:border-blue-500/30">
                            {sampleLetters[index % 26]}
                          </div>
                          <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100 leading-tight">
                            Sample {index + 1}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSample(sample.id)}
                          className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Remove sample"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
                        {/* Sample Client ID — manual entry */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
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
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm font-mono placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                          />
                        </div>
                        {/* Sample Type */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
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
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm transition-colors"
                            required
                          >
                            <option value="Water">Water</option>
                          </select>
                        </div>

                        {/* Matrix */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
                            Matrix *
                          </label>
                          <select
                            value={sample.matrix}
                            onChange={e =>
                              updateSample(sample.id, "matrix", e.target.value)
                            }
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm transition-colors"
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
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
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
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm transition-colors"
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
                              placeholder="Enter custom point"
                              className="w-full mt-2 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm transition-colors placeholder-slate-400 dark:placeholder-slate-500"
                              required
                              autoFocus
                            />
                          )}
                        </div>
                        {/* Collection Date */}
                        <div>
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5 leading-tight">
                            <Clock className="w-3.5 h-3.5" />
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
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm transition-colors"
                            required
                          />
                        </div>

                        {/* Collection Time */}
                        <div>
                          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5 leading-tight">
                            <Clock className="w-3.5 h-3.5" />
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
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm transition-colors"
                            required
                          />
                        </div>

                        {/* Initial Volume */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
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
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm font-mono placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                          />
                        </div>

                        {/* Number of Containers */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
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
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-100 text-sm font-mono transition-colors"
                          />
                        </div>
                      </div>

                      {/* Filter & Preserved */}
                      <div className="grid grid-cols-2 gap-5 mb-5">
                        {/* Filtered */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
                            Filtered
                          </label>
                          <div className="flex items-center gap-6 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg transition-colors">
                            <label className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="radio"
                                name={`filtered-${sample.id}`}
                                checked={sample.filtered === true}
                                onChange={() =>
                                  updateSample(sample.id, "filtered", true)
                                }
                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                              />
                              <span className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                                Yes
                              </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="radio"
                                name={`filtered-${sample.id}`}
                                checked={sample.filtered === false}
                                onChange={() =>
                                  updateSample(sample.id, "filtered", false)
                                }
                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                              />
                              <span className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                                No
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Preserved */}
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
                            Preserved
                          </label>
                          <div className="flex items-center gap-6 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg transition-colors">
                            <label className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="radio"
                                name={`preserved-${sample.id}`}
                                checked={sample.preserved === true}
                                onChange={() =>
                                  updateSample(sample.id, "preserved", true)
                                }
                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                              />
                              <span className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                                Yes
                              </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                              <input
                                type="radio"
                                name={`preserved-${sample.id}`}
                                checked={sample.preserved === false}
                                onChange={() =>
                                  updateSample(sample.id, "preserved", false)
                                }
                                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                              />
                              <span className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                                No
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Test Assignment */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 leading-tight">
                          Assign Tests (Optional){" "}
                          <span className="text-slate-500 dark:text-slate-400 font-medium ml-1">
                            ({sample.selectedTests.length} selected)
                          </span>
                        </label>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-tight">
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
                              className={`px-3 py-1.5 rounded-lg border transition-all text-sm font-medium leading-tight ${
                                sample.selectedTests.includes(test.testTypeId)
                                  ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
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
          <div className="sticky bottom-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between z-10">
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-tight">
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
                className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-semibold leading-tight shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-lg hover:bg-yellow-500 hover:text-slate-900 dark:hover:bg-yellow-500 dark:hover:text-slate-900 transition-colors text-sm font-bold leading-tight disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border border-transparent"
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
