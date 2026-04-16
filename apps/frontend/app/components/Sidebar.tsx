"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { filterMenuByRoles, MenuItem } from "../lib/menu";
import { LayoutGrid, FileText, BookOpen, Image, PieChart, ChevronDown, ChevronUp, X, Heart, Users, Grid2X2, GraduationCap, ClipboardList, Shield, Wallet, MessageSquare, BarChart3, Settings, Home, ClipboardCheck } from "lucide-react";
import { useState, useEffect } from "react";

const IconMap: Record<string, React.ElementType> = {
  LayoutGrid,
  FileText,
  BookOpen,
  Image,
  PieChart,
  Heart,
  Users,
  Grid2X2,
  GraduationCap,
  Home,
  ClipboardCheck,
  ClipboardList,
  Shield,
  Wallet,
  MessageSquare,
  BarChart3,
  Settings
};

export function Sidebar({ 
  roles, 
  isOpen, 
  setIsOpen 
}: { 
  roles: string[]; 
  isOpen?: boolean; 
  setIsOpen?: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const items = filterMenuByRoles(roles);
  
  // Keep track of which menu groups are open
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  // Auto-open group if active
  useEffect(() => {
    setOpenGroups(prev => {
      const newOpenGroups = { ...prev };
      let changed = false;
      
      items.forEach((item) => {
        if (item.subItems) {
          const isActive = item.subItems.some(sub => {
            return pathname === sub.href || pathname.startsWith(`${sub.href}/`);
          });
          if (isActive && !newOpenGroups[item.label]) {
            newOpenGroups[item.label] = true;
            changed = true;
          }
        }
      });
      
      return changed ? newOpenGroups : prev;
    });
  }, [pathname, items]);

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const renderItem = (item: MenuItem, isSubItem = false, isLastSubItem = false) => {
    const isGroup = !!item.subItems;
    const isGroupOpen = openGroups[item.label];
    
    // Check if item or its subitems are active
    const isActive = isGroup 
      ? item.subItems!.some(sub => {
          return pathname === sub.href || pathname.startsWith(`${sub.href}/`);
        })
      : (() => {
          return pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== "/dashboards");
        })();

    const IconComponent = item.icon ? IconMap[item.icon] : null;

    if (isGroup) {
      return (
        <div key={item.label} className="mb-2">
          <button
            onClick={() => toggleGroup(item.label)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
              isActive 
                ? "bg-white/70 text-slate-800 shadow-sm border border-white/60" 
                : "text-slate-600 hover:bg-white/40 hover:text-slate-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {IconComponent && <IconComponent className={`w-5 h-5 ${isActive ? "text-slate-800" : "text-slate-500"}`} />}
              <span>{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {isGroupOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </div>
          </button>

          {isGroupOpen && item.subItems && (
            <div className="mt-1 relative ml-6">
              {/* Vertical line for the tree structure */}
              <div className="absolute top-0 bottom-4 left-0 w-px bg-slate-300/50"></div>
              
              <div className="flex flex-col space-y-1 py-2">
                {item.subItems.map((sub, index) => {
                  const isSubActive = pathname === sub.href || (pathname.startsWith(`${sub.href}/`) && sub.href !== "/dashboards");
                  const isLast = index === item.subItems!.length - 1;
                  
                  return (
                    <div key={sub.href} className="relative flex items-center">
                      {/* Horizontal curve for each item */}
                      <div className={`absolute left-0 w-4 h-px bg-slate-300/50 ${isLast ? 'top-1/2' : ''}`}></div>
                      {isLast && (
                        <div className="absolute left-0 top-0 bottom-1/2 w-px bg-slate-300/50"></div>
                      )}
                      
                      <Link
                        href={sub.href}
                        onClick={() => setIsOpen && setIsOpen(false)}
                        className={`ml-4 block px-4 py-2 rounded-xl text-sm transition-all duration-300 w-full ${
                          isSubActive 
                            ? "bg-white/60 text-slate-800 font-bold shadow-sm border border-white/50" 
                            : "text-slate-500 font-medium hover:bg-white/30 hover:text-slate-800"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setIsOpen && setIsOpen(false)}
        className={`flex items-center justify-between px-4 py-3 mb-2 rounded-2xl text-sm font-semibold transition-all duration-300 ${
          isActive 
            ? "bg-white/70 text-slate-800 shadow-sm border border-white/60" 
            : "text-slate-600 hover:bg-white/40 hover:text-slate-800"
        }`}
      >
        <div className="flex items-center gap-3">
          {IconComponent && <IconComponent className={`w-5 h-5 ${isActive ? "text-slate-800" : "text-slate-500"}`} />}
          <span>{item.label}</span>
        </div>
        {item.badge && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen && setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-50 h-[calc(100vh-16px)] md:h-auto
        w-64 flex flex-col bg-white/40 backdrop-blur-2xl border border-white/50 
        rounded-3xl md:rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-[110%] md:translate-x-0'}
      `}>
        <div className="p-6 border-b border-white/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform rotate-12">
              <div className="w-5 h-5 border-2 border-white rounded-sm transform -rotate-12"></div>
            </div>
            <div className="font-bold text-xl text-slate-800 tracking-tight">SMK Interaktif</div>
          </div>
          
          {setIsOpen && (
            <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-slate-500 hover:text-slate-800">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="mb-6">
            <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-3 px-2">MAIN</div>
            {items.map(item => renderItem(item))}
          </div>

          <div className="mt-8 mb-4">
            <div className="flex items-center justify-between px-2 mb-3">
              <div className="text-[11px] font-bold text-slate-400 tracking-wider">RECENT MESSAGES</div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
            
            <div className="space-y-3 px-2">
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-orange-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                    <span className="text-orange-600 text-xs font-bold">EG</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-white rounded-full"></div>
                </div>
                <div className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">Erik Gunsel</div>
              </div>
              
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-bold">ES</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-amber-400 border border-white rounded-full"></div>
                </div>
                <div className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">Emily Smith</div>
              </div>
              
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-purple-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                    <span className="text-purple-600 text-xs font-bold">AA</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-white rounded-full"></div>
                </div>
                <div className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">Arthur Adelk</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
