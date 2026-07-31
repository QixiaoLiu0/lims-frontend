import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/app/contexts/UserContext";
import { sampleService } from "@/services/sampleService";
import { lookupService } from "@/services/lookupService";
import { testTaskService } from "@/services/testTaskService";

export function useSampleDetail() {
  const { cocId, sampleId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const cocNumber = searchParams.get("cocNumber") || cocId;

  const { user, logout, allUsers, addUser, deleteUser, updateUserRole } =
    useUser();

  // core state
  const [sampleData, setSampleData] = useState(null); //APi 13. Get Sample Details
  const [sampleClientId, setSampleClientId] = useState(null);
  const [testTypes, setTestTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showAddTestDropdown, setShowAddTestDropdown] = useState(false);
  const [activeTestMenu, setActiveTestMenu] = useState(null);
  const [isEditingSample, setIsEditingSample] = useState(false);
  const [editedSample, setEditedSample] = useState(null);

  // get Sample detail
  const fetchSampleDetail = useCallback(async () => {
    setLoading(true);
    try {
      const res = await sampleService.getDetail(sampleId);

      const realData = res?.data?.data || res?.data || res;

      console.log("Sample Object:", realData);
      setSampleData(realData);
      setSampleClientId(realData.sampleClientId);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  }, [sampleId]);

  // get Active Test Types(lookup)
  const fetchTestTypes = useCallback(async () => {
    try {
      const res = await lookupService.getActiveTestTypes();
      const realData = res?.data?.data || res?.data || res || [];
      setTestTypes(realData);
      console.log(testTypes);
    } catch (error) {
      console.error("error:", error);
    }
  }, []);

  useEffect(() => {
    if (sampleId) {
      fetchSampleDetail();
      fetchTestTypes();
    }
  }, [fetchSampleDetail, fetchTestTypes, sampleId]);

  const sample = sampleData;
  const testCardData = sampleData?.tests || [];

  // append test
  const handleAddTestFromType = useCallback(
    async testTypeId => {
      try {
        setLoading(true);
        console.log(`[API POST] Append Test, testTypeId:`, testTypeId);

        // API 6
        await sampleService.appendTest(sampleId, { testTypeId });

        setShowAddTestDropdown(false);

        await fetchSampleDetail();
      } catch (error) {
        console.error("error:", error);
        setLoading(false);
      }
    },
    [sampleId, fetchSampleDetail],
  );

  //  API 8
  const deleteTest = useCallback(
    async testId => {
      try {
        setLoading(true);
        console.log(`[API POST] Delete Test, testId:`, testId);

        await testTaskService.delete(testId);
        await fetchSampleDetail();
      } catch (error) {
        console.error("error:", error);
        setLoading(false);
      }
    },
    [fetchSampleDetail],
  );

  const updateSample = useCallback((id, data) => {
    console.log("[Mock] updateSample triggered, id:", id, "data:", data);
  }, []);

  const getStatusIcon = status => {
    return status;
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return {
    cocId,
    sampleId,
    cocNumber,
    sampleClientId,
    router,
    loading,
    user,
    allUsers,
    addUser,
    deleteUser,
    updateUserRole,
    testCardData,
    testTypes,
    deleteTest,
    updateSample,
    showSettings,
    setShowSettings,
    showReport,
    setShowReport,
    showAddTestDropdown,
    setShowAddTestDropdown,
    activeTestMenu,
    setActiveTestMenu,
    isEditingSample,
    setIsEditingSample,
    editedSample,
    setEditedSample,
    sample,
    handleAddTestFromType,
    getStatusIcon,
    handleLogout,
  };
}
