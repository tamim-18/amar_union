"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AIChat from "@/components/support/AIChat";
import KnowledgeBase from "@/components/support/KnowledgeBase";
import TicketManager from "@/components/support/TicketManager";
import { 
  Search,
  MessageCircle,
  BookOpen,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bot,
  Users,
  FileText,
  Video,
  Headphones,
  Shield,
  Star,
  ArrowRight,
  Filter,
  SortAsc,
  Calendar,
  Tag,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
  Plus,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  Share2,
  Bookmark,
  Flag,
  Zap,
  Sparkles
} from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
  category: string;
  helpful: number;
  views: number;
  tags: string[];
}

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  responses: number;
}

interface KnowledgeArticle {
  id: string;
  title: string;
  titleBn: string;
  content: string;
  contentBn: string;
  category: string;
  author: string;
  publishedAt: string;
  views: number;
  helpful: number;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export default function SupportCenter() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium'
  });

  const categories = [
    { id: 'all', name: 'All Topics', nameBn: 'সব বিষয়', icon: HelpCircle, count: 156 },
    { id: 'account', name: 'Account Issues', nameBn: 'অ্যাকাউন্ট সমস্যা', icon: Users, count: 23 },
    { id: 'reporting', name: 'Issue Reporting', nameBn: 'সমস্যা রিপোর্টিং', icon: Flag, count: 45 },
    { id: 'benefits', name: 'Benefits & Eligibility', nameBn: 'সুবিধা ও যোগ্যতা', icon: Shield, count: 32 },
    { id: 'technical', name: 'Technical Support', nameBn: 'প্রযুক্তিগত সহায়তা', icon: Bot, count: 28 },
    { id: 'transparency', name: 'Transparency', nameBn: 'স্বচ্ছতা', icon: FileText, count: 18 },
    { id: 'community', name: 'Community', nameBn: 'সম্প্রদায়', icon: MessageCircle, count: 10 }
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I report a civic issue?',
      questionBn: 'নাগরিক সমস্যা কীভাবে রিপোর্ট করব?',
      answer: 'You can report issues through the Citizen Portal by clicking "Report Issue" and filling out the AI-powered form with photos and location details.',
      answerBn: 'নাগরিক পোর্টালে "সমস্যা রিপোর্ট" ক্লিক করে AI-চালিত ফর্মে ছবি এবং অবস্থানের বিবরণ দিয়ে সমস্যা রিপোর্ট করতে পারেন।',
      category: 'reporting',
      helpful: 45,
      views: 234,
      tags: ['reporting', 'citizen', 'issues']
    },
    {
      id: '2',
      question: 'How can I check my benefit eligibility?',
      questionBn: 'আমার সুবিধার যোগ্যতা কীভাবে যাচাই করব?',
      answer: 'Use the AI Eligibility Checker in the Beneficiary Portal. Enter your NID number and select a program for intelligent assessment.',
      answerBn: 'বেনিফিশিয়ারি পোর্টালে AI যোগ্যতা যাচাইকারী ব্যবহার করুন। আপনার NID নম্বর দিন এবং বুদ্ধিমান মূল্যায়নের জন্য একটি প্রোগ্রাম নির্বাচন করুন।',
      category: 'benefits',
      helpful: 38,
      views: 189,
      tags: ['benefits', 'eligibility', 'nid']
    },
    {
      id: '3',
      question: 'How do I track my reported issues?',
      questionBn: 'আমার রিপোর্ট করা সমস্যাগুলো কীভাবে ট্র্যাক করব?',
      answer: 'Go to the Issue Tracker in the Citizen Portal to see the timeline of your issues, status updates, and community engagement.',
      answerBn: 'আপনার সমস্যার টাইমলাইন, স্ট্যাটাস আপডেট এবং সম্প্রদায়ের অংশগ্রহণ দেখতে নাগরিক পোর্টালে ইস্যু ট্র্যাকারে যান।',
      category: 'reporting',
      helpful: 42,
      views: 167,
      tags: ['tracking', 'issues', 'timeline']
    }
  ];

  const tickets: Ticket[] = [
    {
      id: 'T-001',
      title: 'Cannot access my benefit information',
      description: 'I am unable to view my benefit details in the beneficiary portal',
      status: 'in-progress',
      priority: 'high',
      category: 'benefits',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-16',
      assignedTo: 'Support Team',
      responses: 3
    },
    {
      id: 'T-002',
      title: 'Issue reporting form not working',
      description: 'The photo upload feature in the issue reporting form is not functioning',
      status: 'open',
      priority: 'medium',
      category: 'technical',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
      assignedTo: 'Technical Team',
      responses: 1
    },
    {
      id: 'T-003',
      title: 'Need help with NID verification',
      description: 'My NID number is not being accepted during verification',
      status: 'resolved',
      priority: 'high',
      category: 'account',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-13',
      assignedTo: 'Verification Team',
      responses: 5
    }
  ];

  const knowledgeArticles: KnowledgeArticle[] = [
    {
      id: 'KA-001',
      title: 'Complete Guide to Issue Reporting',
      titleBn: 'সমস্যা রিপোর্টিংয়ের সম্পূর্ণ গাইড',
      content: 'Learn how to effectively report civic issues with photos, location data, and AI assistance.',
      contentBn: 'ছবি, অবস্থান ডেটা এবং AI সহায়তার সাথে নাগরিক সমস্যা কার্যকরভাবে রিপোর্ট করার শিখুন।',
      category: 'reporting',
      author: 'Support Team',
      publishedAt: '2024-01-10',
      views: 456,
      helpful: 67,
      tags: ['reporting', 'guide', 'tutorial'],
      difficulty: 'beginner'
    },
    {
      id: 'KA-002',
      title: 'Understanding Blockchain Transparency',
      titleBn: 'ব্লকচেইন স্বচ্ছতা বুঝুন',
      content: 'Explore how blockchain technology ensures transparency in fund tracking and verification.',
      contentBn: 'ব্লকচেইন প্রযুক্তি কীভাবে তহবিল ট্র্যাকিং এবং যাচাইকরণে স্বচ্ছতা নিশ্চিত করে তা অন্বেষণ করুন।',
      category: 'transparency',
      author: 'Technical Team',
      publishedAt: '2024-01-08',
      views: 234,
      helpful: 34,
      tags: ['blockchain', 'transparency', 'funds'],
      difficulty: 'intermediate'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'in-progress': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'resolved': return 'text-green-600 bg-green-50 border-green-200';
      case 'closed': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-3 mb-2">
              <Headphones className="h-8 w-8 text-cyan-400" />
              <span className="bengali-text">সহায়তা কেন্দ্র</span>
            </h1>
            <p className="text-blue-300">AI-Powered Support • 24/7 Help • Grievance Resolution</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4 relative z-10 max-w-7xl">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => setActiveTab('search')}
              className="h-20 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              <div className="text-center">
                <Search className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Search Help</div>
                <div className="text-xs opacity-90 bengali-text">সহায়তা খুঁজুন</div>
              </div>
            </Button>
            <Button 
              onClick={() => setActiveTab('chat')}
              className="h-20 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <div className="text-center">
                <MessageCircle className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Live Chat</div>
                <div className="text-xs opacity-90 bengali-text">লাইভ চ্যাট</div>
              </div>
            </Button>
            <Button 
              onClick={() => setActiveTab('tickets')}
              className="h-20 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white"
            >
              <div className="text-center">
                <FileText className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-medium">My Tickets</div>
                <div className="text-xs opacity-90 bengali-text">আমার টিকেট</div>
              </div>
            </Button>
            <Button 
              onClick={() => setActiveTab('knowledge')}
              className="h-20 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <div className="text-center">
                <BookOpen className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-medium">Knowledge Base</div>
                <div className="text-xs opacity-90 bengali-text">জ্ঞান ভান্ডার</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for help articles, FAQs, or ask a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600">
              Search
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Popular searches:</span>
            {['How to report issue', 'NID verification', 'Benefit eligibility', 'Account problems'].map((term, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 bengali-text">ক্যাটাগরি</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-4 w-4" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-bold text-gray-900 mb-3 bengali-text">যোগাযোগ</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-green-500" />
                    <span>+880 1234 567890</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <span>support@amarsheba.gov.bd</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 bengali-text">মোট টিকেট</p>
                        <p className="text-2xl font-bold text-gray-900">1,247</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-green-600">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      +12% from last month
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 bengali-text">সমাধান হার</p>
                        <p className="text-2xl font-bold text-gray-900">94%</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-green-600">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      +3% from last month
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 bengali-text">গড় প্রতিক্রিয়া সময়</p>
                        <p className="text-2xl font-bold text-gray-900">2.3h</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-green-600">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      -15% from last month
                    </div>
                  </div>
                </div>

                {/* Recent FAQs */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-500" />
                    <span className="bengali-text">সাম্প্রতিক প্রশ্নোত্তর</span>
                  </h3>
                  <div className="space-y-4">
                    {faqs.slice(0, 3).map((faq) => (
                      <div key={faq.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-sm text-gray-600 mb-3">{faq.answer}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              {faq.helpful} helpful
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {faq.views} views
                            </span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            Read More
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="bengali-text">দ্রুত কাজ</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      onClick={() => setShowNewTicket(true)}
                      className="h-16 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white justify-start"
                    >
                      <Plus className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Create New Ticket</div>
                        <div className="text-sm opacity-90 bengali-text">নতুন টিকেট তৈরি করুন</div>
                      </div>
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('chat')}
                      className="h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white justify-start"
                    >
                      <Bot className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Chat with AI</div>
                        <div className="text-sm opacity-90 bengali-text">AI এর সাথে চ্যাট করুন</div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Search Tab */}
            {activeTab === 'search' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 bengali-text">খোঁজার ফলাফল</h3>
                  <div className="space-y-4">
                    {faqs.filter(faq => 
                      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((faq) => (
                      <div key={faq.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-sm text-gray-600 mb-3">{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(faq.category)}`}>
                              {faq.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {faq.helpful} helpful • {faq.views} views
                            </span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            Read More
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <AIChat className="h-[600px]" />
            )}

            {/* Tickets Tab */}
            {activeTab === 'tickets' && (
              <TicketManager />
            )}

            {/* Knowledge Base Tab */}
            {activeTab === 'knowledge' && (
              <KnowledgeBase />
            )}
          </div>
        </div>

        {/* New Ticket Modal */}
        {showNewTicket && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6">
                <h3 className="text-xl font-bold">Create New Support Ticket</h3>
                <p className="text-blue-100">Describe your issue and we&apos;ll help you resolve it</p>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <Input
                      value={ticketForm.title}
                      onChange={(e) => setTicketForm(prev => ({...prev, title: e.target.value}))}
                      placeholder="Brief description of your issue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={ticketForm.category}
                      onChange={(e) => setTicketForm(prev => ({...prev, category: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      <option value="account">Account Issues</option>
                      <option value="reporting">Issue Reporting</option>
                      <option value="benefits">Benefits & Eligibility</option>
                      <option value="technical">Technical Support</option>
                      <option value="transparency">Transparency</option>
                      <option value="community">Community</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm(prev => ({...prev, priority: e.target.value}))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <Textarea
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm(prev => ({...prev, description: e.target.value}))}
                      placeholder="Please provide detailed information about your issue..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowNewTicket(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    // Handle ticket creation
                    setShowNewTicket(false);
                    setTicketForm({ title: '', description: '', category: '', priority: 'medium' });
                  }}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Create Ticket
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
