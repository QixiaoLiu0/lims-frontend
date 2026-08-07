"use client";
import React from "react";
import { TestTube, Download, Save, CheckCircle } from "lucide-react";
import SettingsModal from "@/app/components/SettingsModal";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Header from "@/app/components/Header";
import ParameterResultsTable from "@/app/components/Test/ParameterResultsTable";
import { useTestDetail } from "@/app/hooks/useTestDetail";

export default function TestResultDetailPage() {
  const {
    cocId,
    sampleId,
    testId,
    cocNumber,
    sampleClientId,
    typeName,
    router,
    loading,
    showSettings,
    setShowSettings,
    results,
    editedValues,
    canEdit,
    handleValueChange,
    handleSaveDraft,
    handleSubmit,
    handleExport,
  } = useTestDetail();

  if (loading) {
    return (
      <div className="min-h-screen bg-grid-pattern flex items-center justify-center text-gray-500">
        <div className="bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-200 dark:border-slate-700">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            Loading Test parameters...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header
        title="Test Results"
        subtitle={`Input results for ${typeName}`}
        icon={TestTube}
        onSettingsClick={() => setShowSettings(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
        {/* Breadcrumbs nav */}
        <Breadcrumbs
          items={[
            { label: cocNumber, path: `/coc/${cocId}` },
            {
              label: sampleClientId,
              path: `/coc/${cocId}/sample/${sampleId}?cocNumber=${cocNumber}`,
            },
            { label: typeName, path: undefined },
          ]}
        />

        {/* title bar */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border-2 border-slate-300 dark:border-slate-700 p-6 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">
                {sampleClientId}
              </h2>
              <p className="text-gray-500 dark:text-gray-200 font-medium">
                Please input your results below.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-200 dark:bg-slate-700 text-gray-900 dark:text-gray-200 font-medium rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition shadow-sm"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* table displaying result */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border-2 border-slate-300 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-400 dark:border-slate-600 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
              Parameters ({results.length})
            </h3>

            {/* save area */}
            <div className="flex gap-3">
              <button
                onClick={handleSaveDraft}
                className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-gray-900 dark:text-gray-200 font-medium rounded-lg hover:bg-blue-100 hover:text-blue-500 dark:hover:bg-blue-900/50 dark:hover:text-blue-500 transition shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save as Draft
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-lg"
              >
                <CheckCircle className="w-4 h-4" />
                Submit
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <ParameterResultsTable
              results={results}
              editedValues={editedValues}
              handleValueChange={handleValueChange}
              canEdit={canEdit}
            />
          </div>
        </div>
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}
