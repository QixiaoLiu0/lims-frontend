import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { cocService } from "@/services/cocService";
import { sampleService } from "@/services/sampleService";

export function useCOCDetail() {
  const { cocId } = useParams();
  const router = useRouter();

  const [showSettings, setShowSettings] = useState(false);
  const [showAddSampleModal, setShowAddSampleModal] = useState(false);
  const [activeSampleMenu, setActiveSampleMenu] = useState(null);

  const [isEditingCOC, setIsEditingCOC] = useState(false);
  const [editedCOCData, setEditedCOCData] = useState(null);

  // core data source
  const [cocData, setCocData] = useState(null); // ceratin coc detail data
  const [cocNumber, setCocNumber] = useState(null); // for breadcrumb
  const [loading, setLoading] = useState(false);

  // 1. api cocService.getDetail
  const fetchCOCDetail = useCallback(async () => {
    setLoading(true);
    try {
      const res = await cocService.getDetail(cocId);

      let realDetailData = null;

      if (Array.isArray(res)) {
        realDetailData = res[0];
      } else if (res?.data && Array.isArray(res.data)) {
        realDetailData = res.data[0];
      } else {
        realDetailData = res?.data || res;
      }

      console.log("realDetailData", realDetailData);

      // 真正执行赋值，唤醒 UI！
      setCocData(realDetailData);
      setCocNumber(realDetailData.cocNumber);
    } catch (error) {
      console.error("failed to get coc data:", error);
    } finally {
      setLoading(false);
    }
  }, [cocId]);

  useEffect(() => {
    if (cocId) {
      fetchCOCDetail();
    }
  }, [fetchCOCDetail, cocId]);

  const samples = cocData?.samples || [];
  const inletSamples = samples.filter((s) =>
    s.samplingPoint?.toLowerCase().includes("inlet"),
  );
  const outletSamples = samples.filter((s) =>
    s.samplingPoint?.toLowerCase().includes("outlet"),
  );

  // color rendering
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In-Progress":
      case "In-Progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getSampleTypeColor = (sampleType) => {
    return {
      bg: "bg-white dark:bg-slate-800",
      border: "border-[#4A7BA7]",
      hover: "hover:border-[#3A6B8F]",
      text: "text-[#0a1629] dark:text-gray-200",
      icon: "bg-[#446A8C]",
    };
  };

  const handleAddSample = async (newSample) => {
    try {
      setLoading(true);
      console.log(`[API POST] create Sample:`, newSample);

      await cocService.appendSample(cocId, newSample);

      setShowAddSampleModal(false);

      await fetchCOCDetail();
    } catch (error) {
      console.error("error", error);
      setLoading(false);
    }
  };

  const handleVolumeChange = async (sampleId, newVolume) => {
    //TODO
    await fetchCOCDetail(); // re request coc detail
  };

  const handleDeleteSample = async (sampleId) => {
    try {
      setLoading(true);
      console.log(`[API DELETE] delete Sample, ID: ${sampleId}`);

      // call API
      await sampleService.delete(sampleId);

      // clear menu state
      setActiveSampleMenu(null);

      await fetchCOCDetail();
    } catch (error) {
      console.error("failed to delete Sample:", error);
      setLoading(false);
    }
  };

  // 5. edting COC logic
  const handleEditCOC = () => {
    setEditedCOCData({ ...cocData });
    setIsEditingCOC(true);
  };

  // update coc info
  const handleSaveCOC = async () => {
    if (cocId && editedCOCData) {
      console.log(`[API] 更新 COC 详情:`, editedCOCData);
      setIsEditingCOC(false);
      await fetchCOCDetail();
    }
  };

  const handleCancelEdit = () => {
    setEditedCOCData(null);
    setIsEditingCOC(false);
  };

  const getTestCount = (sampleId) => {
    const sample = samples.find((s) => s.sampleId === sampleId);
    return sample?.totalTests || 0;
  };

  const getTestBadgeColor = (testId) => {
    return "bg-blue-500/20 text-blue-300 border-blue-500/50";
  };

  const getTestDisplayName = (testId) => testId;

  const handleExportAllResults = () => {
    if (!cocData) return;
    console.log("[Action] Exporting results to Excel...");
  };

  return {
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
    setIsEditingCOC,
    editedCOCData,
    setEditedCOCData,
    cocData,
    samples,
    inletSamples,
    outletSamples,
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
  };
}
