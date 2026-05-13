/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Edit2, Trash2, Calendar, User } from 'lucide-react';
import { Book, UserRole } from '../types';
import { motion } from 'motion/react';

interface BookCardProps {
  book: Book;
  userRole: UserRole;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void | Promise<void>;
}

const BookCard: React.FC<BookCardProps> = ({ book, userRole, onEdit, onDelete }) => {
  const canModify = userRole === 'Employee' || userRole === 'Admin';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white group overflow-hidden border-b-4 border-transparent hover:border-f1-red transition-all shadow-sm"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={book.cover} 
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 p-3 flex flex-col gap-2">
          <span className={`px-3 py-1 font-display font-bold text-xs uppercase italic ${
            book.status === 'Available' ? 'bg-f1-blue text-white' : 'bg-f1-dark text-white opacity-50'
          }`}>
            {book.status}
          </span>
          <span className="bg-f1-red text-white px-3 py-1 font-display font-bold text-xs uppercase italic">
            {book.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-display font-bold text-xl uppercase italic leading-tight mb-2 min-h-[56px] line-clamp-2">
          {book.title}
        </h3>
        
        <div className="flex flex-col gap-1 text-sm text-gray-600 mb-6 font-medium">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-f1-red" />
            <span>{book.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-f1-red" />
            <span>Year: {book.year}</span>
          </div>
        </div>

        {canModify && (
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(book)}
              className="flex-1 bg-f1-blue text-white py-2 px-4 font-display font-bold uppercase italic text-xs flex items-center justify-center gap-2 hover:bg-f1-blue/90 transition-colors"
            >
              <Edit2 className="w-3 h-3" /> Update
            </button>
            <button 
              onClick={() => onDelete(book.id)}
              className="flex-1 bg-f1-red text-white py-2 px-4 font-display font-bold uppercase italic text-xs flex items-center justify-center gap-2 hover:bg-f1-red/90 transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
