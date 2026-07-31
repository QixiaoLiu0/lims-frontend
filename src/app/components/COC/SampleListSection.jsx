import { useRouter } from "next/navigation";
import { Droplet, MoreVertical, Trash2 } from "lucide-react";
import { BottleIcon } from "@/app/components/BottleIcon";

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

  if (!samples || samples.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2 drop-shadow-sm">
        <div className={`w-2 h-2 ${colorClass} rounded-full`}></div>
        {title} ({samples.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {samples.map(sample => {
          const sampleColors = getSampleTypeColor(sample.samplingPoint);
          return (
            <div
              key={sample.sampleId}
              className={`${sampleColors.bg} rounded-xl p-6 border-2 ${sampleColors.border} hover:shadow-2xl ${sampleColors.hover} transition shadow-lg relative`}
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
                  <div className={`${sampleColors.icon} p-3 rounded-lg`}>
                    <Droplet className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sample.status)}`}
                  >
                    {sample.status}
                  </span>

                  <div className="relative">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setActiveSampleMenu(
                          activeSampleMenu === sample.sampleId
                            ? null
                            : sample.sampleId,
                        );
                      }}
                      className={`p-1 hover:bg-black/20 rounded transition`}
                    >
                      <MoreVertical
                        className={`w-4 h-4 ${sampleColors.text}`}
                      />
                    </button>

                    {activeSampleMenu === sample.sampleId && (
                      <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-300 dark:border-slate-700 py-2 min-w-[180px] z-50">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            if (
                              confirm(
                                "Are you sure you want to delete this sample? All associated tests will be lost.",
                              )
                            ) {
                              handleDeleteSample(sample.sampleId);
                            }
                          }}
                          className="w-full px-4 py-2 text-left text-base hover:bg-red-900/30 transition flex items-center gap-2 text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Sample
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* card body*/}
              <div
                className="cursor-pointer mb-4"
                onClick={() =>
                  router.push(
                    `/coc/${cocId}/sample/${sample.sampleId}?cocNumber=${cocNumber}`,
                  )
                }
              >
                <div className="flex justify-between items-start">
                  {/* left : sampleClientId、samplingPoint、matrix */}
                  <div className="flex flex-col gap-1">
                    <h3 className={`font-bold ${sampleColors.text} text-lg`}>
                      Sample : {sample.sampleClientId}
                    </h3>
                    <span
                      className={`font-medium text-base ${sampleColors.text}`}
                    >
                      {sample.samplingPoint || "Unknown Point"}
                    </span>
                    <span
                      className={`font-medium text-base ${sampleColors.text} opacity-80`}
                    >
                      {sample.matrix || "Unknown Matrix"}
                    </span>
                  </div>

                  {/* right: sampledTime */}
                  <div
                    className={`text-sm font-medium ${sampleColors.text} opacity-70 text-right`}
                  >
                    {sample.sampledTime}
                  </div>
                </div>
              </div>

              {/* Bottle Icon with Remaining Volume */}
              <div onClick={e => e.stopPropagation()}>
                <BottleIcon
                  remainingVolume={sample.remainingVolume ?? 1000}
                  maxVolume={1000}
                  onVolumeChange={newVolume =>
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
  );
}
