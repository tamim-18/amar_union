"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Receipt,
  QrCode,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Share,
  Calendar,
  DollarSign,
  MapPin,
  Phone,
  Building,
  CreditCard,
  Smartphone,
  Eye,
  RefreshCw
} from "lucide-react";

interface BenefitTransaction {
  id: string;
  date: string;
  time: string;
  program: string;
  amount: string;
  status: 'received' | 'processing' | 'pending' | 'failed';
  method: string;
  reference: string;
  location: string;
  qrCode: string;
  nextPayment?: string;
}

export default function BenefitTracker() {
  const [selectedTransaction, setSelectedTransaction] = useState<BenefitTransaction | null>(null);

  const transactions: BenefitTransaction[] = [
    {
      id: 'BT001',
      date: '২০২৪-০১-২০',
      time: '২:৩০ PM',
      program: 'Clean Water Access Program',
      amount: '৳২,৫০০',
      status: 'received',
      method: 'Bank Transfer',
      reference: 'TXN789456123',
      location: 'Gulshan Distribution Center',
      qrCode: 'QR_BT001_VERIFIED',
      nextPayment: '২০২৪-০২-২০'
    },
    {
      id: 'BT002',
      date: '২০২৪-০১-১৫',
      time: '১১:১৫ AM',
      program: 'Healthcare Subsidy',
      amount: '৳১,৮০০',
      status: 'received',
      method: 'Mobile Banking',
      reference: 'bKash-987654321',
      location: 'Mobile Payment',
      qrCode: 'QR_BT002_VERIFIED',
      nextPayment: '২০২৪-০২-১৫'
    },
    {
      id: 'BT003',
      date: '২০২৪-০১-১০',
      time: '৯:৪৫ AM',
      program: 'Clean Water Access Program',
      amount: '৳২,৫০০',
      status: 'received',
      method: 'Bank Transfer',
      reference: 'TXN456789012',
      location: 'Gulshan Distribution Center',
      qrCode: 'QR_BT003_VERIFIED'
    },
    {
      id: 'BT004',
      date: '২০২৪-০১-২২',
      time: 'Processing...',
      program: 'Education Support',
      amount: '৳৩,০০০',
      status: 'processing',
      method: 'Bank Transfer',
      reference: 'PENDING-ED-001',
      location: 'Verification in Progress',
      qrCode: 'QR_PENDING',
      nextPayment: '২০২৪-০২-০১'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'processing': return <Clock className="h-5 w-5 text-amber-500 animate-pulse" />;
      case 'pending': return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'failed': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received': return 'text-green-600 bg-green-50 border-green-200';
      case 'processing': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'pending': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
              <a href="/beneficiary">
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Receipt className="h-6 w-6 text-emerald-400" />
                <span className="bengali-text">সুবিধা ট্র্যাকার</span>
              </h1>
              <p className="text-slate-300">Benefit Tracker • Payment History & Status</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-4 relative z-10 max-w-2xl">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">৳৬,৮০০</div>
            <div className="text-sm text-gray-500">This Month</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">৩</div>
            <div className="text-sm text-gray-500">Programs</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">৫</div>
            <div className="text-sm text-gray-500">Family Members</div>
          </div>
        </div>

        {/* Receipt Timeline */}
        <div className="space-y-6">
          {transactions.map((transaction, index) => (
            <div 
              key={transaction.id}
              className="relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Receipt Design */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Receipt Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        {getStatusIcon(transaction.status)}
                      </div>
                      <div>
                        <div className="font-bold">{transaction.program}</div>
                        <div className="text-emerald-100 text-sm">Payment Receipt</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold bengali-text">{transaction.amount}</div>
                      <div className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(transaction.status)}`}>
                        {transaction.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Receipt Body */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <div className="text-gray-500 mb-1">Date & Time:</div>
                      <div className="font-medium bengali-text">{transaction.date}</div>
                      <div className="font-medium bengali-text">{transaction.time}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Transaction ID:</div>
                      <div className="font-mono text-emerald-600">{transaction.id}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Payment Method:</div>
                      <div className="flex items-center gap-1">
                        {transaction.method === 'Bank Transfer' ? 
                          <Building className="h-4 w-4 text-blue-500" /> : 
                          <Smartphone className="h-4 w-4 text-green-500" />
                        }
                        <span className="font-medium">{transaction.method}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Reference:</div>
                      <div className="font-mono text-gray-700">{transaction.reference}</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{transaction.location}</span>
                  </div>

                  {/* Next Payment Info */}
                  {transaction.nextPayment && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-emerald-600" />
                        <span className="text-emerald-700 font-medium">
                          Next Payment: <span className="bengali-text">{transaction.nextPayment}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* QR Code Section */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <QrCode className="h-8 w-8 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Verification QR</div>
                          <div className="text-sm text-gray-500">Scan for proof of payment</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedTransaction(transaction)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Processing Animation */}
                {transaction.status === 'processing' && (
                  <div className="bg-amber-50 border-t border-amber-200 p-4">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="h-5 w-5 text-amber-600 animate-spin" />
                      <div>
                        <div className="font-medium text-amber-700">Processing Payment</div>
                        <div className="text-sm text-amber-600">Expected completion: 2-3 business days</div>
                      </div>
                    </div>
                    <div className="mt-3 w-full bg-amber-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full w-[65%] animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline Connector */}
              {index < transactions.length - 1 && (
                <div className="flex justify-center py-4">
                  <div className="w-px h-8 bg-gradient-to-b from-emerald-300 to-emerald-500"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2 bengali-text">মোট প্রাপ্ত সুবিধা</h3>
          <p className="text-emerald-100 mb-4">Total Benefits Received</p>
          <div className="text-4xl font-bold mb-2">৳২০,৪০০</div>
          <div className="text-emerald-200 text-sm">Last 3 months • 3 active programs</div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 text-center">
              <Receipt className="h-12 w-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Payment Receipt</h3>
              <p className="text-emerald-100 text-sm">Official Transaction Record</p>
            </div>

            {/* Receipt Details */}
            <div className="p-6 space-y-4">
              <div className="text-center border-b border-gray-100 pb-4">
                <div className="text-3xl font-bold text-emerald-600 mb-1 bengali-text">
                  {selectedTransaction.amount}
                </div>
                <div className="text-gray-600">{selectedTransaction.program}</div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Transaction ID:</span>
                  <span className="font-mono">{selectedTransaction.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="bengali-text">{selectedTransaction.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Time:</span>
                  <span className="bengali-text">{selectedTransaction.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Method:</span>
                  <span>{selectedTransaction.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Reference:</span>
                  <span className="font-mono text-emerald-600">{selectedTransaction.reference}</span>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <QrCode className="h-16 w-16 text-gray-600" />
                </div>
                <div className="text-xs text-gray-500">Verification Code: {selectedTransaction.qrCode}</div>
              </div>

              {/* Next Payment */}
              {selectedTransaction.nextPayment && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-emerald-700 font-medium text-sm">Next Payment Expected</div>
                    <div className="text-emerald-600 font-bold bengali-text">{selectedTransaction.nextPayment}</div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedTransaction(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

