"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import InteractiveMap from "@/components/map/InteractiveMap";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { 
  ArrowLeft,
  MapPin,
  BarChart3,
  TrendingUp,
  Download,
  Share2,
  Settings,
  RefreshCw,
  Filter,
  Layers,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Globe,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Users,
  Target,
  Info,
  Navigation,
  Plus,
  Minus,
  RotateCcw,
  ZoomIn,
  ZoomOut
} from "lucide-react";

export default function MapPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, isInitializing } = useAuth();
  const [viewMode, setViewMode] = useState<'map' | 'analytics' | 'reports'>('map');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push('/auth');
      return;
    }
  }, [isAuthenticated, isInitializing, router]);

  // Show loading state while authentication is being initialized
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading state if not authenticated (after initialization is complete)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredPermissions={{ canAccessMap: true }}>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Globe className="h-6 w-6 text-cyan-400" />
                <span className="bengali-text">বাংলাদেশ ইস্যু মানচিত্র</span>
              </h1>
              <p className="text-blue-300">Interactive Issue Mapping • Geographic Analytics • Real-time Tracking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4 relative z-10 max-w-7xl">
        {/* View Mode Toggle */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-gray-900">Map View</h2>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className="text-xs"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Interactive Map
                </Button>
                <Button
                  variant={viewMode === 'analytics' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('analytics')}
                  className="text-xs"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button
                  variant={viewMode === 'reports' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('reports')}
                  className="text-xs"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Reports
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === 'map' && (
          <InteractiveMap className="mb-8" />
        )}

        {viewMode === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 bengali-text">মোট ইস্যু</p>
                    <p className="text-3xl font-bold text-gray-900">1,247</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12% from last month
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 bengali-text">সমাধান হার</p>
                    <p className="text-3xl font-bold text-gray-900">78%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +5% from last month
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 bengali-text">গড় প্রতিক্রিয়া সময়</p>
                    <p className="text-3xl font-bold text-gray-900">2.3h</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  -15% from last month
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 bengali-text">সক্রিয় ব্যবহারকারী</p>
                    <p className="text-3xl font-bold text-gray-900">4,521</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8% from last month
                </div>
              </div>
            </div>

            {/* Geographic Distribution */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 bengali-text">ভৌগোলিক বিতরণ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Dhaka', nameBn: 'ঢাকা', issues: 456, resolved: 342, color: 'bg-blue-500' },
                  { name: 'Chittagong', nameBn: 'চট্টগ্রাম', issues: 234, resolved: 189, color: 'bg-green-500' },
                  { name: 'Sylhet', nameBn: 'সিলেট', issues: 123, resolved: 98, color: 'bg-purple-500' },
                  { name: 'Rajshahi', nameBn: 'রাজশাহী', issues: 189, resolved: 156, color: 'bg-orange-500' },
                  { name: 'Khulna', nameBn: 'খুলনা', issues: 156, resolved: 134, color: 'bg-red-500' },
                  { name: 'Barisal', nameBn: 'বরিশাল', issues: 89, resolved: 67, color: 'bg-cyan-500' }
                ].map((division, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{division.name}</h4>
                      <div className={`w-3 h-3 rounded-full ${division.color}`}></div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 bengali-text">{division.nameBn}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Issues:</span>
                        <span className="font-medium">{division.issues}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Resolved:</span>
                        <span className="font-medium text-green-600">{division.resolved}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(division.resolved / division.issues) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Analysis */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 bengali-text">ক্যাটাগরি বিশ্লেষণ</h3>
              <div className="space-y-4">
                {[
                  { category: 'Infrastructure', nameBn: 'অবকাঠামো', count: 456, percentage: 36.6, color: 'bg-blue-500' },
                  { category: 'Water & Sanitation', nameBn: 'পানি ও স্যানিটেশন', count: 234, percentage: 18.8, color: 'bg-cyan-500' },
                  { category: 'Healthcare', nameBn: 'স্বাস্থ্যসেবা', count: 189, percentage: 15.2, color: 'bg-green-500' },
                  { category: 'Education', nameBn: 'শিক্ষা', count: 156, percentage: 12.5, color: 'bg-purple-500' },
                  { category: 'Transportation', nameBn: 'পরিবহন', count: 123, percentage: 9.9, color: 'bg-orange-500' },
                  { category: 'Environment', nameBn: 'পরিবেশ', count: 89, percentage: 7.1, color: 'bg-emerald-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{item.category}</span>
                        <span className="text-sm text-gray-600">{item.count} ({item.percentage}%)</span>
                      </div>
                      <p className="text-sm text-gray-600 bengali-text">{item.nameBn}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'reports' && (
          <div className="space-y-6">
            {/* Report Generation */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 bengali-text">রিপোর্ট তৈরি করুন</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Issue Summary Report</option>
                      <option>Geographic Analysis</option>
                      <option>Category Breakdown</option>
                      <option>Resolution Timeline</option>
                      <option>Performance Metrics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Last 6 months</option>
                      <option>Last year</option>
                      <option>Custom range</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Division</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Divisions</option>
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                      <option>Sylhet</option>
                      <option>Rajshahi</option>
                      <option>Khulna</option>
                      <option>Barisal</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="format" value="pdf" className="mr-2" defaultChecked />
                        <span className="text-sm">PDF Document</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="format" value="excel" className="mr-2" />
                        <span className="text-sm">Excel Spreadsheet</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="format" value="csv" className="mr-2" />
                        <span className="text-sm">CSV Data</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Include Charts</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Geographic distribution</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Category breakdown</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Timeline analysis</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Report
                </Button>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 bengali-text">সাম্প্রতিক রিপোর্ট</h3>
              <div className="space-y-3">
                {[
                  { name: 'Monthly Issue Summary - January 2024', type: 'PDF', size: '2.3 MB', created: '2024-01-31' },
                  { name: 'Dhaka Division Analysis', type: 'Excel', size: '1.8 MB', created: '2024-01-28' },
                  { name: 'Infrastructure Issues Report', type: 'PDF', size: '3.1 MB', created: '2024-01-25' },
                  { name: 'Resolution Timeline Analysis', type: 'CSV', size: '0.9 MB', created: '2024-01-22' }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Download className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{report.name}</h4>
                        <p className="text-sm text-gray-600">{report.type} • {report.size} • {report.created}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
