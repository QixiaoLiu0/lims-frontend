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
      <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border-2 border-slate-300 dark:border-slate-700 hover:shadow-lg transition">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div
            className="flex items-center gap-2 cursor-pointer flex-1"
            onClick={() => onNavigate(coc.cocId)}
          >
            <FileText className="w-4 h-4 text-[#0a1629] dark:text-slate-100" />
            <h3 className="font-semibold text-[#0a1629] dark:text-slate-100 text-base">
              COC: {coc.cocNumber}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={coc.status} />
            <div className="relative">
              <button
                onClick={e => {
                  e.stopPropagation();
                  onMenuClick(coc.cocId);
                }}
                className="p-1 hover:bg-slate-600 rounded transition"
              >
                <MoreVertical className="w-4 h-4 text-[#0a1629] dark:text-slate-100" />
              </button>

              {activeMenuCOC === coc.cocId && (
                <div className="absolute right-0 top-full mt-1 bg-slate-800 rounded-lg shadow-2xl border border-slate-600 py-2 z-10 w-32">
                  {canDelete && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onMenuAction("delete", coc.cocId);
                      }}
                      className="w-full px-4 py-2 text-left text-base hover:bg-red-900/30 transition flex items-center gap-2 text-red-400"
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
          className="text-[#0a1629] dark:text-slate-100 font-medium mb-2 text-base cursor-pointer"
          onClick={() => onNavigate(coc.cocId)}
        >
          {coc.projectName || "Unknown Project"}
        </p>

        {/* info statistics area*/}
        <div
          className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-[#0a1629] dark:text-slate-100 mb-2 cursor-pointer"
          onClick={() => onNavigate(coc.cocId)}
        >
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span className="text-slate-500 dark:text-slate-300 mr-0.5">
              Recv:
            </span>
            <span>
              {coc.receivedTime ? coc.receivedTime.split(" ")[0] : "-"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span className="text-slate-500 dark:text-slate-300 mr-0.5">
              Due:
            </span>
            <span>
              {coc.dateRequired ? coc.dateRequired.split(" ")[0] : "-"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Droplet className="w-3 h-3 flex-shrink-0" />
            <span>{activeSamples.length} samples</span>
          </div>
          <div className="flex items-center gap-1">
            <TestTube className="w-3 h-3 flex-shrink-0" />
            <span>
              {coc.completedTests || 0}/{coc.totalTests || 0} tests
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="mb-2 cursor-pointer"
          onClick={() => onNavigate(coc.cocId)}
        >
          <div className="flex items-center justify-between text-sm text-[#0a1629] dark:text-slate-100 mb-1">
            <span>Progress</span>
            <span className="font-medium">{testProgress}%</span>
          </div>
          <div className="w-full bg-slate-900/50 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all ${
                coc.status === "Completed"
                  ? "bg-green-500"
                  : coc.status === "In Progress"
                    ? "bg-blue-500"
                    : "bg-gray-400"
              }`}
              style={{ width: `${testProgress}%` }}
            />
          </div>
        </div>

        {/* sample labels */}
        <div>
          <p className="text-sm font-medium text-[#0a1629] dark:text-slate-100 mb-2">
            Samples:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {displayedSamples.map(sample => (
              <div
                key={sample.sampleId}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-300 border border-gray-300 dark:border-gray-400 rounded-md text-xs"
              >
                <span className="font-medium text-black">
                  {sample.sampleClientId || sample.sampleId}
                </span>
                <span className="text-black"> - {sample.matrix}</span>
              </div>
            ))}
          </div>

          {activeSamples.length > 3 && (
            <button
              onClick={e => {
                e.stopPropagation();
                onToggleSamples(coc.cocId);
              }}
              className="text-sm text-[#0a1629] dark:text-slate-100 hover:opacity-80 font-medium mt-2"
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
