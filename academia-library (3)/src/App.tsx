/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Book, UserRole, User } from './types';
import Navbar from './components/Navbar';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import LoginPage from './components/LoginPage';
import { Plus, Search, Trophy, TrendingUp, BookOpenCheck } from 'lucide-react';
import { motion } from 'motion/react';

import RecentlyAdded from './components/RecentlyAdded';
import PopularityChart from './components/PopularityChart';
import BlogSection from './components/BlogSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import { GoogleGenAI, Type } from "@google/genai";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [role, setRole] = useState<UserRole>('Student');
  const [currentView, setCurrentView] = useState('Home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [trendingBooks, setTrendingBooks] = useState<any[]>([]);
  const [fetchingTrending, setFetchingTrending] = useState(false);

  useEffect(() => {
    fetchBooks();
    fetchTrendingFromAI();
  }, []);

  const fetchTrendingFromAI = async () => {
    setFetchingTrending(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "List 4 popular and trending books for May 2026 across different genres. Provide title, author, and a short justification for their popularity.",
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                author: { type: Type.STRING },
                reason: { type: Type.STRING },
              }
            }
          }
        }
      });
      if (response.text) {
        setTrendingBooks(JSON.parse(response.text));
      }
    } catch (err) {
      console.error('Failed to fetch trending books:', err);
    } finally {
      setFetchingTrending(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setRole(userData.role);
    setCurrentView('Home');
  };

  const handleAddBook = async (bookData: Partial<Book>) => {
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
      if (response.ok) {
        fetchBooks();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  const handleUpdateBook = async (bookData: Partial<Book>) => {
    if (!editingBook) return;
    try {
      const response = await fetch(`/api/books/${editingBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
      if (response.ok) {
        fetchBooks();
        setIsModalOpen(false);
        setEditingBook(null);
      }
    } catch (err) {
      console.error('Error updating book:', err);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm('Are you sure you want to decommission this book from the collection?')) return;
    try {
      const response = await fetch(`/api/books/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchBooks();
      }
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'CS', 'Economics', 'Sports', 'History', 'Geography'];

  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <Navbar 
        currentRole={role} 
        onRoleChange={setRole} 
        currentView={currentView}
        onViewChange={setCurrentView}
        userName={user.name}
        onLogout={() => setUser(null)}
      />

      {currentView === 'Blog' ? (
        <BlogSection books={books} />
      ) : currentView === 'About' ? (
        <AboutSection />
      ) : currentView === 'Contact' ? (
        <ContactSection />
      ) : (
        <>
          {/* Hero Section - F1 Inspired */}
          <header className="bg-f1-dark text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_10px)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 bg-f1-red text-white px-4 py-1 font-display font-bold uppercase italic text-xs mb-6">
                <Trophy className="w-3 h-3" /> Season 2026 Collection
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-black uppercase italic leading-[0.85] tracking-tighter mb-8">
                PUSH FOR <br />
                <span className="text-f1-red underline decoration-8 underline-offset-8">KNOWLEDGE</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-md font-medium mb-8 leading-tight">
                Our high-performance library collection is engineered to fuel your curiosity. 
                Explore the latest in engineering, strategy, and fiction.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 backdrop-blur-md">
                  <BookOpenCheck className="w-6 h-6 text-f1-red" />
                  <div>
                    <div className="text-2xl font-display font-black italic">{books.length}</div>
                    <div className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">Inventory Status</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 backdrop-blur-md">
                  <TrendingUp className="w-6 h-6 text-f1-blue" />
                  <div>
                    <div className="text-2xl font-display font-black italic">{books.filter(b => b.status === 'Available').length}</div>
                    <div className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">Units Available</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="hidden lg:block w-96 h-96 relative"
            >
              <div className="absolute inset-0 bg-f1-red/20 blur-3xl rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" 
                alt="Library"
                className="w-full h-full object-cover rounded-2xl relative z-10 border-4 border-f1-red shadow-2xl skew-y-3"
              />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Statistics & Recent Updates Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-2">
            <PopularityChart books={books} />
          </div>
          <div>
            <RecentlyAdded books={books} />
          </div>
        </div>

        {/* AI Trending Section */}
        <section className="mb-20 bg-f1-dark text-white p-10 relative overflow-hidden border-r-8 border-f1-red">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="animate-pulse bg-f1-red w-3 h-3 rounded-full"></div>
              <h2 className="font-display font-black text-3xl uppercase italic tracking-tighter">
                Live <span className="text-f1-red">Global Trends</span>
              </h2>
            </div>
            
            {fetchingTrending ? (
              <div className="flex gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex-1 bg-white/5 h-32 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {trendingBooks.map((t, i) => (
                  <div key={i} className="border-l-2 border-white/20 pl-4 py-2">
                    <div className="text-[10px] font-bold uppercase italic tracking-widest text-f1-red mb-1">Trending #{i+1}</div>
                    <div className="font-display font-bold uppercase italic text-lg line-clamp-1">{t.title}</div>
                    <div className="text-xs text-gray-400 font-medium mb-3 italic">{t.author}</div>
                    <p className="text-[10px] leading-tight text-gray-500 uppercase font-bold italic">{t.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="flex-1 max-w-xl">
            <h2 className="font-display font-black text-4xl uppercase italic tracking-tighter mb-4">
              Collection <span className="text-f1-red">Registry</span>
            </h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-b-4 border-gray-200 focus:border-f1-red outline-none pl-12 pr-4 py-4 font-bold uppercase italic transition-all shadow-sm"
              />
            </div>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 font-display font-bold uppercase italic text-xs transition-all border-b-2 ${
                    selectedCategory === cat 
                      ? 'border-f1-red text-f1-red bg-white' 
                      : 'border-transparent text-gray-500 hover:text-f1-dark'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {(role === 'Employee' || role === 'Admin') && (
            <button 
              onClick={() => { setEditingBook(null); setIsModalOpen(true); }}
              className="bg-f1-red text-white p-6 font-display font-black uppercase italic tracking-tighter flex items-center gap-3 hover:bg-f1-red/90 transition-all shadow-xl active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-6 h-6" /> Add New Asset
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-f1-red border-t-transparent"></div>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredBooks.map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                userRole={role}
                onEdit={(b) => { setEditingBook(b); setIsModalOpen(true); }}
                onDelete={handleDeleteBook}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-20 text-center border-t-8 border-gray-200 shadow-sm">
            <div className="font-display font-black text-4xl uppercase italic text-gray-300 mb-4">No results found</div>
            <p className="text-gray-400 font-medium italic uppercase tracking-widest text-xs">Try adjusting your search filters</p>
          </div>
        )}
      </main>
      </>
      )}

      <BookModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingBook ? handleUpdateBook : handleAddBook}
        editingBook={editingBook}
      />

      {/* Footer */}
      <footer className="bg-white border-t-4 border-f1-dark py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="font-display text-2xl font-black italic uppercase tracking-tighter">
              Academia <span className="text-f1-red">Lib</span>
            </div>
            <div className="flex gap-8 text-[10px] font-bold uppercase italic tracking-widest text-gray-500">
              <a href="#" className="hover:text-f1-red transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-f1-red transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-f1-red transition-colors">Access Policy</a>
            </div>
            <div className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">
              © 2026 Academia Educational Group
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
