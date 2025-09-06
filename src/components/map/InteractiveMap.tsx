"use client";

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MapPin,
  Filter,
  Layers,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  EyeOff,
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Users,
  Activity,
  Globe,
  Navigation,
  Target,
  Info,
  Settings,
  Download,
  Share2,
  RefreshCw,
  Plus,
  Minus,
  Maximize2,
  Minimize2
} from "lucide-react";

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(mod => mod.Tooltip), { ssr: false });

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location: {
    lat: number;
    lng: number;
    address: string;
    division: string;
    district: string;
    upazila: string;
  };
  reportedAt: string;
  resolvedAt?: string;
  reporter: string;
  assignedTo?: string;
  images: string[];
  votes: number;
  comments: number;
}

interface DistrictData {
  name: string;
  nameBn: string;
  division: string;
  issues: number;
  resolved: number;
  inProgress: number;
  pending: number;
  population: number;
  area: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  heatmapIntensity: number;
}

interface MapProps {
  className?: string;
}

export default function InteractiveMap({ className = "" }: MapProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [viewMode, setViewMode] = useState<'issues' | 'heatmap' | 'analytics'>('issues');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  // Bangladesh center coordinates
  const bangladeshCenter: [number, number] = [23.6850, 90.3563];
  const defaultZoom = 7;

  const categories = [
    { id: 'all', name: 'All Categories', nameBn: 'সব ক্যাটাগরি', color: '#6B7280' },
    { id: 'infrastructure', name: 'Infrastructure', nameBn: 'অবকাঠামো', color: '#3B82F6' },
    { id: 'healthcare', name: 'Healthcare', nameBn: 'স্বাস্থ্যসেবা', color: '#10B981' },
    { id: 'education', name: 'Education', nameBn: 'শিক্ষা', color: '#8B5CF6' },
    { id: 'water', name: 'Water & Sanitation', nameBn: 'পানি ও স্যানিটেশন', color: '#06B6D4' },
    { id: 'transport', name: 'Transportation', nameBn: 'পরিবহন', color: '#F59E0B' },
    { id: 'environment', name: 'Environment', nameBn: 'পরিবেশ', color: '#84CC16' },
    { id: 'safety', name: 'Safety & Security', nameBn: 'নিরাপত্তা', color: '#EF4444' }
  ];

  const statuses = [
    { id: 'all', name: 'All Status', nameBn: 'সব স্ট্যাটাস', color: '#6B7280' },
    { id: 'open', name: 'Open', nameBn: 'খোলা', color: '#3B82F6' },
    { id: 'in-progress', name: 'In Progress', nameBn: 'চলমান', color: '#F59E0B' },
    { id: 'resolved', name: 'Resolved', nameBn: 'সমাধান', color: '#10B981' },
    { id: 'closed', name: 'Closed', nameBn: 'বন্ধ', color: '#6B7280' }
  ];

  const priorities = [
    { id: 'all', name: 'All Priority', nameBn: 'সব অগ্রাধিকার', color: '#6B7280' },
    { id: 'urgent', name: 'Urgent', nameBn: 'জরুরি', color: '#EF4444' },
    { id: 'high', name: 'High', nameBn: 'উচ্চ', color: '#F59E0B' },
    { id: 'medium', name: 'Medium', nameBn: 'মধ্যম', color: '#3B82F6' },
    { id: 'low', name: 'Low', nameBn: 'নিম্ন', color: '#10B981' }
  ];

  const divisions = [
    { id: 'all', name: 'All Divisions', nameBn: 'সব বিভাগ', count: 0 },
    { id: 'dhaka', name: 'Dhaka', nameBn: 'ঢাকা', count: 0 },
    { id: 'chittagong', name: 'Chittagong', nameBn: 'চট্টগ্রাম', count: 0 },
    { id: 'rajshahi', name: 'Rajshahi', nameBn: 'রাজশাহী', count: 0 },
    { id: 'khulna', name: 'Khulna', nameBn: 'খুলনা', count: 0 },
    { id: 'barisal', name: 'Barisal', nameBn: 'বরিশাল', count: 0 },
    { id: 'sylhet', name: 'Sylhet', nameBn: 'সিলেট', count: 0 },
    { id: 'rangpur', name: 'Rangpur', nameBn: 'রংপুর', count: 0 },
    { id: 'mymensingh', name: 'Mymensingh', nameBn: 'ময়মনসিংহ', count: 0 }
  ];

  // Sample issues data
  const issues: Issue[] = [
    {
      id: 'ISS-001',
      title: 'Broken Road in Dhanmondi',
      description: 'Major potholes on Road 27 causing traffic congestion',
      category: 'infrastructure',
      status: 'open',
      priority: 'high',
      location: {
        lat: 23.7465,
        lng: 90.3760,
        address: 'Road 27, Dhanmondi, Dhaka',
        division: 'Dhaka',
        district: 'Dhaka',
        upazila: 'Dhanmondi'
      },
      reportedAt: '2024-01-15',
      reporter: 'Rahima Khatun',
      images: ['/images/road-1.jpg'],
      votes: 23,
      comments: 8
    },
    {
      id: 'ISS-002',
      title: 'Water Supply Problem',
      description: 'No water supply for 3 days in Mirpur area',
      category: 'water',
      status: 'in-progress',
      priority: 'urgent',
      location: {
        lat: 23.8069,
        lng: 90.3687,
        address: 'Block A, Mirpur, Dhaka',
        division: 'Dhaka',
        district: 'Dhaka',
        upazila: 'Mirpur'
      },
      reportedAt: '2024-01-14',
      reporter: 'Abdul Hamid',
      assignedTo: 'WASA Team',
      images: ['/images/water-1.jpg'],
      votes: 45,
      comments: 12
    },
    {
      id: 'ISS-003',
      title: 'School Building Repair',
      description: 'Cracked walls in primary school building',
      category: 'education',
      status: 'resolved',
      priority: 'medium',
      location: {
        lat: 22.3569,
        lng: 91.7832,
        address: 'Chittagong Primary School',
        division: 'Chittagong',
        district: 'Chittagong',
        upazila: 'Chandgaon'
      },
      reportedAt: '2024-01-10',
      resolvedAt: '2024-01-13',
      reporter: 'Fatema Begum',
      assignedTo: 'Education Department',
      images: ['/images/school-1.jpg'],
      votes: 15,
      comments: 5
    }
  ];

  // Sample district data for heatmap
  const districtData: DistrictData[] = [
    {
      name: 'Dhaka',
      nameBn: 'ঢাকা',
      division: 'Dhaka',
      issues: 156,
      resolved: 98,
      inProgress: 35,
      pending: 23,
      population: 12000000,
      area: 1463,
      coordinates: { lat: 23.8103, lng: 90.4125 },
      heatmapIntensity: 0.9
    },
    {
      name: 'Chittagong',
      nameBn: 'চট্টগ্রাম',
      division: 'Chittagong',
      issues: 89,
      resolved: 67,
      inProgress: 15,
      pending: 7,
      population: 8000000,
      area: 5283,
      coordinates: { lat: 22.3569, lng: 91.7832 },
      heatmapIntensity: 0.7
    },
    {
      name: 'Sylhet',
      nameBn: 'সিলেট',
      division: 'Sylhet',
      issues: 45,
      resolved: 32,
      inProgress: 8,
      pending: 5,
      population: 3000000,
      area: 12596,
      coordinates: { lat: 24.8949, lng: 91.8687 },
      heatmapIntensity: 0.4
    }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getStatusColor = (status: string) => {
    const statusConfig = statuses.find(s => s.id === status);
    return statusConfig?.color || '#6B7280';
  };

  const getCategoryColor = (category: string) => {
    const categoryConfig = categories.find(c => c.id === category);
    return categoryConfig?.color || '#6B7280';
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return AlertCircle;
      case 'high': return AlertCircle;
      case 'medium': return Clock;
      case 'low': return CheckCircle2;
      default: return Clock;
    }
  };

  const filteredIssues = issues.filter(issue => {
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || issue.priority === selectedPriority;
    const matchesDivision = selectedDivision === 'all' || issue.location.division.toLowerCase() === selectedDivision;
    const matchesSearch = searchQuery === '' || 
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesStatus && matchesPriority && matchesDivision && matchesSearch;
  });

  const getMarkerSize = (priority: string) => {
    switch (priority) {
      case 'urgent': return 15;
      case 'high': return 12;
      case 'medium': return 10;
      case 'low': return 8;
      default: return 10;
    }
  };

  const getHeatmapIntensity = (district: DistrictData) => {
    return Math.min(district.heatmapIntensity, 1);
  };

  if (!isClient) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">Loading interactive map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''} ${className}`}>
      {/* Map Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6" />
            <div>
              <h2 className="text-xl font-bold bengali-text">বাংলাদেশ ইস্যু মানচিত্র</h2>
              <p className="text-blue-100 text-sm">Interactive Issue Mapping & Analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-white hover:bg-white/20"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="text-white hover:bg-white/20"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
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
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Division Filter */}
            <div>
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {divisions.map(division => (
                  <option key={division.id} value={division.id}>
                    {division.name} ({division.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">View Mode:</span>
            <div className="flex bg-white rounded-lg p-1">
              <Button
                variant={viewMode === 'issues' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('issues')}
                className="text-xs"
              >
                <MapPin className="h-3 w-3 mr-1" />
                Issues
              </Button>
              <Button
                variant={viewMode === 'heatmap' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('heatmap')}
                className="text-xs"
              >
                <Activity className="h-3 w-3 mr-1" />
                Heatmap
              </Button>
              <Button
                variant={viewMode === 'analytics' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('analytics')}
                className="text-xs"
              >
                <BarChart3 className="h-3 w-3 mr-1" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="relative" style={{ height: isFullscreen ? 'calc(100vh - 120px)' : '600px' }}>
        <MapContainer
          center={bangladeshCenter}
          zoom={defaultZoom}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Issue Markers */}
          {viewMode === 'issues' && filteredIssues.map((issue) => {
            const PriorityIcon = getPriorityIcon(issue.priority);
            return (
              <Marker
                key={issue.id}
                position={[issue.location.lat, issue.location.lng]}
                eventHandlers={{
                  click: () => setSelectedIssue(issue)
                }}
              >
                <CircleMarker
                  center={[issue.location.lat, issue.location.lng]}
                  radius={getMarkerSize(issue.priority)}
                  pathOptions={{
                    fillColor: getStatusColor(issue.status),
                    color: getCategoryColor(issue.category),
                    weight: 2,
                    opacity: 0.8,
                    fillOpacity: 0.6
                  }}
                />
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  <div className="p-2">
                    <div className="font-semibold text-sm">{issue.title}</div>
                    <div className="text-xs text-gray-600">{issue.location.address}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <PriorityIcon className="h-3 w-3" />
                      <span className="text-xs capitalize">{issue.priority}</span>
                    </div>
                  </div>
                </Tooltip>
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-bold text-sm mb-2">{issue.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{issue.description}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="capitalize">{issue.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Priority:</span>
                        <span className="capitalize">{issue.priority}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="capitalize">{issue.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reported:</span>
                        <span>{issue.reportedAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Votes:</span>
                        <span>{issue.votes}</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-2 text-xs">
                      View Details
                    </Button>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Heatmap Circles */}
          {viewMode === 'heatmap' && districtData.map((district) => (
            <CircleMarker
              key={district.name}
              center={[district.coordinates.lat, district.coordinates.lng]}
              radius={Math.sqrt(district.issues) * 2}
              pathOptions={{
                fillColor: `hsl(${120 - (district.heatmapIntensity * 120)}, 70%, 50%)`,
                color: `hsl(${120 - (district.heatmapIntensity * 120)}, 70%, 30%)`,
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.6
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="p-2">
                  <div className="font-semibold text-sm">{district.name}</div>
                  <div className="text-xs text-gray-600">{district.nameBn}</div>
                  <div className="text-xs mt-1">
                    <div>Total Issues: {district.issues}</div>
                    <div>Resolved: {district.resolved}</div>
                    <div>In Progress: {district.inProgress}</div>
                  </div>
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-10 space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white shadow-lg"
            onClick={() => {/* Zoom in logic */}}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white shadow-lg"
            onClick={() => {/* Zoom out logic */}}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white shadow-lg"
            onClick={() => {/* Reset view logic */}}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <h4 className="font-semibold text-sm mb-2">Legend</h4>
          {viewMode === 'issues' ? (
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Open Issues</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Resolved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span>Closed</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>High Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Medium Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Low Activity</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Issue Details Panel */}
      {selectedIssue && (
        <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-sm">{selectedIssue.title}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedIssue(null)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
          <p className="text-xs text-gray-600 mb-3">{selectedIssue.description}</p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="capitalize font-medium">{selectedIssue.status}</span>
            </div>
            <div className="flex justify-between">
              <span>Priority:</span>
              <span className="capitalize font-medium">{selectedIssue.priority}</span>
            </div>
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="text-right">{selectedIssue.location.address}</span>
            </div>
            <div className="flex justify-between">
              <span>Reporter:</span>
              <span>{selectedIssue.reporter}</span>
            </div>
            <div className="flex justify-between">
              <span>Votes:</span>
              <span>{selectedIssue.votes}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="flex-1 text-xs">
              View Full Details
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Share
            </Button>
          </div>
        </div>
      )}

      {/* Statistics Bar */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{filteredIssues.length}</div>
            <div className="text-xs text-gray-600">Total Issues</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {filteredIssues.filter(i => i.status === 'resolved').length}
            </div>
            <div className="text-xs text-gray-600">Resolved</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-600">
              {filteredIssues.filter(i => i.status === 'in-progress').length}
            </div>
            <div className="text-xs text-gray-600">In Progress</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {filteredIssues.filter(i => i.priority === 'urgent').length}
            </div>
            <div className="text-xs text-gray-600">Urgent</div>
          </div>
        </div>
      </div>
    </div>
  );
}
