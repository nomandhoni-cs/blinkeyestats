import React from 'react';
import { BarChart2 } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-700 hover:border-brand transition-all duration-300 hover:shadow-brand/20 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="text-brand">
          {icon || <BarChart2 className="h-8 w-8" />}
        </div>
      </div>
    </div>
  );
}