import React from 'react';
import { Trash2, Type } from 'lucide-react';
import { Card, Button } from '../../../shared/components/UI';
import { Font } from '../../../shared/types';

interface FontListProps {
  fonts: Font[];
  onDelete: (fontId: string) => void;
}

export const FontList: React.FC<FontListProps> = ({ fonts, onDelete }) => {
  return (
    <Card variant="elevated" className="p-8">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <Type className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Our Fonts</h2>
            <p className="text-slate-600">Browse and manage your font collection</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 text-sm font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-3">
            <div>Font Name</div>
            <div>Preview</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Font List */}
          {fonts.length === 0 ? (
            <div className="text-center py-12">
              <Type className="mx-auto text-slate-300 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">No fonts uploaded yet</h3>
              <p className="text-slate-500">Upload your first font to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {fonts.map((font, index) => (
                <div 
                  key={font.id} 
                  className="grid grid-cols-3 gap-4 items-center p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group animate-in slide-in-from-left duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors duration-300">
                    {font.name}
                  </div>
                  <div 
                    className="text-slate-600 italic text-lg group-hover:text-indigo-600 transition-colors duration-300"
                    style={{ fontFamily: font.name }}
                  >
                    Example Style
                  </div>
                  <div className="text-right">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(font.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};