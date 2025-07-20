import React, { useState } from 'react';
import { Edit2, Trash2, Layers3 } from 'lucide-react';
import { Card, Button } from '../../../shared/components/UI';
import { FontGroup, Font } from '../../../shared/types';
import { FontGroupEditModal } from './FontGroupEditModal';

interface FontGroupListProps {
  groups: FontGroup[];
  onEdit: (groupId: string, updatedGroup: Partial<FontGroup>) => void;
  onDelete: (groupId: string) => void;
  availableFonts: Font[];
}

export const FontGroupList: React.FC<FontGroupListProps> = ({ 
  groups, 
  onEdit, 
  onDelete, 
  availableFonts 
}) => {
  const [editingGroup, setEditingGroup] = useState<FontGroup | null>(null);

  return (
    <>
      <Card variant="elevated" className="p-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Layers3 className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Font Groups</h2>
              <p className="text-slate-600">Manage your organized font collections</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 text-sm font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-3">
              <div>Name</div>
              <div>Fonts</div>
              <div>Count</div>
              <div className="text-right">Actions</div>
            </div>

            {/* Groups List */}
            {groups.length === 0 ? (
              <div className="text-center py-12">
                <Layers3 className="mx-auto text-slate-300 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No font groups created</h3>
                <p className="text-slate-500">Create your first font group to organize your fonts</p>
              </div>
            ) : (
              <div className="space-y-3">
                {groups.map((group, index) => (
                  <div 
                    key={group.id} 
                    className="grid grid-cols-4 gap-4 items-center p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group animate-in slide-in-from-left duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors duration-300">
                      {group.name}
                    </div>
                    <div className="text-slate-600 group-hover:text-indigo-600 transition-colors duration-300">
                      {group.fonts.map(font => font.name).join(', ')}
                    </div>
                    <div className="text-slate-600 group-hover:text-indigo-600 transition-colors duration-300">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 group-hover:bg-indigo-100 group-hover:text-indigo-800 transition-colors duration-300">
                        {group.fonts.length} fonts
                      </span>
                    </div>
                    <div className="text-right space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setEditingGroup(group)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(group.id)}
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

      {editingGroup && (
        <FontGroupEditModal
          group={editingGroup}
          availableFonts={availableFonts}
          onSave={(updatedGroup) => {
            onEdit(editingGroup.id, updatedGroup);
            setEditingGroup(null);
          }}
          onCancel={() => setEditingGroup(null)}
        />
      )}
    </>
  );
};