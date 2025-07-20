import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './shared/components/Layout';
import { FontManagement } from './features/font-management/pages/FontManagement';
import { BookCatalog } from './features/book-catalog/pages/BookCatalog';
import { BookWishlist } from './features/book-catalog/pages/BookWishlist';
import { BookDetails } from './features/book-catalog/pages/BookDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<FontManagement />} />
          <Route path="/books" element={<BookCatalog />} />
          <Route path="/wishlist" element={<BookWishlist />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;