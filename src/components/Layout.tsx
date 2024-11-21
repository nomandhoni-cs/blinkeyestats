import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Eye } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <nav className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://raw.githubusercontent.com/nomandhoni-cs/blink-eye/master/website/public/logo.png"
                alt="Blink Eye Logo"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                Blink Eye Stats
              </span>
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'bg-brand text-white'
                    : 'text-gray-300 hover:bg-brand/10 hover:text-brand'
                }`}
              >
                Overview
              </Link>
              <Link
                to="/details"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/details'
                    ? 'bg-brand text-white'
                    : 'text-gray-300 hover:bg-brand/10 hover:text-brand'
                }`}
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}