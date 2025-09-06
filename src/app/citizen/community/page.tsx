"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  ArrowLeft,
  MoreHorizontal,
  MapPin,
  Clock,
  CheckCircle2,
  TrendingUp,
  Camera,
  Filter,
  Bell,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Home,
  Wrench,
  Leaf,
  Shield,
  Target,
  BookOpen
} from "lucide-react";

export default function CommunityFeed() {
  const [upvotedPosts, setUpvotedPosts] = useState<Set<string>>(new Set());
  const [downvotedPosts, setDownvotedPosts] = useState<Set<string>>(new Set());
  const [showStats, setShowStats] = useState(false);

  const toggleUpvote = (postId: string) => {
    const newUpvotedPosts = new Set(upvotedPosts);
    const newDownvotedPosts = new Set(downvotedPosts);
    
    if (newUpvotedPosts.has(postId)) {
      newUpvotedPosts.delete(postId);
    } else {
      newUpvotedPosts.add(postId);
      newDownvotedPosts.delete(postId); // Remove downvote if exists
    }
    
    setUpvotedPosts(newUpvotedPosts);
    setDownvotedPosts(newDownvotedPosts);
  };

  const toggleDownvote = (postId: string) => {
    const newUpvotedPosts = new Set(upvotedPosts);
    const newDownvotedPosts = new Set(downvotedPosts);
    
    if (newDownvotedPosts.has(postId)) {
      newDownvotedPosts.delete(postId);
    } else {
      newDownvotedPosts.add(postId);
      newUpvotedPosts.delete(postId); // Remove upvote if exists
    }
    
    setUpvotedPosts(newUpvotedPosts);
    setDownvotedPosts(newDownvotedPosts);
  };

  const feedPosts = [
    {
      id: '1',
      type: 'issue_resolved',
      author: 'ঢাকা সিটি কর্পোরেশন',
      authorEn: 'Dhaka City Corporation',
      authorAvatar: '🏛️',
      time: '২ ঘন্টা আগে',
      timeEn: '2 hours ago',
      location: 'ধানমন্ডি, ঢাকা',
      locationEn: 'Dhanmondi, Dhaka',
      content: 'রোড ২৭ এ স্ট্রিট লাইটিং প্রকল্প সফলভাবে সম্পন্ন হয়েছে! সব ১৫টি LED লাইট এখন চালু।',
      contentEn: 'Street lighting project on Road 27 has been completed successfully! All 15 LED lights are now operational.',
      contentBanglish: 'রোড ২৭ এ street lighting project successfully complete! সব ১৫টা LED light এখন operational।',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      upvotes: 45,
      downvotes: 2,
      likes: 23,
      comments: 12,
      views: 234,
      status: 'resolved',
      icon: Home,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: '2',
      type: 'community_update',
      author: 'রহমান আহমেদ',
      authorEn: 'Rahman Ahmed',
      authorAvatar: '👨‍💼',
      time: '৪ ঘন্টা আগে',
      timeEn: '4 hours ago',
      location: 'গুলশান, ঢাকা',
      locationEn: 'Gulshan, Dhaka',
      content: 'আমাদের এলাকায় পানি সরবরাহ পুনরায় শুরু হয়েছে! এই সমস্যা রিপোর্ট করার জন্য সবাইকে ধন্যবাদ। চমৎকার কমিউনিটি প্রচেষ্টা! 🙏',
      contentEn: 'Water supply has been restored in our area! Thanks to everyone who reported this issue. Great community effort! 🙏',
      contentBanglish: 'আমাদের area তে water supply restore হয়ে গেছে! এই issue report করার জন্য সবাইকে thanks। Great community effort! 🙏',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
      upvotes: 28,
      downvotes: 1,
      likes: 15,
      comments: 8,
      views: 156,
      status: 'community',
      icon: Wrench,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: '3',
      type: 'new_project',
      author: 'স্থানীয় সরকার',
      authorEn: 'Local Government',
      authorAvatar: '🏢',
      time: '৬ ঘন্টা আগে',
      timeEn: '6 hours ago',
      location: 'উত্তরা, ঢাকা',
      locationEn: 'Uttara, Dhaka',
      content: 'সেক্টর ১২ এ নতুন পার্ক উন্নয়ন প্রকল্প আগামী মাস থেকে শুরু হচ্ছে। সবুজ স্থান উন্নয়নের জন্য ৳২.৫ কোটি বরাদ্দ।',
      contentEn: 'New park development project starting next month in Sector 12. ৳2.5M allocated for green space improvement.',
      contentBanglish: 'সেক্টর ১২ এ new park development project আগামী মাস থেকে starting। Green space improvement এর জন্য ৳২.৫M allocated।',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
      upvotes: 67,
      downvotes: 3,
      likes: 34,
      comments: 23,
      views: 445,
      status: 'project',
      icon: Leaf,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: '4',
      type: 'issue_progress',
      author: 'ফাতেমা খাতুন',
      authorEn: 'Fatima Khatun',
      authorAvatar: '👩‍🦱',
      time: '৮ ঘন্টা আগে',
      timeEn: '8 hours ago',
      location: 'মিরপুর, ঢাকা',
      locationEn: 'Mirpur, Dhaka',
      content: 'আমাদের রাস্তায় রাস্তা মেরামতের কাজ ভালোভাবে এগিয়ে চলছে। গর্তগুলো নিয়মিতভাবে ভরাট করা হচ্ছে। ২ দিনের মধ্যে সম্পূর্ণ হওয়ার আশা।',
      contentEn: 'Road repair work is progressing well on our street. The potholes are being filled systematically. Expected completion in 2 days.',
      contentBanglish: 'আমাদের street এ road repair work ভালোভাবে progressing। Potholes গুলো systematically fill করা হচ্ছে। ২ দিনের মধ্যে completion expected।',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
      upvotes: 34,
      downvotes: 5,
      likes: 18,
      comments: 15,
      views: 189,
      status: 'progress',
      icon: Target,
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: '5',
      type: 'transparency',
      author: 'স্বচ্ছতা বোর্ড',
      authorEn: 'Transparency Board',
      authorAvatar: '📊',
      time: '১২ ঘন্টা আগে',
      timeEn: '12 hours ago',
      location: 'ঢাকা বিভাগ',
      locationEn: 'Dhaka Division',
      content: 'মাসিক স্বচ্ছতা রিপোর্ট: ২৪৭টি প্রকল্পে ৳১২.৫ কোটি বরাদ্দ, ৯৪% সম্পূর্ণতার হার। সম্পূর্ণ ব্লকচেইন যাচাইকরণ উপলব্ধ।',
      contentEn: 'Monthly transparency report: ৳12.5M allocated across 247 projects with 94% completion rate. Full blockchain verification available.',
      contentBanglish: 'Monthly transparency report: ২৪৭টা project এ ৳১২.৫M allocated, ৯৪% completion rate। Full blockchain verification available।',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      upvotes: 89,
      downvotes: 4,
      likes: 45,
      comments: 31,
      views: 567,
      status: 'transparency',
      icon: Shield,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: '6',
      type: 'education',
      author: 'শিক্ষা মন্ত্রণালয়',
      authorEn: 'Ministry of Education',
      authorAvatar: '📚',
      time: '১ দিন আগে',
      timeEn: '1 day ago',
      location: 'সারা বাংলাদেশ',
      locationEn: 'All Bangladesh',
      content: 'ডিজিটাল শিক্ষা কার্যক্রমের আওতায় ৫০০টি স্কুলে নতুন কম্পিউটার ল্যাব স্থাপন করা হয়েছে। শিক্ষার্থীদের জন্য আধুনিক প্রযুক্তি সুবিধা।',
      contentEn: 'Under digital education initiative, 500 schools have been equipped with new computer labs. Modern technology facilities for students.',
      contentBanglish: 'Digital education initiative এর আওতায় ৫০০টা school এ new computer lab setup করা হয়েছে। Students এর জন্য modern technology facilities।',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      upvotes: 156,
      downvotes: 8,
      likes: 78,
      comments: 42,
      views: 892,
      status: 'education',
      icon: BookOpen,
      color: 'from-teal-500 to-cyan-600'
    }
  ];

  const [currentLanguage, setCurrentLanguage] = useState<'bn' | 'en' | 'banglish'>('bn');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-500';
      case 'progress': return 'bg-amber-500';
      case 'project': return 'bg-blue-500';
      case 'transparency': return 'bg-purple-500';
      case 'education': return 'bg-teal-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      resolved: { bn: 'সমস্যা সমাধান', en: 'Issue Resolved', banglish: 'Issue Resolved' },
      progress: { bn: 'চলমান', en: 'In Progress', banglish: 'In Progress' },
      project: { bn: 'নতুন প্রকল্প', en: 'New Project', banglish: 'New Project' },
      transparency: { bn: 'স্বচ্ছতা আপডেট', en: 'Transparency Update', banglish: 'Transparency Update' },
      community: { bn: 'কমিউনিটি আপডেট', en: 'Community Update', banglish: 'Community Update' },
      education: { bn: 'শিক্ষা আপডেট', en: 'Education Update', banglish: 'Education Update' }
    };
    return labels[status as keyof typeof labels]?.[currentLanguage] || 'Update';
  };

  const getContent = (post: { content: string; contentEn: string; contentBanglish: string }) => {
    switch (currentLanguage) {
      case 'bn': return post.content;
      case 'en': return post.contentEn;
      case 'banglish': return post.contentBanglish;
      default: return post.content;
    }
  };

  const getAuthor = (post: { author: string; authorEn: string }) => {
    return currentLanguage === 'en' ? post.authorEn : post.author;
  };

  const getTime = (post: { time: string; timeEn: string }) => {
    return currentLanguage === 'en' ? post.timeEn : post.time;
  };

  const getLocation = (post: { location: string; locationEn: string }) => {
    return currentLanguage === 'en' ? post.locationEn : post.location;
  };

  const getUpvotePercentage = (upvotes: number, downvotes: number) => {
    const total = upvotes + downvotes;
    if (total === 0) return 50; // Default to 50% when no votes
    return Math.round((upvotes / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
                <a href="/citizen">
                  <ArrowLeft className="h-4 w-4" />
                </a>
              </Button>
              <div>
                <h1 className="text-3xl font-bold bengali-heading">আমাদের এলাকার খবর</h1>
                <p className="text-slate-300 bengali-text">সবাই মিলে আমাদের এলাকা সুন্দর করি</p>
              </div>
            </div>
            <div className="flex gap-3">
              {/* Language Switcher */}
              <div className="flex bg-white/10 rounded-lg p-1">
                <Button
                  variant={currentLanguage === 'bn' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentLanguage('bn')}
                  className={`text-xs px-3 py-1 ${currentLanguage === 'bn' ? 'bg-white text-slate-900' : 'text-white hover:bg-white/20'}`}
                >
                  সহজ বাংলা
                </Button>
                <Button
                  variant={currentLanguage === 'banglish' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentLanguage('banglish')}
                  className={`text-xs px-3 py-1 ${currentLanguage === 'banglish' ? 'bg-white text-slate-900' : 'text-white hover:bg-white/20'}`}
                >
                  মিশ্র ভাষা
                </Button>
                <Button
                  variant={currentLanguage === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCurrentLanguage('en')}
                  className={`text-xs px-3 py-1 ${currentLanguage === 'en' ? 'bg-white text-slate-900' : 'text-white hover:bg-white/20'}`}
                >
                  ইংরেজি
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20"
                onClick={() => setShowStats(!showStats)}
              >
                <TrendingUp className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible Stats Panel */}
      {showStats && (
        <div className="bg-white border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600 bengali-text">২৩</div>
                <div className="text-sm text-gray-600 bengali-text">সমস্যা আছে</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 bengali-text">১২</div>
                <div className="text-sm text-gray-600 bengali-text">এই সপ্তাহে</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600 bengali-text">৮৯%</div>
                <div className="text-sm text-gray-600 bengali-text">ঠিক হয়েছে</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600 bengali-text">২৪৭</div>
                <div className="text-sm text-gray-600 bengali-text">লোক কাজ করছে</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                <div className="text-2xl font-bold text-amber-600 bengali-text">১.২K</div>
                <div className="text-sm text-gray-600 bengali-text">লোক দেখেছে</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 mt-8 relative z-10 max-w-4xl">
        {/* Feed */}
        <div className="space-y-8 pb-8">
          {feedPosts.map((post) => {
            const IconComponent = post.icon;
            const upvotePercentage = getUpvotePercentage(post.upvotes, post.downvotes);
            const isUpvoted = upvotedPosts.has(post.id);
            const isDownvoted = downvotedPosts.has(post.id);
            
            return (
              <Card key={post.id} className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${post.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg bengali-heading">{getAuthor(post)}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span className="bengali-text">{getTime(post)}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span className="bengali-text">{getLocation(post)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1.5 ${getStatusColor(post.status)} text-white text-sm font-semibold rounded-full shadow-lg`}>
                        {getStatusLabel(post.status)}
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Post Content */}
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg bengali-text">{getContent(post)}</p>
                  
                  {/* Post Image */}
                  <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={post.image} 
                      alt={`Community update for ${getLocation(post)}`}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Upvote/Downvote Section */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-700 bengali-text">লোকের মতামত</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Eye className="h-4 w-4" />
                        <span className="bengali-text">{post.views} জন দেখেছে</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                            isUpvoted 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                              : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                          }`}
                          onClick={() => toggleUpvote(post.id)}
                        >
                          <ThumbsUp className={`h-4 w-4 mr-1 ${isUpvoted ? 'fill-current' : ''}`} />
                          <span className="bengali-text">{(post.upvotes || 0) + (isUpvoted ? 1 : 0)}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                            isDownvoted 
                              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                              : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                          }`}
                          onClick={() => toggleDownvote(post.id)}
                        >
                          <ThumbsDown className={`h-4 w-4 mr-1 ${isDownvoted ? 'fill-current' : ''}`} />
                          <span className="bengali-text">{(post.downvotes || 0) + (isDownvoted ? 1 : 0)}</span>
                        </Button>
                      </div>
                      <div className="flex-1 ml-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <span className="bengali-text">কতজন পছন্দ করেছে</span>
                          <span className="font-semibold bengali-text">{upvotePercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${upvotePercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  {post.status === 'resolved' && (
                    <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-green-600 text-sm font-semibold bg-green-50 px-3 py-1.5 rounded-full">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="bengali-text">সমাধান</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" className="px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200">
              <span className="bengali-text">আরও খবর দেখুন</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
          asChild
        >
          <a href="/citizen/report">
            <Camera className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
          </a>
        </Button>
      </div>

    </div>
  );
}


