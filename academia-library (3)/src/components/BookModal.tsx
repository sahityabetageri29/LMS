/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X } from 'lucide-react';
import { Book } from '../types';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: Partial<Book>) => void;
  editingBook?: Book | null;
}

export default function BookModal({ isOpen, onClose, onSubmit, editingBook }: BookModalProps) {
  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    category: 'Technical',
    status: 'Available',
    year: new Date().getFullYear(),
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'
  });

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    } else {
      setFormData({
        title: '',
        author: '',
        category: 'Technical',
        status: 'Available',
        year: new Date().getFullYear(),
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'
      });
    }
  }, [editingBook, isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white w-full max-w-lg overflow-hidden border-t-8 border-f1-red"
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display font-black text-3xl uppercase italic tracking-tighter">
                {editingBook ? 'Update' : 'Register'} <span className="text-f1-red">Book</span>
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
              <div className="grid gap-6">
                <div>
                  <label className="block font-display font-bold uppercase italic text-xs mb-2">Book Title</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border-b-2 border-gray-200 focus:border-f1-red outline-none p-2 font-medium transition-colors"
                    placeholder="Grand Prix Strategy..."
                  />
                </div>
                <div>
                  <label className="block font-display font-bold uppercase italic text-xs mb-2">Author</label>
                  <input 
                    type="text" 
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full border-b-2 border-gray-200 focus:border-f1-red outline-none p-2 font-medium transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-bold uppercase italic text-xs mb-2">Year</label>
                    <input 
                      type="number" 
                      required
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="w-full border-b-2 border-gray-200 focus:border-f1-red outline-none p-2 font-medium transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-display font-bold uppercase italic text-xs mb-2">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full border-b-2 border-gray-200 focus:border-f1-red outline-none p-2 font-medium transition-colors"
                    >
                      <option>CS</option>
                      <option>Economics</option>
                      <option>Sports</option>
                      <option>History</option>
                      <option>Geography</option>
                      <option>Technical</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-display font-bold uppercase italic text-xs mb-2">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full border-b-2 border-gray-200 focus:border-f1-red outline-none p-2 font-medium transition-colors"
                  >
                    <option value="Available">In Stock (Available)</option>
                    <option value="Borrowed">On Loan (Borrowed)</option>
                    <option value="Reserved">Reserved</option>
                  </select>
                </div>
                <div>
                  <label className="block font-display font-bold uppercase italic text-xs mb-2">Cover URL</label>
                  <input 
                    type="url" 
                    value={formData.cover}
                    onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                    className="w-full border-b-2 border-gray-200 focus:border-f1-red outline-none p-2 font-medium transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-f1-red text-white py-4 px-6 font-display font-black uppercase italic tracking-tighter hover:bg-f1-red/90 transition-all shadow-lg active:scale-95"
                >
                  {editingBook ? 'Confirm Update' : 'Register in System'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="h-2 flex w-full">
            <div className="bg-f1-blue w-1/2 h-full"></div>
            <div className="bg-f1-red w-1/2 h-full"></div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
