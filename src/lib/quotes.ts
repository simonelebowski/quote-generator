"use client"; 

import { Quote } from "@/types/quote";
const STORAGE_KEY = "quotes_v1";

export const loadSavedQuotes = (): Quote[] => {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    return raw ? JSON.parse(raw) as Quote[] : [];
  } catch {
    return [];
  }
};

export const saveQuotes = (quotes: Quote[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
  }
};
