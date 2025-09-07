"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Bell, Menu, Search, User, Users, TrendingUp, Heart, Globe, Headphones, Map, LogOut, Settings, ChevronDown } from "lucide-react";
import SearchModal from "./SearchModal";
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout, getRolePermissions } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 glass-header">
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 pointer-events-none"></div>
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
            <div className=" rounded-xl overflow-hidden">
              <Image src="/home-removebg-preview.png" alt="সেবার জানালা লোগো" width={56} height={56} className="w-full h-full object-contain bg-transparent" priority />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">
                <span className="bengali-text text-teal-600">সেবার জানালা</span>
              </h1>
              <p className="text-xs text-gray-500 -mt-1 bengali-text">
                <span lang="bn">স্বচ্ছতাই শক্তি</span>
                <span className="mx-1">|</span>
                <span>Power Through Transparency</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {isAuthenticated && user ? (
              (() => {
                const permissions = getRolePermissions(user.role);
                return (
                  <>
                    {permissions.canAccessCitizen && (
                      <a href="/citizen" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-all">
                        <Users className="h-4 w-4" />
                        <span className="text-sm font-medium bengali-text">নাগরিক</span>
                      </a>
                    )}
                    {permissions.canAccessLeader && (
                      <a href="/leader" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-all">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-medium bengali-text">নেতৃত্ব</span>
                      </a>
                    )}
                    {permissions.canAccessDonor && (
                      <a href="/donor" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm font-medium bengali-text">দাতা</span>
                      </a>
                    )}
                    {permissions.canAccessBeneficiary && (
                      <a href="/beneficiary" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                        <Globe className="h-4 w-4" />
                        <span className="text-sm font-medium bengali-text">সুবিধাভোগী</span>
                      </a>
                    )}
                    {permissions.canAccessSupport && (
                      <a href="/support" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
                        <Headphones className="h-4 w-4" />
                        <span className="text-sm font-medium bengali-text">সহায়তা</span>
                      </a>
                    )}
                    {permissions.canAccessMap && (
                      <a href="/map" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all">
                        <Map className="h-4 w-4" />
                        <span className="text-sm font-medium bengali-text">মানচিত্র</span>
                      </a>
                    )}
                  </>
                );
              })()
            ) : (
              <a href="/auth" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium bengali-text">লগইন</span>
              </a>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:flex"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
            
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>
            
            {/* Profile */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
                
                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600 bengali-text">{user.nameBn}</p>
                          <p className="text-xs text-gray-500 capitalize">{user.role.replace('_', ' ')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span className="bengali-text">প্রোফাইল সেটিং</span>
                      </button>
                      <button 
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="bengali-text">বেরিয়ে যান</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <a href="/auth">
                  <User className="h-4 w-4" />
                </a>
              </Button>
            )}
            
            {/* Mobile Menu */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fadeInUp">
            <nav className="space-y-2">
              {isAuthenticated && user ? (
                (() => {
                  const permissions = getRolePermissions(user.role);
                  return (
                    <>
                      {permissions.canAccessCitizen && (
                        <a href="/citizen" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-teal-600 hover:bg-teal-50 transition-all">
                          <Users className="h-5 w-5" />
                          <div>
                            <span className="block font-medium bengali-text">নাগরিক</span>
                            <span className="block text-xs text-gray-500 bengali-text">আমাদের এলাকার খবর</span>
                          </div>
                        </a>
                      )}
                      {permissions.canAccessLeader && (
                        <a href="/leader" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-all">
                          <TrendingUp className="h-5 w-5" />
                          <div>
                            <span className="block font-medium bengali-text">নেতৃত্ব</span>
                            <span className="block text-xs text-gray-500 bengali-text">নেতাদের জন্য</span>
                          </div>
                        </a>
                      )}
                      {permissions.canAccessDonor && (
                        <a href="/donor" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-all">
                          <Heart className="h-5 w-5" />
                          <div>
                            <span className="block font-medium bengali-text">দাতা</span>
                            <span className="block text-xs text-gray-500 bengali-text">সাহায্যকারীদের জন্য</span>
                          </div>
                        </a>
                      )}
                      {permissions.canAccessBeneficiary && (
                        <a href="/beneficiary" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                          <Globe className="h-5 w-5" />
                          <div>
                            <span className="block font-medium bengali-text">সুবিধাভোগী</span>
                            <span className="block text-xs text-gray-500 bengali-text">যারা সাহায্য পায়</span>
                          </div>
                        </a>
                      )}
                      {permissions.canAccessSupport && (
                        <a href="/support" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
                          <Headphones className="h-5 w-5" />
                          <div>
                            <span className="block font-medium bengali-text">সহায়তা</span>
                            <span className="block text-xs text-gray-500 bengali-text">সাহায্য নিন</span>
                          </div>
                        </a>
                      )}
                      {permissions.canAccessMap && (
                        <a href="/map" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all">
                          <Map className="h-5 w-5" />
                          <div>
                            <span className="block font-medium bengali-text">মানচিত্র</span>
                            <span className="block text-xs text-gray-500 bengali-text">এলাকা দেখুন</span>
                          </div>
                        </a>
                      )}
                    </>
                  );
                })()
              ) : (
                <a href="/auth" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
                  <User className="h-5 w-5" />
                  <div>
                    <span className="block font-medium bengali-text">লগইন</span>
                    <span className="block text-xs text-gray-500 bengali-text">এখানে ঢুকুন</span>
                  </div>
                </a>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}