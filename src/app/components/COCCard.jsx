import { memo, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
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

    const router = useRouter();

    const testProgress = useMemo(() => {
      if (!coc.totalTests || coc.totalTests === 0) return 0;
      return Math.round((coc.completedTests / coc.totalTests) * 100);
    }, [coc.completedTests, coc.totalTests]);

    const displayedSamples = useMemo(() => {
      return expandedSamplesCOC ? activeSamples : activeSamples.slice(0, 3);
    }, [expandedSamplesCOC, activeSamples]);

    const dragStartPos = useRef(null);

    const handleMouseDown = (e) => {
      e.stopPropagation();
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleCardClick = (e, sampleId) => {
      e.stopPropagation();
      const start = dragStartPos.current;
      if (start) {
        const distance = Math.hypot(e.clientX - start.x, e.clientY - start.y);
        if (distance > 5) return;
      }
      onNavigate(coc.cocId);
    };

    const handleSampleClick = (e, sampleId) => {
      e.stopPropagation();
      const start = dragStartPos.current;
      if (start) {
        const distance = Math.hypot(e.clientX - start.x, e.clientY - start.y);
        if (distance > 5) return;
      }
      router.push(
        `/coc/${coc.cocId}/sample/${sampleId}?cocNumber=${coc.cocNumber}`,
      );
    };

    return (
      <div
        className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all shadow-sm cursor-pointer"
        onMouseDown={handleMouseDown}
        onClick={handleCardClick}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-1">
            <FileText className="w-4 h-4 text-gray-900 dark:text-gray-200" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-200 text-base leading-tight cursor-text">
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

        <p className="text-gray-900 dark:text-gray-200 font-semibold mb-4 text-sm leading-tight line-clamp-1 w-fit cursor-text">
          {coc.projectName || "Unknown Project"}
        </p>

        {/* info statistics area */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm text-gray-900 dark:text-gray-200 mb-4">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 flex-shrink-0 text-gray-500 dark:text-gray-200" />
            <span className="text-gray-500 dark:text-gray-200 mr-0.5 leading-tight cursor-text">
              Recv:
            </span>
            <span className="leading-tight text-gray-900 dark:text-gray-200 cursor-text">
              {coc.receivedTime ? coc.receivedTime.split(" ")[0] : "-"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0 text-gray-500 dark:text-gray-200" />
            <span className="text-gray-500 dark:text-gray-200 mr-0.5 leading-tight cursor-text">
              Due:
            </span>
            <span className="leading-tight text-gray-900 dark:text-gray-200 cursor-text">
              {coc.dateRequired ? coc.dateRequired.split(" ")[0] : "-"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Droplet className="w-3.5 h-3.5 flex-shrink-0 text-gray-500 dark:text-gray-200" />
            <span className="leading-tight text-gray-900 dark:text-gray-200 cursor-text">
              {activeSamples.length} samples
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <TestTube className="w-3.5 h-3.5 flex-shrink-0 text-gray-500 dark:text-gray-200" />
            <span className="leading-tight text-gray-900 dark:text-gray-200 cursor-text">
              {coc.completedTests || 0}/{coc.totalTests || 0} tests
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-200 mb-1.5 leading-tight">
            <span className="cursor-text">Progress</span>
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
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-200 mb-2 leading-tight cursor-text">
            Samples:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {displayedSamples.map((sample) => (
              <div
                key={sample.sampleId}
                onMouseDown={handleMouseDown}
                onClick={(e) => handleSampleClick(e, sample.sampleId)}
                className="px-2.5 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-sm hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer transition-colors"
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
