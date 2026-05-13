/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Book } from '../types';
import { motion } from 'motion/react';
import { ExternalLink, BookOpen, Share2, Tag } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

interface BlogSectionProps {
  books: Book[];
}

interface BlogLink {
  title: string;
  url: string;
  excerpt: string;
  relatedBook: string;
}

export default function BlogSection({ books }: BlogSectionProps) {
  const [blogs, setBlogs] = useState<BlogLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogLinks();
  }, [books]);

  const fetchBlogLinks = async () => {
    if (books.length === 0) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const bookTitles = books.map(b => b.title).join(', ');
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Find 5-6 actual Medium.com articles related to these books or their topics: ${bookTitles}. 
        Return a JSON array of objects with 'title', 'url', 'excerpt', and 'relatedBook'. 
        Ensure the 'url' is a real Medium.com link.`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                url: { type: Type.STRING },
                excerpt: { type: Type.STRING },
                relatedBook: { type: Type.STRING },
              }
            }
          }
        }
      });

      if (response.text) {
        setBlogs(JSON.parse(response.text));
      }
    } catch (err) {
      console.error('Failed to fetch blog links:', err);
      // Fallback data if AI fails
      setBlogs([
        { 
          title: "Why Clean Code Matters", 
          url: "https://medium.com/topic/software-engineering", 
          excerpt: "Deep dive into the principles of maintainable software.", 
          relatedBook: "Clean Code" 
        },
        { 
          title: "The Future of Economic History", 
          url: "https://medium.com/topic/economics", 
          excerpt: "How Adam Smith's vision still shapes our world today.", 
          relatedBook: "The Wealth of Nations" 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="mb-12 border-l-8 border-f1-blue pl-6">
        <h2 className="font-display font-black text-5xl uppercase italic tracking-tighter">
          The <span className="text-f1-blue">Reading Room</span>
        </h2>
        <p className="font-bold uppercase italic text-xs tracking-widest text-gray-500 mt-2">
          Curated Medium Articles related to our collections
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-f1-blue border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white group overflow-hidden border-t-4 border-transparent hover:border-f1-blue transition-all shadow-sm flex flex-col"
            >
              <div className="p-8 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-3 h-3 text-f1-blue" />
                  <span className="text-[10px] font-black uppercase italic tracking-widest text-f1-blue">Influenced by {blog.relatedBook}</span>
                </div>
                
                <h3 className="font-display font-black text-2xl uppercase italic leading-tight mb-4 group-hover:text-f1-blue transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-gray-500 text-sm font-medium italic mb-6 line-clamp-3">
                  "{blog.excerpt}"
                </p>

                <a 
                  href={blog.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-f1-dark text-white py-3 px-6 font-display font-black uppercase italic text-xs hover:bg-f1-blue transition-all"
                >
                  Read on Medium <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              <div className="bg-[#F9F9F9] p-4 flex justify-between items-center border-t border-gray-100">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase italic text-gray-400">
                  <BookOpen className="w-3 h-3" /> 5 min read
                </div>
                <button className="text-gray-400 hover:text-f1-blue transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Decorative F1 style strip */}
      <div className="mt-20 h-4 bg-[repeating-linear-gradient(45deg,#0000FF,#0000FF_20px,#15151E_20px,#15151E_40px)]"></div>
    </div>
  );
}
