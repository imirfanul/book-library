import React, { useState } from 'react';
import { Modal, Input, Button } from '../../../shared/components/UI';
import { FontGroup, Font } from '../../../shared/types';

interface FontGroupEditModalProps {
  group: FontGroup;
  availableFonts: Font[];
  onSave: (updatedGroup: Partial<FontGroup>) => void;
  onCancel: () => void;
}

export const FontGroupEditModal: React.FC<FontGroupEditModalProps> = ({
  group,
  availableFonts,
  onSave,
  onCancel
}) => {
  const [name, setName] = useState(group.name);
  const [selectedFontIds, setSelectedFontIds] = useState<string[]>(
    group.fonts.map(font => font.id)
  );
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    
    if (!name.trim()) {
      newErrors.push('Group name is required');
    }
    
    if (selectedFontIds.length < 2) {
      newErrors.push('You must select at least two fonts');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const selectedFonts = availableFonts.filter(font => 
        selectedFontIds.includes(font.id)
      );
      
      onSave({
        name,
        fonts: selectedFonts
      });
    }
  };

  const toggleFont = (fontId: string) => {
    setSelectedFontIds(prev => 
      prev.includes(fontId)
        ? prev.filter(id => id !== fontId)
        : [...prev, fontId]
    );
  };

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title="Edit Font Group"
      size="md"
    >
      <div className="space-y-6">
        {errors.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            {errors.map((error, index) => (
              <p key={index} className="text-red-700 font-medium">{error}</p>
            ))}
          </div>
        )}

        <Input
          label="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter group name..."
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Select Fonts (minimum 2)
          </label>
          <div className="space-y-3 max-h-64 overflow-y-auto border border-slate-200 rounded-xl p-4">
            {availableFonts.map(font => (
              <label 
                key={font.id} 
                className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  checked={selectedFontIds.includes(font.id)}
                  onChange={() => toggleFont(font.id)}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 focus:ring-2"
                />
                <span className="text-slate-700 font-medium">{font.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};