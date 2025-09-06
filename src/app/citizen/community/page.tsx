"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  ArrowLeft,
  Heart,
  MessageSquare,
  Share,
  MoreHorizontal,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Users,
  Camera,
  Filter,
  Bell
} from "lucide-react";

export default function CommunityFeed() {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const toggleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const feedPosts = [
    {
      id: '1',
      type: 'issue_resolved',
      author: 'Dhaka City Corporation',
      authorAvatar: '🏛️',
      time: '2 hours ago',
      location: 'Dhanmondi, Dhaka',
      content: 'Street lighting project on Road 27 has been completed successfully! All 15 LED lights are now operational.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      likes: 45,
      comments: 12,
      status: 'resolved'
    },
    {
      id: '2',
      type: 'community_update',
      author: 'Rahman Ahmed',
      authorAvatar: '👨‍💼',
      time: '4 hours ago',
      location: 'Gulshan, Dhaka',
      content: 'Water supply has been restored in our area! Thanks to everyone who reported this issue. Great community effort! 🙏',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
      likes: 28,
      comments: 8,
      status: 'community'
    },
    {
      id: '3',
      type: 'new_project',
      author: 'Local Government',
      authorAvatar: '🏢',
      time: '6 hours ago',
      location: 'Uttara, Dhaka',
      content: 'New park development project starting next month in Sector 12. ৳2.5M allocated for green space improvement.',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
      likes: 67,
      comments: 23,
      status: 'project'
    },
    {
      id: '4',
      type: 'issue_progress',
      author: 'Fatima Khatun',
      authorAvatar: '👩‍🦱',
      time: '8 hours ago',
      location: 'Mirpur, Dhaka',
      content: 'Road repair work is progressing well on our street. The potholes are being filled systematically. Expected completion in 2 days.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
      likes: 34,
      comments: 15,
      status: 'progress'
    },
    {
      id: '5',
      type: 'transparency',
      author: 'Transparency Board',
      authorAvatar: '📊',
      time: '12 hours ago',
      location: 'Dhaka Division',
      content: 'Monthly transparency report: ৳12.5M allocated across 247 projects with 94% completion rate. Full blockchain verification available.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      likes: 89,
      comments: 31,
      status: 'transparency'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-500';
      case 'progress': return 'bg-amber-500';
      case 'project': return 'bg-blue-500';
      case 'transparency': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'resolved': return 'Issue Resolved';
      case 'progress': return 'In Progress';
      case 'project': return 'New Project';
      case 'transparency': return 'Transparency Update';
      case 'community': return 'Community Update';
      default: return 'Update';
    }
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
                <h1 className="text-2xl font-bold">Community Feed</h1>
                <p className="text-slate-300">Local updates and civic engagement</p>
              </div>
            </div>
            <div className="flex gap-2">
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

      <div className="container mx-auto px-4 -mt-4 relative z-10 max-w-2xl">
        {/* Feed */}
        <div className="space-y-6 pb-8">
          {feedPosts.map((post) => (
            <Card key={post.id} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center text-xl">
                      {post.authorAvatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.author}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{post.time}</span>
                        <span>•</span>
                        <MapPin className="h-3 w-3" />
                        <span>{post.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 ${getStatusColor(post.status)} text-white text-xs font-medium rounded-full`}>
                      {getStatusLabel(post.status)}
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Post Content */}
                <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                
                {/* Post Image */}
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={`Community update for ${post.location}`}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Engagement Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`hover:bg-red-50 ${likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-500'}`}
                      onClick={() => toggleLike(post.id)}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                      {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-blue-50 hover:text-blue-600">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:bg-green-50 hover:text-green-600">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                  {post.status === 'resolved' && (
                    <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      Resolved
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Load More */}
          <div className="text-center">
            <Button variant="outline" className="px-8">
              Load More Updates
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button 
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
          asChild
        >
          <a href="/citizen/report">
            <Camera className="h-6 w-6" />
          </a>
        </Button>
      </div>

      {/* Side Stats (Desktop) */}
      <div className="hidden xl:block fixed right-6 top-32 w-64">
        <Card className="bg-white border-0 shadow-xl">
          <CardHeader>
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Community Stats
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Issues</span>
              <span className="font-bold text-emerald-600">23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="font-bold text-blue-600">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Resolved</span>
              <span className="font-bold text-green-600">89%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 bengali-text">সক্রিয় নাগরিক</span>
              <span className="font-bold text-purple-600">247</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


