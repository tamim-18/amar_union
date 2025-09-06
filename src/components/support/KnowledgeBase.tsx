"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  BookOpen,
  FileText,
  Video,
  Download,
  Share2,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Clock,
  User,
  Tag,
  Filter,
  SortAsc,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Star,
  Award,
  Lightbulb,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Info
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  titleBn: string;
  content: string;
  contentBn: string;
  excerpt: string;
  excerptBn: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  views: number;
  helpful: number;
  notHelpful: number;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'article' | 'video' | 'tutorial' | 'faq';
  estimatedReadTime: number;
  isBookmarked?: boolean;
}

interface KnowledgeBaseProps {
  className?: string;
}

export default function KnowledgeBase({ className = "" }: KnowledgeBaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Categories', nameBn: 'সব ক্যাটাগরি', count: 156 },
    { id: 'getting-started', name: 'Getting Started', nameBn: 'শুরু করা', count: 23 },
    { id: 'issue-reporting', name: 'Issue Reporting', nameBn: 'সমস্যা রিপোর্টিং', count: 45 },
    { id: 'benefits', name: 'Benefits & Eligibility', nameBn: 'সুবিধা ও যোগ্যতা', count: 32 },
    { id: 'technical', name: 'Technical Support', nameBn: 'প্রযুক্তিগত সহায়তা', count: 28 },
    { id: 'transparency', name: 'Transparency', nameBn: 'স্বচ্ছতা', count: 18 },
    { id: 'community', name: 'Community', nameBn: 'সম্প্রদায়', count: 10 }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels', nameBn: 'সব স্তর' },
    { id: 'beginner', name: 'Beginner', nameBn: 'শুরু' },
    { id: 'intermediate', name: 'Intermediate', nameBn: 'মধ্যম' },
    { id: 'advanced', name: 'Advanced', nameBn: 'উন্নত' }
  ];

  const types = [
    { id: 'all', name: 'All Types', nameBn: 'সব ধরন' },
    { id: 'article', name: 'Articles', nameBn: 'নিবন্ধ' },
    { id: 'video', name: 'Videos', nameBn: 'ভিডিও' },
    { id: 'tutorial', name: 'Tutorials', nameBn: 'টিউটোরিয়াল' },
    { id: 'faq', name: 'FAQs', nameBn: 'প্রশ্নোত্তর' }
  ];

  const articles: Article[] = [
    {
      id: '1',
      title: 'Complete Guide to Issue Reporting',
      titleBn: 'সমস্যা রিপোর্টিংয়ের সম্পূর্ণ গাইড',
      content: 'This comprehensive guide covers everything you need to know about reporting civic issues through the Amar Sheba Protiva platform...',
      contentBn: 'এই বিস্তৃত গাইডে Amar Sheba Protiva প্ল্যাটফর্মের মাধ্যমে নাগরিক সমস্যা রিপোর্ট করার জন্য আপনার যা জানা দরকার তার সব কিছুই রয়েছে...',
      excerpt: 'Learn how to effectively report civic issues with photos, location data, and AI assistance.',
      excerptBn: 'ছবি, অবস্থান ডেটা এবং AI সহায়তার সাথে নাগরিক সমস্যা কার্যকরভাবে রিপোর্ট করার শিখুন।',
      category: 'issue-reporting',
      author: 'Support Team',
      publishedAt: '2024-01-10',
      updatedAt: '2024-01-15',
      views: 456,
      helpful: 67,
      notHelpful: 3,
      tags: ['reporting', 'guide', 'tutorial', 'citizen'],
      difficulty: 'beginner',
      type: 'article',
      estimatedReadTime: 8,
      isBookmarked: false
    },
    {
      id: '2',
      title: 'Understanding Blockchain Transparency',
      titleBn: 'ব্লকচেইন স্বচ্ছতা বুঝুন',
      content: 'Explore how blockchain technology ensures transparency in fund tracking and verification...',
      contentBn: 'ব্লকচেইন প্রযুক্তি কীভাবে তহবিল ট্র্যাকিং এবং যাচাইকরণে স্বচ্ছতা নিশ্চিত করে তা অন্বেষণ করুন...',
      excerpt: 'Explore how blockchain technology ensures transparency in fund tracking and verification.',
      excerptBn: 'ব্লকচেইন প্রযুক্তি কীভাবে তহবিল ট্র্যাকিং এবং যাচাইকরণে স্বচ্ছতা নিশ্চিত করে তা অন্বেষণ করুন।',
      category: 'transparency',
      author: 'Technical Team',
      publishedAt: '2024-01-08',
      updatedAt: '2024-01-12',
      views: 234,
      helpful: 34,
      notHelpful: 1,
      tags: ['blockchain', 'transparency', 'funds', 'verification'],
      difficulty: 'intermediate',
      type: 'article',
      estimatedReadTime: 12,
      isBookmarked: true
    },
    {
      id: '3',
      title: 'NID Verification Troubleshooting',
      titleBn: 'NID যাচাইকরণ সমস্যা সমাধান',
      content: 'Common issues and solutions for NID verification problems...',
      contentBn: 'NID যাচাইকরণ সমস্যার সাধারণ সমস্যা এবং সমাধান...',
      excerpt: 'Common issues and solutions for NID verification problems.',
      excerptBn: 'NID যাচাইকরণ সমস্যার সাধারণ সমস্যা এবং সমাধান।',
      category: 'technical',
      author: 'Verification Team',
      publishedAt: '2024-01-05',
      updatedAt: '2024-01-08',
      views: 189,
      helpful: 28,
      notHelpful: 2,
      tags: ['nid', 'verification', 'troubleshooting', 'technical'],
      difficulty: 'beginner',
      type: 'tutorial',
      estimatedReadTime: 5,
      isBookmarked: false
    },
    {
      id: '4',
      title: 'Benefit Eligibility Assessment',
      titleBn: 'সুবিধা যোগ্যতা মূল্যায়ন',
      content: 'Step-by-step guide to using the AI eligibility checker...',
      contentBn: 'AI যোগ্যতা যাচাইকারী ব্যবহারের ধাপে ধাপে গাইড...',
      excerpt: 'Step-by-step guide to using the AI eligibility checker.',
      excerptBn: 'AI যোগ্যতা যাচাইকারী ব্যবহারের ধাপে ধাপে গাইড।',
      category: 'benefits',
      author: 'Benefits Team',
      publishedAt: '2024-01-03',
      updatedAt: '2024-01-06',
      views: 312,
      helpful: 45,
      notHelpful: 1,
      tags: ['benefits', 'eligibility', 'ai', 'assessment'],
      difficulty: 'beginner',
      type: 'video',
      estimatedReadTime: 6,
      isBookmarked: true
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-50 border-green-200';
      case 'intermediate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'advanced': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return FileText;
      case 'video': return Video;
      case 'tutorial': return BookOpen;
      case 'faq': return HelpCircle;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'issue-reporting': return 'text-blue-600 bg-blue-50';
      case 'benefits': return 'text-green-600 bg-green-50';
      case 'technical': return 'text-orange-600 bg-orange-50';
      case 'transparency': return 'text-purple-600 bg-purple-50';
      case 'community': return 'text-pink-600 bg-pink-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || article.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'all' || article.type === selectedType;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'popular':
        return b.views - a.views;
      case 'helpful':
        return b.helpful - a.helpful;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleBookmark = (articleId: string) => {
    // Toggle bookmark status
    console.log('Bookmark toggled for article:', articleId);
  };

  const handleFeedback = (articleId: string, helpful: boolean) => {
    // Handle feedback
    console.log('Feedback for article:', articleId, helpful);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
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

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {types.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="helpful">Most Helpful</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            {sortedArticles.length} articles found
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            <span>Filtered results</span>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedArticles.map((article) => {
            const TypeIcon = getTypeIcon(article.type);
            const isExpanded = expandedArticle === article.id;

            return (
              <div key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* Article Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <TypeIcon className="h-5 w-5 text-blue-500" />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBookmark(article.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Bookmark className={`h-4 w-4 ${article.isBookmarked ? 'text-blue-500 fill-current' : 'text-gray-400'}`} />
                    </Button>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Article Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.estimatedReadTime} min read
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {article.author}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                      {article.difficulty}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{article.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Feedback */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeedback(article.id, true)}
                        className="h-6 px-2 text-xs text-green-600 hover:text-green-700"
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {article.helpful}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFeedback(article.id, false)}
                        className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
                      >
                        <ThumbsDown className="h-3 w-3 mr-1" />
                        {article.notHelpful}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Article Actions */}
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedArticle(isExpanded ? null : article.id)}
                      className="flex-1 mr-2"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          Read More
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Open
                    </Button>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="prose prose-sm max-w-none">
                        <h5 className="font-bold text-gray-900 mb-2">Content Preview:</h5>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {article.content}
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Published: {article.publishedAt}</span>
                            <span>Updated: {article.updatedAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {sortedArticles.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSelectedType('all');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
