import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const COCContext = createContext(undefined);

// Initial mock COCs
const initialCOCs = [
  {
    cocNumber: "COC-2026-001",
    clientName: "City Water Department",
    dateReceived: "2026-01-15",
    sampleCount: 5,
    status: "Completed",
    samples: [
      { id: "S_DW_01", type: "Drinking Water" },
      { id: "S_DW_02", type: "Drinking Water" },
      { id: "S_DW_03", type: "Drinking Water" },
      { id: "S_WW_01", type: "Wastewater" },
      { id: "S_SW_01", type: "Surface Water" },
    ],
    testsCompleted: 40,
    totalTests: 40,
  },
  {
    cocNumber: "COC-2026-002",
    clientName: "ABC Manufacturing",
    dateReceived: "2026-01-18",
    sampleCount: 3,
    status: "In Progress",
    samples: [
      { id: "S_IE_01", type: "Industrial Effluent" },
      { id: "S_IE_02", type: "Industrial Effluent" },
      { id: "S_PW_01", type: "Process Water" },
    ],
    testsCompleted: 15,
    totalTests: 24,
  },
  {
    cocNumber: "COC-2026-003",
    clientName: "Green Valley Community",
    dateReceived: "2026-01-20",
    sampleCount: 4,
    status: "Completed",
    samples: [
      { id: "S_DW_04", type: "Drinking Water" },
      { id: "S_DW_05", type: "Drinking Water" },
      { id: "S_DW_06", type: "Drinking Water" },
      { id: "S_DW_07", type: "Drinking Water" },
    ],
    testsCompleted: 32,
    totalTests: 32,
  },
  {
    cocNumber: "COC-2026-004",
    clientName: "River Basin Authority",
    dateReceived: "2026-01-22",
    sampleCount: 6,
    status: "In Progress",
    samples: [
      { id: "S_SW_02", type: "Surface Water" },
      { id: "S_SW_03", type: "Surface Water" },
      { id: "S_GW_01", type: "Groundwater" },
      { id: "S_GW_02", type: "Groundwater" },
      { id: "S_SW_04", type: "Surface Water" },
      { id: "S_GW_03", type: "Groundwater" },
    ],
    testsCompleted: 30,
    totalTests: 48,
  },
];

const initialCOCDetails = {
  "COC-2026-001": {
    clientName: "City Water Department",
    dateReceived: "2026-01-15",
    location: "Downtown Treatment Plant",
    status: "Completed",
    projectName: "Water Quality Assessment 2026",
    receivedBy: "Sarah Johnson",
    relinquishedBy: "Mike Chen",
    receivedTime: "09:30 AM",
    dateRequired: "2026-01-22",
    isRush: false,
    createdAt: "2026-01-15 09:30:00",
  },
  "COC-2026-002": {
    clientName: "ABC Manufacturing",
    dateReceived: "2026-01-18",
    location: "Industrial District",
    status: "In Progress",
    projectName: "Industrial Wastewater Monitoring",
    receivedBy: "John Smith",
    relinquishedBy: "Emily Davis",
    receivedTime: "02:15 PM",
    dateRequired: "2026-01-25",
    isRush: true,
    dateForRush: "2026-01-20",
    createdAt: "2026-01-18 14:15:00",
  },
  "COC-2026-003": {
    clientName: "Green Valley Community",
    dateReceived: "2026-01-20",
    location: "Residential Area",
    status: "Completed",
    projectName: "Community Water Safety Check",
    receivedBy: "Sarah Johnson",
    relinquishedBy: "Robert Lee",
    receivedTime: "10:00 AM",
    dateRequired: "2026-01-27",
    isRush: false,
    createdAt: "2026-01-20 10:00:00",
  },
  "COC-2026-004": {
    clientName: "River Basin Authority",
    dateReceived: "2026-01-22",
    location: "Basin Monitoring Site",
    status: "In Progress",
    projectName: "Environmental Impact Study",
    receivedBy: "John Smith",
    relinquishedBy: "Amanda White",
    receivedTime: "11:45 AM",
    dateRequired: "2026-01-29",
    isRush: false,
    createdAt: "2026-01-22 11:45:00",
  },
};

export function COCProvider({ children }) {
  const [cocs, setCocs] = useState(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("lims_cocs") : null;
    return stored ? JSON.parse(stored) : initialCOCs;
  });

  const [cocDetails, setCocDetails] = useState(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("lims_coc_details")
        : null;
    return stored ? JSON.parse(stored) : initialCOCDetails;
  });

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("lims_cocs", JSON.stringify(cocs));
  }, [cocs]);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("lims_coc_details", JSON.stringify(cocDetails));
  }, [cocDetails]);

  const addCOC = (coc, details) => {
    setCocs((prev) => [coc, ...prev]);
    setCocDetails((prev) => ({
      ...prev,
      [coc.cocNumber]: details,
    }));
  };

  const updateCOC = (cocNumber, updates) => {
    setCocs((prev) =>
      prev.map((coc) =>
        coc.cocNumber === cocNumber ? { ...coc, ...updates } : coc,
      ),
    );
  };

  const updateCOCDetails = (cocNumber, updates) => {
    setCocDetails((prev) => ({
      ...prev,
      [cocNumber]: {
        ...prev[cocNumber],
        ...updates,
      },
    }));
  };

  const getCOCDetails = (cocNumber) => {
    return cocDetails[cocNumber] || null;
  };

  const deleteCOC = (cocNumber) => {
    setCocs((prev) => prev.filter((coc) => coc.cocNumber !== cocNumber));
    setCocDetails((prev) => {
      const { [cocNumber]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <COCContext.Provider
      value={{
        cocs,
        cocDetails,
        addCOC,
        updateCOC,
        updateCOCDetails,
        getCOCDetails,
        deleteCOC,
      }}
    >
      {children}
    </COCContext.Provider>
  );
}

export function useCOC() {
  const context = useContext(COCContext);
  if (context === undefined) {
    throw new Error("useCOC must be used within a COCProvider");
  }
  return context;
}
