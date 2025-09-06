"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { 
  Plus, 
  Eye, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  MapPin,
  FileText,
  Users,
  Star
} from "lucide-react";

export default function CitizenDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push('/auth');
      return;
    }
  }, [isAuthenticated, isInitializing, router]);

  const handleReportIssue = () => {
    router.push('/citizen/report');
  };

  const handleTransparency = () => {
    router.push('/citizen/transparency');
  };

  const handleCommunity = () => {
    router.push('/citizen/community');
  };

  const handleViewAllIssues = () => {
    router.push('/citizen/track');
  };

  // Show loading state while authentication is being initialized
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading state if not authenticated (after loading is complete)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredPermissions={{ canAccessCitizen: true }}>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-amber-200/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-7xl pt-6 relative z-10">
        {/* Enhanced Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-white/20 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg animate-float">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                <span className="bengali-text text-teal-600">নাগরিক ড্যাশবোর্ড</span>
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back, {user?.name || 'Citizen'}! 
                <span className="bengali-text ml-2">স্বাগতম!</span>
              </p>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">Welcome back! Track your issues and explore transparency data with our AI-powered platform.</p>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <Button 
              onClick={handleReportIssue}
              className="relative w-full h-20 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 rounded-2xl shadow-xl border-0 group-hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg text-white">Report Issue</div>
                  <div className="text-xs text-teal-100">AI-powered assistance</div>
                </div>
              </div>
            </Button>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <Button 
              onClick={handleTransparency}
              variant="outline" 
              className="relative w-full h-20 border-2 border-blue-200 hover:border-blue-300 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl group-hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg text-gray-900">Transparency</div>
                  <div className="text-xs text-gray-500">Fund tracking & data</div>
                </div>
              </div>
            </Button>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <Button 
              onClick={handleCommunity}
              variant="outline" 
              className="relative w-full h-20 border-2 border-purple-200 hover:border-purple-300 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl group-hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-lg text-gray-900">Community</div>
                  <div className="text-xs text-gray-500">Local feed & updates</div>
                </div>
              </div>
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0 shadow-2xl hover:shadow-teal-500/25 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm font-medium">My Issues</p>
                  <p className="text-3xl font-bold mb-1">7</p>
                  <p className="text-xs text-teal-200">↗ +2 this week</p>
                </div>
                <div className="relative">
                  <FileText className="h-10 w-10 text-teal-200 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-2xl hover:shadow-green-500/25 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Resolved</p>
                  <p className="text-3xl font-bold mb-1">4</p>
                  <p className="text-xs text-green-200">Great progress!</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-200 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 shadow-2xl hover:shadow-amber-500/25 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">In Progress</p>
                  <p className="text-3xl font-bold mb-1">2</p>
                  <p className="text-xs text-amber-200">Being worked on</p>
                </div>
                <Clock className="h-10 w-10 text-amber-200 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-2xl hover:shadow-red-500/25 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Pending</p>
                  <p className="text-3xl font-bold mb-1">1</p>
                  <p className="text-xs text-red-200">Awaiting review</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-red-200 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Recent Issues */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-white">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="bengali-text">আমার সাম্প্রতিক ইস্যু</span>
                    <p className="text-sm text-teal-100 font-normal">My Recent Issues</p>
                  </div>
                </CardTitle>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Street Light Repair - Dhanmondi 27</h4>
                    <p className="text-sm text-gray-600 mt-1">Reported broken street lights on Road 27. Work completed successfully.</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Dhanmondi, Dhaka
                      </span>
                      <span>Resolved • 2 days ago</span>
                      <span className="flex items-center gap-1 text-green-600">
                        <Star className="h-3 w-3" />
                        Rated 5/5
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mt-2 animate-pulse"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Water Supply Issue - Gulshan 2</h4>
                    <p className="text-sm text-gray-600 mt-1">Low water pressure in apartment building. Team assigned for inspection.</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Gulshan, Dhaka
                      </span>
                      <span>In Progress • 1 week ago</span>
                      <span className="text-amber-600">Expected: 3 days</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Road Pothole - Uttara Sector 10</h4>
                    <p className="text-sm text-gray-600 mt-1">Large pothole causing traffic issues. Under review by authorities.</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Uttara, Dhaka
                      </span>
                      <span>Under Review • 3 days ago</span>
                      <span className="text-blue-600">Priority: Medium</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleViewAllIssues}
                  variant="outline" 
                  className="w-full mt-4"
                >
                  View All Issues
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-8">
            {/* Enhanced Impact Score */}
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 text-white rounded-3xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="relative mb-6">
                  <TrendingUp className="h-16 w-16 mx-auto text-purple-200 animate-bounce-subtle" />
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-xl font-bold mb-2 bengali-text">নাগরিক প্রভাব স্কোর</h3>
                <p className="text-sm text-purple-100 mb-4">Civic Impact Score</p>
                <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">89</div>
                <p className="text-purple-100 text-sm leading-relaxed mb-6">
                  Outstanding! Your civic engagement is creating positive change in Bangladesh.
                </p>
                <div className="bg-purple-400/30 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-white to-purple-100 rounded-full h-3 w-4/5 animate-slideInRight"></div>
                </div>
                <p className="text-xs text-purple-200 mt-2">Top 15% of active citizens</p>
              </CardContent>
            </Card>

            {/* Enhanced Community Stats */}
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                <CardTitle className="text-lg font-bold bengali-text">কমিউনিটি পরিসংখ্যান</CardTitle>
                <p className="text-sm text-blue-100">Community Statistics</p>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-center group hover:bg-teal-50 p-3 rounded-lg transition-colors">
                  <span className="text-sm text-gray-600 font-medium">Issues This Month</span>
                  <span className="font-bold text-2xl text-teal-600 group-hover:scale-110 transition-transform">247</span>
                </div>
                <div className="flex justify-between items-center group hover:bg-green-50 p-3 rounded-lg transition-colors">
                  <span className="text-sm text-gray-600 font-medium">Resolution Rate</span>
                  <span className="font-bold text-2xl text-green-600 group-hover:scale-110 transition-transform">94%</span>
                </div>
                <div className="flex justify-between items-center group hover:bg-blue-50 p-3 rounded-lg transition-colors">
                  <span className="text-sm text-gray-600 font-medium">Avg Response</span>
                  <span className="font-bold text-2xl text-blue-600 group-hover:scale-110 transition-transform">2.3d</span>
                </div>
                <div className="flex justify-between items-center group hover:bg-purple-50 p-3 rounded-lg transition-colors">
                  <span className="text-sm text-gray-600 font-medium bengali-text">স্বচ্ছতা স্কোর</span>
                  <span className="font-bold text-2xl text-purple-600 group-hover:scale-110 transition-transform">98%</span>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Recent Activity */}
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
                <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
                <p className="text-sm text-amber-100">Live community updates</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4 p-3 hover:bg-green-50 rounded-lg transition-colors group">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 group-hover:text-green-700 transition-colors">Issue #1247 marked as resolved</span>
                </div>
                <div className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-lg transition-colors group">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <span className="text-sm text-gray-600 group-hover:text-blue-700 transition-colors">New update on water supply issue</span>
                </div>
                <div className="flex items-center gap-4 p-3 hover:bg-amber-50 rounded-lg transition-colors group">
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <span className="text-sm text-gray-600 group-hover:text-amber-700 transition-colors">Fund allocation approved for road repair</span>
                </div>
                <div className="flex items-center gap-4 p-3 hover:bg-purple-50 rounded-lg transition-colors group">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                  <span className="text-sm text-gray-600 group-hover:text-purple-700 transition-colors">Community meeting scheduled</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
