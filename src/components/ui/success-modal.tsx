"use client";

import { CheckCircle2, X, Clock, Users, Bell } from "lucide-react";
import { Button } from "./button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  reportId?: string;
  estimatedTime?: string;
}

export function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
  actionText = "Continue",
  onAction,
  reportId,
  estimatedTime = "২-৩ দিন"
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            
            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2 bengali-heading">
              {title}
            </h3>

            {/* Message */}
            <p className="text-gray-600 bengali-text">
              {message}
            </p>
          </div>

          {/* Report Details */}
          {reportId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 bengali-text">রিপোর্ট আইডি:</span>
                <span className="font-mono text-gray-900">#{reportId}</span>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-3 mb-6">
            <h4 className="font-semibold text-gray-900 bengali-heading">পরবর্তী পদক্ষেপ:</h4>
            
            <div className="flex items-start gap-3 text-sm">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="h-3 w-3 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 bengali-text">সময়সীমা</p>
                <p className="text-gray-600 bengali-text">আনুমানিক {estimatedTime} এর মধ্যে সমাধান</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Users className="h-3 w-3 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 bengali-text">দলীয় পর্যালোচনা</p>
                <p className="text-gray-600 bengali-text">আমাদের বিশেষজ্ঞ দল রিপোর্ট পর্যালোচনা করবে</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bell className="h-3 w-3 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 bengali-text">নোটিফিকেশন</p>
                <p className="text-gray-600 bengali-text">আপডেট সম্পর্কে আপনাকে জানানো হবে</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              বন্ধ করুন
            </Button>
            <Button
              onClick={onAction || onClose}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {actionText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
