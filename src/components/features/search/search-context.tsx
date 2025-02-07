'use client';
import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface SearchContextProps {
  openSearchDialog: boolean;
  setSearchDialog: (open: boolean | ((prevOpen: boolean) => boolean)) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [openSearchDialog, setSearchDialog] = useState(false);

  return <SearchContext.Provider value={{ openSearchDialog, setSearchDialog }}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
