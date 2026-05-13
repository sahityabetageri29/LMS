/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Book } from '../types';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

interface RecentlyAddedProps {
  books: Book[];
}

export default function RecentlyAdded({ books }: RecentlyAddedProps) {
  const recentBooks = [...books]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, 5);

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-8 border-l-8 border-f1-red pl-4">
        <Clock className="w-8 h-8 text-f1-red" />
        <h2 className="font-display font-black text-3xl uppercase italic tracking-tighter">
          Recently <span className="text-f1-red">Acquired</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {recentBooks.map((book, index) => (
          <motion.div 
            key={book.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-3 border-b-2 border-transparent hover:border-f1-blue transition-all group"
          >
            <div className="aspect-[3/4] overflow-hidden mb-3">
              <img 
                src={book.cover} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                alt={book.title} 
              />
            </div>
            <h4 className="font-display font-bold text-xs uppercase italic line-clamp-1 group-hover:text-f1-blue transition-colors">
              {book.title}
            </h4>
            <div className="text-[10px] text-gray-500 font-bold uppercase italic mt-1">
              Added: {new Date(book.addedAt).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
