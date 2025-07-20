import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Download, User, Calendar, Globe, Tag, BookOpen } from 'lucide-react';
import { Card, Button } from '../../../shared/components/UI';
import { Book } from '../../../shared/types';

export const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
    
    if (id) {
      fetchBookDetails(id);
    }
  }, [id]);

  const fetchBookDetails = async (bookId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://gutendex.com/books/${bookId}`);
      
      if (!response.ok) {
        throw new Error('Book not found');
      }
      
      const data = await response.json();
      setBook(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch book details');
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = () => {
    if (!book) return;
    
    const bookId = book.id.toString();
    const newWishlist = wishlist.includes(bookId)
      ? wishlist.filter(id => id !== bookId)
      : [...wishlist, bookId];
    
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const getCoverImage = () => {
    if (!book) return '';
    return book.formats['image/jpeg'] || 
           book.formats['image/jpg'] || 
           'https://via.placeholder.com/400x600?text=No+Cover';
  };

  const getDownloadLinks = () => {
    if (!book) return [];
    
    const links = [];
    
    if (book.formats['text/html']) {
      links.push({ format: 'HTML', url: book.formats['text/html'], icon: '🌐' });
    }
    if (book.formats['application/epub+zip']) {
      links.push({ format: 'EPUB', url: book.formats['application/epub+zip'], icon: '📱' });
    }
    if (book.formats['text/plain; charset=utf-8']) {
      links.push({ format: 'Plain Text', url: book.formats['text/plain; charset=utf-8'], icon: '📄' });
    }
    if (book.formats['application/pdf']) {
      links.push({ format: 'PDF', url: book.formats['application/pdf'], icon: '📕' });
    }
    
    return links;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 text-lg">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <BookOpen className="mx-auto text-red-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Book not found</h3>
          <p className="text-red-600 mb-6">{error || 'The requested book could not be found'}</p>
          <Link to="/books">
            <Button variant="primary">
              <ArrowLeft size={20} className="mr-2" />
              Back to Books
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(book.id.toString());

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link
        to="/books"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300 font-medium"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Books
      </Link>

      <Card variant="elevated" className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={getCoverImage()}
              alt={book.title}
              className="w-full h-96 md:h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400x600?text=No+Cover';
              }}
            />
          </div>
          
          <div className="md:w-2/3 p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                {book.title}
              </h1>
              <Button
                onClick={toggleWishlist}
                variant={isWishlisted ? "danger" : "secondary"}
                size="lg"
                className="ml-4"
              >
                <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
              </Button>
            </div>

            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 text-slate-600">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <User size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-900">Authors</span>
                    <p className="text-sm">
                      {book.authors.length > 0 
                        ? book.authors.map(author => author.name).join(', ')
                        : 'Unknown Author'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-600">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Calendar size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-900">Birth Years</span>
                    <p className="text-sm">
                      {book.authors.filter(author => author.birth_year).map(author => author.birth_year).join(', ') || 'Unknown'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-600">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Globe size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-900">Languages</span>
                    <p className="text-sm">{book.languages.join(', ').toUpperCase()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-slate-600">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Download size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <span className="font-medium text-slate-900">Downloads</span>
                    <p className="text-sm">{book.download_count.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-slate-600">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center mt-1">
                  <Tag size={20} className="text-pink-600" />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-slate-900">Subjects</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {book.subjects.slice(0, 8).map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm rounded-full font-medium"
                      >
                        {subject.split('--')[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Download Options</h3>
              <div className="grid grid-cols-2 gap-3">
                {getDownloadLinks().map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 font-medium"
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.format}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};