import { useState, type ReactNode } from 'react';
import { PaginationContext } from './PaginationContext';

export interface PaginationContextType {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
}

interface PaginationContextProviderProps {
  children: ReactNode;
}

export const PaginationContextProvider = ({
  children,
}: PaginationContextProviderProps) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const contextValue: PaginationContextType = {
    pageNumber,
    setPageNumber,
  };

  return (
    <PaginationContext.Provider value={contextValue}>
      {children}
    </PaginationContext.Provider>
  );
};
