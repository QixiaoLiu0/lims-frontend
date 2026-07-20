import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const TestTypesContext = createContext(undefined);

const defaultTestTypes = [
  {
    id: "TT-001",
    name: "ICP",
    description: "Inductively Coupled Plasma analysis for metal detection",
    color: "bg-purple-100",
    iconColor: "bg-purple-600",
    borderColor: "border-purple-400",
    category: "ICP",
    isActive: true,
    hasSubtests: false,
    parameters: [
      "Li DM",
      "Be DM",
      "Mg DM",
      "Al DM",
      "P DM",
      "Ca DM",
      "Ti DM",
      "V DM",
      "Cr DM",
      "Mn DM",
      "Fe DM",
      "Co DM",
      "Ni DM",
      "Cu DM",
      "Zn DM",
      "As DM",
      "Se DM",
      "Sr DM",
      "Mo DM",
      "Cd DM",
      "Sb DM",
      "Ba DM",
      "Tl DM",
      "Pb DM",
      "U DM",
      "Ag DM",
      "Li TM",
      "Be TM",
      "Mg TM",
      "Al TM",
      "P TM",
      "Ca TM",
      "Ti TM",
      "V TM",
      "Cr TM",
      "Mn TM",
      "Fe TM",
      "Co TM",
      "Ni TM",
      "Cu TM",
      "Zn TM",
      "As TM",
      "Se TM",
      "Sr TM",
      "Mo TM",
      "Cd TM",
      "Sb TM",
      "Ba TM",
      "Tl TM",
      "Pb TM",
      "U TM",
      "Ag TM",
      "B DM",
      "Na DM",
      "Si DM",
      "S DM",
      "K DM",
      "B TM",
      "Na TM",
      "Si TM",
      "S TM",
      "K TM",
    ].map((name, i) => ({
      id: `P-ICP-${String(i + 1).padStart(3, "0")}`,
      name,
      unit: "",
    })),
    createdBy: "System",
    createdDate: "2024-01-01",
  },
  {
    id: "TT-002",
    name: "IC",
    description: "Ion Chromatography for anion analysis",
    color: "bg-blue-100",
    iconColor: "bg-blue-600",
    borderColor: "border-blue-400",
    category: "IC",
    isActive: true,
    hasSubtests: false,
    parameters: [
      { name: "F", unit: "ppm" },
      { name: "Cl", unit: "ppm" },
      { name: "NO2", unit: "ppm" },
      { name: "Br", unit: "ppm" },
      { name: "NO3", unit: "ppm" },
      { name: "SO4", unit: "ppm" },
      { name: "PO4", unit: "ppm" },
    ].map((p, i) => ({
      id: `P-IC-${String(i + 1).padStart(3, "0")}`,
      name: p.name,
      unit: p.unit,
    })),
    createdBy: "System",
    createdDate: "2024-01-01",
  },
  {
    id: "TT-003",
    name: "Alkalinity",
    description: "Total Alkalinity measurement",
    color: "bg-green-100",
    iconColor: "bg-green-600",
    borderColor: "border-green-400",
    category: "Alkalinity",
    isActive: true,
    hasSubtests: false,
    parameters: [
      { name: "P Alkalinity", unit: "ppm as CaCO3" },
      { name: "T Alkalinity", unit: "ppm as CaCO3" },
      { name: "Hydrate Alkalinity (OH-)", unit: "ppm as CaCO3" },
      { name: "Carbonate Alkalinity (CO32-)", unit: "ppm as CaCO3" },
      { name: "Bicarbonate Alkalinity (HCO3-)", unit: "ppm as CaCO3" },
      { name: "Carbonate Alkalinity as CO2-", unit: "mg/L" },
      { name: "Bicarbonate Alkalinity as HCO3-", unit: "mg/L" },
      { name: "Hydroxide Alkalinity as OH-", unit: "mg/L" },
    ].map((p, i) => ({
      id: `P-ALK-${String(i + 1).padStart(3, "0")}`,
      name: p.name,
      unit: p.unit,
    })),
    createdBy: "System",
    createdDate: "2024-01-01",
  },
  {
    id: "TT-004",
    name: "TICTOC",
    description: "Total Inorganic Carbon / Total Organic Carbon",
    color: "bg-orange-100",
    iconColor: "bg-orange-600",
    borderColor: "border-orange-400",
    category: "TICTOC",
    isActive: true,
    hasSubtests: false,
    parameters: [
      { name: "TIC result", unit: "ppm IC" },
      { name: "TIC final result", unit: "ppm IC" },
      { name: "TIC as CaCO3", unit: "" },
      { name: "TOC result", unit: "ppmTOC" },
      { name: "TOC final result", unit: "ppmTOC" },
      { name: "TOC as CaCO3", unit: "" },
    ].map((p, i) => ({
      id: `P-TIC-${String(i + 1).padStart(3, "0")}`,
      name: p.name,
      unit: p.unit,
    })),
    createdBy: "System",
    createdDate: "2024-01-01",
  },
  {
    id: "TT-005",
    name: "pH-Conductivity",
    description: "pH and Conductivity measurements",
    color: "bg-pink-100",
    iconColor: "bg-pink-600",
    borderColor: "border-pink-400",
    category: "pH-Conductivity",
    isActive: true,
    hasSubtests: false,
    parameters: [
      { name: "pH", unit: "" },
      { name: "Temperature", unit: "°C" },
      { name: "Conductivity", unit: "mS/cm" },
    ].map((p, i) => ({
      id: `P-PH-${String(i + 1).padStart(3, "0")}`,
      name: p.name,
      unit: p.unit,
    })),
    createdBy: "System",
    createdDate: "2024-01-01",
  },
];

export function TestTypesProvider({ children }) {
  const [testTypes, setTestTypes] = useState(() => {
    try {
      const stored =
        typeof window !== "undefined"
          ? localStorage.getItem("lims_test_types_v2")
          : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Error loading test types from localStorage:", error);
    }
    return defaultTestTypes;
  });

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("lims_test_types_v2", JSON.stringify(testTypes));
  }, [testTypes]);
  const addTestType = (testType) => {
    setTestTypes((prev) => [...prev, testType]);
  };

  const updateTestType = (id, updates) => {
    setTestTypes((prev) =>
      prev.map((tt) => (tt.id === id ? { ...tt, ...updates } : tt)),
    );
  };

  const deleteTestType = (id) => {
    setTestTypes((prev) => prev.filter((tt) => tt.id !== id));
  };

  const toggleTestTypeActive = (id) => {
    setTestTypes((prev) =>
      prev.map((tt) => (tt.id === id ? { ...tt, isActive: !tt.isActive } : tt)),
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
