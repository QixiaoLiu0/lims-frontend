import dayjs from "dayjs";
import { useState } from "react";
import { useTestTypes } from "@/app/contexts/TestTypesContext";

import { cocService } from "@/services/cocService";

const waterTypeAbbreviations = {
  "Drinking Water": "DW",
  "Waste Water": "WW",
  "Surface Water": "SW",
  "Ground Water": "GW",
  "Industrial Effluent": "IE",
  "Process Water": "PW",
  "Raw Water": "RW",
  "Industrial Water": "IW",
};

export const matrixs = Object.keys(waterTypeAbbreviations);

export function useAddCOCForm(onAdd, onClose) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { testTypes, testTypesForCocCreation } = useTestTypes();

  const [clientName, setClientName] = useState("");

  const [cocNumberInput, setCocNumberInput] = useState(""); //cocNumber
  const [projectName, setProjectName] = useState("");
  const [reportName, setReportName] = useState(""); //reportToName1
  const [reportEmail, setReportEmail] = useState(""); //reportToEmail1
  const [dateRequired, setDateRequired] = useState("");
  const [rushRequest, setRushRequest] = useState(false); //isRush
  const [rushRequestDate, setRushRequestDate] = useState(""); //dateForRush
  const [receiver, setReceiver] = useState(""); //receivedBy
  const [receivedTime, setReceivedTime] = useState(""); //receivedTime
  const [relinquisher, setRelinquisher] = useState(""); //relinquishedBy
  const [relinquishedTime, setRelinquishedTime] = useState("");
  const [totalBottles, setTotalBottles] = useState(""); //numberOfContainers

  const [samples, setSamples] = useState([]);

  // [new] this is a function to assembly the payload(filed mapping, filtering) of Api4: Create COC
  const assemblyPayload = () => {
    // helper: format to `YYYY-MM-DD HH:mm:ss`
    const formatDateTime = (val) => {
      if (!val) return "";
      return dayjs(val).isValid()
        ? dayjs(val).format("YYYY-MM-DD HH:mm:ss")
        : "";
    };

    const createCocPayload = {
      cocNumber: cocNumberInput || "",
      projectName: projectName || "",
      reportToName1: reportName || "",
      reportToEmail1: reportEmail || "",
      reportToName2: "",
      reportToEmail2: "",

      dateRequired: formatDateTime(dateRequired),
      isRush: rushRequest ? 1 : 0,
      dateForRush: formatDateTime(rushRequestDate),

      receivedBy: receiver || "",
      receivedTime: formatDateTime(receivedTime),
      relinquishedBy: relinquisher || "",
      relinquishedTime: formatDateTime(relinquishedTime),

      numberOfContainers: Number(totalBottles) || 0,
      specialInstructions: "",

      // Samples fields cleaning & mapping
      samples: samples.map((sample) => {
        // concat collectionDate and collectionTime to form sampledTime
        let formattedSampledTime = "";
        if (sample.collectionDate && sample.collectionTime) {
          const rawDateTime = `${sample.collectionDate} ${sample.collectionTime}`;
          formattedSampledTime = dayjs(rawDateTime).isValid()
            ? dayjs(rawDateTime).format("YYYY-MM-DD HH:mm:ss")
            : "";
        } else if (sample.collectionDate) {
          formattedSampledTime = dayjs(sample.collectionDate).isValid()
            ? dayjs(sample.collectionDate).format("YYYY-MM-DD HH:mm:ss")
            : "";
        }

        // Get `customSamplingPoint` first
        const finalSamplingPoint =
          sample.customSamplingPoint && sample.customSamplingPoint.trim() !== ""
            ? sample.customSamplingPoint
            : sample.samplingPoint || "";

        const isFiltered = sample.filtered ? 1 : 0;
        const isPreserved = sample.preserved ? 1 : 0;

        return {
          sampleTypeId: 1, // Hardcode it first then call the actual `API 2. Get Sample Types` later.
          sampleClientId: sample.sampleClientId || "",
          sampledTime: formattedSampledTime,
          samplingPoint: finalSamplingPoint,
          matrix: sample.matrix || "",
          numberOfContainers: Number(sample.numberOfContainers) || 0,
          remarks: sample.remarks || "",

          // Volume
          initialVolume: Number(sample.initialVolume) || 0,
          remainingVolume: Number(sample.initialVolume) || 0,

          isFiltered: isFiltered,
          isPreserved: isPreserved,
          isFilteredAndPreserved: isFiltered === 1 && isPreserved === 1 ? 1 : 0,

          // Selected test type ID array
          testTypeIds: sample.selectedTests || [],
        };
      }),
    };

    // console.log(
    //   "Assembled Payload:",
    //   JSON.stringify(createCocPayload, null, 2),
    // );

    return createCocPayload;
  };

  const addSample = () => {
    const newSample = {
      id: `temp-${Date.now()}`, //an id field for sample card ui iteration
      sampleClientId: "", //sample client Id
      sampleType: "Water",
      matrix: "Drinking Water",
      samplingPoint: "Inlet", //replace `category` with `samplingPoint`
      customSamplingPoint: "",
      collectionTime: new Date().toTimeString().slice(0, 5),
      collectionDate: new Date().toISOString().split("T")[0],
      initialVolume: "",
      numberOfContainers: "",
      filtered: false,
      preserved: false,
      selectedTests: [],
    };
    setSamples([...samples, newSample]);
  };

  const removeSample = (id) => {
    setSamples(samples.filter((s) => s.id !== id));
  };

  const updateSample = (id, field, value) => {
    setSamples(
      samples.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  // [modified] use id instead of sampleId (sampleId might be repeated from user input)
  const toggleTest = (id, testId) => {
    setSamples((prevSamples) =>
      prevSamples.map((s) => {
        if (s.id === id) {
          const currentSelected = s.selectedTests || [];
          const exists = currentSelected.includes(testId);

          const updatedSelected = exists
            ? currentSelected.filter((t) => t !== testId)
            : [...currentSelected, testId];

          return {
            ...s,
            selectedTests: updatedSelected,
          };
        }
        return s;
      }),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    //a flag to indicate create successfully
    let isSuccess = false;

    try {
      const assembledPayload = assemblyPayload();
      const res = await cocService.create(assembledPayload);

      const cocId = res?.data?.cocId || res?.cocId;

      if (onAdd && cocId) {
        try {
          onAdd(cocId);
        } catch (addError) {
          console.error("Dashboard onAdd 回调执行报错:", addError);
        }
      }

      isSuccess = true;
    } catch (error) {
      console.error("创建 COC 失败:", error);
    } finally {
      setIsSubmitting(false);
    }

    if (isSuccess && typeof onClose === "function") {
      onClose();
    }
  };

  // [new]
  const totalContainers = samples.reduce((sum, s) => {
    const count = Number(s.numberOfContainers) || 0;
    return sum + count;
  }, 0);

  return {
    totalContainers,
    // testTypes,
    testTypesForCocCreation,
    isSubmitting,
    cocNumberInput,
    setCocNumberInput,
    clientName,
    setClientName,
    projectName,
    setProjectName,
    dateRequired,
    setDateRequired,
    reportName,
    setReportName,
    reportEmail,
    setReportEmail,
    rushRequest,
    setRushRequest,
    rushRequestDate,
    setRushRequestDate,
    relinquishedTime,
    setRelinquishedTime,
    receivedTime,
    setReceivedTime,
    receiver,
    setReceiver,
    relinquisher,
    setRelinquisher,
    totalBottles,
    setTotalBottles,
    samples,
    addSample,
    removeSample,
    updateSample,
    toggleTest,
    handleSubmit,
  };
}
