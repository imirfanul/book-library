import React, { useState } from 'react';
import { Plus, X, GripVertical, Layers } from 'lucide-react';
import { Card, Button, Input, Select } from '../../../shared/components/UI';
import { Font } from '../../../shared/types';

interface FontGroupCreatorProps {
  fonts: Font[];
  onCreate: (groupData: { name: string; fonts: Font[] }) => void;
}

interface FontRow {
  id: string;
  selectedFont: Font | null;
}

export const FontGroupCreator: React.FC<FontGroupCreatorProps> = ({ fonts, onCreate }) => {
  const [groupName, setGroupName] = useState('');
  const [fontRows, setFontRows] = useState<FontRow[]>([
    { id: '1', selectedFont: null }
  ]);
  const [errors, setErrors] = useState<string[]>([]);

  const addRow = () => {
    const newRow: FontRow = {
      id: Date.now().toString(),
      selectedFont: null
    };
    setFontRows(prev => [...prev, newRow]);
  };

  const removeRow = (rowId: string) => {
    if (fontRows.length > 1) {
      setFontRows(prev => prev.filter(row => row.id !== rowId));
    }
  };

  const updateRow = (rowId: string, selectedFont: Font | null) => {
    setFontRows(prev => 
      prev.map(row => 
        row.id === rowId ? { ...row, selectedFont } : row
      )
    );
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    
    if (!groupName.trim()) {
      newErrors.push('Group name is required');
    }
    
    const selectedFonts = fontRows.filter(row => row.selectedFont);
    if (selectedFonts.length < 2) {
      newErrors.push('You must select at least two fonts');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const selectedFonts = fontRows
        .filter(row => row.selectedFont)
        .map(row => row.selectedFont!);
      
      onCreate({
        name: groupName,
        fonts: selectedFonts
      });

      // Reset form
      setGroupName('');
      setFontRows([{ id: '1', selectedFont: null }]);
      setErrors([]);
    }
  };

  const fontOptions = [
    { value: '', label: 'Select a Font' },
    ...fonts.map(font => ({ value: font.id, label: font.name }))
  ];

  return (
    <Card variant="elevated" className="p-8">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
            <Layers className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Create Font Group</h2>
            <p className="text-slate-600">Select at least two fonts to create a group</p>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl animate-in slide-in-from-top-2 duration-300">
            {errors.map((error, index) => (
              <p key={index} className="text-red-700 font-medium">{error}</p>
            ))}
          </div>
        )}

        <div className="space-y-6">
          <Input
            placeholder="Enter group name..."
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="text-lg font-medium"
          />

          <div className="space-y-4">
            {fontRows.map((row, index) => (
              <div 
                key={row.id} 
                className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all duration-300 group animate-in slide-in-from-right duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <GripVertical className="text-slate-400 group-hover:text-indigo-500 transition-colors duration-300" size={20} />
                
                <div className="flex-1">
                  <Select
                    value={row.selectedFont?.id || ''}
                    onChange={(e) => {
                      const selectedFont = fonts.find(f => f.id === e.target.value) || null;
                      updateRow(row.id, selectedFont);
                    }}
                    options={fontOptions}
                  />
                </div>

                {fontRows.length > 1 && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeRow(row.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="secondary"
              onClick={addRow}
              className="flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>Add Font</span>
            </Button>

            <Button
              variant="success"
              onClick={handleSubmit}
              size="lg"
              className="px-8"
            >
              Create Group
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};