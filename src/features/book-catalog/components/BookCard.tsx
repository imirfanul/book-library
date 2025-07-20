import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, User, Tag, Download } from 'lucide-react';
import { Card, Button } from '../../../shared/components/UI';
import { Book } from '../../../shared/types';

interface BookCardProps {
  book: Book;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, isWishlisted, onWishlistToggle }) => {
  const getCoverImage = () => {
    return book.formats['image/jpeg'] || 
           book.formats['image/jpg'] || 
           'https://via.placeholder.com/300x400?text=No+Cover';
  };

  const getMainGenre = () => {
    return book.subjects[0]?.split('--')[0]?.trim() || 'Unknown';
  };

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <img
          src={getCoverImage()}
          alt={book.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x400?text=No+Cover';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Button
          onClick={onWishlistToggle}
          variant="ghost"
          size="sm"
          className={`absolute top-3 right-3 backdrop-blur-sm transition-all duration-300 ${
            isWishlisted
              ? 'bg-red-500/90 text-white hover:bg-red-600/90'
              : 'bg-white/90 text-slate-600 hover:bg-white'
          }`}
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </Button>
      </div>
      
      <div className="p-6 space-y-4">
        <Link
          to={`/book/${book.id}`}
          className="block group-hover:text-indigo-600 transition-colors duration-300"
        >
          <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 leading-tight text-lg">
            {book.title}
          </h3>
        </Link>
        
        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-center space-x-2">
            <User size={16} className="text-indigo-500" />
            <span className="line-clamp-1 font-medium">
              {book.authors.map(author => author.name).join(', ') || 'Unknown Author'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Tag size={16} className="text-purple-500" />
            <span className="line-clamp-1">{getMainGenre()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Download size={16} className="text-emerald-500" />
            <span>{book.download_count.toLocaleString()} downloads</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-200">
          <Link
            to={`/book/${book.id}`}
            className="block w-full text-center py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </Card>
  );
};