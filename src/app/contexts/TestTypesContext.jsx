import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useUser } from "@/app/contexts/UserContext";
import { lookupService } from "@/services/lookupService";

const TestTypesContext = createContext(undefined);

export function TestTypesProvider({ children }) {
  const { user } = useUser();

  const [testTypes, setTestTypes] = useState([]);

  const [testTypesForCocCreation, setTestTypesForCocCreation] = useState([]); // [new]

  // [new] getActiveTestTypes
  useEffect(() => {
    const fetchLookupData = async () => {
      if (user) {
        try {
          const res = await lookupService.getActiveTestTypes();
          console.log(res);

          setTestTypesForCocCreation(res);
        } catch (error) {
          console.error("Failed to fetch test types for COC:", error);
        }
      }
    };
    fetchLookupData();
  }, [user]);

  const addTestType = testType => {
    setTestTypes(prev => [...prev, testType]);
  };

  const updateTestType = (id, updates) => {
    setTestTypes(prev =>
      prev.map(tt => (tt.id === id ? { ...tt, ...updates } : tt)),
    );
  };

  const deleteTestType = id => {
    setTestTypes(prev => prev.filter(tt => tt.id !== id));
  };

  const toggleTestTypeActive = id => {
    setTestTypes(prev =>
      prev.map(tt => (tt.id === id ? { ...tt, isActive: !tt.isActive } : tt)),
    );
  };

  const resetToDefaults = () => {
    setTestTypes(defaultTestTypes);
    if (typeof window !== "undefined")
      localStorage.setItem(
        "lims_test_types_v2",
        JSON.stringify(defaultTestTypes),
      );
  };

  return (
    <TestTypesContext.Provider
      value={{
        testTypes,
        testTypesForCocCreation,
        addTestType,
        updateTestType,
        deleteTestType,
        toggleTestTypeActive,
        resetToDefaults,
      }}
    >
      {children}
    </TestTypesContext.Provider>
  );
}

export function useTestTypes() {
  const context = useContext(TestTypesContext);
  if (context === undefined) {
    throw new Error("useTestTypes must be used within a TestTypesProvider");
  }
  return context;
}
