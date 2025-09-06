"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  UserCheck,
  Brain,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Download,
  RefreshCw,
  Eye,
  Shield,
  Users,
  DollarSign,
  GraduationCap,
  Briefcase,
  MapPin,
  Clock,
  Star,
  Sparkles,
  Zap
} from "lucide-react";
import { geminiService, EligibilityAssessment, NIDVerification } from '@/lib/gemini';

interface Program {
  id: string;
  name: string;
  nameBn: string;
  description: string;
  requirements: string[];
  benefits: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function EligibilityChecker() {
  const [step, setStep] = useState(1);
  const [nidNumber, setNidNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [nidData, setNidData] = useState<NIDVerification | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState({
    familySize: '',
    monthlyIncome: '',
    educationLevel: '',
    employmentStatus: '',
    specialCircumstances: ''
  });
  const [isAssessing, setIsAssessing] = useState(false);
  const [assessment, setAssessment] = useState<EligibilityAssessment | null>(null);
  const [showReport, setShowReport] = useState(false);

  const programs: Program[] = [
    {
      id: 'water',
      name: 'Clean Water Access Program',
      nameBn: 'পরিষ্কার পানি সুবিধা কর্মসূচি',
      description: 'Free access to clean drinking water for eligible families',
      requirements: ['NID Verification', 'Income Certificate', 'Family Survey'],
      benefits: ['৳২,৫০০ monthly water allowance', 'Free water filter', 'Maintenance support'],
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'healthcare',
      name: 'Healthcare Subsidy',
      nameBn: 'স্বাস্থ্য সেবা ভাতা',
      description: 'Medical expense support for low-income families',
      requirements: ['NID Verification', 'Medical Certificate', 'Income Proof'],
      benefits: ['৳১,৮০০ monthly healthcare allowance', 'Free medical checkups', 'Medicine discount'],
      icon: Shield,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'education',
      name: 'Education Support',
      nameBn: 'শিক্ষা সহায়তা',
      description: 'Educational support for children and adults',
      requirements: ['NID Verification', 'School Certificate', 'Income Certificate'],
      benefits: ['৳৩,০০০ monthly education allowance', 'Free books and supplies', 'Tutoring support'],
      icon: GraduationCap,
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 'food',
      name: 'Food Security Program',
      nameBn: 'খাদ্য নিরাপত্তা কর্মসূচি',
      description: 'Food assistance for vulnerable families',
      requirements: ['NID Verification', 'Family Survey', 'Income Certificate'],
      benefits: ['৳২,০০০ monthly food allowance', 'Free rice distribution', 'Nutrition counseling'],
      icon: DollarSign,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const handleNIDVerification = async () => {
    if (!nidNumber || nidNumber.length !== 13) {
      alert('Please enter a valid 13-digit NID number');
      return;
    }

    setIsVerifying(true);
    try {
      const result = await geminiService.verifyNID(nidNumber);
      setNidData(result);
      if (result.valid) {
        setStep(2);
      } else {
        alert('Invalid NID number. Please check and try again.');
      }
    } catch (error) {
      console.error('NID verification error:', error);
      alert('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleEligibilityAssessment = async () => {
    if (!selectedProgram || !nidData) return;

    setIsAssessing(true);
    try {
      const result = await geminiService.assessEligibility(
        nidData,
        selectedProgram.name,
        additionalInfo
      );
      setAssessment(result);
      setStep(3);
    } catch (error) {
      console.error('Eligibility assessment error:', error);
      alert('Assessment failed. Please try again.');
    } finally {
      setIsAssessing(false);
    }
  };

  const getStatusIcon = (eligible: boolean, confidence: number) => {
    if (confidence > 0.8) {
      return eligible ? 
        <CheckCircle2 className="h-8 w-8 text-green-500" /> : 
        <XCircle className="h-8 w-8 text-red-500" />;
    }
    return <AlertCircle className="h-8 w-8 text-amber-500" />;
  };

  const getStatusColor = (eligible: boolean, confidence: number) => {
    if (confidence > 0.8) {
      return eligible ? 'text-green-600 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-200';
    }
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
              <a href="/beneficiary">
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Brain className="h-6 w-6 text-cyan-400" />
                <span className="bengali-text">সুবিধা যোগ্যতা যাচাই</span>
              </h1>
              <p className="text-blue-300">AI-Powered Eligibility Checker • Smart Verification</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4 relative z-10 max-w-4xl">
        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  step >= stepNumber ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-300'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>NID Verification</span>
            <span>Program Selection</span>
            <span>AI Assessment</span>
          </div>
        </div>

        {/* Step 1: NID Verification */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 bengali-text">জাতীয় পরিচয়পত্র যাচাই</h2>
              <p className="text-gray-600">Enter your 13-digit NID number for verification</p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nid" className="text-sm font-medium text-gray-700">
                    NID Number (13 digits)
                  </Label>
                  <Input
                    id="nid"
                    type="text"
                    placeholder="1234567890123"
                    value={nidNumber}
                    onChange={(e) => setNidNumber(e.target.value)}
                    className="mt-1 text-center text-lg font-mono"
                    maxLength={13}
                  />
                </div>

                <Button 
                  onClick={handleNIDVerification}
                  disabled={isVerifying || nidNumber.length !== 13}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  {isVerifying ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Verify NID
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Program Selection */}
        {step === 2 && nidData && (
          <div className="space-y-6">
            {/* NID Verification Success */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <div>
                  <h3 className="text-lg font-bold text-green-800">NID Verification Successful</h3>
                  <p className="text-green-600">
                    <span className="bengali-text">{nidData.name}</span> • {nidData.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Program Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center bengali-text">
                সুবিধা কর্মসূচি নির্বাচন করুন
              </h2>
              <p className="text-gray-600 text-center mb-8">Choose a program to check your eligibility</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs.map((program) => {
                  const IconComponent = program.icon;
                  return (
                    <div
                      key={program.id}
                      onClick={() => setSelectedProgram(program)}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                        selectedProgram?.id === program.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${program.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{program.name}</h3>
                          <p className="text-sm text-gray-600 mb-3 bengali-text">{program.nameBn}</p>
                          <p className="text-sm text-gray-700 mb-4">{program.description}</p>
                          
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-gray-500">Benefits:</div>
                            {program.benefits.slice(0, 2).map((benefit, index) => (
                              <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                {benefit}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Additional Information Form */}
              {selectedProgram && (
                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 bengali-text">
                    অতিরিক্ত তথ্য প্রদান করুন
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="familySize" className="text-sm font-medium text-gray-700">
                        Family Size
                      </Label>
                      <Input
                        id="familySize"
                        type="number"
                        placeholder="4"
                        value={additionalInfo.familySize}
                        onChange={(e) => setAdditionalInfo(prev => ({...prev, familySize: e.target.value}))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-700">
                        Monthly Income (৳)
                      </Label>
                      <Input
                        id="monthlyIncome"
                        type="number"
                        placeholder="15000"
                        value={additionalInfo.monthlyIncome}
                        onChange={(e) => setAdditionalInfo(prev => ({...prev, monthlyIncome: e.target.value}))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="educationLevel" className="text-sm font-medium text-gray-700">
                        Education Level
                      </Label>
                      <select
                        id="educationLevel"
                        value={additionalInfo.educationLevel}
                        onChange={(e) => setAdditionalInfo(prev => ({...prev, educationLevel: e.target.value}))}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Education Level</option>
                        <option value="primary">Primary (Class 1-5)</option>
                        <option value="secondary">Secondary (Class 6-10)</option>
                        <option value="higher-secondary">Higher Secondary (Class 11-12)</option>
                        <option value="graduate">Graduate</option>
                        <option value="post-graduate">Post Graduate</option>
                        <option value="illiterate">Illiterate</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="employmentStatus" className="text-sm font-medium text-gray-700">
                        Employment Status
                      </Label>
                      <select
                        id="employmentStatus"
                        value={additionalInfo.employmentStatus}
                        onChange={(e) => setAdditionalInfo(prev => ({...prev, employmentStatus: e.target.value}))}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Employment Status</option>
                        <option value="employed">Employed</option>
                        <option value="unemployed">Unemployed</option>
                        <option value="self-employed">Self Employed</option>
                        <option value="student">Student</option>
                        <option value="retired">Retired</option>
                        <option value="homemaker">Homemaker</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="specialCircumstances" className="text-sm font-medium text-gray-700">
                      Special Circumstances (Optional)
                    </Label>
                    <Textarea
                      id="specialCircumstances"
                      placeholder="Any special circumstances that might affect eligibility..."
                      value={additionalInfo.specialCircumstances}
                      onChange={(e) => setAdditionalInfo(prev => ({...prev, specialCircumstances: e.target.value}))}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 text-center">
                <Button 
                  onClick={handleEligibilityAssessment}
                  disabled={!selectedProgram || isAssessing}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-3"
                >
                  {isAssessing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      AI is analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Check Eligibility with AI
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: AI Assessment Results */}
        {step === 3 && assessment && selectedProgram && (
          <div className="space-y-6">
            {/* Assessment Result */}
            <div className={`rounded-2xl p-8 border-2 ${
              assessment.eligible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {getStatusIcon(assessment.eligible, assessment.confidence)}
                </div>
                <h2 className={`text-3xl font-bold mb-2 ${
                  assessment.eligible ? 'text-green-800' : 'text-red-800'
                }`}>
                  {assessment.eligible ? 'Eligible!' : 'Not Eligible'}
                </h2>
                <p className={`text-lg ${
                  assessment.eligible ? 'text-green-600' : 'text-red-600'
                }`}>
                  Confidence: {Math.round(assessment.confidence * 100)}%
                </p>
                <div className="mt-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    assessment.eligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedProgram.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                AI Analysis Results
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reasons */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Eligibility Reasons
                  </h4>
                  <ul className="space-y-2">
                    {assessment.reasons.map((reason, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    AI Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {assessment.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Required Documents */}
              <div className="mt-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  Required Documents
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {assessment.requiredDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {doc}
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="mt-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  Next Steps
                </h4>
                <ol className="space-y-2">
                  {assessment.nextSteps.map((step, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Program Suggestions */}
              {assessment.programSuggestions.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Alternative Program Suggestions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {assessment.programSuggestions.map((program, index) => (
                      <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button 
                  onClick={() => setShowReport(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Detailed Report
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setStep(1);
                    setNidNumber('');
                    setNidData(null);
                    setSelectedProgram(null);
                    setAssessment(null);
                    setAdditionalInfo({
                      familySize: '',
                      monthlyIncome: '',
                      educationLevel: '',
                      employmentStatus: '',
                      specialCircumstances: ''
                    });
                  }}
                >
                  Check Another Program
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Report Modal */}
        {showReport && assessment && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
                <h3 className="text-xl font-bold">AI Eligibility Report</h3>
                <p className="text-purple-100">Comprehensive analysis and recommendations</p>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  <h4>Executive Summary</h4>
                  <p>Based on the provided information and AI analysis, you are {assessment.eligible ? 'eligible' : 'not eligible'} for the {selectedProgram?.name} program with {Math.round(assessment.confidence * 100)}% confidence.</p>
                  
                  <h4>Detailed Analysis</h4>
                  <ul>
                    {assessment.reasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                  
                  <h4>Recommendations</h4>
                  <ul>
                    {assessment.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                  
                  <h4>Required Documents</h4>
                  <ul>
                    {assessment.requiredDocuments.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                  
                  <h4>Next Steps</h4>
                  <ol>
                    {assessment.nextSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowReport(false)}>
                  Close
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

