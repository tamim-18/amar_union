"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus,
  Search,
  Filter,
  SortAsc,
  MessageCircle,
  Clock,
  User,
  Tag,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Pause,
  Play,
  Edit,
  Trash2,
  Eye,
  Reply,
  Forward,
  Archive,
  Star,
  Flag,
  Download,
  Share2,
  MoreVertical,
  Calendar,
  FileText,
  Image,
  Paperclip,
  Send,
  ThumbsUp,
  ThumbsDown,
  Bot,
  Users,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";

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
  lastResponse: string;
  attachments: number;
  tags: string[];
  isStarred: boolean;
  isFlagged: boolean;
}

interface Message {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: string;
  author: string;
  attachments?: string[];
}

interface TicketManagerProps {
  className?: string;
}

export default function TicketManager({ className = "" }: TicketManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const tickets: Ticket[] = [
    {
      id: 'T-001',
      title: 'Cannot access my benefit information',
      description: 'I am unable to view my benefit details in the beneficiary portal. The page keeps loading indefinitely.',
      status: 'in-progress',
      priority: 'high',
      category: 'benefits',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-16',
      assignedTo: 'Support Team',
      responses: 3,
      lastResponse: '2024-01-16 14:30',
      attachments: 2,
      tags: ['benefits', 'portal', 'loading'],
      isStarred: true,
      isFlagged: false
    },
    {
      id: 'T-002',
      title: 'Issue reporting form not working',
      description: 'The photo upload feature in the issue reporting form is not functioning properly.',
      status: 'open',
      priority: 'medium',
      category: 'technical',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
      assignedTo: 'Technical Team',
      responses: 1,
      lastResponse: '2024-01-14 16:45',
      attachments: 0,
      tags: ['reporting', 'upload', 'form'],
      isStarred: false,
      isFlagged: true
    },
    {
      id: 'T-003',
      title: 'Need help with NID verification',
      description: 'My NID number is not being accepted during verification process.',
      status: 'resolved',
      priority: 'high',
      category: 'account',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-13',
      assignedTo: 'Verification Team',
      responses: 5,
      lastResponse: '2024-01-13 10:20',
      attachments: 1,
      tags: ['nid', 'verification', 'account'],
      isStarred: false,
      isFlagged: false
    },
    {
      id: 'T-004',
      title: 'Transparency data not loading',
      description: 'The transparency explorer is showing blank charts and no data.',
      status: 'open',
      priority: 'low',
      category: 'transparency',
      createdAt: '2024-01-11',
      updatedAt: '2024-01-11',
      assignedTo: 'Data Team',
      responses: 0,
      lastResponse: 'Never',
      attachments: 0,
      tags: ['transparency', 'data', 'charts'],
      isStarred: false,
      isFlagged: false
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      type: 'user',
      content: 'I am unable to view my benefit details in the beneficiary portal. The page keeps loading indefinitely.',
      timestamp: '2024-01-15 10:30',
      author: 'Rahima Khatun'
    },
    {
      id: '2',
      type: 'agent',
      content: 'Thank you for reporting this issue. I understand you\'re experiencing loading problems with the beneficiary portal. Let me help you troubleshoot this.',
      timestamp: '2024-01-15 11:15',
      author: 'Support Team'
    },
    {
      id: '3',
      type: 'agent',
      content: 'Could you please try the following steps:\n\n1. Clear your browser cache\n2. Try refreshing the page\n3. Check your internet connection\n4. Try using a different browser\n\nLet me know if the issue persists after trying these steps.',
      timestamp: '2024-01-15 11:16',
      author: 'Support Team'
    },
    {
      id: '4',
      type: 'user',
      content: 'I tried all the steps you mentioned but the issue still persists. The page loads but the benefit information section is blank.',
      timestamp: '2024-01-16 09:45',
      author: 'Rahima Khatun'
    },
    {
      id: '5',
      type: 'agent',
      content: 'I see the issue is still occurring. This appears to be a server-side problem. I\'ve escalated this to our technical team and they are investigating. You should receive an update within 24 hours.',
      timestamp: '2024-01-16 14:30',
      author: 'Support Team'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: tickets.length },
    { id: 'account', name: 'Account Issues', count: tickets.filter(t => t.category === 'account').length },
    { id: 'benefits', name: 'Benefits & Eligibility', count: tickets.filter(t => t.category === 'benefits').length },
    { id: 'technical', name: 'Technical Support', count: tickets.filter(t => t.category === 'technical').length },
    { id: 'transparency', name: 'Transparency', count: tickets.filter(t => t.category === 'transparency').length },
    { id: 'reporting', name: 'Issue Reporting', count: tickets.filter(t => t.category === 'reporting').length }
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return AlertCircle;
      case 'in-progress': return Clock;
      case 'resolved': return CheckCircle2;
      case 'closed': return XCircle;
      default: return AlertCircle;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'status':
        return a.status.localeCompare(b.status);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Handle sending message
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    console.log('Changing status for ticket:', ticketId, 'to:', newStatus);
  };

  const handlePriorityChange = (ticketId: string, newPriority: string) => {
    console.log('Changing priority for ticket:', ticketId, 'to:', newPriority);
  };

  const handleAssignTicket = (ticketId: string, assignee: string) => {
    console.log('Assigning ticket:', ticketId, 'to:', assignee);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header and Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Support Tickets</h3>
          <p className="text-gray-600">Manage and track your support requests</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowNewTicket(true)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">
                  {sortedTickets.length} tickets found
                </h4>
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="priority">Priority</option>
                    <option value="status">Status</option>
                    <option value="title">Title A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {sortedTickets.map((ticket) => {
                const StatusIcon = getStatusIcon(ticket.status);
                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedTicket?.id === ticket.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <StatusIcon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900">{ticket.id}</span>
                          {ticket.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          {ticket.isFlagged && <Flag className="h-4 w-4 text-red-500" />}
                        </div>
                        <h5 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                          {ticket.title}
                        </h5>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {ticket.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {ticket.assignedTo}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {ticket.responses} responses
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {ticket.lastResponse}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('-', ' ')}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <div className="flex items-center gap-1">
                          {ticket.attachments > 0 && (
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <Paperclip className="h-3 w-3" />
                              {ticket.attachments}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="lg:col-span-1">
          {selectedTicket ? (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Ticket Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{selectedTicket.id}</h4>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Star className={`h-4 w-4 ${selectedTicket.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Flag className={`h-4 w-4 ${selectedTicket.isFlagged ? 'text-red-500' : 'text-gray-400'}`} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                </div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">{selectedTicket.title}</h5>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status.replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  <div>Created: {selectedTicket.createdAt}</div>
                  <div>Updated: {selectedTicket.updatedAt}</div>
                  <div>Assigned to: {selectedTicket.assignedTo}</div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : message.type === 'agent'
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-yellow-50 text-yellow-800'
                      }`}>
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                        <div className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.author} • {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <Paperclip className="h-3 w-3 mr-1" />
                    Attach
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <Image className="h-3 w-3 mr-1" />
                    Image
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Select a ticket</h4>
              <p className="text-gray-600">Choose a ticket from the list to view details and messages</p>
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicket && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6">
              <h3 className="text-xl font-bold">Create New Support Ticket</h3>
              <p className="text-blue-100">Describe your issue and we'll help you resolve it</p>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    placeholder="Brief description of your issue"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Category</option>
                      <option value="account">Account Issues</option>
                      <option value="benefits">Benefits & Eligibility</option>
                      <option value="technical">Technical Support</option>
                      <option value="transparency">Transparency</option>
                      <option value="reporting">Issue Reporting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                    placeholder="Please provide detailed information about your issue..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Paperclip className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drag and drop files here or click to browse</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowNewTicket(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowNewTicket(false)} className="bg-blue-500 hover:bg-blue-600">
                Create Ticket
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
