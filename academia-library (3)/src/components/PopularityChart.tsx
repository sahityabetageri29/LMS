/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Book } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface PopularityChartProps {
  books: Book[];
}

export default function PopularityChart({ books }: PopularityChartProps) {
  // Take top 6 popular books
  const data = [...books]
    .sort((a, b) => b.borrowCount - a.borrowCount)
    .slice(0, 6)
    .map(book => ({
      name: book.title.length > 20 ? book.title.substring(0, 17) + '...' : book.title,
      borrowCount: book.borrowCount,
      fullName: book.title
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-f1-dark text-white p-3 font-display border border-f1-red shadow-2xl">
          <p className="font-black italic uppercase text-xs mb-1">{payload[0].payload.fullName}</p>
          <p className="text-f1-red font-bold uppercase italic text-[10px]">
            Checkouts: <span className="text-white">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="bg-white p-8 border-t-8 border-f1-blue shadow-sm mb-16 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-f1-blue" />
          <div>
            <h2 className="font-display font-black text-3xl uppercase italic tracking-tighter">
              Performance <span className="text-f1-blue">Metrics</span>
            </h2>
            <p className="text-[10px] font-bold uppercase italic tracking-widest text-gray-400">Monthly Circulation Histogram</p>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#15151E', fontSize: 10, fontWeight: 700, fontStyle: 'italic' }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F3F3' }} />
            <Bar dataKey="borrowCount" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index % 2 === 0 ? '#E10600' : '#0000FF'} 
                  className="transition-opacity hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 flex justify-between items-center text-[10px] font-bold uppercase italic tracking-widest text-gray-400 border-t border-gray-100 pt-4">
        <span>X-Axis: Top Collection Assets</span>
        <span>Y-Axis: Relative Popularity</span>
      </div>
    </section>
  );
}
