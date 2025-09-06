"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { 
  Heart,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  Award,
  Eye,
  ExternalLink,
  Download,
  Bell,
  Settings,
  Sparkles,
  Target,
  CheckCircle2,
  Clock,
  Star,
  Activity
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function DonorDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('year');

  // Impact timeline data
  const impactTimeline = [
    { month: 'Jan', donated: 250000, impact: 1200, projects: 8 },
    { month: 'Feb', donated: 180000, impact: 950, projects: 6 },
    { month: 'Mar', donated: 320000, impact: 1800, projects: 12 },
    { month: 'Apr', donated: 290000, impact: 1500, projects: 10 },
    { month: 'May', donated: 410000, impact: 2200, projects: 15 },
    { month: 'Jun', donated: 380000, impact: 2000, projects: 14 }
  ];

  const projectImpacts = [
    {
      id: 'P001',
      name: 'Clean Water Initiative',
      location: 'Gulshan Area',
      donated: '৳500K',
      beneficiaries: 2500,
      completion: 95,
      impact: 'Excellent',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
      status: 'active',
      roi: '450%'
    },
    {
      id: 'P002',
      name: 'Street Light Safety Project',
      location: 'Dhanmondi',
      donated: '৳300K',
      beneficiaries: 1800,
      completion: 100,
      impact: 'Outstanding',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      status: 'completed',
      roi: '380%'
    },
    {
      id: 'P003',
      name: 'Community Park Development',
      location: 'Uttara',
      donated: '৳750K',
      beneficiaries: 4200,
      completion: 70,
      impact: 'Very Good',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      status: 'active',
      roi: '520%'
    }
  ];

  return (
    <ProtectedRoute requiredPermissions={{ canAccessDonor: true }}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
      {/* Floating Impact Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Predefined particle positions to avoid hydration mismatch */}
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '10%', top: '20%', animationDelay: '0s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '25%', top: '60%', animationDelay: '0.5s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '40%', top: '15%', animationDelay: '1s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '60%', top: '80%', animationDelay: '1.5s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '75%', top: '30%', animationDelay: '2s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '85%', top: '70%', animationDelay: '2.5s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '15%', top: '45%', animationDelay: '3s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '55%', top: '10%', animationDelay: '0.3s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '70%', top: '55%', animationDelay: '0.8s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '30%', top: '85%', animationDelay: '1.3s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '90%', top: '25%', animationDelay: '1.8s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '5%', top: '75%', animationDelay: '2.3s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '45%', top: '40%', animationDelay: '2.8s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '65%', top: '90%', animationDelay: '0.2s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '80%', top: '5%', animationDelay: '0.7s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '20%', top: '95%', animationDelay: '1.2s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '50%', top: '65%', animationDelay: '1.7s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '35%', top: '25%', animationDelay: '2.2s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '95%', top: '50%', animationDelay: '2.7s'}} />
        <div className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{left: '12%', top: '35%', animationDelay: '0.4s'}} />
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-3xl px-8 py-6 border border-white/20 shadow-2xl mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-3xl flex items-center justify-center shadow-xl animate-pulse-glow">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold mb-2">
                  Impact Dashboard
                </h1>
                <p className="text-purple-100 text-lg">Your generosity creating real change</p>
                <p className="text-purple-200 text-sm">Global Foundation Partner • Since 2023</p>
              </div>
            </div>

            {/* Impact Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent mb-2">
                  ৳2.1M
                </div>
                <div className="text-purple-100 text-sm">Total Donated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-2">
                  12,500
                </div>
                <div className="text-purple-100 text-sm">Lives Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-2">
                  47
                </div>
                <div className="text-purple-100 text-sm">Projects Funded</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent mb-2">
                  425%
                </div>
                <div className="text-purple-100 text-sm">Avg ROI</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-10">
        {/* Impact Timeline */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
              Your Impact Journey
            </h2>
            <div className="flex gap-2">
              {['month', 'quarter', 'year'].map((period) => (
                <Button
                  key={period}
                  variant={selectedTimeframe === period ? "default" : "outline"}
                  size="sm"
                  className={selectedTimeframe === period ? 'bg-purple-500 hover:bg-purple-600' : ''}
                  onClick={() => setSelectedTimeframe(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={impactTimeline}>
                <defs>
                  <linearGradient id="impactGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="impact"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#impactGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Impact Gallery */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="h-6 w-6 text-purple-500" />
            Your Funded Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectImpacts.map((project, index) => (
              <div 
                key={project.id}
                className="group relative overflow-hidden rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      project.status === 'completed' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {project.status === 'completed' ? 'Completed' : 'In Progress'}
                    </div>
                  </div>

                  {/* Project Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.completion}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-yellow-300 font-bold">{project.donated}</div>
                        <div className="text-white/80">Donated</div>
                      </div>
                      <div>
                        <div className="text-emerald-300 font-bold">{project.beneficiaries}</div>
                        <div className="text-white/80">Lives Helped</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Metrics */}
                <div className="bg-white p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-purple-500" />
                      <span className="font-semibold text-gray-900">Impact Score</span>
                    </div>
                    <span className="text-lg font-bold text-purple-600">{project.impact}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Social ROI</span>
                    <span className="text-xl font-bold text-emerald-600">{project.roi}</span>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" asChild>
                    <a href="/donor/projects">View Full Story</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Metrics Dashboard */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-8 text-center">Real-Time Impact Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Impact Chart */}
              <div>
                <h3 className="text-xl font-bold mb-4">Monthly Impact Trend</h3>
                <div className="h-64 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={impactTimeline}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                      <XAxis dataKey="month" stroke="#FFF" />
                      <YAxis stroke="#FFF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="impact" 
                        stroke="#FFF" 
                        strokeWidth={3}
                        dot={{ fill: '#FFF', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 7, stroke: '#FFF', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Live Impact Stats */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">12,500</div>
                  <div className="text-emerald-100 text-lg">Lives Transformed</div>
                  <div className="text-emerald-200 text-sm">+2,200 this month</div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold mb-1">98%</div>
                    <div className="text-teal-100 text-sm">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold mb-1">425%</div>
                    <div className="text-cyan-100 text-sm">Avg ROI</div>
                  </div>
                </div>

                <div className="bg-white/20 rounded-2xl p-4 text-center">
                  <div className="text-lg font-bold mb-1">Next Milestone</div>
                  <div className="text-teal-100 text-sm mb-2">15,000 Lives Impacted</div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div className="bg-white rounded-full h-3 w-[83%] animate-slideInRight"></div>
                  </div>
                  <div className="text-xs text-teal-200 mt-1">83% complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transparency Verification */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl shadow-xl">
              <CheckCircle2 className="h-6 w-6" />
              <span className="font-bold text-lg">100% Verified Transparency</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blockchain Verification */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Blockchain Verified</h3>
              <p className="text-gray-600 text-sm mb-3">Every transaction immutably recorded</p>
              <Button variant="outline" size="sm" asChild>
                <a href="/donor/blockchain">View Ledger</a>
              </Button>
            </div>

            {/* Real-time Tracking */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-white animate-pulse" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Live Tracking</h3>
              <p className="text-gray-600 text-sm">Real-time project updates</p>
            </div>

            {/* Impact Measurement */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Impact Measured</h3>
              <p className="text-gray-600 text-sm">Quantified social return</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Stream */}
        <div className="mt-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Impact Updates</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Water Project Completed!</h4>
                <p className="text-gray-600 text-sm mb-2">Clean water access restored for 2,500 residents in Gulshan area</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>2 hours ago</span>
                  <span>•</span>
                  <span>Your contribution: ৳500K</span>
                  <span>•</span>
                  <span className="text-green-600 font-medium">ROI: 450%</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Street Safety Improved</h4>
                <p className="text-gray-600 text-sm mb-2">LED street lights installation reducing crime by 35% in Dhanmondi</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>1 day ago</span>
                  <span>•</span>
                  <span>Your contribution: ৳300K</span>
                  <span>•</span>
                  <span className="text-blue-600 font-medium">1,800 safer commutes daily</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Community Park 70% Complete</h4>
                <p className="text-gray-600 text-sm mb-2">Green space development creating recreational opportunities for 4,200 residents</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>3 days ago</span>
                  <span>•</span>
                  <span>Your contribution: ৳750K</span>
                  <span>•</span>
                  <span className="text-purple-600 font-medium">Expected completion: 2 weeks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
