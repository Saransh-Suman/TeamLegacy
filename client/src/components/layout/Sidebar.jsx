// import React from 'react';
// import { NavLink, useLocation } from 'react-router-dom';

// const Sidebar = () => {
//   const location = useLocation();

//   const navLinks = [
//     { name: 'My Courses', path: '/my-courses', icon: '📋' },
//     { name: 'Register Course', path: '/register', icon: '➕' },
//     { name: 'Trending', path: '/trending', icon: '🔥' },
//     { name: 'Pricing Analysis', path: '/pricing', icon: '💰', dynamic: true },
//     { name: 'Competitors', path: '/competitors', icon: '🏆' },
//     { name: 'Target Market', path: '/target-market', icon: '🎯' },
//     { name: 'AI Suggestions', path: '/suggestions', icon: '🤖', dynamic: true },
//   ];

//   const isActive = (path, isDynamic) => {
//     if (isDynamic) {
//       return location.pathname.startsWith(path);
//     }
//     return location.pathname === path;
//   };

//   return (
//     <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-slate-100 z-50 flex flex-col">
//       {/* Logo */}
//       <div className="p-8">
//         <h1 className="text-2xl font-black text-slate-900 tracking-tighter flex items-center gap-2">
//           <span className="text-lime-400">⚡</span>
//           EV Creator
//         </h1>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-grow px-4 space-y-2">
//         {navLinks.map((link) => {
//           const active = isActive(link.path, link.dynamic);

//           return (
//             <NavLink
//               key={link.name}
//               to={link.dynamic ? '#' : link.path}
//               className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200 group ${active
//                   ? 'bg-lime-50 text-lime-700 border-l-4 border-lime-400'
//                   : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
//                 } ${link.dynamic && !active ? 'opacity-50 cursor-not-allowed' : ''}`}
//               onClick={(e) => link.dynamic && !active && e.preventDefault()}
//             >
//               <span className={`text-lg ${active ? '' : 'grayscale group-hover:grayscale-0 transition-all'}`}>
//                 {link.icon}
//               </span>
//               <span className="text-sm tracking-tight">{link.name}</span>
//             </NavLink>
//           );
//         })}
//       </nav>

//       {/* User Footer */}
//       <div className="p-6 border-t border-slate-50">
//         <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
//           <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center font-black text-slate-900">
//             D1
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-xs font-black text-slate-900 truncate">dev-user-1</p>
//             <p className="text-[10px] font-bold text-slate-400 uppercase">Pro Creator</p>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
