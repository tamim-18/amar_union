"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SuccessModal } from "@/components/ui/success-modal";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { 
  Camera, 
  MapPin, 
  Send, 
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Upload,
  Bot,
  Target,
  ChevronRight,
  ChevronLeft,
  Mic
} from "lucide-react";
import { geminiService } from '@/lib/gemini';

// Minimal Web Speech API typings to avoid any
interface SpeechRecognitionResultAlt { transcript: string }
interface SpeechRecognitionResultLike { isFinal: boolean; 0: SpeechRecognitionResultAlt }
interface SpeechRecognitionEventLike { resultIndex: number; results: SpeechRecognitionResultLike[] }
interface ISpeechRecognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onstart?: () => void;
  onresult?: (event: SpeechRecognitionEventLike) => void;
  onerror?: (event?: unknown) => void;
  onend?: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => ISpeechRecognition;
    webkitSpeechRecognition?: new () => ISpeechRecognition;
  }
}

export default function IssueReporter() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
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
    email: '',
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [canUseSpeech, setCanUseSpeech] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const lastFinalRef = useRef<string>('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
      return;
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionCtor) {
      setCanUseSpeech(true);
      const recognition: ISpeechRecognition = new SpeechRecognitionCtor();
      recognition.lang = 'bn-BD';
      recognition.interimResults = false; // prevent duplicate interim appends
      recognition.continuous = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        lastFinalRef.current = '';
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let finalizedTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalizedTranscript += result[0].transcript;
          }
        }
        const segment = finalizedTranscript.replace(/\s+/g, ' ').trim();
        if (!segment) return;
        // Skip if same as last final or already at the end
        if (segment === lastFinalRef.current) return;
        lastFinalRef.current = segment;
        setDescription((prev) => {
          const trimmedPrev = (prev || '').replace(/\s+/g, ' ').trim();
          if (trimmedPrev.endsWith(segment)) return prev; // already appended
          return (trimmedPrev ? trimmedPrev + ' ' : '') + segment;
        });
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setCanUseSpeech(false);
    }
  }, []);

  const handleToggleSpeech = () => {
    if (!canUseSpeech || !recognitionRef.current) return;
    if (isListening) {
      try { recognitionRef.current.stop(); } catch {}
      setIsListening(false);
    } else {
      try { recognitionRef.current.start(); } catch {}
      setIsListening(true);
    }
  };

  // Show loading state while authentication is being checked
  if (isLoading) {
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

Respond in JSON format:
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
      console.log('AI Response:', response);
      
      try {
        // Extract JSON from markdown code blocks if present
        let jsonString = response;
        
        // Check if response contains markdown code blocks
        const jsonMatch = response.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
        if (jsonMatch) {
          jsonString = jsonMatch[1];
          console.log('Extracted JSON from markdown:', jsonString);
        } else {
          // Try to find JSON object in the response
          const jsonObjectMatch = response.match(/\{[\s\S]*\}/);
          if (jsonObjectMatch) {
            jsonString = jsonObjectMatch[0];
            console.log('Extracted JSON object:', jsonString);
          } else {
            console.log('No JSON found in response, using raw response');
          }
        }
        
        const aiResult = JSON.parse(jsonString);
        setAiCategorization(aiResult);
        setSelectedCategory(aiResult.suggestedCategory);
        setPriority(aiResult.priority);
        setUrgency(aiResult.urgency);
        
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        console.log('Raw AI response:', response);
        
        // Fallback: Create a basic categorization object
        const fallbackResult = {
          suggestedCategory: 'infrastructure',
          confidence: 0.5,
          reasoning: 'AI analysis completed. Please review the suggested category.',
          priority: 'medium',
          urgency: 'within_week',
          tags: ['general']
        };
        
        setAiCategorization(fallbackResult);
        setSelectedCategory(fallbackResult.suggestedCategory);
        setPriority(fallbackResult.priority);
        setUrgency(fallbackResult.urgency);
        
      }
    } catch (error) {
      console.error('AI categorization error:', error);
      
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

      <div className="container mx-auto px-4 mt-8 relative z-10">
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
                      <div className="relative">
                        <Textarea
                          placeholder="কী ঘটেছে, কখন ঘটেছে এবং অন্যান্য প্রাসঙ্গিক বিবরণ লিখুন..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="min-h-[120px] resize-none bengali-text pr-12"
                        />
                        <button
                          type="button"
                          onClick={canUseSpeech ? handleToggleSpeech : undefined}
                          className={`absolute bottom-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full border ${isListening ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'} transition-colors`}
                          title={canUseSpeech ? (isListening ? 'শোনা বন্ধ করুন' : 'কথা বলে লিখুন') : 'শীঘ্রই আসছে'}
                          aria-label="Voice input"
                        >
                          <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Image Upload Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 bengali-text">
                        ছবি আপলোড করুন (ঐচ্ছিক)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 bengali-text">
                              ছবি যোগ করে সমস্যাটি আরও স্পষ্ট করুন
                            </p>
                            <p className="text-xs text-gray-500 bengali-text mt-1">
                              JPG, PNG, GIF (সর্বোচ্চ 5MB)
                            </p>
                          </div>
                          <Button
                            disabled
                            variant="outline"
                            className="bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            <span className="bengali-text">ছবি আপলোড করুন</span>
                          </Button>
                          <p className="text-xs text-gray-400 bengali-text">
                            (শীঘ্রই আসছে)
                          </p>
                        </div>
                      </div>
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
                      <Button variant="outline" onClick={prevStep}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      <Button 
                        onClick={nextStep}
                        disabled={!selectedCategory || !priority || !urgency}
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        Next: Review & Submit
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Review Your Report</h4>
                      <div className="space-y-4">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Description:</span>
                          <p className="text-sm text-gray-600 mt-1">{description}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Category:</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl">{categories.find(c => c.id === selectedCategory)?.icon}</span>
                            <span className="text-sm text-gray-600">{categories.find(c => c.id === selectedCategory)?.name}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Location:</span>
                          <p className="text-sm text-gray-600 mt-1">{location}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Priority:</span>
                            <span className={`ml-2 px-2 py-1 rounded text-xs ${
                              priority === 'high' ? 'bg-red-100 text-red-800' :
                              priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {priority}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Urgency:</span>
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {urgency}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      <Button 
                        onClick={() => {
                          // Handle form submission - Updated to use modal instead of alert
                          console.log('Submitting report...');
                          setShowSuccessModal(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Submit Report
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
                  <h3 className="text-lg font-bold mb-2">AI Assistant</h3>
                  <p className="text-purple-100 text-sm mb-4">
                    I&apos;ll help categorize your issue and suggest improvements to your report.
                  </p>
                  <div className="bg-purple-400/30 rounded-lg p-3">
                    <p className="text-xs text-purple-100">
                      💡 Tip: Include specific details like time, location, and impact for faster resolution
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
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Be Specific</p>
                    <p className="text-xs text-gray-500">Include exact location and time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Add Photos</p>
                    <p className="text-xs text-gray-500">Visual evidence helps authorities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Safety First</p>
                    <p className="text-xs text-gray-500">Mark urgent safety concerns</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Categories */}
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Popular Issues</CardTitle>
                <p className="text-gray-500 text-sm">Common reports in your area</p>
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

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="রিপোর্ট সফলভাবে জমা হয়েছে!"
        message="আপনার সমস্যা রিপোর্ট সফলভাবে জমা দেওয়া হয়েছে। আমাদের দল এটি পর্যালোচনা করে দ্রুত সমাধানের চেষ্টা করবে।"
        actionText="নাগরিক ড্যাশবোর্ডে যান"
        reportId={`RPT-${Date.now().toString().slice(-6)}`}
        estimatedTime="২-৩ দিন"
        onAction={() => {
          setShowSuccessModal(false);
          router.push('/citizen');
        }}
      />
    </div>
    </ProtectedRoute>
  );
}


