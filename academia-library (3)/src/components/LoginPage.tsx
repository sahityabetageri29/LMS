/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { motion } from 'motion/react';
import { BookOpen, User as UserIcon, Phone, GraduationCap, ChevronRight } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    semester: '1',
    role: 'Student' as UserRole
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="min-h-screen bg-f1-dark text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_10px)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-f1-red/20 via-transparent to-transparent"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="flex items-center gap-4 mb-12 justify-center">
          <div className="bg-f1-red p-3 skew-x-[-12deg]">
            <BookOpen className="w-10 h-10 text-white skew-x-[12deg]" />
          </div>
          <h1 className="font-display text-4xl font-black tracking-tighter uppercase italic">
            Academia <span className="text-f1-red">Lib</span>
          </h1>
        </div>

        <div className="bg-white text-f1-dark p-8 border-t-8 border-f1-red shadow-[20px_20px_0px_0px_rgba(225,6,0,0.2)]">
          <h2 className="font-display font-black text-2xl uppercase italic mb-8 tracking-tighter">
            System <span className="text-f1-red">Access</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label className="block font-display font-bold uppercase italic text-[10px] tracking-widest text-gray-400 mb-1">Full Name</label>
                <div className="flex items-center border-b-2 border-gray-200 focus-within:border-f1-red transition-colors">
                  <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full py-2 outline-none font-bold uppercase italic text-sm"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block font-display font-bold uppercase italic text-[10px] tracking-widest text-gray-400 mb-1">Phone Number</label>
                <div className="flex items-center border-b-2 border-gray-200 focus-within:border-f1-red transition-colors">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 00000 00000"
                    className="w-full py-2 outline-none font-bold uppercase italic text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-display font-bold uppercase italic text-[10px] tracking-widest text-gray-400 mb-1">Semester</label>
                  <div className="flex items-center border-b-2 border-gray-200 focus-within:border-f1-red transition-colors">
                    <GraduationCap className="w-4 h-4 text-gray-400 mr-2" />
                    <select 
                      value={formData.semester}
                      onChange={(e) => setFormData({...formData, semester: e.target.value})}
                      className="w-full py-2 outline-none font-bold uppercase italic text-sm bg-transparent appearance-none"
                    >
                      {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-display font-bold uppercase italic text-[10px] tracking-widest text-gray-400 mb-1">Portal Tier</label>
                  <div className="flex items-center border-b-2 border-gray-200 focus-within:border-f1-blue transition-colors">
                    <select 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
                      className="w-full py-2 outline-none font-bold uppercase italic text-sm bg-transparent appearance-none text-f1-blue"
                    >
                      <option value="Student">Student</option>
                      <option value="Employee">Employee</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-f1-red text-white py-4 px-6 font-display font-black uppercase italic tracking-tighter text-lg flex items-center justify-center gap-2 hover:bg-f1-blue transition-all group"
            >
              Initialize Library Session
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <div className="mt-8 flex justify-center gap-6">
          <div className="h-1 w-12 bg-f1-red"></div>
          <div className="h-1 w-12 bg-f1-blue"></div>
          <div className="h-1 w-12 bg-f1-dark"></div>
        </div>
      </motion.div>
    </div>
  );
}
