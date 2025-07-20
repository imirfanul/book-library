import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { FontGroup } from '../types';

export const useFontGroups = () => {
  const [fontGroups, setFontGroups] = useState<FontGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFontGroups = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getFontGroups();
      setFontGroups(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch font groups');
    } finally {
      setLoading(false);
    }
  };

  const createFontGroup = async (groupData: {
    name: string;
    description?: string;
    font_ids: string[];
  }) => {
    try {
      const newGroup = await apiService.createFontGroup(groupData);
      setFontGroups(prev => [...prev, newGroup]);
      return newGroup;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create font group');
    }
  };

  const updateFontGroup = async (groupId: string, data: {
    name?: string;
    description?: string;
    font_ids?: string[];
  }) => {
    try {
      const updatedGroup = await apiService.updateFontGroup(groupId, data);
      setFontGroups(prev => prev.map(group => 
        group.id === groupId ? updatedGroup : group
      ));
      return updatedGroup;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update font group');
    }
  };

  const deleteFontGroup = async (groupId: string) => {
    try {
      await apiService.deleteFontGroup(groupId);
      setFontGroups(prev => prev.filter(group => group.id !== groupId));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete font group');
    }
  };

  useEffect(() => {
    fetchFontGroups();
  }, []);

  return {
    fontGroups,
    loading,
    error,
    createFontGroup,
    updateFontGroup,
    deleteFontGroup,
    refetch: fetchFontGroups,
  };
};