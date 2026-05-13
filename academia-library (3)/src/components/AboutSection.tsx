/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Landmark, GraduationCap, Users, Award, MapPin } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { label: 'Founded', value: '1974', icon: Landmark },
    { label: 'Students', value: '12k+', icon: Users },
    { label: 'Graduates', value: '45k+', icon: GraduationCap },
    { label: 'Awards', value: '120+', icon: Award },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="mb-20 border-l-8 border-f1-red pl-8"
      >
        <div className="inline-block bg-f1-red text-white px-4 py-1 font-display font-bold uppercase italic text-xs mb-4">
          Institutional Heritage
        </div>
        <h2 className="font-display font-black text-6xl md:text-8xl uppercase italic tracking-tighter leading-[0.85] mb-6">
          THE <span className="text-f1-red">ACADEMIA</span> <br />
          EXPERIENCE
        </h2>
        <p className="text-gray-600 max-w-2xl text-lg font-medium italic">
          Engineering the leaders of tomorrow through precision education and high-performance research facilities since 1974.
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-f1-blue/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img 
            src="/src/assets/images/regenerated_image_1778667463022.jpg" 
            alt="Campus"
            className="w-full aspect-video object-cover border-4 border-f1-dark relative z-10 skew-x-[-2deg]"
          />
          <div className="absolute -bottom-6 -right-6 bg-f1-red text-white p-8 z-20 font-display font-black italic uppercase tracking-tighter hidden md:block">
            Campus HQ
          </div>
        </motion.div>

        <div className="flex flex-col justify-center">
          <h3 className="font-display font-black text-3xl uppercase italic mb-8 border-b-4 border-gray-200 pb-4">
            Mission <span className="text-f1-blue">Statement</span>
          </h3>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            Academia College is committed to excellence in education, research, and innovation. Our mission is to empower a diverse body of students with the knowledge and skills necessary to excel in an increasingly complex and interconnected world. We foster a culture of inquiry, critical thinking, and social responsibility.
          </p>
          
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="bg-f1-dark p-3 text-white skew-x-[-10deg]">
                  <stat.icon className="w-5 h-5 skew-x-[10deg]" />
                </div>
                <div>
                  <div className="font-display font-black text-2xl italic tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-10 border-t-8 border-f1-red shadow-sm">
          <h4 className="font-display font-black text-xl uppercase italic mb-4">Innovation First</h4>
          <p className="text-sm text-gray-500 font-medium italic leading-relaxed">
            We stay ahead of the curve, integrating the latest technologies into our curriculum to ensure our students are ready for the professional grid.
          </p>
        </div>
        <div className="bg-white p-10 border-t-8 border-f1-blue shadow-sm">
          <h4 className="font-display font-black text-xl uppercase italic mb-4">Global Reach</h4>
          <p className="text-sm text-gray-500 font-medium italic leading-relaxed">
            With partnerships across 30 countries, Academia provides a truly international platform for academic and cultural exchange.
          </p>
        </div>
        <div className="bg-white p-10 border-t-8 border-f1-dark shadow-sm">
          <h4 className="font-display font-black text-xl uppercase italic mb-4">Student Focused</h4>
          <p className="text-sm text-gray-500 font-medium italic leading-relaxed">
            Individualized mentorship programs ensure that every student has a clear track to their personal and professional victory.
          </p>
        </div>
      </div>
    </div>
  );
}
