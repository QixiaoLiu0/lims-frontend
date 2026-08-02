import { useState, useCallback, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/app/contexts/UserContext";
import { testTaskService } from "@/services/testTaskService";

export function useTestDetail() {
  const { cocId, sampleId, testId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const cocNumber = searchParams.get("cocNumber") || cocId;
  const sampleClientId = searchParams.get("sampleClientId") || sampleId;
  const typeName = searchParams.get("typeName") || "Test Details";

  const { user, logout } = useUser();
  const canEdit = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  const [showSettings, setShowSettings] = useState(false);

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [editedValues, setEditedValues] = useState({});

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const res = await testTaskService.getResults(testId);

      const realData = res?.data || res || [];
      setResults(Array.isArray(realData) ? realData : []);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  }, [testId]);

  useEffect(() => {
    if (testId) {
      fetchResults();
    }
  }, [fetchResults, testId]);

  const handleValueChange = (resultId, newValue) => {
    setEditedValues(prev => ({
      ...prev,
      [resultId]: newValue,
    }));
  };

  // assembly payload
  const buildPayload = isComplete => {
    const payloadResults = results.map(item => {
      const currentValue =
        editedValues[item.resultId] !== undefined
          ? editedValues[item.resultId]
          : item.value || "";

      return {
        resultId: item.resultId,
        value: currentValue,
        qualifier: "", // pass "" in current phase
      };
    });

    return {
      isComplete,
      results: payloadResults,
    };
  };

  const handleSaveDraft = async () => {
    try {
      const payload = buildPayload(false);
      console.log("Save as Draft Payload:", payload);

      await testTaskService.saveResults(testId, payload);

      alert("Draft saved successfully!");
      setEditedValues({});
      await fetchResults();
    } catch (error) {
      console.error("Save Draft failed:", error);
      alert("Failed to save draft. Please try again.");
    }
  };

  const handleSubmit = async () => {
    const payload = buildPayload(true);

    // check if result has values
    const hasEmptyValues = payload.results.some(
      r => r.value === null || r.value === undefined || r.value.trim() === "",
    );

    if (hasEmptyValues) {
      alert(
        "Cannot submit. Please ensure all parameters have a value before submitting.",
      );
      return;
    }

    try {
      console.log("Submit Payload:", payload);

      await testTaskService.saveResults(testId, payload);

      alert("Results submitted successfully!");
      setEditedValues({});
      await fetchResults();
    } catch (error) {
      console.error("Submit failed:", error);
      alert("Failed to submit results. Please try again.");
    }
  };

  const handleExport = () => {
    console.log("export logic...");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return {
    cocId,
    sampleId,
    testId,
    cocNumber,
    sampleClientId,
    typeName,
    router,
    loading,
    showSettings,
    setShowSettings,
    results,
    editedValues,
    canEdit,
    handleValueChange,
    handleSaveDraft,
    handleSubmit,
    handleExport,
    handleLogout,
  };
}
