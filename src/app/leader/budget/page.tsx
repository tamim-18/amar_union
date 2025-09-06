"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ArrowLeft,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Shield,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  ExternalLink,
  Download,
  Filter,
  Search,
  Zap,
  Target,
  Building
} from "lucide-react";

interface BudgetRequest {
  id: string;
  projectName: string;
  description: string;
  requestedAmount: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  location: string;
  beneficiaries: number;
  timeline: string;
  requestedBy: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  blockchainHash?: string;
  justification: string;
}

export default function FundAllocation() {
  const [selectedRequest, setSelectedRequest] = useState<BudgetRequest | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const budgetOverview = {
    totalBudget: '৳10.0M',
    allocated: '৳7.6M',
    pending: '৳2.4M',
    available: '৳2.4M',
    utilization: 76
  };

  const categories = [
    { id: 'all', name: 'All Categories', allocated: '৳7.6M', pending: '৳2.4M', color: 'bg-slate-500' },
    { id: 'infrastructure', name: 'Infrastructure', allocated: '৳3.2M', pending: '৳1.1M', color: 'bg-blue-500' },
    { id: 'utilities', name: 'Utilities', allocated: '৳2.1M', pending: '৳0.8M', color: 'bg-amber-500' },
    { id: 'safety', name: 'Safety & Security', allocated: '৳1.5M', pending: '৳0.3M', color: 'bg-red-500' },
    { id: 'environment', name: 'Environment', allocated: '৳0.8M', pending: '৳0.2M', color: 'bg-green-500' }
  ];

  const pendingRequests: BudgetRequest[] = [
    {
      id: 'BR001',
      projectName: 'Emergency Water Main Repair',
      description: 'Immediate repair of burst water main affecting 500+ households in Gulshan area',
      requestedAmount: '৳150,000',
      category: 'utilities',
      priority: 'high',
      location: 'Gulshan Block A',
      beneficiaries: 500,
      timeline: '3 days',
      requestedBy: 'Water Department',
      date: '2024-01-22',
      status: 'pending',
      justification: 'Emergency repair required to restore water supply to affected households. Delay will cause severe public health issues.'
    },
    {
      id: 'BR002',
      projectName: 'Road Pothole Repair',
      description: 'Systematic repair of potholes on main connecting road',
      requestedAmount: '৳85,000',
      category: 'infrastructure',
      priority: 'medium',
      location: 'Dhanmondi Road 27',
      beneficiaries: 1000,
      timeline: '1 week',
      requestedBy: 'Roads & Highways',
      date: '2024-01-20',
      status: 'pending',
      justification: 'Road condition is deteriorating and affecting daily commute for thousands of residents.'
    },
    {
      id: 'BR003',
      projectName: 'Street Light Installation',
      description: 'LED street light installation for improved safety',
      requestedAmount: '৳65,000',
      category: 'safety',
      priority: 'medium',
      location: 'Uttara Sector 12',
      beneficiaries: 800,
      timeline: '5 days',
      requestedBy: 'City Corporation',
      date: '2024-01-19',
      status: 'pending',
      justification: 'Dark streets are causing safety concerns for residents, especially women and children.'
    }
  ];

  const recentTransactions = [
    {
      id: 'TX001',
      project: 'Park Renovation - Gulshan',
      amount: '৳200,000',
      hash: '0x1a2b3c4d5e6f7890abcdef...',
      date: '2024-01-20',
      status: 'completed'
    },
    {
      id: 'TX002',
      project: 'School Building Repair',
      amount: '৳120,000',
      hash: '0x2b3c4d5e6f7890abcdef01...',
      date: '2024-01-18',
      status: 'completed'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const handleApprove = (requestId: string) => {
    console.log(`Approving budget request ${requestId}`);
    // Here you would handle the approval logic
  };

  const handleReject = (requestId: string) => {
    console.log(`Rejecting budget request ${requestId}`);
    // Here you would handle the rejection logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
                <a href="/leader">
                  <ArrowLeft className="h-4 w-4" />
                </a>
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-amber-400" />
                  Fund Allocation
                </h1>
                <p className="text-slate-300">Budget management with blockchain verification</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ExternalLink className="h-4 w-4 mr-1" />
                Blockchain
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4 relative z-10">
        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-emerald-200" />
              <div className="text-2xl font-bold mb-1">{budgetOverview.totalBudget}</div>
              <div className="text-emerald-100 text-sm">Total Budget</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-blue-200" />
              <div className="text-2xl font-bold mb-1">{budgetOverview.allocated}</div>
              <div className="text-blue-100 text-sm">Allocated</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-amber-200" />
              <div className="text-2xl font-bold mb-1">{budgetOverview.pending}</div>
              <div className="text-amber-100 text-sm">Pending Approval</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-purple-200" />
              <div className="text-2xl font-bold mb-1">{budgetOverview.utilization}%</div>
              <div className="text-purple-100 text-sm">Utilization</div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {categories.map((category) => (
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
                  <Building className="h-4 w-4 text-white" />
                </div>
                <div className="font-semibold text-gray-900 text-sm">{category.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  <div>Allocated: {category.allocated}</div>
                  <div>Pending: {category.pending}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Approvals */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Pending Budget Approvals
                  </CardTitle>
                  <span className="text-sm text-gray-500">{pendingRequests.length} requests</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono text-gray-500">{request.id}</span>
                          <div className={`w-2 h-2 ${getPriorityColor(request.priority)} rounded-full`}></div>
                          <span className={`px-2 py-1 ${getPriorityColor(request.priority)} text-white text-xs font-medium rounded-full uppercase`}>
                            {request.priority} Priority
                          </span>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 mb-1">{request.projectName}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{request.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{request.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{request.beneficiaries}+ people</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{request.timeline}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{request.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-gray-900 mb-1">{request.requestedAmount}</div>
                        <div className="text-xs text-gray-500 mb-3">Requested by {request.requestedBy}</div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(request.id);
                            }}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReject(request.id);
                            }}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                <h3 className="text-lg font-bold mb-2">Blockchain Status</h3>
                <div className="text-3xl font-bold mb-2">100%</div>
                <p className="text-indigo-100 text-sm mb-4">
                  All transactions verified and immutable
                </p>
                <div className="bg-indigo-400/30 rounded-lg p-2">
                  <p className="text-xs text-indigo-100">
                    🔒 Last sync: 30 seconds ago
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Budget Utilization */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  Budget Utilization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{budgetOverview.utilization}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div 
                      className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${budgetOverview.utilization}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {budgetOverview.allocated} of {budgetOverview.totalBudget} used
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Infrastructure</span>
                    <span className="font-bold text-blue-600">32%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Utilities</span>
                    <span className="font-bold text-amber-600">21%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Safety</span>
                    <span className="font-bold text-red-600">15%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Environment</span>
                    <span className="font-bold text-green-600">8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Blockchain Transactions */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-500" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{transaction.project}</div>
                        <div className="text-xs text-gray-500">{transaction.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600">{transaction.amount}</div>
                        <div className="text-xs text-green-600">✓ Verified</div>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded p-2">
                      <div className="font-mono text-xs text-gray-600 truncate">
                        {transaction.hash}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" size="sm" className="w-full">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Budget Request Detail Dialog */}
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedRequest && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-500">{selectedRequest.id}</span>
                    <span>{selectedRequest.projectName}</span>
                    <div className={`w-3 h-3 ${getPriorityColor(selectedRequest.priority)} rounded-full`}></div>
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Request Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Project Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Requested Amount:</span>
                          <span className="font-bold text-emerald-600">{selectedRequest.requestedAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium capitalize">{selectedRequest.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Timeline:</span>
                          <span className="font-medium">{selectedRequest.timeline}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Beneficiaries:</span>
                          <span className="font-medium">{selectedRequest.beneficiaries}+ people</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Request Info</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Requested By:</span>
                          <span className="font-medium">{selectedRequest.requestedBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{selectedRequest.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">{selectedRequest.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Priority:</span>
                          <span className={`font-medium capitalize ${
                            selectedRequest.priority === 'high' ? 'text-red-600' :
                            selectedRequest.priority === 'medium' ? 'text-amber-600' : 'text-blue-600'
                          }`}>
                            {selectedRequest.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Project Description</h4>
                    <p className="text-gray-600 leading-relaxed">{selectedRequest.description}</p>
                  </div>

                  {/* Justification */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Justification</h4>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{selectedRequest.justification}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <Button 
                      className="flex-1 bg-green-500 hover:bg-green-600"
                      onClick={() => handleApprove(selectedRequest.id)}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Approve & Allocate
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleReject(selectedRequest.id)}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Request Changes
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
