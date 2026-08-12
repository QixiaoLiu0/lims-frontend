import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cocService } from "@/services/cocService";

export function useDashboard() {
  const router = useRouter();
  // [new] used to store the actual list of coc requested from the backend
  const [cocs, setCocs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showAddCOCModal, setShowAddCOCModal] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const [activeMenuCOC, setActiveMenuCOC] = useState(null); // the card is currently open
  const [expandedSamplesCOC, setExpandedSamplesCOC] = useState(null); //which card's sample list is expanded.

  const fetchDashboardList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await cocService.getDashboardList();

      const realList = Array.isArray(res)
        ? res
        : res.data?.data || res.data || [];
      console.log("cocService.getDashboardList:", realList);

      setCocs(realList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardList();
  }, [fetchDashboardList]);

  // Memoize filtered COCs logic
  const filteredCOCs = useMemo(() => {

    if (!cocs || !Array.isArray(cocs)) return [];

    return cocs.filter((coc) => {
      const safeCocNumber = coc.cocNumber || "";
      const safeProjectName = coc.projectName || "";
      const safeSearchQuery = (searchQuery || "").toLowerCase();

      const matchesSearch =
        safeCocNumber.toLowerCase().includes(safeSearchQuery) ||
        safeProjectName.toLowerCase().includes(safeSearchQuery);

      //  receivedTime
      let matchesStartDate = true;
      let matchesEndDate = true;

      // Filtering and validation are only performed if the user selects a date range.
      if (startDate || endDate) {
        const safeDateStr = coc.receivedTime
          ? coc.receivedTime.replace(" ", "T")
          : null;
        const cocDate = safeDateStr ? new Date(safeDateStr) : null;

        if (cocDate && !isNaN(cocDate.getTime())) {
          if (startDate) {
            const start = new Date(`${startDate}T00:00:00`);
            matchesStartDate = cocDate >= start;
          }
          if (endDate) {
            const end = new Date(`${endDate}T23:59:59`);
            matchesEndDate = cocDate <= end;
          }
        } else {
          matchesStartDate = false;
          matchesEndDate = false;
        }
      }

      const matchesStatus =
        !selectedStatuses ||
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(coc.status);


      return (
        matchesSearch && matchesStartDate && matchesEndDate && matchesStatus
      );
    });
  }, [cocs, searchQuery, startDate, endDate, selectedStatuses]);

  // delete COC
  const handleDeleteCOC = useCallback(
    async (cocId) => {
      try {
        setLoading(true);
        await cocService.delete(cocId);
        await fetchDashboardList();
      } catch (error) {
        console.error("delete COC failed:", error);
      } finally {
        setLoading(false);
      }
    },
    [fetchDashboardList],
  );

  const handleAddCOC = useCallback(
    (newCocId) => {
      setShowAddCOCModal(false);

      if (newCocId) {
        router.push(`/coc/${newCocId}`);
      } else {
        fetchDashboardList();
      }
    },
    [fetchDashboardList, router],
  );

  const handleNavigate = useCallback(
    (cocId) => {
      router.push(`/coc/${cocId}`);
    },
    [router],
  );

  const handleClearFilters = useCallback(() => {
    setStartDate("");
    setEndDate("");
    setSearchQuery("");
    setSelectedStatuses([]);
  }, []);

  return {
    cocs,
    loading,
    fetchDashboardList,
    //ui state
    searchQuery,
    setSearchQuery,
    showSettings,
    setShowSettings,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showAddCOCModal,
    setShowAddCOCModal,
    selectedStatuses,
    setSelectedStatuses,
    showStatusDropdown,
    setShowStatusDropdown,

    filteredCOCs,
    handleAddCOC,
    handleNavigate,
    handleClearFilters,
    activeMenuCOC,
    setActiveMenuCOC,
    expandedSamplesCOC,
    setExpandedSamplesCOC,
    handleDeleteCOC,
  };
}
