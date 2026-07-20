import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { mockSamples } from "@/app/data/mockData";

const SampleContext = createContext(undefined);

export function SampleProvider({ children }) {
  const [samples, setSamples] = useState(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("lims_samples")
        : null;
    return stored ? JSON.parse(stored) : mockSamples;
  });

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("lims_samples", JSON.stringify(samples));
  }, [samples]);

  const addSample = (sample) => {
    setSamples((prev) => [...prev, sample]);
  };

  const updateSample = (sampleId, updates) => {
    setSamples((prev) =>
      prev.map((sample) =>
        sample.id === sampleId ? { ...sample, ...updates } : sample,
      ),
    );
  };

  const getSamplesByCOC = (cocNumber) => {
    return samples.filter((s) => s.cocNumber === cocNumber);
  };

  const getSample = (sampleId) => {
    return samples.find((s) => s.id === sampleId);
  };

  const updateSampleVolume = (sampleId, newVolume) => {
    setSamples((prev) =>
      prev.map((sample) =>
        sample.id === sampleId
          ? { ...sample, remainingVolume: newVolume }
          : sample,
      ),
    );
  };

  const deleteSample = (sampleId) => {
    setSamples((prev) => prev.filter((sample) => sample.id !== sampleId));
  };

  return (
    <SampleContext.Provider
      value={{
        samples,
        addSample,
        updateSample,
        getSamplesByCOC,
        getSample,
        updateSampleVolume,
        deleteSample,
      }}
    >
      {children}
    </SampleContext.Provider>
  );
}

export function useSample() {
  const context = useContext(SampleContext);
  if (context === undefined) {
    throw new Error("useSample must be used within a SampleProvider");
  }
  return context;
}
