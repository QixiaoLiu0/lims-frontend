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
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 text-center">
        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="w-6 h-6 text-slate-500 dark:text-slate-400" />
        </div>
        <h3 className="text-xl font-bold leading-tight text-slate-900 dark:text-slate-100 mb-2">
          No Tests Added Yet
        </h3>
        <p className="text-sm font-medium leading-normal text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
          This sample has no tests assigned. Click "Add Test to Report" to start
          adding tests for this sample.
        </p>
        <button
          onClick={() => setShowAddTestDropdown(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 font-bold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all shadow-md hover:shadow-lg text-sm leading-tight"
        >
          <Plus className="w-4 h-4" />
          Add Your First Test
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testCardData.map(test => {
        return (
          <div
            key={test.testId}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md relative"
          >
            {/* Header with 3-dot menu */}
            <div className="flex items-start justify-between mb-3">
              <h3
                className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-tight flex-1 cursor-pointer line-clamp-2"
                onClick={() => goToTestDetail(test.testId)}
              >
                {test.typeName}
              </h3>

              <div className="relative ml-2">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setActiveTestMenu(
                      activeTestMenu === test.testId ? null : test.testId,
                    );
                  }}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </button>

                {activeTestMenu === test.testId && (
                  <div className="absolute right-0 top-full mt-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 min-w-[180px] z-50 overflow-hidden">
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
                      className="w-full px-4 py-2.5 text-left text-sm font-medium leading-tight hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-2 text-red-600 dark:text-red-400"
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
              className="mb-5 cursor-pointer"
              onClick={() => goToTestDetail(test.testId)}
            >
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold leading-tight bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                {test.typeName || "Other"}
              </span>
            </div>

            {/* Run Number */}
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="font-medium text-slate-500 dark:text-slate-400 leading-tight">
                Run #:
              </span>
              <span className="font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                {test.runNumber ?? "—"}
              </span>
            </div>

            {/* Test Status */}
            <div
              className="flex items-center justify-between text-sm cursor-pointer mb-5"
              onClick={() => goToTestDetail(test.testId)}
            >
              <span className="font-medium text-slate-500 dark:text-slate-400 leading-tight">
                Status:
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold leading-tight ${
                  test.status === "Completed"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                }`}
              >
                {test.status === "Completed" ? "Completed" : "In Progress"}
              </span>
            </div>

            {/* View/Edit Icons */}
            <div
              className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700 cursor-pointer group"
              onClick={() => goToTestDetail(test.testId)}
            >
              <button className="text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm font-medium leading-tight flex items-center gap-1.5">
                <Edit2 className="w-4 h-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
