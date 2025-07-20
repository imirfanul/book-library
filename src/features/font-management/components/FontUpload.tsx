import React, { useRef, useState } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from '../../../shared/components/UI';

interface FontUploadProps {
  onUpload: (file: File, name?: string) => Promise<void>;
  error?: string | null;
  success?: string | null;
}

export const FontUpload: React.FC<FontUploadProps> = ({ onUpload, error, success }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (!file.name.toLowerCase().endsWith('.ttf')) {
      setLocalError('Only TTF files are allowed');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setLocalError('File size must be less than 5MB');
      return false;
    }
    setLocalError(null);
    return true;
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && validateFile(file)) {
      setIsUploading(true);
      try {
        await onUpload(file);
      } catch (err) {
        // Error handled by parent component
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setIsUploading(true);
      try {
        await onUpload(file);
        // Reset file input
        e.target.value = '';
      } catch (err) {
        // Error handled by parent component
      } finally {
        setIsUploading(false);
      }
    }
  };

  const displayError = error || localError;

  return (
    <Card variant="elevated" className="p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Font</h2>
          <p className="text-slate-600">Drag and drop your TTF font files or click to browse</p>
        </div>
        
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 group ${
            isDragOver
              ? 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50 scale-105'
              : isUploading
              ? 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50'
              : 'border-slate-300 hover:border-indigo-400 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 hover:scale-105 cursor-pointer'
          } ${isUploading ? 'pointer-events-none' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          <div className="space-y-4">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isUploading
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
              : isDragOver 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-110' 
                : 'bg-slate-100 text-slate-400 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:text-white group-hover:scale-110'
            }`}>
              {isUploading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload size={24} />
              )}
            </div>
            
            <div>
              <p className="text-lg font-semibold text-slate-700 mb-2">
                {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-slate-500">Only TTF files are allowed (max 5MB)</p>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".ttf"
            onChange={handleFileSelect}
            disabled={isUploading}
            className="hidden"
          />
        </div>

        {/* Status Messages */}
        {displayError && (
          <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 animate-in slide-in-from-top-2 duration-300">
            <AlertCircle size={20} />
            <span className="font-medium">{displayError}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center space-x-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 animate-in slide-in-from-top-2 duration-300">
            <CheckCircle size={20} />
            <span className="font-medium">{success}</span>
          </div>
        )}
      </div>
    </Card>
  );
};