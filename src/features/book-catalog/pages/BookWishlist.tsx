import React, { useState, useEffect } from 'react';
import { Heart, BookOpen } from 'lucide-react';
import { Card, Button } from '../../../shared/components/UI';
import { BookCard } from '../components/BookCard';
import { Book } from '../../../shared/types';

export const BookWishlist: React.FC = () => {
  const [wishlistedBooks, setWishlistedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    loadWishlistedBooks();
  }, []);

  const loadWishlistedBooks = async () => {
    try {
      setLoading(true);
      const storedWishlist = localStorage.getItem('wishlist');
      const wishlistIds = storedWishlist ? JSON.parse(storedWishlist) : [];
      setWishlist(wishlistIds);

      if (wishlistIds.length === 0) {
        setWishlistedBooks([]);
        setLoading(false);
        return;
      }

      const response = await fetch('https://gutendex.com/books?page=1');
      const data = await response.json();
      
      const filteredBooks = data.results.filter((book: Book) => 
        wishlistIds.includes(book.id.toString())
      );
      
      setWishlistedBooks(filteredBooks);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (bookId: string) => {
    const newWishlist = wishlist.includes(bookId)
      ? wishlist.filter(id => id !== bookId)
      : [...wishlist, bookId];
    
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    
    if (!newWishlist.includes(bookId)) {
      setWishlistedBooks(prev => prev.filter(book => book.id.toString() !== bookId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 text-lg">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
            <Heart className="text-white" size={24} fill="currentColor" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-red-900 to-pink-900 bg-clip-text text-transparent">
            My Wishlist
          </h1>
        </div>
        <p className="text-xl text-slate-600">
          {wishlistedBooks.length > 0 
            ? `You have ${wishlistedBooks.length} book${wishlistedBooks.length === 1 ? '' : 's'} saved for later`
            : 'Your reading wishlist awaits your first selection'
          }
        </p>
      </div>

      {wishlistedBooks.length === 0 ? (
        <Card className="p-16 text-center">
          <div className="space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center">
              <Heart className="text-red-400" size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Your wishlist is empty</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Discover amazing books in our catalog and save your favorites for later reading
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = '/books'}
              className="px-8"
            >
              <BookOpen size={20} className="mr-2" />
              Browse Books
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedBooks.map((book, index) => (
            <div
              key={book.id}
              className="animate-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BookCard
                book={book}
                isWishlisted={true}
                onWishlistToggle={() => toggleWishlist(book.id.toString())}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};