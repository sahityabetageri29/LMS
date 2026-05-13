/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Globe } from 'lucide-react';

export default function ContactSection() {
  const contactInfo = [
    { icon: Phone, label: 'Helpline', value: '+1 (555) 900-3000' },
    { icon: Mail, label: 'Inquiries', value: 'contact@academia-lib.edu' },
    { icon: Globe, label: 'Website', value: 'www.academia-college.edu/library' },
    { icon: MessageSquare, label: 'Live Chat', value: '24/7 Availability' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 bg-f1-dark text-white px-4 py-1 font-display font-bold uppercase italic text-xs mb-6">
          Support Center / Pit Crew
        </div>
        <h2 className="font-display font-black text-6xl md:text-8xl uppercase italic tracking-tighter leading-tight">
          GET IN <span className="text-f1-red">TOUCH</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact info cards */}
        <div className="lg:col-span-1 space-y-4">
          {contactInfo.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 border-l-4 border-f1-red shadow-sm hover:translate-x-2 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 text-f1-red">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">{item.label}</div>
                  <div className="font-display font-bold uppercase italic text-sm">{item.value}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Placeholder/Location card */}
        <div className="lg:col-span-2">
          <div className="bg-white border-t-8 border-f1-blue shadow-lg overflow-hidden h-full flex flex-col md:flex-row">
            <div className="p-10 flex-1 border-r border-gray-100">
              <h3 className="font-display font-black text-3xl uppercase italic mb-8 border-b-4 border-f1-blue inline-block">
                Library <span className="text-f1-blue">Location</span>
              </h3>
              
              <div className="space-y-8 mt-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-f1-blue mt-1" />
                  <div>
                    <div className="font-bold uppercase italic text-xs text-gray-400 mb-1 tracking-widest">Main Campus Address</div>
                    <p className="font-display font-bold uppercase italic text-lg leading-tight">
                      Academia College, Sector 9 <br />
                      Knowledge Park, Suite 300 <br />
                      Innovation City, IC 45001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-f1-red mt-1" />
                  <div>
                    <div className="font-bold uppercase italic text-xs text-gray-400 mb-1 tracking-widest">Racing Hours</div>
                    <p className="font-display font-bold uppercase italic text-lg leading-tight">
                      Mon - Fri: 08:00 — 22:00 <br />
                      Sat - Sun: 09:00 — 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 bg-gray-200 relative min-h-[300px]">
              {/* Symbolic map background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -top-12 -left-12 w-24 h-24 bg-f1-red/10 rounded-full animate-ping"></div>
                  <div className="bg-f1-red text-white p-4 rounded-full relative z-10 shadow-2xl">
                    <MapPin className="w-8 h-8" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-f1-dark text-white px-3 py-1 font-display font-bold text-[10px] uppercase italic tracking-widest">
                Real-Time Tracking Enabled
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 p-12 bg-f1-dark text-white border-r-8 border-f1-red flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h4 className="font-display font-black text-3xl uppercase italic mb-2 tracking-tighter">Need Immediate Assistance?</h4>
          <p className="text-gray-400 font-medium italic text-sm">Our librarians are ready to assist you in the fast lane.</p>
        </div>
        <button className="bg-f1-red text-white px-10 py-5 font-display font-black uppercase italic tracking-tighter text-xl hover:bg-white hover:text-f1-dark transition-all transform hover:-translate-y-1 shadow-2xl">
          Open Support Ticket
        </button>
      </div>
    </div>
  );
}
