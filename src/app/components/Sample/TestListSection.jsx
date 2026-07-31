import { useRouter } from "next/navigation";
import { Edit2, MoreVertical, Trash2, Plus } from "lucide-react";

export default function TestListSection({
  testCardData,
  cocId,
  sampleId,
  cocNumber,
  sampleClientId,
  activeTestMenu,
  setActiveTestMenu,
  deleteTest,
  setShowAddTestDropdown,
}) {
  const router = useRouter();

  // helper
  const goToTestDetail = testId => {
    const query = new URLSearchParams();
    if (cocNumber) query.append("cocNumber", cocNumber);
    if (sampleClientId) query.append("sampleClientId", sampleClientId);

    // get typeName for the following breadcrumb
    const targetTest = testCardData.find(t => t.testId === testId);
    if (targetTest && targetTest.typeName) {
      query.append("typeName", targetTest.typeName);
    }

    const queryString = query.toString() ? `?${query.toString()}` : "";
    const basePath = `/coc/${cocId}/sample/${sampleId}/test/${testId}`;

    router.push(`${basePath}${queryString}`);
  };

  if (testCardData.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl border-2 border-slate-300 dark:border-slate-700 text-center">
        <Plus className="w-12 h-12 text-[#0a1629] dark:text-slate-100 mx-auto mb-2" />
        <h3 className="text-3xl font-bold text-[#0a1629] dark:text-slate-100 mb-2">
          No Tests Added Yet
        </h3>
        <p className="text-[#0a1629] dark:text-slate-100 mb-2 max-w-md mx-auto">
          This sample has no tests assigned. Click "Add Test to Report" to start
          adding tests for this sample.
        </p>
        <button
          onClick={() => setShowAddTestDropdown(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 dark:text-slate-100 font-bold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Your First Test
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {testCardData.map(test => {
        return (
          <div
            key={test.testId}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl border-2 border-slate-300 dark:border-slate-700 transition hover:shadow-2xl hover:border-slate-400 dark:hover:border-slate-500 relative"
          >
            {/* Header with 3-dot menu */}
            <div className="flex items-start justify-between mb-4">
              <h3
                className="font-bold text-[#0a1629] dark:text-slate-100 text-lg flex-1 cursor-pointer"
                onClick={() => goToTestDetail(test.testId)}
              >
                {test.typeName}
              </h3>

              <div className="relative">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setActiveTestMenu(
                      activeTestMenu === test.testId ? null : test.testId,
                    );
                  }}
                  className="p-1 hover:bg-slate-400 rounded transition"
                >
                  <MoreVertical className="w-4 h-4 text-[#0a1629] dark:text-slate-100" />
                </button>

                {activeTestMenu === test.testId && (
                  <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-300 dark:border-slate-700 py-2 min-w-[180px] z-50">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        if (
                          confirm(
                            "Are you sure you want to delete this test? All associated results will be lost.",
                          )
                        ) {
                          deleteTest(test.testId);
                          setActiveTestMenu(null);
                        }
                      }}
                      className="w-full px-4 py-2 text-left text-base hover:bg-red-900/30 transition flex items-center gap-2 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Test
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Test Type Badge */}
            <div
              className="mb-4 cursor-pointer"
              onClick={() => goToTestDetail(test.testId)}
            >
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600">
                {test.typeName || "Other"}
              </span>
            </div>
            {/* Run Number */}
            <div className="flex items-center justify-between text-base mb-2">
              <span className="text-[#0a1629] dark:text-slate-100">Run #:</span>
              <span className="text-[#0a1629] dark:text-slate-100 font-medium">
                {test.runNumber ?? "—"}
              </span>
            </div>
            {/* Test Status */}
            <div
              className="flex items-center justify-between text-base cursor-pointer mb-2"
              onClick={() => goToTestDetail(test.testId)}
            >
              <span className="text-[#0a1629] dark:text-slate-100">
                Status:
              </span>
              <span
                className={`px-2 py-1 rounded text-sm font-medium ${
                  test.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {test.status === "Completed" ? "Completed" : "In Progress"}
              </span>
            </div>
            {/* View/Edit Icons */}
            <div
              className="flex items-center gap-3 pt-3 border-t border-slate-400 cursor-pointer"
              onClick={() => goToTestDetail(test.testId)}
            >
              <button className="text-[#0a1629] dark:text-slate-100 hover:text-yellow-300 transition text-base flex items-center gap-1">
                <Edit2 className="w-4 h-4" />
                <span>View</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
