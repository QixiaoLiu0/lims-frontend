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
      <div className="min-h-screen bg-grid-pattern flex items-center justify-center text-slate-100">
        <div className="bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-200 dark:border-slate-700">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Loading Sample details...
          </span>
        </div>
      </div>
    );
  }

  if (!sample) {
    return (
      <div className="min-h-screen bg-grid-pattern flex items-center justify-center">
        <div className="text-center bg-[#262835] rounded-2xl p-4 shadow-2xl border-4 border-slate-600">
          <p className="text-gray-900 dark:text-slate-100 text-lg mb-4">
            Sample not found
          </p>
          <button
            onClick={() => router.push(`/coc/${cocId}`)}
            className="text-blue-600 hover:text-blue-700"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: cocNumber || cocId, path: `/coc/${cocId}` },
            { label: sample.sampleClientId || "", path: undefined },
          ]}
        />

        {/* Sample Overview Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl mb-4 border-2 border-slate-300 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4 border-b border-slate-400 dark:border-slate-600 pb-3">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-[#0a1629] dark:text-slate-100">
                Sample Information
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  sample?.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : sample?.status === "Testing"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700 dark:text-slate-200"
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
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition text-sm font-medium"
              >
                <Edit2 className="w-3.5 h-3.5" />
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
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white transition text-sm font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditingSample(false);
                    setEditedSample(null);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2 pb-3 border-b border-slate-400 dark:border-slate-600">
            <div>
              <p className="text-base text-[#0a1629] dark:text-slate-100 mb-1">
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
                  className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-mono"
                />
              ) : (
                <p className="font-semibold text-[#0a1629] dark:text-slate-100">
                  {sample?.sampleClientId || "Unknown"}
                </p>
              )}
            </div>
            <div>
              <p className="text-base text-[#0a1629] dark:text-slate-100 mb-1">
                Type
              </p>
              {isEditingSample && editedSample ? (
                <input
                  type="text"
                  value={editedSample.matrix || ""}
                  onChange={(e) =>
                    setEditedSample({ ...editedSample, matrix: e.target.value })
                  }
                  className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm"
                />
              ) : (
                <p className="font-semibold text-[#0a1629] dark:text-slate-100">
                  {sample?.matrix || "Unknown"}
                </p>
              )}
            </div>
            <div>
              <p className="text-base text-[#0a1629] dark:text-slate-100 mb-1">
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
                  className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm"
                />
              ) : (
                <p className="font-semibold text-[#0a1629] dark:text-slate-100">
                  {sample?.sampledTime || "—"}
                </p>
              )}
            </div>
            <div>
              <p className="text-base text-[#0a1629] dark:text-slate-100 mb-1">
                Status
              </p>
              {isEditingSample && editedSample ? (
                <select
                  value={editedSample.status || "Pending"}
                  onChange={(e) =>
                    setEditedSample({ ...editedSample, status: e.target.value })
                  }
                  className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Testing">Testing</option>
                  <option value="Completed">Completed</option>
                </select>
              ) : (
                <span
                  className={`inline-block px-3 py-1 rounded-full text-base font-medium ${
                    sample?.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : sample?.status === "Testing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 dark:text-slate-200"
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 drop-shadow-sm">
              Tests (
              {testCardData?.filter((t) => t.runNumber === 1).length ||
                testCardData?.length ||
                0}
              )
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReport(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition shadow-lg"
              >
                <FileText className="w-4 h-4" />
                Generate Summary
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowAddTestDropdown(!showAddTestDropdown)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-[#ffb800] hover:text-slate-900 dark:hover:bg-[#ffb800] dark:hover:text-slate-900 transition shadow-md font-bold"
                >
                  <Plus className="w-5 h-5" />
                  Add Test to Report
                </button>

                {showAddTestDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowAddTestDropdown(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border-2 border-slate-300 dark:border-slate-700 z-50 overflow-hidden">
                      <div className="px-4 py-2 border-b border-slate-300 dark:border-slate-700">
                        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                          Select Test Type
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-200 mt-0.5">
                          Choose a test to add
                        </p>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {testTypes.length === 0 ? (
                          <div className="px-4 py-6 text-center">
                            <p className="text-slate-700 dark:text-slate-200 text-base">
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
                              className="w-full px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center gap-3"
                            >
                              {/* icon Color */}
                              <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{
                                  backgroundColor: testType.iconColor || "#ccc",
                                }}
                              />
                              <div className="flex-1">
                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                  {testType.typeName}
                                </p>
                                {testType.description && (
                                  <p className="text-sm text-slate-600 dark:text-slate-300">
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
