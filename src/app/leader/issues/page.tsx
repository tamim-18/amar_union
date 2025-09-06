"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ArrowLeft,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  Filter,
  Search,
  Plus,
  User,
  Phone,
} from "lucide-react";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Issue {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  location: string;
  reporter: string;
  reporterPhone?: string;
  reporterEmail?: string;
  time: string;
  affected: number;
  budget?: string;
  assignedTeam?: string;
  progress?: number;
  completedDate?: string;
  rating?: number;
  status: 'new' | 'review' | 'progress' | 'completed';
  images?: string[];
  updates?: Array<{
    date: string;
    title: string;
    description: string;
    author: string;
  }>;
}

interface SortableIssueProps {
  issue: Issue;
  onSelect: (issue: Issue) => void;
}

function SortableIssue({ issue, onSelect }: SortableIssueProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: issue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="mb-3"
    >
      <Card 
        className={`bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing group ${
          isDragging ? 'rotate-3 scale-105 shadow-xl' : ''
        }`}
      >
        <CardContent className="p-3">
          {/* Drag Handle */}
          <div 
            {...listeners}
            className="flex items-start justify-between mb-2 cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400">#{issue.id}</span>
              <div className={`w-2 h-2 ${getPriorityColor(issue.priority)} rounded-full`}></div>
            </div>
            <span className="text-xs text-gray-400">{issue.time}</span>
          </div>
          
          <div onClick={() => onSelect(issue)} className="cursor-pointer">
            <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 leading-tight">
              {issue.title}
            </h4>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{issue.location}</span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {issue.affected}+
              </span>
              {issue.budget && (
                <span className="text-amber-600 font-medium">{issue.budget}</span>
              )}
              {issue.progress && (
                <span className="text-blue-600 font-medium">{issue.progress}%</span>
              )}
              {issue.rating && (
                <span className="text-amber-600 font-medium">★ {issue.rating}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface DroppableColumnProps {
  column: {
    id: string;
    title: string;
    color: string;
    bgColor: string;
    borderColor: string;
  };
  issues: Issue[];
  onSelectIssue: (issue: Issue) => void;
}

function DroppableColumn({ column, issues, onSelectIssue }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${column.bgColor} ${column.borderColor} border-2 rounded-xl p-4 min-h-96 transition-all duration-200 ${
        isOver ? 'border-emerald-400 bg-emerald-50 scale-105' : ''
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 text-sm">{column.title}</h3>
        <div className={`${column.color} text-white text-xs font-bold px-2 py-1 rounded-full`}>
          {issues.length}
        </div>
      </div>

      {/* Sortable Issue Cards */}
      <SortableContext 
        items={issues.map(issue => issue.id)}
        strategy={verticalListSortingStrategy}
      >
        {issues.map((issue) => (
          <SortableIssue 
            key={issue.id} 
            issue={issue} 
            onSelect={onSelectIssue}
          />
        ))}
      </SortableContext>

      {/* Add Issue Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="w-full text-gray-500 hover:bg-white/70 border-2 border-dashed border-gray-300 hover:border-gray-400 mt-2"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Issue
      </Button>
    </div>
  );
}

export default function IssueManagement() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [issues, setIssues] = useState<Record<string, Issue[]>>({
    new: [
      {
        id: '1254',
        title: 'Water Main Break Emergency',
        description: 'Major water line rupture affecting 500+ households in Gulshan Block A. Immediate emergency response required as residents have no water supply.',
        priority: 'high',
        location: 'Gulshan Block A',
        reporter: 'Fatima Rahman',
        reporterPhone: '+880 1712-345678',
        reporterEmail: 'fatima.rahman@gmail.com',
        time: '2 hours ago',
        affected: 500,
        status: 'new',
        images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'],
        updates: [
          {
            date: '2024-01-22 10:30 AM',
            title: 'Issue Reported',
            description: 'Emergency water main break reported by multiple residents',
            author: 'System'
          }
        ]
      },
      {
        id: '1255',
        title: 'Street Light Outage',
        description: 'Multiple street lights not working in residential area causing safety concerns',
        priority: 'medium',
        location: 'Dhanmondi Road 15',
        reporter: 'Ahmed Khan',
        reporterPhone: '+880 1812-345678',
        time: '4 hours ago',
        affected: 200,
        status: 'new'
      }
    ],
    review: [
      {
        id: '1252',
        title: 'Road Maintenance Project',
        description: 'Infrastructure improvement for main connecting road with pothole repairs',
        priority: 'medium',
        location: 'Dhanmondi Road 27',
        reporter: 'City Planning Department',
        time: '1 day ago',
        affected: 1000,
        budget: '৳85K',
        status: 'review'
      }
    ],
    progress: [
      {
        id: '1249',
        title: 'Park Renovation',
        description: 'Community park landscaping and equipment upgrade',
        priority: 'low',
        location: 'Gulshan Park',
        reporter: 'Community Group',
        time: '1 week ago',
        affected: 300,
        budget: '৳200K',
        assignedTeam: 'Environment Team',
        progress: 65,
        status: 'progress'
      }
    ],
    completed: [
      {
        id: '1247',
        title: 'Street Light Installation',
        description: 'LED street light installation completed successfully',
        priority: 'medium',
        location: 'Dhanmondi Road 27',
        reporter: 'Ahmed Rahman',
        time: '2 weeks ago',
        affected: 1250,
        budget: '৳45K',
        assignedTeam: 'Electric Team',
        completedDate: '2024-01-20',
        rating: 5,
        status: 'completed'
      }
    ]
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const kanbanColumns = [
    { id: 'new', title: 'New Issues', color: 'bg-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
    { id: 'review', title: 'Under Review', color: 'bg-amber-500', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
    { id: 'progress', title: 'In Progress', color: 'bg-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
    { id: 'completed', title: 'Completed', color: 'bg-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200' }
  ];

  // NEW: helper to find which column currently contains an issue id
  const findColumnByIssueId = (id: string) => {
    for (const [columnId, columnIssues] of Object.entries(issues)) {
      if (columnIssues.some((it) => it.id === id)) {
        return columnId;
      }
    }
    return null;
  };

  // UPDATED: robustly resolve target column whether dropping on a column or a card
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // source column: where the dragged card came from
    const sourceColumn = findColumnByIssueId(activeId);
    if (!sourceColumn) return;

    // target column: column id if dropped on a column, else column of the card we dropped over
    const isOverAColumn = kanbanColumns.some((col) => col.id === overId);
    const targetColumn = isOverAColumn ? overId : (findColumnByIssueId(overId) ?? sourceColumn);

    if (sourceColumn === targetColumn) return;

    // Move item between columns and update its status
    setIssues((prev) => {
      const newIssues = { ...prev };

      const movedItem = newIssues[sourceColumn].find((it) => it.id === activeId);
      if (!movedItem) return prev;

      newIssues[sourceColumn] = newIssues[sourceColumn].filter((it) => it.id !== activeId);

      const updatedItem = { ...movedItem, status: targetColumn as Issue['status'] };
      newIssues[targetColumn] = [...newIssues[targetColumn], updatedItem];

      return newIssues;
    });

    console.log(`Moved issue #${activeId} from ${sourceColumn} to ${targetColumn}`);
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
                <h1 className="text-2xl font-bold">Issue Management</h1>
                <p className="text-slate-300">Drag & drop Kanban workflow</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Search className="h-4 w-4 mr-1" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4 relative z-10">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{issues.new.length}</div>
              <div className="text-sm text-gray-500">New Issues</div>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{issues.review.length}</div>
              <div className="text-sm text-gray-500">Under Review</div>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{issues.progress.length}</div>
              <div className="text-sm text-gray-500">In Progress</div>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{issues.completed.length}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pb-8">
            {kanbanColumns.map((column) => (
              <DroppableColumn
                key={column.id}
                column={column}
                issues={issues[column.id as keyof typeof issues] || []}
                onSelectIssue={setSelectedIssue}
              />
            ))}
          </div>
        </DndContext>

        {/* Issue Detail Dialog */}
        <Dialog open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedIssue && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-500">#{selectedIssue.id}</span>
                    <span>{selectedIssue.title}</span>
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Issue Details */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600 leading-relaxed">{selectedIssue.description}</p>
                  </div>

                  {/* Meta Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedIssue.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedIssue.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedIssue.affected}+ people affected</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedIssue.reporter}</span>
                      </div>
                      {selectedIssue.reporterPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{selectedIssue.reporterPhone}</span>
                        </div>
                      )}
                      {selectedIssue.budget && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{selectedIssue.budget}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {selectedIssue.progress && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Progress</h4>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Assigned to: {selectedIssue.assignedTeam}</span>
                        <span>{selectedIssue.progress}% complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${selectedIssue.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Images */}
                  {selectedIssue.images && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Photos</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedIssue.images.map((image, index) => (
                          <img 
                            key={index}
                            src={image} 
                            alt={`Issue photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Updates Timeline */}
                  {selectedIssue.updates && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Updates Timeline</h4>
                      <div className="space-y-3">
                        {selectedIssue.updates.map((update, index) => (
                          <div key={index} className="flex gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900 text-sm">{update.title}</span>
                                <span className="text-xs text-gray-500">{update.date}</span>
                              </div>
                              <p className="text-sm text-gray-600">{update.description}</p>
                              <p className="text-xs text-gray-500">by {update.author}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    {selectedIssue.status === 'new' && (
                      <>
                        <Button className="bg-emerald-500 hover:bg-emerald-600">
                          Assign Team
                        </Button>
                        <Button variant="outline">
                          Request More Info
                        </Button>
                      </>
                    )}
                    {selectedIssue.status === 'review' && (
                      <>
                        <Button className="bg-blue-500 hover:bg-blue-600">
                          Approve & Start
                        </Button>
                        <Button variant="outline">
                          Reject
                        </Button>
                      </>
                    )}
                    {selectedIssue.status === 'progress' && (
                      <>
                        <Button variant="outline">
                          View Progress
                        </Button>
                        <Button variant="outline">
                          Contact Team
                        </Button>
                      </>
                    )}
                    {selectedIssue.status === 'completed' && (
                      <Button variant="outline" className="w-full">
                        Generate Report
                      </Button>
                    )}
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
