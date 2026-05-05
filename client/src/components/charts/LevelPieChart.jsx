import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const LevelPieChart = ({ data, dominantLevel }) => {
  const chartData = [
    { name: 'Beginner', value: data.beginner || 0 },
    { name: 'Intermediate', value: data.intermediate || 0 },
    { name: 'Advanced', value: data.advanced || 0 },
  ].filter(item => item.value > 0);

  const COLORS = {
    Beginner: '#10B981',
    Intermediate: '#F59E0B',
    Advanced: '#EF4444',
  };

  return (
    <div className="h-[300px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
        <span className="text-[10px] uppercase font-bold text-slate-400">Dominant</span>
        <span className="text-sm font-black text-slate-900 capitalize">{dominantLevel}</span>
      </div>
    </div>
  );
};

export default LevelPieChart;
