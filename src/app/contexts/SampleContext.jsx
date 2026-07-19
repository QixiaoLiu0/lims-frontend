import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { mockSamples } from '@/app/data/mockData';

const SampleContext = createContext(undefined);

export function SampleProvider({ children }) {
  const [samples, setSamples] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lims_samples') : null;
    return stored ? JSON.parse(stored) : mockSamples;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('lims_samples', JSON.stringify(samples));
  }, [samples]);

  return (
    <SampleContext.Provider value={{ samples }}>
      {children}
    </SampleContext.Provider>
  );
}

export function useSample() {
  const context = useContext(SampleContext);
  if (context === undefined) {
    throw new Error('useSample must be used within a SampleProvider');
  }
  return context;
}