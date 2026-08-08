"use client";
import {
  FileText,
  Calendar,
  User,
  MapPin,
  Droplet,
  Download,
  Plus,
  Edit2,
  Check,
  X,
  Box,
  Clock,
  AlertCircle,
} from "lucide-react";
import SettingsModal from "@/app/components/SettingsModal";
import AddSampleModal from "@/app/components/AddSampleModal";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Header from "@/app/components/Header";
import SampleListSection from "@/app/components/COC/SampleListSection";

import { useCOCDetail } from "@/app/hooks/useCOCDetail";

export default function COCDetailPage() {
  const {
    cocId,
    cocNumber,
    router,
    loading,
    showSettings,
    setShowSettings,
    showAddSampleModal,
    setShowAddSampleModal,
    activeSampleMenu,
    setActiveSampleMenu,
    isEditingCOC,
    editedCOCData,
    setEditedCOCData,
    samples,
    inletSamples,
    outletSamples,
    cocData, // certain coc full data
    getStatusColor,
    getSampleTypeColor,
    handleAddSample,
    handleVolumeChange,
    handleDeleteSample,
    handleEditCOC,
    handleSaveCOC,
    handleCancelEdit,
    getTestCount,
    getTestBadgeColor,
    getTestDisplayName,
    handleExportAllResults,
  } = useCOCDetail();

  if (loading) {
    return (
      <div className="min-h-screen bg-grid-pattern flex items-center justify-center text-gray-500 dark:text-gray-200 font-medium text-base">
        Loading COC details...
      </div>
    );
  }

  if (!cocData) {
    return (
      <div className="min-h-screen bg-grid-pattern flex items-center justify-center">
        <div className="text-center bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
          <p className="text-gray-900 dark:text-gray-300 text-lg font-medium leading-normal mb-4">
            COC not found
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-blue-500 dark:text-yellow-400 hover:text-gray-900 dark:hover:text-yellow-300 font-medium transition-colors text-sm"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid-pattern">
      <Header
        title={`COC: ${cocData.cocNumber}`}
        subtitle="Chain of Custody Details"
        icon={FileText}
        onSettingsClick={() => setShowSettings(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-6">
        <Breadcrumbs
          items={[{ label: cocData.cocNumber || "", path: undefined }]}
        />

        {/* COC Information */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm mb-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold leading-tight text-gray-900 dark:text-gray-300">
              COC Information
            </h2>

            <div className="flex gap-2">
              {!isEditingCOC ? (
                <button
                  onClick={handleEditCOC}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-gray-900 dark:text-gray-300 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors text-sm font-medium leading-tight"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit COC
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSaveCOC}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium leading-tight"
                  >
                    <Check className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium leading-tight"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-300 mb-1.5">
                <FileText className="w-4 h-4" />
                <span>Project Name</span>
              </div>
              {isEditingCOC ? (
                <input
                  type="text"
                  value={editedCOCData?.projectName || ""}
                  onChange={(e) =>
                    setEditedCOCData({
                      ...editedCOCData,
                      projectName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-gray-900 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                />
              ) : (
                <p className="text-base font-semibold leading-normal text-gray-900 dark:text-gray-300">
                  {cocData.projectName}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-300 mb-1.5">
                <User className="w-4 h-4" />
                <span>Report To</span>
              </div>
              {isEditingCOC ? (
                <input
                  type="text"
                  value={editedCOCData?.reportToName1 || ""}
                  onChange={(e) =>
                    setEditedCOCData({
                      ...editedCOCData,
                      reportToName1: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-gray-900 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                />
              ) : (
                <p className="text-base font-semibold leading-normal text-gray-900 dark:text-gray-300">
                  {cocData.reportToName1}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-300 mb-1.5">
                <Clock className="w-4 h-4" />
                <span>Received Time</span>
              </div>
              {isEditingCOC ? (
                <input
                  type="datetime-local"
                  value={editedCOCData?.receivedTime?.replace(" ", "T") || ""}
                  onChange={(e) =>
                    setEditedCOCData({
                      ...editedCOCData,
                      receivedTime: e.target.value.replace("T", " "),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-gray-900 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                />
              ) : (
                <p className="text-base font-semibold leading-normal text-gray-900 dark:text-gray-300">
                  {cocData.receivedTime}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-300 mb-1.5">
                <Droplet className="w-4 h-4" />
                <span>Status</span>
              </div>
              {isEditingCOC ? (
                <select
                  value={editedCOCData?.status || ""}
                  onChange={(e) =>
                    setEditedCOCData({
                      ...editedCOCData,
                      status: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-gray-900 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                >
                  <option value="In-Progress">In-Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              ) : (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold leading-tight ${getStatusColor(cocData.status)}`}
                >
                  {cocData.status}
                </span>
              )}
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-300 mb-1.5">
                <User className="w-4 h-4" />
                <span>Received By</span>
              </div>
              {isEditingCOC ? (
                <input
                  type="text"
                  value={editedCOCData?.receivedBy || ""}
                  onChange={(e) =>
                    setEditedCOCData({
                      ...editedCOCData,
                      receivedBy: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-gray-900 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                />
              ) : (
                <p className="text-base font-semibold leading-normal text-gray-900 dark:text-gray-300">
                  {cocData.receivedBy}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-300 mb-1.5">
                <User className="w-4 h-4" />
                <span>Relinquished By</span>
              </div>
              {isEditingCOC ? (
                <input
                  type="text"
                  value={editedCOCData?.relinquishedBy || ""}
                  onChange={(e) =>
                    setEditedCOCData({
                      ...editedCOCData,
                      relinquishedBy: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-gray-900 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                />
              ) : (
                <p className="text-base font-semibold leading-normal text-gray-900 dark:text-gray-300">
                  {cocData.relinquishedBy}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-300 mb-1.5">
                <Clock className="w-4 h-4" />
                <span>Relinquished Time</span>
              </div>
              {isEditingCOC ? (
                <input
                  type="datetime-local"
                  value={
                    editedCOCData?.relinquishedTime?.replace(" ", "T") || ""
                  }
                  onChange={(e) =>
                    setEditedCOCData({
                      ...editedCOCData,
                      relinquishedTime: e.target.value.replace("T", " "),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-gray-900 text-gray-900 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                />
              ) : (
                <p className="text-base font-semibold leading-normal text-gray-900 dark:text-gray-300">
                  {cocData.relinquishedTime}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-300 mb-1.5">
                <Calendar className="w-4 h-4" />
                <span>Date Required</span>
              </div>
              {isEditingCOC ? (
                <input
                  type="datetime-local"
                  value={editedCOCData?.dateRequired?.replace(" ", "T") || ""}
                  onChange={(e) =>
                    setEditedCOCData({
                      ...editedCOCData,
                      dateRequired: e.target.value.replace("T", " "),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-gray-900 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                />
              ) : (
                <p className="text-base font-semibold leading-normal text-gray-900 dark:text-gray-300">
                  {cocData.dateRequired}
                </p>
              )}
            </div>
          </div>

          {/* Third Row - Containers & Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-300 mb-1.5">
                <Box className="w-4 h-4" />
                <span>Containers</span>
              </div>
              {isEditingCOC ? (
                <input
                  type="number"
                  value={editedCOCData?.numberOfContainers || 0}
                  onChange={(e) =>
                    setEditedCOCData({
                      ...editedCOCData,
                      numberOfContainers: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-gray-900 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                />
              ) : (
                <p className="text-base font-semibold leading-normal text-gray-900 dark:text-gray-300">
                  {cocData.numberOfContainers}
                </p>
              )}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-300 mb-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Special Instructions</span>
              </div>
              {isEditingCOC ? (
                <input
                  type="text"
                  value={editedCOCData?.specialInstructions || ""}
                  onChange={(e) =>
                    setEditedCOCData({
                      ...editedCOCData,
                      specialInstructions: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-gray-900 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                />
              ) : (
                <p
                  className="text-base font-semibold leading-normal text-gray-900 dark:text-gray-300 truncate"
                  title={cocData.specialInstructions}
                >
                  {cocData.specialInstructions || "None"}
                </p>
              )}
            </div>
          </div>

          {/* Rush Status */}
          {cocData.isRush === 1 && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="bg-red-50 dark:bg-red-500/10 px-4 py-2 rounded-lg border border-red-200 dark:border-red-500/30">
                  <span className="text-red-500 dark:text-red-500 font-bold text-sm leading-tight tracking-wide">
                    🚨 RUSH ORDER
                  </span>
                </div>
                {cocData.dateForRush && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Rush Date:
                    </span>
                    <span className="text-sm font-semibold leading-normal text-gray-900 dark:text-gray-300">
                      {cocData.dateForRush}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Samples Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-300">
              Samples ({samples.length})
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddSampleModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-gray-900 dark:text-gray-300 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors shadow-sm text-sm font-medium leading-tight border border-slate-200 dark:border-transparent"
              >
                <Plus className="w-4 h-4" />
                Add Sample
              </button>
            </div>
          </div>

          <SampleListSection
            title="Inlet Samples"
            samples={inletSamples}
            colorClass="bg-purple-500"
            cocId={cocId}
            cocNumber={cocNumber}
            getTestCount={getTestCount}
            getTestBadgeColor={getTestBadgeColor}
            getTestDisplayName={getTestDisplayName}
            getSampleTypeColor={getSampleTypeColor}
            getStatusColor={getStatusColor}
            activeSampleMenu={activeSampleMenu}
            setActiveSampleMenu={setActiveSampleMenu}
            handleVolumeChange={handleVolumeChange}
            handleDeleteSample={handleDeleteSample}
          />

          <SampleListSection
            title="Outlet Samples"
            samples={outletSamples}
            colorClass="bg-emerald-500"
            cocId={cocId}
            cocNumber={cocNumber}
            getTestCount={getTestCount}
            getTestBadgeColor={getTestBadgeColor}
            getTestDisplayName={getTestDisplayName}
            getSampleTypeColor={getSampleTypeColor}
            getStatusColor={getStatusColor}
            activeSampleMenu={activeSampleMenu}
            setActiveSampleMenu={setActiveSampleMenu}
            handleVolumeChange={handleVolumeChange}
            handleDeleteSample={handleDeleteSample}
          />
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {showAddSampleModal && (
        <AddSampleModal
          onClose={() => setShowAddSampleModal(false)}
          onAdd={handleAddSample}
          cocNumber={cocData.cocNumber}
          existingSampleCount={samples.length}
          existingSamples={samples}
        />
      )}
    </div>
  );
}
