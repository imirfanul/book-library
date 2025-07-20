import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Font } from '../types';

export const useFonts = () => {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFonts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getFonts();
      setFonts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch fonts');
    } finally {
      setLoading(false);
    }
  };

  const uploadFont = async (file: File, name?: string) => {
    try {
      const formData = new FormData();
      formData.append('font', file);
      if (name) {
        formData.append('name', name);
      }

      const newFont = await apiService.uploadFont(formData);
      setFonts(prev => [...prev, newFont]);
      return newFont;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to upload font');
    }
  };

  const deleteFont = async (fontId: string) => {
    try {
      await apiService.deleteFont(fontId);
      setFonts(prev => prev.filter(font => font.id !== fontId));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete font');
    }
  };

  const updateFont = async (fontId: string, data: Partial<Font>) => {
    try {
      const updatedFont = await apiService.updateFont(fontId, data);
      setFonts(prev => prev.map(font => 
        font.id === fontId ? updatedFont : font
      ));
      return updatedFont;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update font');
    }
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  return {
    fonts,
    loading,
    error,
    uploadFont,
    deleteFont,
    updateFont,
    refetch: fetchFonts,
  };
};