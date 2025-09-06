"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft,
  Shield,
  DollarSign,
  TrendingUp,
  Eye,
  CheckCircle2,
  Clock,
  Building,
  Users,
  MapPin,
  Calendar,
  ExternalLink,
  Download,
  Search,
  Filter,
  Zap,
  BarChart3,
  Home,
  Heart,
  BookOpen,
  Leaf,
  Wrench,
  FileText,
  Star,
  Target
} from "lucide-react";

export default function TransparencyExplorer() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const timeframes = [
    { id: 'week', name: 'এই সপ্তাহ', nameEn: 'This Week' },
    { id: 'month', name: 'এই মাস', nameEn: 'This Month' },
    { id: 'quarter', name: 'এই ত্রৈমাসিক', nameEn: 'This Quarter' },
    { id: 'year', name: 'এই বছর', nameEn: 'This Year' }
  ];

  const fundCategories = [
    { id: 'all', name: 'সব প্রকল্প', nameEn: 'All Projects', amount: '৳১২.৫ কোটি', color: 'bg-slate-500', icon: Target },
    { id: 'infrastructure', name: 'রাস্তাঘাট ও ভবন', nameEn: 'Roads & Buildings', amount: '৳৫.২ কোটি', color: 'bg-blue-500', icon: Home },
    { id: 'healthcare', name: 'স্বাস্থ্যসেবা', nameEn: 'Healthcare', amount: '৳৩.১ কোটি', color: 'bg-red-500', icon: Heart },
    { id: 'education', name: 'শিক্ষা', nameEn: 'Education', amount: '৳২.৮ কোটি', color: 'bg-purple-500', icon: BookOpen },
    { id: 'environment', name: 'পরিবেশ', nameEn: 'Environment', amount: '৳১.৪ কোটি', color: 'bg-green-500', icon: Leaf }
  ];

  const recentTransactions = [
    {
      id: 'tx_001',
      hash: '0x1a2b3c4d5e6f...',
      project: 'রাস্তার বাতি স্থাপন - ধানমন্ডি',
      projectEn: 'Street Light Installation - Dhanmondi',
      amount: '৳৪৫,০০০',
      status: 'completed',
      statusBn: 'সম্পন্ন',
      date: '২০২৪-০১-২০',
      beneficiaries: 1250,
      verification: 'verified',
      verificationBn: 'যাচাইকৃত'
    },
    {
      id: 'tx_002',
      hash: '0x2b3c4d5e6f7g...',
      project: 'পানি সরবরাহ উন্নয়ন - গুলশান',
      projectEn: 'Water Supply Upgrade - Gulshan',
      amount: '৳১,২৫,০০০',
      status: 'in_progress',
      statusBn: 'চলমান',
      date: '২০২৪-০১-১৮',
      beneficiaries: 3400,
      verification: 'verified',
      verificationBn: 'যাচাইকৃত'
    },
    {
      id: 'tx_003',
      hash: '0x3c4d5e6f7g8h...',
      project: 'রাস্তা মেরামত - উত্তরা সেক্টর ১০',
      projectEn: 'Road Repair - Uttara Sector 10',
      amount: '৳৮৫,০০০',
      status: 'approved',
      statusBn: 'অনুমোদিত',
      date: '২০২৪-০১-১৫',
      beneficiaries: 2100,
      verification: 'pending',
      verificationBn: 'অপেক্ষমান'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-amber-500';
      case 'approved': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getVerificationColor = (verification: string) => {
    return verification === 'verified' ? 'text-green-600' : 'text-amber-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
                <a href="/citizen">
                  <ArrowLeft className="h-4 w-4" />
                </a>
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2 bengali-heading">
                  <Shield className="h-6 w-6 text-emerald-400" />
                  স্বচ্ছতা এক্সপ্লোরার
                </h1>
                <p className="text-slate-300 bengali-text">তহবিল বরাদ্দ ও ব্লকচেইন যাচাইকরণ ট্র্যাক করুন</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Download className="h-4 w-4 mr-1" />
                <span className="bengali-text">রপ্তানি</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4 relative z-10">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-emerald-200" />
              <div className="text-2xl font-bold mb-1">৳১২.৫ কোটি</div>
              <div className="text-emerald-100 text-sm bengali-text">মোট বরাদ্দ</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-blue-200" />
              <div className="text-2xl font-bold mb-1">২৪৭</div>
              <div className="text-blue-100 text-sm bengali-text">সক্রিয় প্রকল্প</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-purple-200" />
              <div className="text-2xl font-bold mb-1">৯৮%</div>
              <div className="text-purple-100 text-sm bengali-text">যাচাইকৃত</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-green-200" />
              <div className="text-2xl font-bold mb-1">৪৫ হাজার</div>
              <div className="text-green-100 text-sm bengali-text">সুবিধাভোগী</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex gap-2">
            <span className="text-sm font-medium text-gray-700 flex items-center bengali-text">সময়কাল:</span>
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe.id}
                variant={selectedTimeframe === timeframe.id ? "default" : "outline"}
                size="sm"
                className={selectedTimeframe === timeframe.id ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                onClick={() => setSelectedTimeframe(timeframe.id)}
              >
                <span className="bengali-text">{timeframe.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Fund Categories */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {fundCategories.map((category) => (
            <Card 
              key={category.id}
              className={`border-2 cursor-pointer transition-all hover:shadow-lg ${
                selectedCategory === category.id 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-8 h-8 ${category.color} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                  <category.icon className="h-4 w-4 text-white" />
                </div>
                <div className="font-semibold text-gray-900 text-sm bengali-text">{category.name}</div>
                <div className="text-lg font-bold text-gray-700 mt-1 bengali-text">{category.amount}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transactions List */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-emerald-500" />
                    <span className="bengali-heading">সাম্প্রতিক লেনদেন</span>
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      <span className="bengali-text">ফিল্টার</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-1" />
                      <span className="bengali-text">খুঁজুন</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    {/* Transaction Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 bengali-text">{transaction.project}</h4>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span className="bengali-text">{transaction.date}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span className="bengali-text">{transaction.beneficiaries.toLocaleString()} সুবিধাভোগী</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900 bengali-text">{transaction.amount}</div>
                        <div className={`text-xs font-medium ${getVerificationColor(transaction.verification)}`}>
                          <span className="bengali-text">
                            {transaction.verification === 'verified' ? '✓ যাচাইকৃত' : '⏳ অপেক্ষমান'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Blockchain Hash */}
                    <div className="bg-gray-100 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-gray-500 bengali-text">ব্লকচেইন হ্যাশ:</span>
                          <div className="font-mono text-sm text-gray-700">{transaction.hash}</div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 ${getStatusColor(transaction.status)} rounded-full`}></div>
                        <span className="text-sm font-medium text-gray-600 bengali-text">{transaction.statusBn}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                        <span className="bengali-text">বিস্তারিত দেখুন</span>
                      </Button>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  <span className="bengali-text">আরও লেনদেন দেখুন</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Blockchain Status */}
            <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold mb-2 bengali-heading">ব্লকচেইন অবস্থা</h3>
                <div className="text-3xl font-bold mb-2">১০০%</div>
                <p className="text-indigo-100 text-sm mb-4 bengali-text">
                  সব লেনদেন ব্লকচেইনে যাচাইকৃত ও অপরিবর্তনীয়
                </p>
                <div className="bg-indigo-400/30 rounded-lg p-2">
                  <p className="text-xs text-indigo-100 bengali-text">
                    🔒 শেষ যাচাই: ২ মিনিট আগে
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Fund Distribution */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-emerald-500" />
                  <span className="bengali-heading">তহবিল বিতরণ</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 bengali-text">রাস্তাঘাট ও ভবন</span>
                    <span className="font-bold text-blue-600 bengali-text">৪২%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-[42%]"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 bengali-text">স্বাস্থ্যসেবা</span>
                    <span className="font-bold text-red-600 bengali-text">২৫%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full w-[25%]"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 bengali-text">শিক্ষা</span>
                    <span className="font-bold text-purple-600 bengali-text">২২%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-[22%]"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 bengali-text">পরিবেশ</span>
                    <span className="font-bold text-green-600 bengali-text">১১%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-[11%]"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg bengali-heading">দ্রুত কাজ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  <span className="bengali-text">সম্পূর্ণ রিপোর্ট দেখুন</span>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="bengali-text">ডেটা ডাউনলোড</span>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <span className="bengali-text">ব্লকচেইন এক্সপ্লোরার</span>
                </Button>
              </CardContent>
            </Card>

            {/* Impact Metrics */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-emerald-500" />
                  <span className="bengali-heading">এই মাসের প্রভাব</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-600 mb-1 bengali-text">৪৫,২৩১</div>
                  <div className="text-sm text-emerald-700 bengali-text">নাগরিক সাহায্য</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-blue-600 bengali-text">৯৪%</div>
                    <div className="text-xs text-gray-500 bengali-text">সফলতার হার</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-purple-600 bengali-text">২.৩</div>
                    <div className="text-xs text-gray-500 bengali-text">গড় দিন</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


