import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { mockTestResults, TestResult } from "@/app/data/mockData";

const TestResultsContext = createContext(undefined);

export function TestResultsProvider({ children }) {
  const [testResults, setTestResults] = useState(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("lims_test_results")
        : null;
    return stored ? JSON.parse(stored) : mockTestResults;
  });

  // Store parameter results with retests per test ID
  const [parameterResultsMap, setParameterResultsMap] = useState({});

  // Store subtest results with retests per test ID
  const [subtestResultsMap, setSubtestResultsMap] = useState({});

  // Save to localStorage whenever testResults change
  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("lims_test_results", JSON.stringify(testResults));
  }, [testResults]);

  const updateTestResult = (testId, retestNumber, result, status) => {
    setTestResults((prev) =>
      prev.map((test) =>
        test.id === testId && test.retestNumber === retestNumber
          ? { ...test, result, status }
          : test,
      ),
    );
  };

  const addRetest = (retestResult) => {
    setTestResults((prev) => [...prev, retestResult]);
  };

  const addTest = (newTest) => {
    setTestResults((prev) => [...prev, newTest]);
  };

  const deleteTest = (testId) => {
    setTestResults((prev) =>
      prev.filter(
        (test) => test.id !== testId && test.originalTestId !== testId,
      ),
    );
    // Also clean up parameter and subtest results
    setParameterResultsMap((prev) => {
      const updated = { ...prev };
      delete updated[testId];
      return updated;
    });
    setSubtestResultsMap((prev) => {
      const updated = { ...prev };
      delete updated[testId];
      return updated;
    });
  };

  const renameSampleId = (oldId, newId) => {
    setTestResults((prev) =>
      prev.map((test) =>
        test.sampleId === oldId ? { ...test, sampleId: newId } : test,
      ),
    );
  };

  const deleteTestsBySampleId = (sampleId) => {
    setTestResults((prev) => prev.filter((test) => test.sampleId !== sampleId));
    // Also clean up parameter and subtest results
    setParameterResultsMap((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((testId) => {
        const test = testResults.find(
          (t) => t.id === testId && !t.retestNumber,
        );
        if (test?.sampleId === sampleId) {
          delete updated[testId];
        }
      });
      return updated;
    });
    setSubtestResultsMap((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((testId) => {
        const test = testResults.find(
          (t) => t.id === testId && !t.retestNumber,
        );
        if (test?.sampleId === sampleId) {
          delete updated[testId];
        }
      });
      return updated;
    });
  };

  // Parameter results functions
  const getParameterResults = (testId) => {
    return parameterResultsMap[testId] || [];
  };

  const initializeParameterResults = (testId) => {
    if (!parameterResultsMap[testId]) {
      const test = testResults.find((t) => t.id === testId && !t.retestNumber);
      if (test?.parameterResults) {
        const initialized = test.parameterResults.map((param, idx) => ({
          ...param,
          originalIndex: idx,
        }));
        setParameterResultsMap((prev) => ({ ...prev, [testId]: initialized }));
      }
    }
  };

  const updateParameterResult = (testId, index, result, status) => {
    setParameterResultsMap((prev) => {
      const current = prev[testId] || [];
      const updated = [...current];
      updated[index] = { ...updated[index], result, status };
      return { ...prev, [testId]: updated };
    });
  };

  const addParameterRetest = (testId, paramIndex) => {
    setParameterResultsMap((prev) => {
      const current = prev[testId] || [];
      const test = testResults.find((t) => t.id === testId && !t.retestNumber);

      if (!test?.parameterResults) return prev;

      const originalParam = test.parameterResults[paramIndex];
      const relatedRetests = current.filter(
        (p) => p.originalIndex === paramIndex,
      );
      const maxRetestNumber = Math.max(
        ...relatedRetests.map((r) => r.retestNumber || 0),
        0,
      );
      const newRetestNumber = maxRetestNumber + 1;

      const newRetest = {
        ...originalParam,
        retestNumber: newRetestNumber,
        originalIndex: paramIndex,
        result: "",
        status: "Pass",
      };

      // Find the position to insert (right after the original and its retests)
      let insertPosition = paramIndex + 1;
      for (let i = paramIndex + 1; i < current.length; i++) {
        if (current[i].originalIndex === paramIndex) {
          insertPosition = i + 1;
        } else {
          break;
        }
      }

      const newArray = [...current];
      newArray.splice(insertPosition, 0, newRetest);
      return { ...prev, [testId]: newArray };
    });
  };

  const addNewParameter = (testId, parameter) => {
    setParameterResultsMap((prev) => {
      const current = prev[testId] || [];
      const newParameter = {
        ...parameter,
        originalIndex: current.filter((p) => p.retestNumber === undefined)
          .length,
      };
      const updated = [...current, newParameter];
      return { ...prev, [testId]: updated };
    });
  };

  const deleteParameter = (testId, index) => {
    setParameterResultsMap((prev) => {
      const current = prev[testId] || [];
      const updated = current.filter((_, idx) => idx !== index);
      return { ...prev, [testId]: updated };
    });
  };

  // Subtest results functions
  const getSubtestResults = (testId) => {
    return subtestResultsMap[testId] || [];
  };

  const initializeSubtestResults = (testId) => {
    if (!subtestResultsMap[testId]) {
      const test = testResults.find((t) => t.id === testId && !t.retestNumber);
      if (test?.subtestResults) {
        const initialized = test.subtestResults.map((subtest, idx) => ({
          ...subtest,
          originalIndex: idx,
        }));
        setSubtestResultsMap((prev) => ({ ...prev, [testId]: initialized }));
      }
    }
  };

  const updateSubtestResult = (testId, index, result, status) => {
    setSubtestResultsMap((prev) => {
      const current = prev[testId] || [];
      const updated = [...current];
      updated[index] = { ...updated[index], result, status };
      return { ...prev, [testId]: updated };
    });
  };

  const addSubtestRetest = (testId, subtestIndex) => {
    setSubtestResultsMap((prev) => {
      const current = prev[testId] || [];
      const test = testResults.find((t) => t.id === testId && !t.retestNumber);

      if (!test?.subtestResults) return prev;

      const originalSubtest = test.subtestResults[subtestIndex];
      const relatedRetests = current.filter(
        (s) => s.originalIndex === subtestIndex,
      );
      const maxRetestNumber = Math.max(
        ...relatedRetests.map((r) => r.retestNumber || 0),
        0,
      );
      const newRetestNumber = maxRetestNumber + 1;

      const newRetest = {
        ...originalSubtest,
        retestNumber: newRetestNumber,
        originalIndex: subtestIndex,
        result: "",
        status: "Pass",
      };

      // Find the position to insert (right after the original and its retests)
      let insertPosition = subtestIndex + 1;
      for (let i = subtestIndex + 1; i < current.length; i++) {
        if (current[i].originalIndex === subtestIndex) {
          insertPosition = i + 1;
        } else {
          break;
        }
      }

      const newArray = [...current];
      newArray.splice(insertPosition, 0, newRetest);
      return { ...prev, [testId]: newArray };
    });
  };

  return (
    <TestResultsContext.Provider
      value={{
        testResults,
        updateTestResult,
        addRetest,
        addTest,
        deleteTest,
        deleteTestsBySampleId,
        renameSampleId,
        getParameterResults,
        initializeParameterResults,
        updateParameterResult,
        addParameterRetest,
        addNewParameter,
        deleteParameter,
        getSubtestResults,
        initializeSubtestResults,
        updateSubtestResult,
        addSubtestRetest,
      }}
    >
      {children}
    </TestResultsContext.Provider>
  );
}

export function useTestResults() {
  const context = useContext(TestResultsContext);
  if (context === undefined) {
    throw new Error("useTestResults must be used within a TestResultsProvider");
  }
  return context;
}
