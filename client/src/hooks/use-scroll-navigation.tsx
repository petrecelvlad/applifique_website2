import { createContext, useContext, ReactNode } from "react";

interface ScrollNavigationContextType {
  currentSection: number;
  totalSections: number;
  goToSection: (index: number) => void;
  isScrolling: boolean;
}

const ScrollNavigationContext = createContext<ScrollNavigationContextType | null>(null);

interface ScrollNavigationProviderProps {
  children: ReactNode;
  currentSection: number;
  totalSections: number;
  goToSection: (index: number) => void;
  isScrolling: boolean;
}

export function ScrollNavigationProvider({
  children,
  currentSection,
  totalSections,
  goToSection,
  isScrolling
}: ScrollNavigationProviderProps) {
  return (
    <ScrollNavigationContext.Provider
      value={{
        currentSection,
        totalSections,
        goToSection,
        isScrolling
      }}
    >
      {children}
    </ScrollNavigationContext.Provider>
  );
}

export function useScrollNavigation() {
  const context = useContext(ScrollNavigationContext);
  if (!context) {
    throw new Error('useScrollNavigation must be used within ScrollNavigationProvider');
  }
  return context;
}