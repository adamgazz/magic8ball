import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_RESPONSES } from '../constants/defaultResponses';
import { loadResponses, saveResponses } from '../utils/storage';

export function useResponseList() {
  const [responses, setResponses] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from storage on mount
  useEffect(() => {
    loadResponses().then((stored) => {
      if (stored && stored.length > 0) {
        setResponses(stored);
      } else {
        setResponses(DEFAULT_RESPONSES);
      }
      setIsLoaded(true);
    });
  }, []);

  // Persist whenever responses change (after initial load)
  useEffect(() => {
    if (!isLoaded) return;
    saveResponses(responses);
  }, [responses, isLoaded]);

  const addResponse = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setResponses((prev) => [...prev, trimmed]);
  }, []);

  const editResponse = useCallback((index: number, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setResponses((prev) => {
      const next = [...prev];
      next[index] = trimmed;
      return next;
    });
  }, []);

  const deleteResponse = useCallback((index: number) => {
    setResponses((prev) => {
      if (prev.length <= 1) return prev; // guard: never empty
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    setResponses(DEFAULT_RESPONSES);
  }, []);

  const pickRandom = useCallback((): string => {
    if (responses.length === 0) return '…';
    const idx = Math.floor(Math.random() * responses.length);
    return responses[idx];
  }, [responses]);

  return { responses, addResponse, editResponse, deleteResponse, resetToDefaults, pickRandom, isLoaded };
}
