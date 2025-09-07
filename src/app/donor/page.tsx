"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Activity,
  ArrowRight,
  Shield,
  Wrench,
  Leaf,
  Scale,
  AlertTriangle,
  Camera,
  FileText,
  BarChart3,
  PieChart,
  Zap,
  X,
  Filter
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
  // Add custom styles for animation delays
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .animation-delay-100 { animation-delay: 0.1s; }
      .animation-delay-200 { animation-delay: 0.2s; }
      .animation-delay-300 { animation-delay: 0.3s; }
      .animation-delay-400 { animation-delay: 0.4s; }
      .animation-delay-500 { animation-delay: 0.5s; }
      .animation-delay-600 { animation-delay: 0.6s; }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);
  const [selectedTimeframe, setSelectedTimeframe] = useState('year');
  const [selectedProject, setSelectedProject] = useState<typeof donationProjects[0] | null>(null);
  const [donationAmount, setDonationAmount] = useState('');

  // Project categories matching citizen issues
  const projectCategories = [
    { 
      id: 'infrastructure', 
      name: 'Infrastructure', 
      nameBn: 'অবকাঠামো', 
      icon: Wrench, 
      color: 'from-blue-500 to-blue-600',
      description: 'Roads, bridges, buildings, public facilities'
    },
    { 
      id: 'utilities', 
      name: 'Utilities', 
      nameBn: 'সরকারি সেবা', 
      icon: Zap, 
      color: 'from-amber-500 to-orange-500',
      description: 'Electricity, water, gas, internet services'
    },
    { 
      id: 'safety', 
      name: 'Safety', 
      nameBn: 'নিরাপত্তা', 
      icon: Shield, 
      color: 'from-red-500 to-pink-500',
      description: 'Crime prevention, emergency response, security'
    },
    { 
      id: 'environment', 
      name: 'Environment', 
      nameBn: 'পরিবেশ', 
      icon: Leaf, 
      color: 'from-green-500 to-emerald-500',
      description: 'Pollution control, waste management, green spaces'
    },
    { 
      id: 'corruption', 
      name: 'Anti-Corruption', 
      nameBn: 'দুর্নীতি বিরোধী', 
      icon: Scale, 
      color: 'from-purple-500 to-violet-500',
      description: 'Transparency initiatives, accountability programs'
    }
  ];

  // Donation projects matching citizen issues
  const donationProjects = [
    {
      id: 'P001',
      title: 'Dhaka Road Safety Initiative',
      titleBn: 'ঢাকা সড়ক নিরাপত্তা প্রকল্প',
      category: 'infrastructure',
      location: 'Dhaka City',
      locationBn: 'ঢাকা শহর',
      description: 'Comprehensive road safety improvements including better lighting, pedestrian crossings, and traffic management systems across Dhaka city.',
      descriptionBn: 'ঢাকা শহর জুড়ে সড়ক নিরাপত্তার উন্নতির জন্য ব্যাপক প্রকল্প যার মধ্যে রয়েছে উন্নত আলোকসজ্জা, পথচারী পারাপার এবং ট্রাফিক ব্যবস্থাপনা।',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      targetAmount: 5000000,
      raisedAmount: 3200000,
      beneficiaries: 250000,
      urgency: 'high',
      impact: 'Reduce road accidents by 40% and improve traffic flow',
      impactBn: 'সড়ক দুর্ঘটনা ৪০% কমিয়ে ট্রাফিক প্রবাহ উন্নত করা',
      timeline: '12 months',
      status: 'active',
      featured: true
    },
    {
      id: 'P002',
      title: 'Clean Water Access Program',
      titleBn: 'পরিষ্কার পানি সুবিধা প্রকল্প',
      category: 'utilities',
      location: 'Rural Bangladesh',
      locationBn: 'গ্রামীণ বাংলাদেশ',
      description: 'Installation of deep tube wells and water purification systems in underserved rural communities.',
      descriptionBn: 'অবহেলিত গ্রামীণ সম্প্রদায়ে গভীর নলকূপ এবং পানি শোধন ব্যবস্থা স্থাপন।',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop',
      targetAmount: 3000000,
      raisedAmount: 1800000,
      beneficiaries: 50000,
      urgency: 'critical',
      impact: 'Provide clean drinking water to 50,000 rural residents',
      impactBn: '৫০,০০০ গ্রামীণ বাসিন্দাকে পরিষ্কার পানীয় জল সরবরাহ',
      timeline: '8 months',
      status: 'active',
      featured: true
    },
    {
      id: 'P003',
      title: 'Community Safety Network',
      titleBn: 'সম্প্রদায় নিরাপত্তা নেটওয়ার্ক',
      category: 'safety',
      location: 'Chittagong',
      locationBn: 'চট্টগ্রাম',
      description: 'Establish neighborhood watch programs, emergency response systems, and community safety training.',
      descriptionBn: 'পাড়া পর্যবেক্ষণ কর্মসূচি, জরুরি সাড়া ব্যবস্থা এবং সম্প্রদায় নিরাপত্তা প্রশিক্ষণ স্থাপন।',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      targetAmount: 2500000,
      raisedAmount: 1200000,
      beneficiaries: 75000,
      urgency: 'high',
      impact: 'Reduce crime rates by 35% and improve emergency response',
      impactBn: 'অপরাধের হার ৩৫% কমিয়ে জরুরি সাড়া উন্নত করা',
      timeline: '10 months',
      status: 'active',
      featured: false
    },
    {
      id: 'P004',
      title: 'Urban Green Spaces Initiative',
      titleBn: 'শহুরে সবুজ স্থান প্রকল্প',
      category: 'environment',
      location: 'Sylhet',
      locationBn: 'সিলেট',
      description: 'Create and maintain urban parks, tree planting programs, and environmental education centers.',
      descriptionBn: 'শহুরে পার্ক তৈরি ও রক্ষণাবেক্ষণ, বৃক্ষরোপণ কর্মসূচি এবং পরিবেশ শিক্ষা কেন্দ্র স্থাপন।',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      targetAmount: 4000000,
      raisedAmount: 2500000,
      beneficiaries: 100000,
      urgency: 'medium',
      impact: 'Increase green cover by 25% and improve air quality',
      impactBn: 'সবুজ আচ্ছাদন ২৫% বৃদ্ধি এবং বায়ু গুণমান উন্নত করা',
      timeline: '15 months',
      status: 'active',
      featured: true
    },
    {
      id: 'P005',
      title: 'Transparency & Accountability Hub',
      titleBn: 'স্বচ্ছতা ও জবাবদিহিতা কেন্দ্র',
      category: 'corruption',
      location: 'Nationwide',
      locationBn: 'সারাদেশ',
      description: 'Digital platform for transparent governance, public fund tracking, and citizen engagement.',
      descriptionBn: 'স্বচ্ছ শাসন, সরকারি তহবিল ট্র্যাকিং এবং নাগরিক অংশগ্রহণের জন্য ডিজিটাল প্ল্যাটফর্ম।',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      targetAmount: 6000000,
      raisedAmount: 4000000,
      beneficiaries: 2000000,
      urgency: 'high',
      impact: 'Increase government transparency and reduce corruption',
      impactBn: 'সরকারি স্বচ্ছতা বৃদ্ধি এবং দুর্নীতি হ্রাস',
      timeline: '18 months',
      status: 'active',
      featured: true
    },
    {
      id: 'P006',
      title: 'Digital Literacy Program',
      titleBn: 'ডিজিটাল সাক্ষরতা কর্মসূচি',
      category: 'utilities',
      location: 'Rajshahi',
      locationBn: 'রাজশাহী',
      description: 'Provide digital skills training and internet access to rural communities.',
      descriptionBn: 'গ্রামীণ সম্প্রদায়কে ডিজিটাল দক্ষতা প্রশিক্ষণ এবং ইন্টারনেট সুবিধা প্রদান।',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
      targetAmount: 2000000,
      raisedAmount: 800000,
      beneficiaries: 30000,
      urgency: 'medium',
      impact: 'Bridge digital divide and improve digital inclusion',
      impactBn: 'ডিজিটাল বিভাজন দূর করে ডিজিটাল অন্তর্ভুক্তি উন্নত করা',
      timeline: '9 months',
      status: 'active',
      featured: false
    }
  ];

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
        {/* Main Tabs - Clean & Readable Design */}
        <Tabs defaultValue="donate" className="w-full">
          <div className="relative mb-8">
            {/* Background with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 rounded-2xl"></div>
            
            {/* Tab Container */}
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-1">
              <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 gap-1">
                <TabsTrigger 
                  value="donate" 
                  className="flex items-center gap-3 px-6 py-4 rounded-xl font-semibold text-gray-700 transition-all duration-300 hover:bg-purple-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <Heart className="h-5 w-5" />
                  <span className="font-bold">Donate Now</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="impact" 
                  className="flex items-center gap-3 px-6 py-4 rounded-xl font-semibold text-gray-700 transition-all duration-300 hover:bg-blue-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span className="font-bold">My Impact</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="projects" 
                  className="flex items-center gap-3 px-6 py-4 rounded-xl font-semibold text-gray-700 transition-all duration-300 hover:bg-green-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <Target className="h-5 w-5" />
                  <span className="font-bold">All Projects</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Donate Tab */}
          <TabsContent value="donate" className="space-y-8">
            {/* Featured Projects */}
            <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8 overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-bounce"></div>
              
              <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                    <Sparkles className="h-6 w-6 text-white animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Featured Projects
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">Handpicked high-impact initiatives</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 rounded-full border border-red-200">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-red-600">Urgent funding needed</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {donationProjects.filter(p => p.featured).map((project) => {
                  const category = projectCategories.find(c => c.id === project.category);
                  const progress = (project.raisedAmount / project.targetAmount) * 100;
                  
                  return (
                    <Card key={project.id} className="group hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] border-0 overflow-hidden relative bg-gradient-to-br from-white to-gray-50">
                      {/* Animated border gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      <div className="absolute inset-[1px] bg-white rounded-2xl"></div>
                      
                      <div className="relative h-48 overflow-hidden rounded-t-2xl">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        
                        {/* Floating particles effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-4 left-4 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                          <div className="absolute top-8 right-8 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                          <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-purple-300 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                        </div>
                        
                        {/* Urgency Badge */}
                        <div className="absolute top-4 right-4">
                          <div className={`px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                            project.urgency === 'critical' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse' :
                            project.urgency === 'high' ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' :
                            'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                          }`}>
                            {project.urgency === 'critical' ? 'Critical' : 
                             project.urgency === 'high' ? 'High Priority' : 'Medium Priority'}
                          </div>
                        </div>

                        {/* Project Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                              {category && <category.icon className="h-4 w-4" />}
                            </div>
                            <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">{category?.name}</span>
                          </div>
                          <h3 className="text-2xl font-bold mb-3 drop-shadow-lg">{project.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-white/90">
                            <MapPin className="h-4 w-4" />
                            <span className="font-medium">{project.location}</span>
                          </div>
                        </div>
                      </div>

                      <CardContent className="relative p-6 bg-gradient-to-br from-white to-gray-50">
                        <p className="text-gray-700 text-sm mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
                        
                        {/* Enhanced Progress Bar */}
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-semibold text-gray-700">Funding Progress</span>
                            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{Math.round(progress)}%</span>
                          </div>
                          <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full opacity-20"></div>
                            <div 
                              className="relative bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                              style={{ width: `${progress}%` }}
                            >
                              <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600 mt-2 font-medium">
                            <span>৳{project.raisedAmount.toLocaleString()} raised</span>
                            <span>৳{project.targetAmount.toLocaleString()} target</span>
                          </div>
                        </div>

                        {/* Enhanced Impact Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                            <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{project.beneficiaries.toLocaleString()}</div>
                            <div className="text-xs text-gray-600 font-medium">Lives Impacted</div>
                          </div>
                          <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                            <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{project.timeline}</div>
                            <div className="text-xs text-gray-600 font-medium">Timeline</div>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            onClick={() => setSelectedProject(project)}
                          >
                            <Heart className="h-4 w-4 mr-2 animate-pulse" />
                            Donate Now
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="p-3 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 rounded-xl transition-all duration-300 hover:scale-105"
                            onClick={() => setSelectedProject(project)}
                          >
                            <Eye className="h-4 w-4 text-purple-600" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Project Categories */}
            <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8 overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-400/10 to-red-400/10 rounded-full blur-2xl animate-bounce"></div>
              
              <div className="relative z-10 mb-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                    <Target className="h-6 w-6 text-white animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Browse by Category
                  </h2>
                </div>
                <p className="text-gray-600 text-sm">Explore projects by impact area</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {projectCategories.map((category) => {
                  const categoryProjects = donationProjects.filter(p => p.category === category.id);
                  const totalRaised = categoryProjects.reduce((sum, p) => sum + p.raisedAmount, 0);
                  const totalTarget = categoryProjects.reduce((sum, p) => sum + p.targetAmount, 0);
                  
                  return (
                    <Card 
                      key={category.id} 
                      className="group hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer border-0 overflow-hidden relative bg-gradient-to-br from-white to-gray-50"
                    >
                      {/* Animated border gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      <div className="absolute inset-[1px] bg-white rounded-2xl"></div>
                      
                      <div className={`relative h-32 bg-gradient-to-br ${category.color} flex items-center justify-center overflow-hidden`}>
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Floating icon with animation */}
                        <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                          {category && <category.icon className="h-12 w-12 text-white drop-shadow-lg group-hover:animate-bounce" />}
                        </div>
                        
                        {/* Floating particles on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-4 left-4 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
                          <div className="absolute top-8 right-4 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                          <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
                        </div>
                      </div>
                      
                      <CardContent className="relative p-4 bg-gradient-to-br from-white to-gray-50">
                        <h3 className="font-bold text-gray-900 mb-2 text-center group-hover:text-purple-600 transition-colors duration-300">{category.name}</h3>
                        <p className="text-xs text-gray-600 mb-4 text-center leading-relaxed">{category.description}</p>
                        
                        <div className="text-center space-y-2">
                          <div className="p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                            <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">৳{totalRaised.toLocaleString()}</div>
                            <div className="text-xs text-gray-500 font-medium">raised</div>
                          </div>
                          <div className="text-xs text-gray-500">
                            of ৳{totalTarget.toLocaleString()} target
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="space-y-8">
            {/* Impact Timeline */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
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

            {/* Your Funded Projects */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="h-6 w-6 text-purple-500" />
                Your Funded Projects
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectImpacts.map((project, index) => (
                  <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-lg font-bold mb-1">{project.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-white/80">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-purple-500" />
                          <span className="text-sm font-semibold text-gray-900">Impact Score</span>
                        </div>
                        <span className="text-sm font-bold text-purple-600">{project.impact}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">Social ROI</span>
                        <span className="text-lg font-bold text-emerald-600">{project.roi}</span>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" size="sm">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* All Projects Tab */}
          <TabsContent value="projects" className="space-y-8">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Target className="h-6 w-6 text-purple-500" />
                  All Available Projects
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donationProjects.map((project) => {
                  const category = projectCategories.find(c => c.id === project.category);
                  const progress = (project.raisedAmount / project.targetAmount) * 100;
                  
                  return (
                    <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        
                        {/* Urgency Badge */}
                        <div className="absolute top-4 right-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                            project.urgency === 'critical' ? 'bg-red-500 text-white animate-pulse' :
                            project.urgency === 'high' ? 'bg-orange-500 text-white' :
                            'bg-yellow-500 text-white'
                          }`}>
                            {project.urgency === 'critical' ? 'Critical' : 
                             project.urgency === 'high' ? 'High Priority' : 'Medium Priority'}
                          </div>
                        </div>

                        {/* Project Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <div className="flex items-center gap-2 mb-1">
                            {category && <category.icon className="h-4 w-4" />}
                            <span className="text-xs font-medium">{category?.name}</span>
                          </div>
                          <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-white/80">
                            <MapPin className="h-3 w-3" />
                            <span>{project.location}</span>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold">{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Impact Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-3 text-center">
                          <div>
                            <div className="text-sm font-bold text-purple-600">{project.beneficiaries.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Lives Impacted</div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-emerald-600">{project.timeline}</div>
                            <div className="text-xs text-gray-500">Timeline</div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            size="sm"
                            onClick={() => setSelectedProject(project)}
                          >
                            <Heart className="h-3 w-3 mr-1" />
                            Donate
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedProject(project)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                {/* Project Hero Image */}
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Close Button */}
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Project Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      {(() => {
                        const category = projectCategories.find(c => c.id === selectedProject.category);
                        return category ? <category.icon className="h-6 w-6" /> : null;
                      })()}
                      <span className="text-sm font-medium">
                        {projectCategories.find(c => c.id === selectedProject.category)?.name}
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{selectedProject.title}</h1>
                    <div className="flex items-center gap-2 text-white/80">
                      <MapPin className="h-5 w-5" />
                      <span>{selectedProject.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Project Description */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h2>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {/* Progress and Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Progress */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Funding Progress</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-semibold">{Math.round((selectedProject.raisedAmount / selectedProject.targetAmount) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000"
                              style={{ width: `${(selectedProject.raisedAmount / selectedProject.targetAmount) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>৳{selectedProject.raisedAmount.toLocaleString()} raised</span>
                            <span>৳{selectedProject.targetAmount.toLocaleString()} target</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Impact Stats */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Impact Metrics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-purple-50 rounded-xl">
                          <div className="text-2xl font-bold text-purple-600">{selectedProject.beneficiaries.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Lives Impacted</div>
                        </div>
                        <div className="text-center p-4 bg-emerald-50 rounded-xl">
                          <div className="text-2xl font-bold text-emerald-600">{selectedProject.timeline}</div>
                          <div className="text-sm text-gray-600">Timeline</div>
                        </div>
                        <div className="text-center p-4 bg-amber-50 rounded-xl">
                          <div className="text-2xl font-bold text-amber-600">
                            {selectedProject.urgency === 'critical' ? 'Critical' : 
                             selectedProject.urgency === 'high' ? 'High' : 'Medium'}
                          </div>
                          <div className="text-sm text-gray-600">Priority</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-xl">
                          <div className="text-2xl font-bold text-blue-600">Active</div>
                          <div className="text-sm text-gray-600">Status</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact Description */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Expected Impact</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.impact}</p>
                  </div>

                  {/* Donation Form */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Make a Donation</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount (৳)</label>
                        <input
                          type="number"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      {/* Quick Amount Buttons */}
                      <div className="flex gap-2">
                        {[1000, 5000, 10000, 25000, 50000].map((amount) => (
                          <button
                            key={amount}
                            onClick={() => setDonationAmount(amount.toString())}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors"
                          >
                            ৳{amount.toLocaleString()}
                          </button>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          size="lg"
                        >
                          <Heart className="h-5 w-5 mr-2" />
                          Donate Now
                        </Button>
                        <Button 
                          variant="outline" 
                          size="lg"
                          onClick={() => setSelectedProject(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
