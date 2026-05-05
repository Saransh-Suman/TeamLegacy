// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Cell
// } from 'recharts';

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     const data = payload[0].payload;
//     return (
//       <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
//         <p className="text-sm font-bold text-slate-900 mb-2 capitalize">{data.topic}</p>
//         <div className="space-y-1 text-xs">
//           <div className="flex justify-between gap-4">
//             <span className="text-slate-500">Demand Score:</span>
//             <span className="font-bold text-lime-600">{data.demand_score}</span>
//           </div>
//           <div className="flex justify-between gap-4">
//             <span className="text-slate-500">Course Count:</span>
//             <span className="font-semibold">{data.course_count}</span>
//           </div>
//           <div className="flex justify-between gap-4">
//             <span className="text-slate-500">Avg Price:</span>
//             <span className="font-semibold">₹{data.avg_price}</span>
//           </div>
//           <div className="flex justify-between gap-4">
//             <span className="text-slate-500">Price Range:</span>
//             <span className="font-semibold">₹{data.min_price} - ₹{data.max_price}</span>
//           </div>
//           <div className="flex justify-between gap-4">
//             <span className="text-slate-500">Avg Rating:</span>
//             <span className="font-semibold">{data.avg_rating} ⭐</span>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   return null;
// };

// const DemandBarChart = ({ data }) => {
//   return (
//     <div className="h-[400px] w-full">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           data={data}
//           margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//           <XAxis 
//             dataKey="topic" 
//             axisLine={false} 
//             tickLine={false} 
//             tick={{ fill: '#64748b', fontSize: 12 }}
//             dy={10}
//             className="capitalize"
//           />
//           <YAxis 
//             axisLine={false} 
//             tickLine={false} 
//             tick={{ fill: '#64748b', fontSize: 12 }}
//           />
//           <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
//           <Bar 
//             dataKey="demand_score" 
//             radius={[8, 8, 0, 0]}
//             fill="#A3E635"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill="#A3E635" className="hover:fill-lime-500 transition-colors" />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default DemandBarChart;

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="bg-white p-4 border rounded shadow">
      <p className="font-bold capitalize">{data.topic}</p>

      <p>Demand: {data.demand_score}</p>
      <p>Courses: {data.course_count}</p>
      <p>Avg Price: ₹{data.avg_price}</p>
      <p>
        Price Range: {data.min_price && data.max_price
          ? `₹${data.min_price} - ₹${data.max_price}`
          : 'N/A'}
      </p>
      <p>
        Rating: {data.avg_rating ? `${data.avg_rating} ⭐` : 'N/A'}
      </p>
    </div>
  );
};

const DemandBarChart = ({ data = [] }) => {
  if (!data.length) {
    return <div className="text-center py-20 text-slate-500">No data</div>;
  }

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="topic" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="demand_score" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.demand_score > 80 ? '#22c55e' : '#A3E635'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DemandBarChart;