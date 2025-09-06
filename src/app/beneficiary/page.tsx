"use client";

import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { 
  Shield,
  CheckCircle2,
  Calendar,
  QrCode,
  Download,
  Settings,
  Award,
  CreditCard,
  Fingerprint,
  Globe,
  Heart,
  BookOpen,
  Leaf
} from "lucide-react";

export default function BeneficiaryPassport() {

  const beneficiaryData = {
    nid: '1234567890123',
    name: 'রশিদা খাতুন',
    nameEn: 'Rashida Khatun',
    fatherName: 'আব্দুল করিম',
    motherName: 'ফাতেমা বেগম',
    dateOfBirth: '১৫/০৮/১৯৮৫',
    address: 'গুলশান ব্লক-এ, ঢাকা-১২১২',
    addressEn: 'Gulshan Block-A, Dhaka-1212',
    phone: '+880 1712-345678',
    email: 'rashida.khatun@email.com',
    bloodGroup: 'B+',
    religion: 'ইসলাম',
    nationality: 'বাংলাদেশী',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616c9ce2ede?w=200&h=250&fit=crop&crop=face',
    issueDate: '২০২৪',
    verificationLevel: 'Level 3 - Full Verification',
    digitalSignature: '0x8a9b7c6d5e4f3a2b1c9d8e7f6a5b4c3d2e1f',
    qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IndoaXRlIi8+PC9zdmc+'
  };

  const entitlements = [
    {
      program: 'Clean Water Access',
      programBn: 'পরিষ্কার পানি',
      status: 'Active',
      statusBn: 'চালু',
      amount: '৳২,৫০০/মাস',
      validUntil: '২০২৪-১২-৩১',
      beneficiaries: 5,
      color: 'bg-blue-500',
      icon: Leaf
    },
    {
      program: 'Healthcare Subsidy',
      programBn: 'চিকিৎসা সহায়তা',
      status: 'Active',
      statusBn: 'চালু',
      amount: '৳১,৮০০/মাস',
      validUntil: '২০২৪-১২-৩১',
      beneficiaries: 3,
      color: 'bg-red-500',
      icon: Heart
    },
    {
      program: 'Education Support',
      programBn: 'শিক্ষা সহায়তা',
      status: 'Pending',
      statusBn: 'অপেক্ষায়',
      amount: '৳৩,০০০/মাস',
      validUntil: '২০২৫-০৬-৩০',
      beneficiaries: 2,
      color: 'bg-purple-500',
      icon: BookOpen
    }
  ];

  const recentTransactions = [
    {
      date: '২০২৪-০১-২০',
      program: 'Clean Water Access',
      programBn: 'পরিষ্কার পানি',
      amount: '৳২,৫০০',
      status: 'Received',
      statusBn: 'পেয়েছেন',
      method: 'Bank Transfer',
      methodBn: 'ব্যাংক ট্রান্সফার'
    },
    {
      date: '২০২৪-০১-১৫',
      program: 'Healthcare Subsidy',
      programBn: 'চিকিৎসা সহায়তা',
      amount: '৳১,৮০০',
      status: 'Received',
      statusBn: 'পেয়েছেন',
      method: 'Mobile Banking',
      methodBn: 'মোবাইল ব্যাংকিং'
    },
    {
      date: '২০২৪-০১-১০',
      program: 'Clean Water Access',
      programBn: 'পরিষ্কার পানি',
      amount: '৳২,৫০০',
      status: 'Received',
      statusBn: 'পেয়েছেন',
      method: 'Bank Transfer',
      methodBn: 'ব্যাংক ট্রান্সফার'
    }
  ];

  return (
    <ProtectedRoute requiredPermissions={{ canAccessBeneficiary: true }}>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  <span className="bengali-text text-emerald-300">আপনার পরিচয়পত্র</span>
                </h1>
                <p className="text-slate-300 bengali-text">সরকারি সাহায্যের পরিচয়পত্র</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="bengali-text">যাচাইকৃত</span>
                  </span>
                  <span className="bengali-text">জাতীয় পরিচয়: {beneficiaryData.nid}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Download className="h-4 w-4 mr-2" />
                <span className="bengali-text">ডাউনলোড</span>
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 relative z-10">
        {/* Digital ID Card */}
        <div className="mb-8">
          <div className="max-w-4xl mx-auto">
            {/* ID Card Front */}
            <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              {/* Card Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 border border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/50 rounded-full"></div>
              </div>

              {/* Government Header */}
              <div className="relative z-10 text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Shield className="h-8 w-8 text-white" />
                  <div className="text-2xl font-bold bengali-text">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</div>
                </div>
                <div className="text-emerald-100 bengali-text">বাংলাদেশ সরকার</div>
                <div className="text-emerald-200 text-sm mt-1 bengali-text">সরকারি সাহায্যের পরিচয়পত্র</div>
              </div>

              {/* Main ID Content */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Photo Section */}
                <div className="text-center">
                  <div className="w-32 h-40 mx-auto mb-4 rounded-xl overflow-hidden border-4 border-white/50 shadow-xl">
                    <img 
                      src={beneficiaryData.photo} 
                      alt="Beneficiary Photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <Fingerprint className="h-6 w-6 mx-auto mb-1 text-emerald-200" />
                    <div className="text-xs text-emerald-100 bengali-text">আঙুলের ছাপ যাচাই</div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-3">
                  <div>
                    <div className="text-emerald-200 text-sm">নাম / Name:</div>
                    <div className="text-xl font-bold bengali-text">{beneficiaryData.name}</div>
                    <div className="text-emerald-100">{beneficiaryData.nameEn}</div>
                  </div>
                  <div>
                    <div className="text-emerald-200 text-sm">পিতার নাম / Father:</div>
                    <div className="bengali-text">{beneficiaryData.fatherName}</div>
                  </div>
                  <div>
                    <div className="text-emerald-200 text-sm">মাতার নাম / Mother:</div>
                    <div className="bengali-text">{beneficiaryData.motherName}</div>
                  </div>
                  <div>
                    <div className="text-emerald-200 text-sm">জন্ম তারিখ / Date of Birth:</div>
                    <div className="bengali-text">{beneficiaryData.dateOfBirth}</div>
                  </div>
                </div>

                {/* Address & Contact */}
                <div className="space-y-3">
                  <div>
                    <div className="text-emerald-200 text-sm">ঠিকানা / Address:</div>
                    <div className="bengali-text text-sm">{beneficiaryData.address}</div>
                    <div className="text-emerald-100 text-xs">{beneficiaryData.addressEn}</div>
                  </div>
                  <div>
                    <div className="text-emerald-200 text-sm">NID:</div>
                    <div className="font-mono text-lg font-bold">{beneficiaryData.nid}</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <QrCode className="h-8 w-8 mx-auto mb-2 text-white" />
                    <div className="text-xs text-emerald-100 text-center bengali-text">যাচাই করতে স্ক্যান করুন</div>
                  </div>
                </div>
              </div>

              {/* Verification Footer */}
              <div className="relative z-10 mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-200" />
                    <span className="text-emerald-100 bengali-text">সম্পূর্ণ যাচাইকৃত</span>
                  </div>
                  <div className="text-emerald-200 bengali-text">
                    জারি: {beneficiaryData.issueDate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Entitlements Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="h-6 w-6 text-emerald-500" />
            <span className="bengali-text">আপনার সুবিধা</span>
            <span className="text-gray-600">• Your Benefits</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {entitlements.map((entitlement, index) => (
              <div key={index} className="relative group">
                {/* Benefit Card */}
                <div className="bg-white rounded-2xl shadow-lg border-l-4 border-emerald-500 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1 bengali-text">{entitlement.programBn}</h3>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        entitlement.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        <span className="bengali-text">{entitlement.statusBn}</span>
                      </div>
                    </div>
                    <div className={`w-10 h-10 ${entitlement.color} rounded-xl flex items-center justify-center`}>
                      <entitlement.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm bengali-text">মাসিক টাকা:</span>
                      <span className="font-bold text-emerald-600 bengali-text">{entitlement.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm bengali-text">পরিবারের সদস্য:</span>
                      <span className="font-medium bengali-text">{entitlement.beneficiaries} জন</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm bengali-text">শেষ তারিখ:</span>
                      <span className="font-medium bengali-text">{entitlement.validUntil}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Button size="sm" className="w-full bg-emerald-500 hover:bg-emerald-600">
                      <span className="bengali-text">বিস্তারিত দেখুন</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-emerald-500" />
            <span className="bengali-text">সাম্প্রতিক লেনদেন</span>
            <span className="text-gray-600">• Recent Transactions</span>
          </h2>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-emerald-500 text-white p-4">
              <h3 className="font-bold">Payment History</h3>
              <p className="text-emerald-100 text-sm bengali-text">আপনার সাহায্যের টাকার রেকর্ড</p>
            </div>
            
            <div className="divide-y divide-gray-100">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="p-4 hover:bg-emerald-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 bengali-text">{transaction.programBn}</div>
                        <div className="text-sm text-gray-600">{transaction.method} • {transaction.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600 bengali-text">{transaction.amount}</div>
                      <div className="text-xs text-green-600">{transaction.status}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50 text-center space-y-2">
              <Button variant="outline" size="sm" asChild>
                <a href="/beneficiary/track">
                  <span className="bengali-text">সব লেনদেন দেখুন</span>
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/beneficiary/eligibility">
                  <span className="bengali-text">যোগ্যতা চেক করুন</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-10 w-10 text-white animate-pulse" />
              <div>
                <h3 className="text-2xl font-bold bengali-text">যাচাই সম্পূর্ণ</h3>
                <p className="text-green-100 bengali-text">আপনার পরিচয় সম্পূর্ণ যাচাইকৃত এবং নিরাপদ</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <Fingerprint className="h-8 w-8 mx-auto mb-2 text-green-200" />
                <div className="font-bold mb-1 bengali-text">আঙুলের ছাপ</div>
                <div className="text-green-100 text-sm">৯৯.৮% সঠিক</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <Globe className="h-8 w-8 mx-auto mb-2 text-green-200" />
                <div className="font-bold mb-1">NID Verified</div>
                <div className="text-green-100 text-sm bengali-text">সরকারি যাচাই</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-200" />
                <div className="font-bold mb-1">Blockchain Secured</div>
                <div className="text-green-100 text-sm bengali-text">নিরাপদ রেকর্ড</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
