import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, PenSquare, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary-600 font-black text-2xl tracking-tight">
          <BookOpen className="h-7 w-7 text-accent-500" />
          <span>StoryPulse</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-slate-600 hover:text-primary-600 font-medium">Home</Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/create-blog" className="flex items-center gap-1.5 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-95 shadow-sm">
                <PenSquare className="h-4 w-4" />
                <span>Write</span>
              </Link>
              <Link to="/dashboard" className="text-slate-600 hover:text-primary-600 flex items-center gap-1">
                <LayoutDashboard className="h-5 w-5" />
                <span className="hidden sm:inline text-sm font-medium">Dashboard</span>
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-xs bg-purple-100 text-purple-700 font-bold px-2.5 py-1 rounded-full border border-purple-300">
                  Admin
                </Link>
              )}
              <button 
                onClick={() => { logout(); navigate('/'); }} 
                className="text-slate-400 hover:text-red-600 transition"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-slate-600 hover:text-primary-600 font-medium px-3 py-1.5">Login</Link>
              <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 shadow-sm">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
