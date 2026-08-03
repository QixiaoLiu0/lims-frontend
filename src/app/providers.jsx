"use client";

import { UserProvider } from "./contexts/UserContext";
import { TestResultsProvider } from "./contexts/TestResultsContext";
import { TestTypesProvider } from "./contexts/TestTypesContext";
import { COCProvider } from "./contexts/COCContext";
import { SampleProvider } from "./contexts/SampleContext";
import { ThemeProvider } from "./contexts/ThemeContext";

export function Providers({ children }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <TestResultsProvider>
          <TestTypesProvider>
            <COCProvider>
              <SampleProvider>{children}</SampleProvider>
            </COCProvider>
          </TestTypesProvider>
        </TestResultsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
