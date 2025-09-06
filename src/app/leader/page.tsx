"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { 
  Crown,
  TrendingUp,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  Award,
  ArrowRight,
  Bell,
  Settings,
  MapPin,
  Calendar,
  Star
} from "lucide-react";

export default function LeaderDashboard() {
  return (
    <ProtectedRoute requiredPermissions={{ canAccessLeader: true }}>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  <span className="bengali-text text-amber-300">মাননীয় চেয়ারম্যান</span>
                </h1>
                <p className="text-slate-300">Honorable Chairman • Dhanmondi Ward 27</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Online
                  </span>
                  <span>Last updated: 2 min ago</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 relative z-10">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <a href="/leader/issues">
            <Card className="bg-red-500 text-white border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold mb-1">12</div>
                <div className="text-red-100 text-sm">Urgent Issues</div>
              </CardContent>
            </Card>
          </a>

          <a href="/leader/budget">
            <Card className="bg-amber-500 text-white border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold mb-1">৳2.4M</div>
                <div className="text-amber-100 text-sm">Pending Approval</div>
              </CardContent>
            </Card>
          </a>

          <a href="/leader/analytics">
            <Card className="bg-blue-500 text-white border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold mb-1">94%</div>
                <div className="text-blue-100 text-sm">Performance</div>
              </CardContent>
            </Card>
          </a>

          <a href="/leader/team">
            <Card className="bg-purple-500 text-white border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold mb-1">47</div>
                <div className="text-purple-100 text-sm">Team Members</div>
              </CardContent>
            </Card>
          </a>
        </div>

        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Issues Resolved</p>
                  <p className="text-2xl font-bold text-green-600">247</p>
                  <p className="text-xs text-green-600 mt-1">↗ +18% this month</p>
                </div>
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Avg Resolution Time</p>
                  <p className="text-2xl font-bold text-blue-600">2.3</p>
                  <p className="text-xs text-blue-600 mt-1">days (↓ 0.5 improved)</p>
                </div>
                <Clock className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Citizen Satisfaction</p>
                  <p className="text-2xl font-bold text-purple-600">4.8</p>
                  <p className="text-xs text-purple-600 mt-1">★ out of 5.0</p>
                </div>
                <Award className="h-10 w-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Budget Utilization</p>
                  <p className="text-2xl font-bold text-amber-600">87%</p>
                  <p className="text-xs text-amber-600 mt-1">৳8.7M of ৳10M</p>
                </div>
                <Target className="h-10 w-10 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Issues Requiring Attention */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Issues Requiring Attention</h2>
                    <p className="text-gray-500 text-sm mt-1">Priority items for executive decision</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/leader/issues">View All</a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* High Priority Issue */}
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-gray-500">#1254</span>
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">HIGH PRIORITY</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">Water Main Break - Emergency</h4>
                      <p className="text-sm text-gray-600 mt-1">Major water line rupture affecting 500+ households</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          Gulshan Block A
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          2 hours ago
                        </span>
                        <span className="text-red-600">500+ affected</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-red-500 hover:bg-red-600">
                      Assign Team
                    </Button>
                  </div>
                </div>

                {/* Medium Priority */}
                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-gray-500">#1252</span>
                        <span className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">BUDGET APPROVAL</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">Road Maintenance Project</h4>
                      <p className="text-sm text-gray-600 mt-1">Infrastructure improvement for main connecting road</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="text-amber-600">Budget: ৳85K</span>
                        <span>Expected: 5 days</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                      Approve
                    </Button>
                  </div>
                </div>

                {/* Team Assignment */}
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-gray-500">#1250</span>
                        <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">TEAM NEEDED</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">Park Maintenance Request</h4>
                      <p className="text-sm text-gray-600 mt-1">Community park requires regular maintenance</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Assign Team
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leadership Score */}
            <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 animate-bounce-subtle" />
                </div>
                <h3 className="text-lg font-bold mb-2 bengali-text">নেতৃত্ব স্কোর</h3>
                <p className="text-sm text-emerald-100 mb-3">Leadership Performance</p>
                <div className="text-4xl font-bold mb-3">A+</div>
                <p className="text-emerald-100 text-sm mb-4">
                  Exceptional governance and community impact
                </p>
                <div className="bg-emerald-400/30 rounded-full h-2 overflow-hidden mb-2">
                  <div className="bg-white rounded-full h-2 w-[94%] animate-slideInRight"></div>
                </div>
                <p className="text-xs text-emerald-200">94% citizen approval</p>
              </CardContent>
            </Card>

            {/* Today's Overview */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-slate-600" />
                  Today&apos;s Overview
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 hover:bg-red-50 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-gray-600">New Issues</span>
                  <span className="text-xl font-bold text-red-600">8</span>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-green-50 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-gray-600">Completed</span>
                  <span className="text-xl font-bold text-green-600">15</span>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-amber-50 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-gray-600">Budget Used</span>
                  <span className="text-xl font-bold text-amber-600">৳125K</span>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-blue-50 rounded-lg transition-colors">
                  <span className="text-sm font-medium text-gray-600 bengali-text">নাগরিক খুশি</span>
                  <span className="text-xl font-bold text-blue-600">96%</span>
                </div>
              </CardContent>
            </Card>

            {/* Team Performance */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-slate-600" />
                  Team Performance
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 hover:bg-green-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600">WT</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Water Team</div>
                    <div className="text-xs text-gray-500">98% efficiency</div>
                  </div>
                  <div className="text-green-600 text-sm font-bold">★ 4.9</div>
                </div>
                
                <div className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">RT</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Road Team</div>
                    <div className="text-xs text-gray-500">92% efficiency</div>
                  </div>
                  <div className="text-blue-600 text-sm font-bold">★ 4.7</div>
                </div>

                <div className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">ET</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Electric Team</div>
                    <div className="text-xs text-gray-500">95% efficiency</div>
                  </div>
                  <div className="text-purple-600 text-sm font-bold">★ 4.8</div>
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