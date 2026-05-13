/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, User, Settings, ShieldCheck, LogOut } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentView: string;
  onViewChange: (view: string) => void;
  userName: string;
  onLogout: () => void;
}

export default function Navbar({ currentRole, onRoleChange, currentView, onViewChange, userName, onLogout }: NavbarProps) {
  return (
    <nav className="bg-f1-dark text-white border-b-4 border-f1-red sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-f1-red p-2 skew-x-[-12deg]">
                <BookOpen className="w-8 h-8 text-white skew-x-[12deg]" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tighter uppercase italic cursor-pointer" onClick={() => onViewChange('Home')}>
                Academia <span className="text-f1-red font-black">Lib</span>
              </span>
            </div>

            {/* General Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 ml-8 border-l border-white/20 pl-8">
              {['Home', 'About', 'Blog', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => onViewChange(item)}
                  className={`font-display font-bold uppercase italic text-xs tracking-widest transition-colors ${currentView === item ? 'text-f1-red underline decoration-2' : 'hover:text-f1-red'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center gap-3 border-r border-white/10 pr-8 mr-4">
              <div className="w-8 h-8 bg-f1-blue rounded-full flex items-center justify-center font-display font-black italic text-xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase italic text-gray-500 tracking-widest">Active User</span>
                <span className="text-xs font-black uppercase italic tracking-tighter">{userName}</span>
              </div>
              <button 
                onClick={onLogout}
                className="ml-2 p-2 hover:text-f1-red transition-colors"
                title="Logout Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            <button 
              onClick={() => onRoleChange('Student')}
              className={`flex items-center gap-2 px-4 py-2 transition-all font-bold uppercase italic text-sm ${currentRole === 'Student' ? 'text-f1-red bg-white/10' : 'hover:text-f1-red'}`}
            >
              <User className="w-4 h-4" /> Student Portal
            </button>
            <button 
              onClick={() => onRoleChange('Employee')}
              className={`flex items-center gap-2 px-4 py-2 transition-all font-bold uppercase italic text-sm ${currentRole === 'Employee' ? 'text-f1-red bg-white/10' : 'hover:text-f1-red'}`}
            >
              <Settings className="w-4 h-4" /> Employee Portal
            </button>
            <button 
              onClick={() => onRoleChange('Admin')}
              className={`flex items-center gap-2 px-4 py-2 transition-all font-bold uppercase italic text-sm ${currentRole === 'Admin' ? 'text-f1-red bg-white/10' : 'hover:text-f1-red'}`}
            >
              <ShieldCheck className="w-4 h-4" /> Admin Portal
            </button>
          </div>
        </div>
      </div>
      
      {/* Red/Blue racing stripe bottom decoration */}
      <div className="h-1 flex w-full">
        <div className="bg-f1-red h-full w-1/2"></div>
        <div className="bg-f1-blue h-full w-1/2"></div>
      </div>
    </nav>
  );
}
