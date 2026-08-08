"use client";
import { Search, Plus, Droplet, Calendar, ChevronDown } from "lucide-react";
import { useDashboard } from "@/app/hooks/useDashboard";
import SettingsModal from "@/app/components/SettingsModal";
import AddCOCModal from "@/app/components/AddCOCModal";
import AnimatedButton from "@/app/components/AnimatedButton";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Header from "@/app/components/Header";
import COCCard from "@/app/components/COCCard";

export default function Dashboard() {
  const {
    loading,
    fetchDashboardList,
    searchQuery,
    setSearchQuery,
    showSettings,
    setShowSettings,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showAddCOCModal,
    setShowAddCOCModal,
    selectedStatuses,
    setSelectedStatuses,
    showStatusDropdown,
    setShowStatusDropdown,
    activeMenuCOC,
    expandedSamplesCOC,
    filteredCOCs,
    handleAddCOC,
    handleNavigate,
    handleClearFilters,
    setActiveMenuCOC,
    setExpandedSamplesCOC,
    handleDeleteCOC,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-grid-pattern">
      {/* 🚀 新增：全局 Loading 遮罩层，防止用户在删除/刷新期间误触 */}
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center transition-opacity">
          <div className="bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-200 dark:border-slate-700">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">
              Syncing data...
            </span>
          </div>
        </div>
      )}

      <Header
        title="Water Testing LIMS"
        subtitle="Chain of Custody Management"
        icon={Droplet}
        onSettingsClick={() => setShowSettings(true)}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[]} />

        {/* Search and Filters */}
        <div className="mb-4">
          {/* Search — full width */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            <input
              className="w-full pl-11 sm:pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none shadow-lg text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-slate-400"
              type="text"
              placeholder="Search by COC Number or Client Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter bar — date left, status right */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border-2 border-slate-300 dark:border-slate-600">
            {/* Date filters */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
              <div className="flex items-center gap-2 text-base text-gray-900 dark:text-gray-200">
                <Calendar className="w-4 h-4 text-gray-900 dark:text-gray-200" />
                <span className="font-medium">Filter by Date:</span>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="text-base text-gray-900 dark:text-gray-200">
                    From:
                  </label>
                  {/* date time picker */}
                  <input
                    type="date"
                    value={startDate}
                    max={endDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base text-gray-900 dark:text-gray-200 [color-scheme:light] dark:[color-scheme:dark]"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="text-base text-gray-900 dark:text-gray-200">
                    To:
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-base text-gray-900 dark:text-gray-200 [color-scheme:light] dark:[color-scheme:dark]"
                  />
                </div>
                {(startDate || endDate) && (
                  <button
                    onClick={handleClearFilters}
                    className="text-base text-blue-500 hover:text-blue-500 font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Status filter — far right */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="w-full sm:min-w-[170px] sm:w-auto px-4  py-2 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow hover:shadow-md transition flex items-center justify-between"
              >
                <span className="text-gray-900 dark:text-gray-200 font-medium">
                  {selectedStatuses.length === 0
                    ? "Status"
                    : `${selectedStatuses.length} selected`}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showStatusDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 w-full sm:w-56 bg-white dark:bg-slate-800 
                            rounded-xl shadow-2xl border-2 border-slate-300 dark:border-slate-600 py-2 z-50"
                >
                  {["Completed", "In-Progress"].map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStatuses.includes(status)}
                        onChange={() => {
                          setSelectedStatuses((prev) =>
                            prev.includes(status)
                              ? prev.filter((s) => s !== status)
                              : [...prev, status],
                          );
                        }}
                        className="w-4 h-4 accent-blue-600 cursor-pointer"
                      />

                      <span className="text-base text-gray-900 dark:text-gray-200">
                        {status}
                      </span>
                    </label>
                  ))}
                  {selectedStatuses.length > 0 && (
                    <div className="border-t border-slate-200 dark:border-slate-700 mt-1 pt-1 px-4">
                      <button
                        onClick={() => setSelectedStatuses([])}
                        className="text-sm text-blue-500 hover:text-blue-500 py-1"
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent COCs Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-200">
            Recent COCs
          </h2>
          <AnimatedButton
            onClick={() => setShowAddCOCModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900
                       font-semibold rounded-xl shadow-md hover:shadow-lg border border-yellow-500 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Add New COC
          </AnimatedButton>
        </div>

        {/* COC List */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredCOCs.map((coc) => (
            <COCCard
              key={coc.cocId}
              coc={coc}
              onNavigate={handleNavigate}
              activeMenuCOC={activeMenuCOC}
              onMenuClick={(id) =>
                setActiveMenuCOC(activeMenuCOC === id ? null : id)
              }
              onMenuAction={(action, id) => {
                if (action === "delete") {
                  //  trigger delete and close the menu
                  handleDeleteCOC(id);
                  setActiveMenuCOC(null);
                }
              }}
              expandedSamplesCOC={expandedSamplesCOC === coc.cocId}
              onToggleSamples={(id) =>
                setExpandedSamplesCOC(expandedSamplesCOC === id ? null : id)
              }
              canDelete={true}
            />
          ))}
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Add COC Modal */}
      {showAddCOCModal && (
        <AddCOCModal
          onClose={() => setShowAddCOCModal(false)}
          onAdd={handleAddCOC}
        />
      )}
    </div>
  );
}
