"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { geminiService } from '@/lib/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Bot,
  Send,
  User,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  Sparkles,
  MessageCircle,
  Lightbulb,  
  BookOpen,
  ExternalLink,
  Flag,
  Shield
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  helpful?: boolean;
  suggestions?: string[];
}

interface AIChatProps {
  onClose?: () => void;
  className?: string;
}

export default function AIChat({ onClose, className = "" }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '# Hello! Welcome to Amar Sheba Protiva AI Assistant! 👋\n\n**আমি আপনার AI সহায়ক!** আমি আপনাকে সাহায্য করতে পারি:\n\n## 🚀 **Available Services**\n\n- **Issue Reporting & Tracking** (ইস্যু রিপোর্টিং ও ট্র্যাকিং)\n- **Benefit Eligibility Checking** (সুবিধা যোগ্যতা যাচাই)\n- **NID Verification Assistance** (এনআইডি যাচাই সহায়তা)\n- **Technical Support** (প্রযুক্তিগত সহায়তা)\n- **Platform Navigation** (প্ল্যাটফর্ম নেভিগেশন)\n- **Government Services Guidance** (সরকারি সেবা নির্দেশনা)\n\n## 🌐 **Language Support**\n\nআপনি **বাংলা**, **ইংরেজি** অথবা **Banglish**-এ কথা বলতে পারেন। আমি সব ভাষায় উত্তর দিতে পারি।\n\n> **How can I help you today?** / **আজ আমি আপনাকে কিভাবে সাহায্য করতে পারি?**',
      timestamp: new Date(),
      suggestions: [
        'How do I report an issue?',
        'Check my benefit eligibility',
        'Help with NID verification',
        'Technical problems',
        'ইস্যু রিপোর্ট কিভাবে করব?',
        'সুবিধা যোগ্যতা যাচাই করি',
        'এনআইডি যাচাইয়ে সাহায্য',
        'প্রযুক্তিগত সমস্যা'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setIsLoading(true);

    try {
      // Create comprehensive system prompt for Amar Sheba Protiva
      const systemPrompt = `You are an AI assistant for "Amar Sheba Protiva" - a unified civic-tech transparency platform for Bangladesh. You help citizens, leaders, donors, and beneficiaries with various civic services.

IMPORTANT: You MUST respond in the same language as the user's query. Support Bengali (বাংলা), Banglish (Bengali-English mix), and English seamlessly.

FORMATTING: Always format your responses using Markdown for better readability. Use:
- **Bold** for important points
- *Italic* for emphasis
- # Headers for main sections
- ## Subheaders for subsections
- - Bullet points for lists
- 1. Numbered lists for steps
- \`code\` for technical terms
- > Blockquotes for important notes
- [Links](url) for references
- Tables for structured data

Your capabilities include:
1. Issue Reporting & Tracking (ইস্যু রিপোর্টিং ও ট্র্যাকিং)
2. Benefit Eligibility Checking (সুবিধা যোগ্যতা যাচাই)
3. NID Verification Assistance (এনআইডি যাচাই সহায়তা)
4. Technical Support (প্রযুক্তিগত সহায়তা)
5. Platform Navigation (প্ল্যাটফর্ম নেভিগেশন)
6. Government Service Guidance (সরকারি সেবা নির্দেশনা)
7. Transparency & Accountability (স্বচ্ছতা ও জবাবদিহিতা)
8. Civic Engagement (নাগরিক অংশগ্রহণ)

Platform Features:
- **Citizen Portal**: Issue reporting, tracking, community engagement
- **Leader Portal**: Issue management, analytics, fund allocation
- **Donor Portal**: Impact tracking, project funding, transparency
- **Beneficiary Portal**: Benefit tracking, eligibility checking, digital passport
- **Support Center**: AI assistance, knowledge base, ticket management
- **Interactive Map**: Geographic issue mapping and analytics

Always provide:
- Step-by-step guidance in the user's language
- Relevant links and navigation tips
- Cultural context for Bangladesh
- Clear, actionable advice
- Empathetic and helpful tone
- **Well-formatted responses** using Markdown

If user asks in Bengali/Banglish, respond in Bengali/Banglish. If in English, respond in English. Mix languages naturally when appropriate.

User query: ${content}`;

      const aiResponse = await geminiService.generateChatResponse(systemPrompt);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        suggestions: generateSuggestions(content)
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again or contact support if the issue persists.\n\nদুঃখিত, একটি ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা সমস্যা চলতে থাকলে সহায়তা কেন্দ্রে যোগাযোগ করুন।',
        timestamp: new Date(),
        suggestions: [
          'Try again',
          'Contact support',
          'Check internet connection',
          'Report technical issue'
        ]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const generateSuggestions = (userInput: string): string[] => {
    const input = userInput.toLowerCase();
    
    if (input.includes('report') || input.includes('issue') || input.includes('ইস্যু') || input.includes('রিপোর্ট')) {
      return [
        'How to upload photos?',
        'Location requirements',
        'What happens after submission?',
        'Track my reported issues',
        'ফটো আপলোড কিভাবে?',
        'অবস্থান প্রয়োজনীয়তা'
      ];
    }
    
    if (input.includes('benefit') || input.includes('eligibility') || input.includes('সুবিধা') || input.includes('যোগ্যতা')) {
      return [
        'Available benefit programs',
        'Required documents',
        'NID verification help',
        'Appeal process',
        'উপলব্ধ সুবিধা প্রোগ্রাম',
        'প্রয়োজনীয় কাগজপত্র'
      ];
    }
    
    if (input.includes('nid') || input.includes('verification') || input.includes('এনআইডি') || input.includes('যাচাই')) {
      return [
        'NID format requirements',
        'Common verification errors',
        'Contact support',
        'Alternative verification methods',
        'এনআইডি ফরম্যাট প্রয়োজনীয়তা',
        'সাধারণ যাচাই ত্রুটি'
      ];
    }
    
    if (input.includes('technical') || input.includes('problem') || input.includes('error') || input.includes('প্রযুক্তি') || input.includes('সমস্যা')) {
      return [
        'Create support ticket',
        'Browser compatibility',
        'Mobile app issues',
        'Performance problems',
        'সাপোর্ট টিকেট তৈরি',
        'ব্রাউজার সামঞ্জস্যতা'
      ];
    }
    
    if (input.includes('track') || input.includes('status') || input.includes('ট্র্যাক') || input.includes('অবস্থা')) {
      return [
        'Filter issues by status',
        'Community comments',
        'Resolution timeline',
        'Update issue details',
        'অবস্থা অনুযায়ী ফিল্টার',
        'সম্প্রদায়ের মন্তব্য'
      ];
    }
    
    // Default suggestions
    return [
      'Issue reporting process',
      'Benefit eligibility',
      'Account problems',
      'Technical support',
      'ইস্যু রিপোর্টিং প্রক্রিয়া',
      'সুবিধা যোগ্যতা',
      'অ্যাকাউন্ট সমস্যা',
      'প্রযুক্তিগত সহায়তা'
    ];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage(suggestion);
  };

  const handleFeedback = (messageId: string, helpful: boolean) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, helpful }
          : msg
      )
    );
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold">AI Assistant</h3>
              <p className="text-green-100 text-sm">Powered by Gemini AI • বাংলা/English Support</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            <span className="text-sm">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-blue-500' 
                  : 'bg-green-500'
              }`}>
                {message.type === 'user' ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-white" />
                )}
              </div>

              {/* Message Content */}
              <div className={`rounded-2xl p-3 ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="text-sm">
                  {message.type === 'ai' ? (
                    <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-900 prose-strong:text-gray-900 prose-em:text-gray-900 prose-code:text-gray-900 prose-pre:bg-gray-200 prose-pre:text-gray-900 prose-blockquote:text-gray-700 prose-blockquote:border-gray-400 prose-ul:text-gray-900 prose-ol:text-gray-900 prose-li:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                        h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-gray-900">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-semibold mb-2 text-gray-900">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 text-gray-900">{children}</h3>,
                        p: ({ children }) => <p className="mb-2 text-gray-900">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1 text-gray-900">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1 text-gray-900">{children}</ol>,
                        li: ({ children }) => <li className="text-gray-900">{children}</li>,
                        code: ({ children }) => <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono text-gray-900">{children}</code>,
                        pre: ({ children }) => <pre className="bg-gray-200 p-2 rounded text-xs font-mono overflow-x-auto text-gray-900">{children}</pre>,
                        blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-400 pl-3 italic text-gray-700">{children}</blockquote>,
                        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                        em: ({ children }) => <em className="italic text-gray-900">{children}</em>,
                        a: ({ href, children }) => <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                        table: ({ children }) => <div className="overflow-x-auto"><table className="min-w-full border border-gray-300 text-xs">{children}</table></div>,
                        thead: ({ children }) => <thead className="bg-gray-200">{children}</thead>,
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr: ({ children }) => <tr className="border-b border-gray-300">{children}</tr>,
                        th: ({ children }) => <th className="px-2 py-1 text-left font-semibold text-gray-900">{children}</th>,
                        td: ({ children }) => <td className="px-2 py-1 text-gray-900">{children}</td>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  )}
                </div>
                <div className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </div>

                {/* AI Message Actions */}
                {message.type === 'ai' && (
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(message.content)}
                      className="h-6 px-2 text-xs"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                    {message.helpful === undefined && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(message.id, true)}
                          className="h-6 px-2 text-xs text-green-600 hover:text-green-700"
                        >
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Helpful
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(message.id, false)}
                          className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
                        >
                          <ThumbsDown className="h-3 w-3 mr-1" />
                          Not Helpful
                        </Button>
                      </>
                    )}
                    {message.helpful !== undefined && (
                      <span className="text-xs text-gray-500">
                        {message.helpful ? 'Thanks for your feedback!' : 'We\'ll improve this response.'}
                      </span>
                    )}
                  </div>
                )}

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-gray-600 font-medium">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-2 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl p-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Type your message... / আপনার বার্তা লিখুন..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            className="bg-green-500 hover:bg-green-600"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSendMessage('How do I report an issue?')}
            className="text-xs"
          >
            <Flag className="h-3 w-3 mr-1" />
            Report Issue
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSendMessage('Check benefit eligibility')}
            className="text-xs"
          >
            <Shield className="h-3 w-3 mr-1" />
            Benefits
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSendMessage('Technical support')}
            className="text-xs"
          >
            <Bot className="h-3 w-3 mr-1" />
            Technical
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSendMessage('Track my issues')}
            className="text-xs"
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            Track Issues
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSendMessage('ইস্যু রিপোর্ট কিভাবে করব?')}
            className="text-xs"
          >
            <Flag className="h-3 w-3 mr-1" />
            ইস্যু রিপোর্ট
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSendMessage('সুবিধা যোগ্যতা যাচাই করি')}
            className="text-xs"
          >
            <Shield className="h-3 w-3 mr-1" />
            সুবিধা যাচাই
          </Button>
        </div>
      </div>
    </div>
  );
}
