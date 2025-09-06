"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { 
  Camera, 
  MapPin, 
  Send, 
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Mic,
  Bot,
  Zap,
  Target,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { geminiService } from '@/lib/gemini';

export default function IssueReporter() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, isInitializing } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [description, setDescription] = useState('');
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);
  const [aiSuggestions, setAISuggestions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location, setLocation] = useState('Detecting location...');
  const [priority, setPriority] = useState('');
  const [urgency, setUrgency] = useState('');
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: user?.email || '',
    preferredContact: 'email'
  });
  const [aiCategorization, setAiCategorization] = useState<{
    suggestedCategory: string;
    confidence: number;
    reasoning: string;
    priority: string;
    urgency: string;
    tags: string[];
  } | null>(null);
  const [uploadedImage, setUploadedImage] = useState(false);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.push('/auth');
      return;
    }
  }, [isAuthenticated, isInitializing, router]);

  // Show loading state while authentication is being initialized
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading state if not authenticated (after initialization is complete)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const categories = [
    { id: 'infrastructure', name: 'অবকাঠামো', nameEn: 'Infrastructure', icon: '🛣️', color: 'bg-blue-500', description: 'রাস্তা, সেতু, ভবন, সরকারি সুবিধা' },
    { id: 'utilities', name: 'সরকারি সেবা', nameEn: 'Utilities', icon: '💡', color: 'bg-amber-500', description: 'বিদ্যুৎ, পানি, গ্যাস, ইন্টারনেট' },
    { id: 'safety', name: 'নিরাপত্তা', nameEn: 'Safety', icon: '🛡️', color: 'bg-red-500', description: 'অপরাধ, দুর্ঘটনা, জরুরি পরিস্থিতি' },
    { id: 'environment', name: 'পরিবেশ', nameEn: 'Environment', icon: '🌱', color: 'bg-green-500', description: 'দূষণ, বর্জ্য ব্যবস্থাপনা, সবুজ স্থান' },
    { id: 'corruption', name: 'দুর্নীতি', nameEn: 'Corruption', icon: '⚖️', color: 'bg-purple-500', description: 'ঘুষ, তহবিলের অপব্যবহার, অনৈতিক কাজ' },
    { id: 'other', name: 'অন্যান্য', nameEn: 'Other', icon: '📋', color: 'bg-gray-500', description: 'সাধারণ অভিযোগ ও অন্যান্য সমস্যা' }
  ];

  const steps = [
    { id: 1, title: 'সমস্যা বর্ণনা করুন', description: 'কী ঘটেছে বলুন', titleEn: 'Describe Issue' },
    { id: 2, title: 'AI বিশ্লেষণ', description: 'স্মার্ট শ্রেণীবিভাগ', titleEn: 'AI Analysis' },
    { id: 3, title: 'অবস্থান ও অগ্রাধিকার', description: 'কোথায় এবং কত জরুরি', titleEn: 'Location & Priority' },
    { id: 4, title: 'পর্যালোচনা ও জমা', description: 'চূড়ান্ত নিশ্চিতকরণ', titleEn: 'Review & Submit' }
  ];

  const handleAICategorization = async () => {
    if (!description.trim()) return;
    
    setIsAIAnalyzing(true);
    try {
      const systemPrompt = `You are an AI assistant for "Amar Sheba Protiva" - a civic issue reporting platform in Bangladesh. Analyze the following issue description and provide categorization.

Available categories:
- infrastructure: Roads, bridges, buildings, public facilities
- utilities: Electricity, water, gas, internet services  
- safety: Crime, accidents, emergency situations
- environment: Pollution, waste management, green spaces
- corruption: Bribery, misuse of funds, unethical practices
- other: General complaints and other issues

IMPORTANT: Respond with ONLY valid JSON, no markdown formatting, no code blocks, no additional text.

Required JSON format:
{
  "suggestedCategory": "category_id",
  "confidence": 0.85,
  "reasoning": "Brief explanation in Bengali and English",
  "priority": "high/medium/low",
  "urgency": "immediate/within_24h/within_week/not_urgent",
  "tags": ["tag1", "tag2", "tag3"]
}

Issue description: ${description}`;

      const response = await geminiService.generateChatResponse(systemPrompt);
      
      try {
        // Extract JSON from markdown code blocks if present
        let jsonString = response;
        const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          jsonString = jsonMatch[1];
        } else if (response.includes('```')) {
          // Try to extract content between any code blocks
          const codeMatch = response.match(/```\s*([\s\S]*?)\s*```/);
          if (codeMatch) {
            jsonString = codeMatch[1];
          }
        }
        
        const aiResult = JSON.parse(jsonString.trim());
        setAiCategorization(aiResult);
        setSelectedCategory(aiResult.suggestedCategory);
        setPriority(aiResult.priority);
        setUrgency(aiResult.urgency);
        setAISuggestions([aiResult.reasoning]);
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        console.log('Raw response:', response);
        
        // Fallback: Try to extract basic information from the response
        try {
          const fallbackResult = {
            suggestedCategory: 'other',
            confidence: 0.5,
            reasoning: 'AI analysis completed. Please review the suggested category manually.',
            priority: 'medium',
            urgency: 'within_week',
            tags: ['manual-review']
          };
          setAiCategorization(fallbackResult);
          setAISuggestions(['AI analysis completed. Please review the suggested category.']);
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
          setAISuggestions(['AI analysis completed. Please review the suggested category.']);
        }
      }
    } catch (error) {
      console.error('AI categorization error:', error);
      setAISuggestions(['AI analysis failed. Please select category manually.']);
    } finally {
      setIsAIAnalyzing(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAIAnalysis = () => {
    setIsAIAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAISuggestions([
        'Add specific location details',
        'Include time when issue occurred',
        'Mention safety concerns if any'
      ]);
      setIsAIAnalyzing(false);
    }, 2000);
  };

  return (
    <ProtectedRoute requiredPermissions={{ canAccessCitizen: true }}>
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/citizen')}
            className="flex items-center gap-2 text-white hover:text-teal-100 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="bengali-text">ড্যাশবোর্ডে ফিরুন</span>
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold bengali-heading">নতুন সমস্যা রিপোর্ট করুন</h1>
              <p className="text-emerald-100 text-lg bengali-text">AI সহায়তায় আপনার সম্প্রদায়ের উন্নতি করুন</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4 relative z-10">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium bengali-text ${
                    currentStep >= step.id ? 'text-emerald-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 bengali-text">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-emerald-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-xl border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                  <span className="bengali-heading">{steps[currentStep - 1].title}</span>
                </CardTitle>
                <p className="text-gray-500 text-sm bengali-text">{steps[currentStep - 1].description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Describe Issue */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 bengali-text">
                        সমস্যাটি বিস্তারিত বর্ণনা করুন
                      </label>
                      <Textarea
                        placeholder="কী ঘটেছে, কখন ঘটেছে এবং অন্যান্য প্রাসঙ্গিক বিবরণ লিখুন..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-[120px] resize-none bengali-text"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={nextStep}
                        disabled={!description.trim()}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium"
                      >
                        <span className="bengali-text">পরবর্তী: AI বিশ্লেষণ</span>
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: AI Analysis */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <Bot className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 bengali-heading">
                        AI-চালিত বিশ্লেষণ
                      </h3>
                      <p className="text-gray-600 mb-6 bengali-text">
                        আমাদের AI আপনার বর্ণনা বিশ্লেষণ করে সবচেয়ে উপযুক্ত বিভাগ এবং অগ্রাধিকার স্তর প্রস্তাব করবে।
                      </p>
                      <Button 
                        onClick={handleAICategorization}
                        disabled={isAIAnalyzing}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium"
                      >
                        {isAIAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            <span className="bengali-text">বিশ্লেষণ করা হচ্ছে...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            <span className="bengali-text">AI দিয়ে বিশ্লেষণ করুন</span>
                          </>
                        )}
                      </Button>
                    </div>

                    {aiCategorization && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                        <h4 className="font-semibold text-emerald-900 mb-3 bengali-heading">AI বিশ্লেষণ ফলাফল</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700 bengali-text">প্রস্তাবিত বিভাগ:</span>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm bengali-text">
                              {categories.find(c => c.id === aiCategorization.suggestedCategory)?.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              ({Math.round(aiCategorization.confidence * 100)}% আত্মবিশ্বাস)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700 bengali-text">অগ্রাধিকার:</span>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              aiCategorization.priority === 'high' ? 'bg-red-100 text-red-800' :
                              aiCategorization.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {aiCategorization.priority === 'high' ? 'উচ্চ' : 
                               aiCategorization.priority === 'medium' ? 'মধ্যম' : 'নিম্ন'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700 bengali-text">জরুরিতা:</span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {aiCategorization.urgency === 'immediate' ? 'তাত্ক্ষণিক' :
                               aiCategorization.urgency === 'within_24h' ? '২৪ ঘন্টার মধ্যে' :
                               aiCategorization.urgency === 'within_week' ? 'এক সপ্তাহের মধ্যে' : 'জরুরি নয়'}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700 bengali-text">যুক্তি:</span>
                            <p className="text-sm text-gray-600 mt-1 bengali-text">{aiCategorization.reasoning}</p>
                          </div>
                          {aiCategorization.tags.length > 0 && (
                            <div>
                              <span className="text-sm font-medium text-gray-700 bengali-text">ট্যাগ:</span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {aiCategorization.tags.map((tag, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs bengali-text">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep} className="px-6 py-3">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        <span className="bengali-text">পিছনে</span>
                      </Button>
                      <Button 
                        onClick={nextStep}
                        disabled={!aiCategorization}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium"
                      >
                        <span className="bengali-text">পরবর্তী: অবস্থান ও অগ্রাধিকার</span>
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Location & Priority */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 bengali-text">সমস্যার বিভাগ</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${
                              selectedCategory === category.id
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <div className="text-center">
                              <div className="text-2xl mb-2">{category.icon}</div>
                              <div className="text-sm font-medium text-gray-900 bengali-text">{category.name}</div>
                              <div className="text-xs text-gray-500 mt-1 bengali-text">{category.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 bengali-text">অবস্থানের বিবরণ</label>
                      <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 bengali-text">{location}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 bengali-text">অগ্রাধিকার স্তর</label>
                        <select 
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bengali-text"
                        >
                          <option value="">অগ্রাধিকার নির্বাচন করুন</option>
                          <option value="high">উচ্চ - গুরুতর সমস্যা</option>
                          <option value="medium">মধ্যম - গুরুত্বপূর্ণ সমস্যা</option>
                          <option value="low">নিম্ন - ছোট সমস্যা</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 bengali-text">জরুরিতা</label>
                        <select 
                          value={urgency}
                          onChange={(e) => setUrgency(e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bengali-text"
                        >
                          <option value="">জরুরিতা নির্বাচন করুন</option>
                          <option value="immediate">তাত্ক্ষণিক - কয়েক ঘন্টার মধ্যে</option>
                          <option value="within_24h">২৪ ঘন্টার মধ্যে</option>
                          <option value="within_week">এক সপ্তাহের মধ্যে</option>
                          <option value="not_urgent">জরুরি নয়</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep} className="px-6 py-3">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        <span className="bengali-text">পিছনে</span>
                      </Button>
                      <Button 
                        onClick={nextStep}
                        disabled={!selectedCategory || !priority || !urgency}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium"
                      >
                        <span className="bengali-text">পরবর্তী: পর্যালোচনা ও জমা</span>
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4 bengali-heading">আপনার রিপোর্ট পর্যালোচনা করুন</h4>
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium text-gray-700 bengali-text">বিবরণ:</span>
                          <p className="text-sm text-gray-600 mt-1 bengali-text">{description}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700 bengali-text">বিভাগ:</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl">{categories.find(c => c.id === selectedCategory)?.icon}</span>
                            <span className="text-sm text-gray-600 bengali-text">{categories.find(c => c.id === selectedCategory)?.name}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700 bengali-text">অবস্থান:</span>
                          <p className="text-sm text-gray-600 mt-1 bengali-text">{location}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium text-gray-700 bengali-text">অগ্রাধিকার:</span>
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${
                              priority === 'high' ? 'bg-red-100 text-red-800' :
                              priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {priority === 'high' ? 'উচ্চ' : 
                               priority === 'medium' ? 'মধ্যম' : 'নিম্ন'}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700 bengali-text">জরুরিতা:</span>
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {urgency === 'immediate' ? 'তাত্ক্ষণিক' :
                               urgency === 'within_24h' ? '২৪ ঘন্টার মধ্যে' :
                               urgency === 'within_week' ? 'এক সপ্তাহের মধ্যে' : 'জরুরি নয়'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep} className="px-6 py-3">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        <span className="bengali-text">পিছনে</span>
                      </Button>
                      <Button 
                        onClick={() => {
                          // Handle form submission
                          alert('রিপোর্ট সফলভাবে জমা দেওয়া হয়েছে!');
                          router.push('/citizen');
                        }}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        <span className="bengali-text">রিপোর্ট জমা দিন</span>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Assistant */}
            <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Bot className="h-8 w-8 animate-bounce-subtle" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 bengali-heading">AI সহায়ক</h3>
                  <p className="text-purple-100 text-sm mb-4 bengali-text">
                    আমি আপনার সমস্যাকে শ্রেণীবদ্ধ করতে এবং রিপোর্ট উন্নত করতে সাহায্য করব।
                  </p>
                  <div className="bg-purple-400/30 rounded-lg p-3">
                    <p className="text-xs text-purple-100 bengali-text">
                      💡 টিপ: দ্রুত সমাধানের জন্য সময়, অবস্থান এবং প্রভাবের মতো নির্দিষ্ট বিবরণ অন্তর্ভুক্ত করুন
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-emerald-500" />
                  <span className="bengali-heading">দ্রুত টিপস</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 bengali-text">নির্দিষ্ট হন</p>
                    <p className="text-xs text-gray-500 bengali-text">সঠিক অবস্থান এবং সময় অন্তর্ভুক্ত করুন</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 bengali-text">ছবি যোগ করুন</p>
                    <p className="text-xs text-gray-500 bengali-text">দৃশ্যমান প্রমাণ কর্তৃপক্ষকে সাহায্য করে</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 bengali-text">নিরাপত্তা প্রথম</p>
                    <p className="text-xs text-gray-500 bengali-text">জরুরি নিরাপত্তা উদ্বেগ চিহ্নিত করুন</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Categories */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg bengali-heading">জনপ্রিয় সমস্যা</CardTitle>
                <p className="text-gray-500 text-sm bengali-text">আপনার এলাকার সাধারণ রিপোর্ট</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="text-lg">🛣️</div>
                    <span className="text-sm font-medium">Road Issues</span>
                  </div>
                  <span className="text-xs text-gray-500">47 reports</span>
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="text-lg">💡</div>
                    <span className="text-sm font-medium">Street Lights</span>
                  </div>
                  <span className="text-xs text-gray-500">23 reports</span>
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-green-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="text-lg">🌱</div>
                    <span className="text-sm font-medium">Waste Management</span>
                  </div>
                  <span className="text-xs text-gray-500">18 reports</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}


