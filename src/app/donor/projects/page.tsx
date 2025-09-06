"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Heart,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  Camera,
  Play,
  Share,
  Download,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  Eye,
  MessageSquare
} from "lucide-react";

interface ProjectStory {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  heroImage: string;
  gallery: string[];
  story: string;
  impact: {
    beneficiaries: number;
    completion: number;
    donated: string;
    roi: string;
    satisfaction: number;
  };
  timeline: Array<{
    date: string;
    title: string;
    description: string;
    image?: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    quote: string;
    avatar: string;
  }>;
  status: 'completed' | 'active' | 'planned';
}

export default function ProjectExplorer() {
  const [selectedProject, setSelectedProject] = useState<ProjectStory | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projectStories: ProjectStory[] = [
    {
      id: 'clean-water-gulshan',
      title: 'Clean Water for All',
      subtitle: 'Transforming lives through sustainable water access',
      location: 'Gulshan Community, Dhaka',
      heroImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1582719201952-c3c8b8b8b8b8?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&h=400&fit=crop'
      ],
      story: 'In the heart of Gulshan, 2,500 families struggled with unreliable water supply. Children walked miles to collect clean water, missing school and opportunities. Your generous contribution of ৳500K transformed this community forever. Today, crystal-clear water flows through modern pipelines, children attend school regularly, and mothers have time to pursue livelihoods. This is the power of compassionate giving.',
      impact: {
        beneficiaries: 2500,
        completion: 100,
        donated: '৳500K',
        roi: '450%',
        satisfaction: 4.9
      },
      timeline: [
        {
          date: '2023-03-15',
          title: 'Project Initiated',
          description: 'Community assessment and planning phase completed',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop'
        },
        {
          date: '2023-06-20',
          title: 'Infrastructure Installation',
          description: 'Water purification systems and pipeline installation began',
          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop'
        },
        {
          date: '2023-09-10',
          title: 'Community Training',
          description: 'Local residents trained in system maintenance and water conservation'
        },
        {
          date: '2023-12-01',
          title: 'Project Completed',
          description: 'Full water access achieved with 99.9% water quality standards',
          image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=200&fit=crop'
        }
      ],
      testimonials: [
        {
          name: 'Rashida Begum',
          role: 'Mother of 3, Gulshan Resident',
          quote: 'My children no longer miss school to fetch water. This project gave us our future back.',
          avatar: '👩‍👧‍👦'
        },
        {
          name: 'Dr. Karim Ahmed',
          role: 'Local Health Officer',
          quote: 'Waterborne diseases dropped by 85%. This investment saved countless lives.',
          avatar: '👨‍⚕️'
        }
      ],
      status: 'completed'
    },
    {
      id: 'street-lights-dhanmondi',
      title: 'Lighting Safe Paths',
      subtitle: 'Illuminating communities, ensuring safety',
      location: 'Dhanmondi Roads, Dhaka',
      heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=400&fit=crop'
      ],
      story: 'Dark streets meant danger for families in Dhanmondi. Women avoided evening commutes, children stayed indoors after sunset, and local businesses suffered. Your ৳300K investment illuminated not just streets, but hope itself. Today, 1,800 residents walk safely under energy-efficient LED lights, crime has dropped 35%, and the community thrives after dark.',
      impact: {
        beneficiaries: 1800,
        completion: 100,
        donated: '৳300K',
        roi: '380%',
        satisfaction: 4.7
      },
      timeline: [
        {
          date: '2023-08-01',
          title: 'Safety Assessment',
          description: 'Crime data analysis and community safety survey conducted'
        },
        {
          date: '2023-09-15',
          title: 'LED Installation',
          description: 'Smart LED street lights installed across 15 key locations',
          image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300&h=200&fit=crop'
        },
        {
          date: '2023-11-01',
          title: 'Safety Improvement',
          description: 'Crime rates reduced by 35%, community satisfaction increased'
        }
      ],
      testimonials: [
        {
          name: 'Fatima Khan',
          role: 'Local Shop Owner',
          quote: 'My business can stay open later now. The lights brought customers and safety back.',
          avatar: '👩‍💼'
        }
      ],
      status: 'completed'
    }
  ];

  const openProject = (project: ProjectStory) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
              <a href="/donor">
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Project Stories</h1>
              <p className="text-slate-300">Explore the impact of your generosity</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4 relative z-10">
        {/* Project Stories Grid - Magazine Style */}
        <div className="space-y-16 pb-16">
          {projectStories.map((project, index) => (
            <div 
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Project Image */}
              <div 
                className={`relative group cursor-pointer ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}
                onClick={() => openProject(project)}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={project.heroImage} 
                    alt={project.title}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
                      <Play className="h-8 w-8 text-gray-900 ml-1" />
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-6 left-6">
                    <div className={`px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm ${
                      project.status === 'completed' 
                        ? 'bg-green-500/90 text-white' 
                        : project.status === 'active'
                        ? 'bg-blue-500/90 text-white'
                        : 'bg-amber-500/90 text-white'
                    }`}>
                      {project.status === 'completed' ? '✓ Completed' : 
                       project.status === 'active' ? '⚡ Active' : '📅 Planned'}
                    </div>
                  </div>

                  {/* Impact Preview */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                      <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                          <div className="font-bold text-gray-900">{project.impact.beneficiaries.toLocaleString()}</div>
                          <div className="text-gray-600 text-xs">Lives Impacted</div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{project.impact.donated}</div>
                          <div className="text-gray-600 text-xs">Investment</div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{project.impact.roi}</div>
                          <div className="text-gray-600 text-xs">Social ROI</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Story */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="space-y-6">
                  {/* Story Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      <span className="text-purple-600 text-sm font-medium">{project.location}</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                      {project.title}
                    </h2>
                    <p className="text-xl text-gray-600 mb-6">{project.subtitle}</p>
                  </div>

                  {/* Story Content */}
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {project.story}
                    </p>
                  </div>

                  {/* Impact Metrics */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      Project Impact
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{project.impact.beneficiaries.toLocaleString()}</div>
                        <div className="text-gray-600 text-sm">Beneficiaries</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">{project.impact.completion}%</div>
                        <div className="text-gray-600 text-sm">Complete</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-amber-600">{project.impact.donated}</div>
                        <div className="text-gray-600 text-sm">Invested</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{project.impact.roi}</div>
                        <div className="text-gray-600 text-sm">ROI</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      onClick={() => openProject(project)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Explore Full Story
                    </Button>
                    <Button variant="outline">
                      <Share className="h-4 w-4 mr-2" />
                      Share Impact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8 h-full overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Hero Section */}
              <div className="relative h-96">
                <img 
                  src={selectedProject.gallery[currentImageIndex]} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Close Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  onClick={() => setSelectedProject(null)}
                >
                  ✕
                </Button>

                {/* Gallery Navigation */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h1>
                      <p className="text-white/90">{selectedProject.subtitle}</p>
                    </div>
                    <div className="flex gap-2">
                      {selectedProject.gallery.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-8 space-y-8">
                {/* Story Text */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedProject.story}
                  </p>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-purple-500" />
                    Project Timeline
                  </h3>
                  <div className="space-y-6">
                    {selectedProject.timeline.map((event, index) => (
                      <div key={index} className="flex gap-6">
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                          {index < selectedProject.timeline.length - 1 && (
                            <div className="w-0.5 h-16 bg-purple-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <span className="text-sm text-gray-500">{event.date}</span>
                          </div>
                          <p className="text-gray-600 mb-3">{event.description}</p>
                          {event.image && (
                            <img 
                              src={event.image} 
                              alt={event.title}
                              className="w-32 h-24 object-cover rounded-lg"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonials */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-purple-500" />
                    Community Voices
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedProject.testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-2xl">{testimonial.avatar}</div>
                          <div>
                            <div className="font-semibold text-gray-900">{testimonial.name}</div>
                            <div className="text-sm text-gray-600">{testimonial.role}</div>
                          </div>
                        </div>
                        <blockquote className="text-gray-700 italic leading-relaxed">
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
