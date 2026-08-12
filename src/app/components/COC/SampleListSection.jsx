import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Droplet, MoreVertical, Trash2 } from "lucide-react";
import { BottleIcon } from "@/app/components/BottleIcon";
import StatusBadge from "../StatusBadge";
import ConfirmDeleteModal from "@/app/components/ConfirmDeleteModal";

export default function SampleListSection({
  title,
  samples,
  colorClass,
  cocId,
  cocNumber,
  getTestCount,
  getTestBadgeColor,
  getTestDisplayName,
  getSampleTypeColor,
  getStatusColor,
  activeSampleMenu,
  setActiveSampleMenu,
  handleVolumeChange,
  handleDeleteSample,
}) {
  const router = useRouter();
  const [sampleToDelete, setSampleToDelete] = useState(null);

  if (!samples || samples.length === 0) return null;

  const menuRefs = useRef({});

  useEffect(() => {
    if (!activeSampleMenu) return;

    const handleClickOutside = (e) => {
      const currentMenuEl = menuRefs.current[activeSampleMenu];
      if (currentMenuEl && !currentMenuEl.contains(e.target)) {
        setActiveSampleMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeSampleMenu, setActiveSampleMenu]);

  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-semibold leading-tight text-gray-900 dark:text-gray-200 mb-4 flex items-center gap-2 drop-shadow-sm">
          <div className={`w-2 h-2 ${colorClass} rounded-full`}></div>
          {title} ({samples.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {samples.map((sample) => {
            const sampleColors = getSampleTypeColor(sample.samplingPoint);
            return (
              <div
                key={sample.sampleId}
                className={`${sampleColors.bg} rounded-xl p-6 border ${sampleColors.border} hover:shadow-md ${sampleColors.hover} transition-all shadow-sm relative`}
              >
                {/* card header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="flex items-center gap-3 cursor-pointer flex-1"
                    onClick={() =>
                      router.push(
                        `/coc/${cocId}/sample/${sample.sampleId}?cocNumber=${cocNumber}`,
                      )
                    }
                  >
                    <div
                      className={`${sampleColors.icon} p-3 rounded-lg shadow-sm`}
                    >
                      <Droplet className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={sample.status} />

                    <div
                      className="relative"
                      ref={(el) => (menuRefs.current[sample.sampleId] = el)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSampleMenu(
                            activeSampleMenu === sample.sampleId
                              ? null
                              : sample.sampleId,
                          );
                        }}
                        className={`p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors`}
                      >
                        <MoreVertical
                          className={`w-4 h-4 ${sampleColors.text}`}
                        />
                      </button>

                      {activeSampleMenu === sample.sampleId && (
                        <div className="absolute right-0 top-full mt-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 min-w-[180px] z-50 overflow-hidden">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSampleToDelete(sample);
                              setActiveSampleMenu(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm font-medium hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-2 text-red-500 dark:text-red-500 leading-tight"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Sample
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* card body */}
                <div
                  className=" cursor-pointer mb-5"
                  onClick={() =>
                    router.push(
                      `/coc/${cocId}/sample/${sample.sampleId}?cocNumber=${cocNumber}`,
                    )
                  }
                >
                  <div className="flex justify-between items-start gap-4">
                    {/* left : sampleClientId, samplingPoint, matrix */}
                    <div className="flex flex-col gap-1.5">
                      <h3
                        className={`font-bold ${sampleColors.text} text-lg leading-tight line-clamp-1`}
                      >
                        Sample: {sample.sampleClientId}
                      </h3>
                      <span
                        className={`font-medium text-sm leading-tight ${sampleColors.text}`}
                      >
                        {sample.samplingPoint || "Unknown Point"}
                      </span>
                      <span
                        className={`font-medium text-sm leading-tight ${sampleColors.text} opacity-80`}
                      >
                        {sample.matrix || "Unknown Matrix"}
                      </span>
                    </div>

                    {/* right: sampledTime */}
                    <div
                      className={`text-xs font-medium leading-tight ${sampleColors.text} opacity-70 text-right whitespace-nowrap`}
                    >
                      {sample.sampledTime}
                    </div>
                  </div>
                </div>

                {/* Bottle Icon with Remaining V\olume */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className=" pt-2 border-t border-black/5 dark:border-white/5"
                >
                  <BottleIcon
                    remainingVolume={sample.remainingVolume ?? 1000}
                    maxVolume={1000}
                    onVolumeChange={(newVolume) =>
                      handleVolumeChange(sample.sampleId, newVolume)
                    }
                    editable={true}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {sampleToDelete && (
        <ConfirmDeleteModal
          title="Delete Sample"
          message="Are you sure you want to delete this sample? All associated tests will be permanently lost."
          itemName={`Sample: ${sampleToDelete.sampleClientId}`}
          onConfirm={() => {
            handleDeleteSample(sampleToDelete.sampleId);
            setSampleToDelete(null); // Close modal on confirm
          }}
          onCancel={() => setSampleToDelete(null)} // Close modal on cancel
        />
      )}
    </>
  );
}
