"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface StorageContextProps {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
}

const StorageContext = createContext<StorageContextProps | undefined>(
  undefined
);

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const getItem = (key: string): string | null => {
    return localStorage.getItem(key);
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  return (
    <StorageContext.Provider value={{ setItem, getItem, removeItem }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = (): StorageContextProps => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorage must be used within a StorageProvider");
  }
  return context;
};
