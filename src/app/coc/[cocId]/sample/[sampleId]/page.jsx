"use client";
import React from "react";
import { Droplet, Edit2, Plus, FileText } from "lucide-react";
import SampleReportModal from "@/app/components/SampleReportModal";
import SettingsModal from "@/app/components/SettingsModal";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Header from "@/app/components/Header";
import TestListSection from "@/app/components/Sample/TestListSection";
import { useSampleDetail } from "@/app/hooks/useSampleDetail";

export default function SampleDetailPage() {
  const {
    cocId,
    sampleId,
    cocNumber,
    sampleClientId,
    router,
    loading,
    allUsers,
    addUser,
    deleteUser,
    updateUserRole,
    testCardData,
    testTypes,
    deleteTest,
    updateSample,
    showSettings,
    setShowSettings,
    showReport,
    setShowReport,
    showAddTestDropdown,
    setShowAddTestDropdown,
    activeTestMenu,
    setActiveTestMenu,
    isEditingSample,
    setIsEditingSample,
    editedSample,
    setEditedSample,
    sample,
    handleAddTestFromType,
  } = useSampleDetail();

  // global Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-grid-pattern flex items-center justify-center text-slate-600 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-200 dark:border-slate-700">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-base font-semibold leading-normal text-slate-800 dark:text-slate-100">
            Loading Sample details...
          </span>
        </div>
      </div>
    );
  }

  if (!sample) {
    return (
      <div className="min-h-screen bg-grid-pattern flex items-center justify-center">
        <div className="text-center bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-900 dark:text-slate-100 text-lg font-medium leading-normal mb-4">
            Sample not found
          </p>
          <button
            onClick={() => router.push(`/coc/${cocId}`)}
            className="text-blue-600 dark:text-yellow-400 hover:text-blue-700 dark:hover:text-yellow-300 font-medium transition-colors text-sm"
          >
            Return to COC
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header
        title={`Sample: ${sample?.sampleClientId || sampleId}`}
        subtitle="Sample Details & Test Results"
        icon={Droplet}
        onSettingsClick={() => setShowSettings(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: cocNumber || cocId, path: `/coc/${cocId}` },
            { label: sample.sampleClientId || "", path: undefined },
          ]}
        />

        {/* Sample Overview Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold leading-tight text-slate-900 dark:text-slate-100">
                Sample Information
              </h2>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold leading-tight ${
                  sample?.status === "Completed"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : sample?.status === "Testing"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                }`}
              >
                {sample?.status || "Pending"}
              </span>
            </div>

            {isEditingSample ? (
              <></>
            ) : (
              <button
                onClick={() => {
                  setEditedSample({ ...sample });
                  setIsEditingSample(true);
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors text-sm font-medium leading-tight"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            )}

            {isEditingSample && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (editedSample) {
                      updateSample(sample.sampleId, editedSample);
                    }
                    setIsEditingSample(false);
                    setEditedSample(null);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium leading-tight"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditingSample(false);
                    setEditedSample(null);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium leading-tight"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-2 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5 leading-tight">
                Sample ID
              </p>
              {isEditingSample && editedSample ? (
                <input
                  type="text"
                  value={editedSample.sampleClientId || ""}
                  onChange={(e) =>
                    setEditedSample({
                      ...editedSample,
                      sampleClientId: e.target.value,
                    })
                  }
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              ) : (
                <p className="text-base font-semibold leading-normal text-slate-900 dark:text-slate-100">
                  {sample?.sampleClientId || "Unknown"}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5 leading-tight">
                Type
              </p>
              {isEditingSample && editedSample ? (
                <input
                  type="text"
                  value={editedSample.matrix || ""}
                  onChange={(e) =>
                    setEditedSample({ ...editedSample, matrix: e.target.value })
                  }
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              ) : (
                <p className="text-base font-semibold leading-normal text-slate-900 dark:text-slate-100">
                  {sample?.matrix || "Unknown"}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5 leading-tight">
                Created At
              </p>
              {isEditingSample && editedSample ? (
                <input
                  type="datetime-local"
                  value={editedSample.sampledTime?.replace(" ", "T") || ""}
                  onChange={(e) =>
                    setEditedSample({
                      ...editedSample,
                      sampledTime: e.target.value.replace("T", " "),
                    })
                  }
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              ) : (
                <p className="text-base font-semibold leading-normal text-slate-900 dark:text-slate-100">
                  {sample?.sampledTime || "—"}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5 leading-tight">
                Status
              </p>
              {isEditingSample && editedSample ? (
                <select
                  value={editedSample.status || "Pending"}
                  onChange={(e) =>
                    setEditedSample({ ...editedSample, status: e.target.value })
                  }
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="Pending">Pending</option>
                  <option value="Testing">Testing</option>
                  <option value="Completed">Completed</option>
                </select>
              ) : (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold leading-tight ${
                    sample?.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : sample?.status === "Testing"
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                  }`}
                >
                  {sample?.status || "Pending"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tests Conducted */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold leading-tight text-slate-900 dark:text-slate-100">
              Tests (
              {testCardData?.filter((t) => t.runNumber === 1).length ||
                testCardData?.length ||
                0}
              )
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReport(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors shadow-sm text-sm border border-slate-200 dark:border-transparent leading-tight"
              >
                <FileText className="w-4 h-4" />
                Generate Summary
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowAddTestDropdown(!showAddTestDropdown)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 dark:bg-slate-200 text-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-700 dark:hover:bg-white transition-colors shadow-sm text-sm font-semibold leading-tight"
                >
                  <Plus className="w-4 h-4" />
                  Add Test to Report
                </button>

                {showAddTestDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowAddTestDropdown(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                          Select Test Type
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-tight">
                          Choose a test to add
                        </p>
                      </div>
                      <div className="max-h-80 overflow-y-auto py-1">
                        {testTypes.length === 0 ? (
                          <div className="px-4 py-6 text-center">
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                              No active test types available
                            </p>
                          </div>
                        ) : (
                          testTypes.map((testType) => (
                            <button
                              key={testType.testTypeId}
                              onClick={() =>
                                handleAddTestFromType(testType.testTypeId)
                              }
                              className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-3 group"
                            >
                              {/* icon Color */}
                              <div
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-transparent group-hover:ring-slate-200 dark:group-hover:ring-slate-600 transition-all"
                                style={{
                                  backgroundColor:
                                    testType.iconColor || "#cbd5e1",
                                }}
                              />
                              <div className="flex-1">
                                <p className="text-sm font-semibold leading-tight text-slate-900 dark:text-slate-100">
                                  {testType.typeName}
                                </p>
                                {testType.description && (
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1 leading-tight">
                                    {testType.description}
                                  </p>
                                )}
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <TestListSection
            testCardData={testCardData}
            cocId={cocId}
            cocNumber={cocNumber}
            sampleClientId={sampleClientId}
            sampleId={sampleId}
            activeTestMenu={activeTestMenu}
            setActiveTestMenu={setActiveTestMenu}
            deleteTest={deleteTest}
            setShowAddTestDropdown={setShowAddTestDropdown}
          />
        </div>
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}
