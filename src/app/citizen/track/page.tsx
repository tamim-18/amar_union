"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft,
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Eye,
  MessageSquare,
  ThumbsUp,
  Share,
  MapPin,
  Calendar,
  User,
  Camera,
  FileText,
  Filter,
  Search
} from "lucide-react";

export default function IssueTracker() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const filters = [
    { id: 'all', name: 'All Issues', count: 7 },
    { id: 'resolved', name: 'Resolved', count: 4 },
    { id: 'progress', name: 'In Progress', count: 2 },
    { id: 'pending', name: 'Pending', count: 1 }
  ];

  const issues = [
    {
      id: '1247',
      title: 'Street Light Repair - Dhanmondi 27',
      description: 'Multiple street lights not working on Road 27, creating safety concerns for pedestrians.',
      status: 'resolved',
      priority: 'medium',
      location: 'Dhanmondi, Dhaka',
      date: '2024-01-15',
      rating: 5,
      updates: 4,
      likes: 12,
      timeline: [
        { status: 'submitted', date: '2024-01-15', title: 'Issue Submitted', description: 'Report received and assigned ID #1247' },
        { status: 'reviewed', date: '2024-01-16', title: 'Under Review', description: 'Technical team assigned for assessment' },
        { status: 'approved', date: '2024-01-17', title: 'Work Approved', description: 'Budget allocated: ৳45,000' },
        { status: 'progress', date: '2024-01-18', title: 'Work Started', description: 'Electrician team deployed to location' },
        { status: 'completed', date: '2024-01-20', title: 'Issue Resolved', description: 'All street lights repaired and tested' }
      ]
    },
    {
      id: '1251',
      title: 'Water Supply Issue - Gulshan 2',
      description: 'Low water pressure affecting entire apartment building.',
      status: 'progress',
      priority: 'high',
      location: 'Gulshan, Dhaka',
      date: '2024-01-18',
      rating: null,
      updates: 2,
      likes: 8,
      timeline: [
        { status: 'submitted', date: '2024-01-18', title: 'Issue Submitted', description: 'Report received and assigned ID #1251' },
        { status: 'reviewed', date: '2024-01-19', title: 'Under Review', description: 'Water department investigating' },
        { status: 'progress', date: '2024-01-20', title: 'Investigation Started', description: 'Team scheduled for site visit' }
      ]
    },
    {
      id: '1253',
      title: 'Road Pothole - Uttara Sector 10',
      description: 'Large pothole on main road causing traffic congestion.',
      status: 'pending',
      priority: 'medium',
      location: 'Uttara, Dhaka',
      date: '2024-01-20',
      rating: null,
      updates: 1,
      likes: 5,
      timeline: [
        { status: 'submitted', date: '2024-01-20', title: 'Issue Submitted', description: 'Report received and assigned ID #1253' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-500';
      case 'progress': return 'bg-amber-500';
      case 'pending': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle2 className="h-4 w-4" />;
      case 'progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
              <a href="/citizen">
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Track Issues</h1>
              <p className="text-slate-300">Monitor progress and engage with your community</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4 relative z-10">
        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap ${
                  selectedFilter === filter.id 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                    : 'hover:bg-emerald-50 hover:text-emerald-600'
                }`}
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.name} ({filter.count})
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-1" />
              Search
            </Button>
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {issues.map((issue) => (
            <Card 
              key={issue.id}
              className={`bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                selectedIssue === issue.id ? 'ring-2 ring-emerald-500' : ''
              }`}
              onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-gray-500">#{issue.id}</span>
                      <div className={`w-2 h-2 ${getStatusColor(issue.status)} rounded-full`}></div>
                      <span className="text-xs text-gray-500 capitalize">{issue.status}</span>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
                      {issue.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {issue.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Issue Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {issue.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {issue.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {issue.updates} updates
                  </span>
                </div>

                {/* Timeline Preview */}
                {selectedIssue === issue.id && (
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-emerald-500" />
                      Progress Timeline
                    </h4>
                    <div className="space-y-3">
                      {issue.timeline.map((update, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 ${getStatusColor(update.status)} rounded-full flex items-center justify-center text-white`}>
                              {getStatusIcon(update.status)}
                            </div>
                            {index < issue.timeline.length - 1 && (
                              <div className="w-0.5 h-6 bg-gray-200 mt-1"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-3">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium text-gray-900 text-sm">{update.title}</h5>
                              <span className="text-xs text-gray-500">{update.date}</span>
                            </div>
                            <p className="text-xs text-gray-600">{update.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-emerald-600">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {issue.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600">
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                  {issue.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">Rating:</span>
                      <span className="text-sm font-medium text-amber-600">★ {issue.rating}.0</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <Card className="bg-white border-0 shadow-xl mt-8 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600 mb-1">7</div>
                <div className="text-sm text-gray-500">Total Issues</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">4</div>
                <div className="text-sm text-gray-500">Resolved</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600 mb-1">3.2</div>
                <div className="text-sm text-gray-500">Avg Resolution (days)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">94%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
