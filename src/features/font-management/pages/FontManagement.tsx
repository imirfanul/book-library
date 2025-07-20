import React, { useState } from 'react';
import { Card } from '../../../shared/components/UI';
import { FontUpload } from '../components/FontUpload';
import { FontList } from '../components/FontList';
import { FontGroupCreator } from '../components/FontGroupCreator';
import { FontGroupList } from '../components/FontGroupList';
import { Font, FontGroup } from '../../../shared/types';

export const FontManagement: React.FC = () => {
  const [fonts, setFonts] = useState<Font[]>([
    {
      id: '1',
      name: 'Roboto',
      filename: 'Roboto-Regular.ttf',
      uploadedAt: new Date('2025-01-15')
    },
    {
      id: '2',
      name: 'Times New Roman',
      filename: 'TimesNewRoman.ttf',
      uploadedAt: new Date('2025-01-15')
    },
    {
      id: '3',
      name: 'Verdana',
      filename: 'Verdana.ttf',
      uploadedAt: new Date('2025-01-15')
    }
  ]);

  const [fontGroups, setFontGroups] = useState<FontGroup[]>([
    {
      id: '1',
      name: 'Example 1',
      fonts: [fonts[0], fonts[1]],
      createdAt: new Date('2025-01-15')
    },
    {
      id: '2',
      name: 'Example 2',
      fonts: [fonts[0], fonts[1], fonts[2]],
      createdAt: new Date('2025-01-15')
    }
  ]);

  const handleFontUpload = (file: File) => {
    const newFont: Font = {
      id: Date.now().toString(),
      name: file.name.replace('.ttf', ''),
      filename: file.name,
      uploadedAt: new Date()
    };
    setFonts(prev => [...prev, newFont]);
  };

  const handleFontDelete = (fontId: string) => {
    setFonts(prev => prev.filter(font => font.id !== fontId));
  };

  const handleGroupCreate = (groupData: { name: string; fonts: Font[] }) => {
    const newGroup: FontGroup = {
      id: Date.now().toString(),
      name: groupData.name,
      fonts: groupData.fonts,
      createdAt: new Date()
    };
    setFontGroups(prev => [...prev, newGroup]);
  };

  const handleGroupEdit = (groupId: string, updatedGroup: Partial<FontGroup>) => {
    setFontGroups(prev => 
      prev.map(group => 
        group.id === groupId ? { ...group, ...updatedGroup } : group
      )
    );
  };

  const handleGroupDelete = (groupId: string) => {
    setFontGroups(prev => prev.filter(group => group.id !== groupId));
  };

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
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <div className="animate-in slide-in-from-left duration-700 delay-200">
            <FontUpload onUpload={handleFontUpload} />
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