import React, { useState } from 'react';
import { Card, Button } from '../../../shared/components/UI';
import { FontUpload } from '../components/FontUpload';
import { FontList } from '../components/FontList';
import { FontGroupCreator } from '../components/FontGroupCreator';
import { FontGroupList } from '../components/FontGroupList';
import { useFonts } from '../../../shared/hooks/useFonts';
import { useFontGroups } from '../../../shared/hooks/useFontGroups';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const FontManagement: React.FC = () => {
  const {
    fonts,
    loading: fontsLoading,
    error: fontsError,
    uploadFont,
    deleteFont,
    refetch: refetchFonts,
  } = useFonts();

  const {
    fontGroups,
    loading: groupsLoading,
    error: groupsError,
    createFontGroup,
    updateFontGroup,
    deleteFontGroup,
    refetch: refetchGroups,
  } = useFontGroups();

  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const handleFontUpload = async (file: File, name?: string) => {
    try {
      setUploadError(null);
      await uploadFont(file, name);
      setUploadSuccess(`Successfully uploaded ${file.name}`);
      setTimeout(() => setUploadSuccess(null), 3000);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const handleFontDelete = async (fontId: string) => {
    try {
      await deleteFont(fontId);
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleGroupCreate = async (groupData: { 
    name: string; 
    description?: string;
    fonts: { id: string }[] 
  }) => {
    try {
      await createFontGroup({
        name: groupData.name,
        description: groupData.description,
        font_ids: groupData.fonts.map(font => font.id),
      });
    } catch (error) {
      console.error('Group creation failed:', error);
    }
  };

  const handleGroupEdit = async (groupId: string, updatedGroup: {
    name?: string;
    description?: string;
    fonts?: { id: string }[];
  }) => {
    try {
      await updateFontGroup(groupId, {
        name: updatedGroup.name,
        description: updatedGroup.description,
        font_ids: updatedGroup.fonts?.map(font => font.id),
      });
    } catch (error) {
      console.error('Group update failed:', error);
    }
  };

  const handleGroupDelete = async (groupId: string) => {
    try {
      await deleteFontGroup(groupId);
    } catch (error) {
      console.error('Group deletion failed:', error);
    }
  };

  const handleRefresh = () => {
    refetchFonts();
    refetchGroups();
  };

  if (fontsLoading || groupsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 text-lg">Loading font management system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
          Font Management System
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Create, organize, and manage your font collections with our professional font management platform
        </p>
        <div className="flex justify-center">
          <Button
            onClick={handleRefresh}
            variant="secondary"
            className="flex items-center space-x-2"
          >
            <RefreshCw size={18} />
            <span>Refresh Data</span>
          </Button>
        </div>
      </div>

      {/* Error Messages */}
      {(fontsError || groupsError) && (
        <Card className="p-6 border-red-200 bg-red-50">
          <div className="flex items-center space-x-3 text-red-700">
            <AlertCircle size={24} />
            <div>
              <h3 className="font-semibold">Connection Error</h3>
              <p className="text-sm">{fontsError || groupsError}</p>
              <p className="text-sm mt-1">Make sure the backend server is running on port 5000</p>
            </div>
          </div>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="animate-in slide-in-from-left duration-700 delay-200">
            <FontUpload 
              onUpload={handleFontUpload}
              error={uploadError}
              success={uploadSuccess}
            />
          </div>
          <div className="animate-in slide-in-from-left duration-700 delay-400">
            <FontList fonts={fonts} onDelete={handleFontDelete} />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-8">
          <div className="animate-in slide-in-from-right duration-700 delay-300">
            <FontGroupCreator fonts={fonts} onCreate={handleGroupCreate} />
          </div>
          <div className="animate-in slide-in-from-right duration-700 delay-500">
            <FontGroupList 
              groups={fontGroups} 
              onEdit={handleGroupEdit}
              onDelete={handleGroupDelete}
              availableFonts={fonts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};