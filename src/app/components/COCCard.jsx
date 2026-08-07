import { memo, useMemo } from "react";
import {
  FileText,
  Clock,
  Calendar,
  Droplet,
  TestTube,
  MoreVertical,
  Trash2,
} from "lucide-react";
import StatusBadge from "./StatusBadge";

const COCCard = memo(
  ({
    coc,
    onNavigate,
    activeMenuCOC,
    onMenuClick,
    onMenuAction,
    expandedSamplesCOC,
    onToggleSamples,
    canDelete = true,
  }) => {
    const activeSamples = coc.samples || [];

    const testProgress = useMemo(() => {
      if (!coc.totalTests || coc.totalTests === 0) return 0;
      return Math.round((coc.completedTests / coc.totalTests) * 100);
    }, [coc.completedTests, coc.totalTests]);

    const displayedSamples = useMemo(() => {
      return expandedSamplesCOC ? activeSamples : activeSamples.slice(0, 3);
    }, [expandedSamplesCOC, activeSamples]);

    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all shadow-sm">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div
            className="flex items-center gap-2 cursor-pointer flex-1"
            onClick={() => onNavigate(coc.cocId)}
          >
            <FileText className="w-4 h-4 text-gray-900 dark:text-gray-200" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-200 text-base leading-tight">
              COC: {coc.cocNumber}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={coc.status} />
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMenuClick(coc.cocId);
                }}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
              >
                <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-200" />
              </button>

              {activeMenuCOC === coc.cocId && (
                <div className="absolute right-0 top-full mt-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-10 w-36 overflow-hidden">
                  {canDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMenuAction("delete", coc.cocId);
                      }}
                      className="w-full px-4 py-2 text-left text-sm font-medium hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-2 text-red-500 dark:text-red-500 leading-tight"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete COC
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <p
          className="text-gray-900 dark:text-gray-200 font-semibold mb-4 text-sm leading-tight cursor-pointer line-clamp-1"
          onClick={() => onNavigate(coc.cocId)}
        >
          {coc.projectName || "Unknown Project"}
        </p>

        {/* info statistics area */}
        <div
          className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm text-gray-900 dark:text-gray-200 mb-4 cursor-pointer"
          onClick={() => onNavigate(coc.cocId)}
        >
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 flex-shrink-0 text-gray-500 dark:text-gray-200" />
            <span className="text-gray-500 dark:text-gray-200 mr-0.5 leading-tight">
              Recv:
            </span>
            <span className="leading-tight text-gray-900 dark:text-gray-200">
              {coc.receivedTime ? coc.receivedTime.split(" ")[0] : "-"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-gray-500 dark:text-gray-200" />
            <span className="text-gray-500 dark:text-gray-200 mr-0.5 leading-tight">
              Due:
            </span>
            <span className="leading-tight text-gray-900 dark:text-gray-200">
              {coc.dateRequired ? coc.dateRequired.split(" ")[0] : "-"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Droplet className="w-3.5 h-3.5 flex-shrink-0 text-gray-500 dark:text-gray-200" />
            <span className="leading-tight text-gray-900 dark:text-gray-200">
              {activeSamples.length} samples
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <TestTube className="w-3.5 h-3.5 flex-shrink-0 text-gray-500 dark:text-gray-200" />
            <span className="leading-tight text-gray-900 dark:text-gray-200">
              {coc.completedTests || 0}/{coc.totalTests || 0} tests
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="mb-4 cursor-pointer"
          onClick={() => onNavigate(coc.cocId)}
        >
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-200 mb-1.5 leading-tight">
            <span>Progress</span>
            <span>{testProgress}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700/50 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all ${
                coc.status === "Completed"
                  ? "bg-emerald-500"
                  : coc.status === "In-Progress"
                    ? "bg-blue-500"
                    : "bg-slate-400 dark:bg-slate-500"
              }`}
              style={{ width: `${testProgress}%` }}
            />
          </div>
        </div>

        {/* sample labels */}
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-200 mb-2 leading-tight">
            Samples:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {displayedSamples.map((sample) => (
              <div
                key={sample.sampleId}
                className="px-2 py-0.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-xs transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-gray-200 leading-tight">
                  {sample.sampleClientId || sample.sampleId}
                </span>
                <span className="text-gray-500 dark:text-gray-200 font-medium leading-tight">
                  {" "}
                  - {sample.matrix}
                </span>
              </div>
            ))}
          </div>

          {activeSamples.length > 3 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSamples(coc.cocId);
              }}
              className="text-xs text-blue-500 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-500 font-semibold mt-2 transition-colors leading-tight"
            >
              {expandedSamplesCOC
                ? "Show less"
                : `Show all (${activeSamples.length}) samples`}
            </button>
          )}
        </div>
      </div>
    );
  },
);

export default COCCard;
