import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Card, Input, Select } from '../../../shared/components/UI';
import { BookCard } from '../components/BookCard';
import { Book } from '../../../shared/types';

export const BookCatalog: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const booksPerPage = 12;
  
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, searchTerm, selectedGenre]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://gutendex.com/books?page=1');
      const data = await response.json();
      setBooks(data.results);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterBooks = () => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter(book =>
        book.subjects.some(subject =>
          subject.toLowerCase().includes(selectedGenre.toLowerCase())
        )
      );
    }

    setFilteredBooks(filtered);
    setCurrentPage(1);
  };

  const toggleWishlist = (bookId: string) => {
    const newWishlist = wishlist.includes(bookId)
      ? wishlist.filter(id => id !== bookId)
      : [...wishlist, bookId];
    
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const getGenres = () => {
    const genres = new Set<string>();
    books.forEach(book => {
      book.subjects.forEach(subject => {
        const cleanSubject = subject.split('--')[0].trim();
        genres.add(cleanSubject);
      });
    });
    return Array.from(genres).sort();
  };

  const genreOptions = [
    { value: '', label: 'All Genres' },
    ...getGenres().map(genre => ({ value: genre, label: genre }))
  ];

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 text-lg">Loading amazing books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <BookOpen className="mx-auto text-red-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={fetchBooks}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
          Book Catalog
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Discover thousands of amazing books from Project Gutenberg's digital library
        </p>
      </div>

      {/* Search and Filter */}
      <Card variant="elevated" className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            placeholder="Search books by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={20} />}
          />
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            options={genreOptions}
          />
        </div>
      </Card>

      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="text-slate-600">
          Showing <span className="font-semibold text-indigo-600">{currentBooks.length}</span> of{' '}
          <span className="font-semibold text-indigo-600">{filteredBooks.length}</span> books
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentBooks.map((book, index) => (
          <div
            key={book.id}
            className="animate-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <BookCard
              book={book}
              isWishlisted={wishlist.includes(book.id.toString())}
              onWishlistToggle={() => toggleWishlist(book.id.toString())}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="p-6">
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                      : 'border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};