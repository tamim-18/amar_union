"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Target,
  Award,
  Users,
  Clock,
  DollarSign,
  MapPin
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';

export default function LeaderAnalytics() {
  const [activeMetric, setActiveMetric] = useState('performance');

  // Chart Data
  const performanceData = [
    { month: 'Jul', resolved: 180, satisfaction: 4.2, responseTime: 3.1 },
    { month: 'Aug', resolved: 210, satisfaction: 4.4, responseTime: 2.8 },
    { month: 'Sep', resolved: 195, satisfaction: 4.3, responseTime: 2.9 },
    { month: 'Oct', resolved: 225, satisfaction: 4.6, responseTime: 2.5 },
    { month: 'Nov', resolved: 240, satisfaction: 4.7, responseTime: 2.4 },
    { month: 'Dec', resolved: 247, satisfaction: 4.8, responseTime: 2.3 }
  ];

  const issueCategories = [
    { name: 'Infrastructure', value: 45, color: '#3B82F6' },
    { name: 'Utilities', value: 28, color: '#F59E0B' },
    { name: 'Safety', value: 18, color: '#EF4444' },
    { name: 'Environment', value: 12, color: '#10B981' },
    { name: 'Other', value: 7, color: '#8B5CF6' }
  ];

  const budgetAllocation = [
    { category: 'Infrastructure', allocated: 4200000, spent: 3800000, pending: 400000 },
    { category: 'Utilities', allocated: 2500000, spent: 2100000, pending: 400000 },
    { category: 'Safety', allocated: 2000000, spent: 1800000, pending: 200000 },
    { category: 'Environment', allocated: 1300000, spent: 900000, pending: 400000 }
  ];

  const satisfactionByArea = [
    { area: 'Dhanmondi', rating: 4.9, issues: 85, resolved: 82 },
    { area: 'Gulshan', rating: 4.7, issues: 67, resolved: 63 },
    { area: 'Uttara', rating: 4.8, issues: 45, resolved: 44 },
    { area: 'Mirpur', rating: 4.6, issues: 50, resolved: 46 }
  ];

  const teamPerformance = [
    { team: 'Water Team', efficiency: 98, projects: 24, rating: 4.9, fill: '#06B6D4' },
    { team: 'Road Team', efficiency: 92, projects: 18, rating: 4.7, fill: '#3B82F6' },
    { team: 'Electric Team', efficiency: 95, projects: 22, rating: 4.8, fill: '#8B5CF6' },
    { team: 'Environment Team', efficiency: 88, projects: 12, rating: 4.6, fill: '#10B981' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-bounce-subtle"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-amber-400/15 to-orange-400/15 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
            <a href="/leader">
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Analytics Command Center</h1>
            <p className="text-slate-300">Real-time performance insights and data visualization</p>
          </div>
        </div>

        {/* Floating Metrics Constellation */}
        <div className="relative mb-16">
          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
              <div className="text-center">
                <div className="text-2xl font-bold">94%</div>
                <div className="text-xs text-emerald-100">Overall Score</div>
              </div>
            </div>
          </div>

          {/* Floating Metric Orbs */}
          <div className="relative w-full h-80">
            {/* Performance Orb */}
            <div 
              className={`absolute top-4 left-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl cursor-pointer transition-all duration-300 hover:scale-110 ${
                activeMetric === 'performance' ? 'ring-4 ring-blue-300' : ''
              }`}
              onClick={() => setActiveMetric('performance')}
            >
              <div className="text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-1" />
                <div className="text-xs font-bold">Performance</div>
              </div>
            </div>

            {/* Issues Orb */}
            <div 
              className={`absolute top-20 right-16 w-20 h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-xl cursor-pointer transition-all duration-300 hover:scale-110 ${
                activeMetric === 'issues' ? 'ring-4 ring-red-300' : ''
              }`}
              onClick={() => setActiveMetric('issues')}
            >
              <div className="text-center">
                <Activity className="h-5 w-5 mx-auto mb-1" />
                <div className="text-xs font-bold">Issues</div>
              </div>
            </div>

            {/* Budget Orb */}
            <div 
              className={`absolute bottom-16 left-32 w-28 h-28 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl cursor-pointer transition-all duration-300 hover:scale-110 ${
                activeMetric === 'budget' ? 'ring-4 ring-amber-300' : ''
              }`}
              onClick={() => setActiveMetric('budget')}
            >
              <div className="text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-1" />
                <div className="text-xs font-bold">Budget</div>
              </div>
            </div>

            {/* Satisfaction Orb */}
            <div 
              className={`absolute bottom-8 right-24 w-22 h-22 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center shadow-xl cursor-pointer transition-all duration-300 hover:scale-110 ${
                activeMetric === 'satisfaction' ? 'ring-4 ring-purple-300' : ''
              }`}
              onClick={() => setActiveMetric('satisfaction')}
            >
              <div className="text-center">
                <Award className="h-5 w-5 mx-auto mb-1" />
                <div className="text-xs font-bold">Satisfaction</div>
              </div>
            </div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="50%" y1="50%" x2="30%" y2="80%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="50%" y1="50%" x2="75%" y2="85%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
              </line>
            </svg>
          </div>
        </div>

        {/* Dynamic Content Based on Selected Metric */}
        <div className="relative z-10">
          {activeMetric === 'performance' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Performance Analytics
                </h2>
                <p className="text-slate-300 text-lg">Your leadership impact over time</p>
              </div>

              {/* Performance Trend Chart */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">6-Month Performance Trend</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="#CBD5E1" />
                      <YAxis stroke="#CBD5E1" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="resolved"
                        stroke="#10B981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorResolved)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Team Performance Radial Chart */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Team Efficiency Radar</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={teamPerformance}>
                      <RadialBar
                        label={{ position: 'insideStart', fill: '#fff', fontSize: 12 }}
                        background={{ fill: 'rgba(255,255,255,0.1)' }}
                        dataKey="efficiency"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeMetric === 'issues' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  Issue Distribution Analysis
                </h2>
                <p className="text-slate-300 text-lg">Citizen issue patterns and category breakdown</p>
              </div>

              {/* Issue Categories Pie Chart */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Issue Categories Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={issueCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({name, value}) => `${name}: ${value}`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {issueCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Area Performance Bar Chart */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Performance by Area</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={satisfactionByArea}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="area" stroke="#CBD5E1" />
                      <YAxis stroke="#CBD5E1" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                      <Bar dataKey="resolved" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="issues" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeMetric === 'issues' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                  Issue Distribution Analysis
                </h2>
                <p className="text-slate-300 text-lg">Citizen issue patterns and category breakdown</p>
              </div>

              {/* Issue Categories Pie Chart */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Issue Categories Distribution</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={issueCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({name, value}) => `${name}: ${value}`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {issueCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Area Performance Bar Chart */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Resolution Rate by Area</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={satisfactionByArea}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="area" stroke="#CBD5E1" />
                      <YAxis stroke="#CBD5E1" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: 'white'
                        }}
                      />
                      <Bar dataKey="resolved" fill="#10B981" radius={[4, 4, 0, 0]} name="Resolved" />
                      <Bar dataKey="issues" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Total Issues" />
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeMetric === 'budget' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  Budget Analytics
                </h2>
                <p className="text-slate-300 text-lg">Financial allocation and spending patterns</p>
              </div>

              {/* Budget Allocation Chart */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Budget Allocation vs Spending</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={budgetAllocation}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="category" stroke="#CBD5E1" />
                      <YAxis stroke="#CBD5E1" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: 'white'
                        }}
                        formatter={(value: number) => [`৳${(value/1000000).toFixed(1)}M`, '']}
                      />
                      <Bar dataKey="allocated" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Allocated" />
                      <Bar dataKey="spent" fill="#10B981" radius={[4, 4, 0, 0]} name="Spent" />
                      <Bar dataKey="pending" fill="#EF4444" radius={[4, 4, 0, 0]} name="Pending" />
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeMetric === 'satisfaction' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Citizen Satisfaction Analytics
                </h2>
                <p className="text-slate-300 text-lg">Community feedback and approval trends</p>
              </div>

              {/* Satisfaction Trend Line Chart */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Satisfaction Trend Over Time</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="#CBD5E1" />
                      <YAxis domain={[3.5, 5]} stroke="#CBD5E1" />
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
                        dataKey="satisfaction" 
                        stroke="#8B5CF6" 
                        strokeWidth={4}
                        dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: '#8B5CF6', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Area Satisfaction Radial Chart */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Satisfaction by Area</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={satisfactionByArea}>
                      <RadialBar
                        label={{ position: 'insideStart', fill: '#fff', fontSize: 14 }}
                        background={{ fill: 'rgba(255,255,255,0.1)' }}
                        dataKey="rating"
                        fill="#8B5CF6"
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: 'white'
                        }}
                        formatter={(value: number) => [`${value} ★`, 'Rating']}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Stats Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-t border-white/20 p-4 z-30">
          <div className="container mx-auto">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-300">Live Data</span>
                </div>
                <div className="text-slate-400">Last updated: 30 seconds ago</div>
              </div>
              <div className="flex items-center gap-6 text-slate-300">
                <span>Today: 15 resolved • ৳125K allocated • 96% satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
