"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Shield, TrendingUp, Heart, Globe, Zap, ArrowRight } from "lucide-react";

export default function HomePage() {
  // Handle portal navigation
  const handlePortalClick = (portalType: string) => {
    if (portalType === 'citizen') {
      window.location.href = '/citizen';
    } else if (portalType === 'leader') {
      window.location.href = '/leader';
    } else if (portalType === 'donor') {
      window.location.href = '/donor';
    } else if (portalType === 'beneficiary') {
      window.location.href = '/beneficiary';
    } else {
      console.log(`Navigating to ${portalType} portal`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, portalType: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePortalClick(portalType);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-amber-50 bangladesh-pattern gpu-accelerated relative">
      {/* Background elements to show glass effect */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium"
      >
        Skip to main content
      </a>
      
      {/* Hero Section */}
      <main id="main-content" role="main" aria-label="Amar Sheba Protiva Homepage">
        <section 
          className="relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4"
          aria-labelledby="hero-heading"
        >
          <div className="container mx-auto max-w-7xl">
          {/* Header Badge */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-teal-200 transition-all duration-300 animate-float cursor-default">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse-glow" />
              <span className="hidden sm:inline">Civic Tech Innovation for Bangladesh</span>
              <span className="sm:hidden">Civic Tech Bangladesh</span>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
              aria-label="আমার সেবা প্রতিভা - Amar Sheba Protiva - Unified Civic Tech Transparency Platform"
            >
              <span className="bengali-heading block text-teal-600 mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl relative">
                <span className="relative z-10 bengali-ornament" lang="bn">আমার সেবা প্রতিভা</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-100/50 via-transparent to-teal-100/50 rounded-lg -z-10 transform scale-110 opacity-50" aria-hidden="true"></div>
              </span>
              <span className="text-gradient block" lang="en">
                Amar Sheba Protiva
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
              Unified Civic Tech Transparency Platform empowering citizens, leaders, and donors through{" "}
              <span className="font-semibold text-teal-600">blockchain-backed transparency</span> and{" "}
              <span className="font-semibold text-amber-600">AI-powered civic engagement</span>.
            </p>

            {/* Feature Badges */}
            <div 
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4"
              role="list"
              aria-label="Platform key features"
            >
              <div 
                className="flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-green-100 hover:shadow-md hover:scale-105 transition-all duration-300 animate-bounce-subtle"
                role="listitem"
                aria-label="AI Moderation feature"
              >
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 animate-pulse-glow" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">AI Moderation</span>
              </div>
              <div 
                className="flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-blue-100 hover:shadow-md hover:scale-105 transition-all duration-300 animate-bounce-subtle" 
                style={{animationDelay: '0.2s'}}
                role="listitem"
                aria-label="Blockchain Verified feature"
              >
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Blockchain Verified</span>
              </div>
              <div 
                className="flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-purple-100 hover:shadow-md hover:scale-105 transition-all duration-300 animate-bounce-subtle" 
                style={{animationDelay: '0.4s'}}
                role="listitem"
                aria-label="Community Driven feature"
              >
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Community Driven</span>
              </div>
              <div 
                className="flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-amber-100 hover:shadow-md hover:scale-105 transition-all duration-300 animate-bounce-subtle" 
                style={{animationDelay: '0.6s'}}
                role="listitem"
                aria-label="Real-time Analytics feature"
              >
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Real-time Analytics</span>
              </div>
            </div>
          </div>

          {/* Portal Cards */}
          <section 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20 px-2 sm:px-0"
            aria-labelledby="portal-cards-heading"
          >
            <h2 id="portal-cards-heading" className="sr-only">Choose Your Portal</h2>
            
            {/* Citizen Portal */}
            <Card 
              className="card-hover card-teal cursor-pointer group relative overflow-hidden gpu-accelerated reduce-motion focus:outline-none focus:ring-4 focus:ring-teal-500/50"
              role="button"
              tabIndex={0}
              aria-label="নাগরিক পোর্টাল - Citizen Portal: Report issues, track transparency, and engage with your community"
              onClick={() => handlePortalClick('citizen')}
              onKeyDown={(e) => handleKeyDown(e, 'citizen')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100" aria-hidden="true" />
              <CardHeader className="text-center pb-3 sm:pb-4 relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-teal rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 optimized-hover shadow-lg group-hover:shadow-2xl group-hover:shadow-teal-500/25 gpu-accelerated" aria-hidden="true">
                  <Users className="h-7 w-7 sm:h-8 sm:w-8 text-white group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg sm:text-xl bengali-subtitle group-hover:text-teal-700 transition-colors duration-300">
                  <span lang="bn">নাগরিক পোর্টাল</span>
                </CardTitle>
                <CardDescription className="font-medium text-sm group-hover:text-teal-600 transition-colors duration-300">Citizen Portal</CardDescription>
              </CardHeader>
              <CardContent className="text-center px-4 sm:px-6 relative z-10">
                <p className="text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Report issues, track transparency, and engage with your community
                </p>
                <Button className="w-full btn-primary text-sm group-hover:scale-105 transition-transform duration-300" tabIndex={-1}>
                  Enter Portal
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>

            {/* Leader Portal */}
            <Card 
              className="card-hover card-amber cursor-pointer group relative overflow-hidden gpu-accelerated reduce-motion focus:outline-none focus:ring-4 focus:ring-amber-500/50"
              role="button"
              tabIndex={0}
              aria-label="নেতৃত্ব পোর্টাল - Leader Portal: Monitor KPIs, manage issues, and oversee fund distribution"
              onClick={() => handlePortalClick('leader')}
              onKeyDown={(e) => handleKeyDown(e, 'leader')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100" />
              <CardHeader className="text-center pb-3 sm:pb-4 relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-amber rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-amber-500/25">
                  <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-lg sm:text-xl bengali-subtitle group-hover:text-amber-700 transition-colors duration-300">নেতৃত্ব পোর্টাল</CardTitle>
                <CardDescription className="font-medium text-sm group-hover:text-amber-600 transition-colors duration-300">Leader Portal</CardDescription>
              </CardHeader>
              <CardContent className="text-center px-4 sm:px-6 relative z-10">
                <p className="text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Monitor KPIs, manage issues, and oversee fund distribution
                </p>
                <Button className="w-full btn-secondary text-sm group-hover:scale-105 transition-transform duration-300">
                  Access Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>

            {/* Donor Portal */}
            <Card 
              className="card-hover card-purple cursor-pointer group relative overflow-hidden gpu-accelerated reduce-motion focus:outline-none focus:ring-4 focus:ring-purple-500/50"
              role="button"
              tabIndex={0}
              aria-label="দাতা পোর্টাল - Donor Portal: Track fund utilization and view impact metrics"
              onClick={() => handlePortalClick('donor')}
              onKeyDown={(e) => handleKeyDown(e, 'donor')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100" />
              <CardHeader className="text-center pb-3 sm:pb-4 relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/25">
                  <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-lg sm:text-xl bengali-subtitle group-hover:text-purple-700 transition-colors duration-300">দাতা পোর্টাল</CardTitle>
                <CardDescription className="font-medium text-sm group-hover:text-purple-600 transition-colors duration-300">Donor Portal</CardDescription>
              </CardHeader>
              <CardContent className="text-center px-4 sm:px-6 relative z-10">
                <p className="text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Track fund utilization and view impact metrics
                </p>
                <Button className="w-full btn-purple text-sm group-hover:scale-105 transition-transform duration-300">
                  View Impact
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>

            {/* Beneficiary Portal */}
            <Card 
              className="card-hover card-emerald cursor-pointer group relative overflow-hidden gpu-accelerated reduce-motion focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
              role="button"
              tabIndex={0}
              aria-label="সুবিধাভোগী পোর্টাল - Beneficiary Portal: Access your digital transparency passport"
              onClick={() => handlePortalClick('beneficiary')}
              onKeyDown={(e) => handleKeyDown(e, 'beneficiary')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100" />
              <CardHeader className="text-center pb-3 sm:pb-4 relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-emerald rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-emerald-500/25">
                  <Globe className="h-7 w-7 sm:h-8 sm:w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-lg sm:text-xl bengali-subtitle group-hover:text-emerald-700 transition-colors duration-300">সুবিধাভোগী পোর্টাল</CardTitle>
                <CardDescription className="font-medium text-sm group-hover:text-emerald-600 transition-colors duration-300">Beneficiary Portal</CardDescription>
              </CardHeader>
              <CardContent className="text-center px-4 sm:px-6 relative z-10">
                <p className="text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Access your digital transparency passport
                </p>
                <Button className="w-full btn-emerald text-sm group-hover:scale-105 transition-transform duration-300">
                  Digital Passport
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          </section>
          </div>
        </section>
        
        {/* Platform Impact Stats */}
        <section 
          className="py-12 sm:py-16 bg-white/50 backdrop-blur-sm cultural-border"
          aria-labelledby="impact-heading"
        >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 id="impact-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Platform Impact</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
              Real-time transparency metrics showing positive change across Bangladesh
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl hover:border-teal-200 transition-all duration-300 group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-teal mb-1 sm:mb-2 group-hover:scale-105 transition-transform">12,547</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium group-hover:text-teal-700 transition-colors">Issues Reported</div>
              <div className="text-xs text-green-600 mt-1">↗ +23% this month</div>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl hover:border-amber-200 transition-all duration-300 group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-amber mb-1 sm:mb-2 group-hover:scale-105 transition-transform">
                <span className="bengali-text">৳২.৪M</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium group-hover:text-amber-700 transition-colors">Funds Tracked</div>
              <div className="text-xs text-blue-600 mt-1 bengali-text">১০০% স্বচ্ছতা</div>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl hover:border-purple-200 transition-all duration-300 group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-purple mb-1 sm:mb-2 group-hover:scale-105 transition-transform">89%</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium group-hover:text-purple-700 transition-colors">Resolution Rate</div>
              <div className="text-xs text-green-600 mt-1">↗ +12% improved</div>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-emerald mb-1 sm:mb-2 group-hover:scale-105 transition-transform">45,231</div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium group-hover:text-emerald-700 transition-colors">Verified Beneficiaries</div>
              <div className="text-xs text-blue-600 mt-1">NID Verified</div>
            </div>
          </div>
        </div>
        </section>
      </main>
    </div>
  );
}