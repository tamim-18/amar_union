"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { 
  ArrowLeft,
  Shield,
  Users,
  Crown,
  Heart,
  UserCheck,
  Building,
  Globe,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, isAuthenticated, login, register } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user's primary role
      switch (user.role) {
        case 'nagorik':
          router.push('/citizen');
          break;
        case 'sthaniyo_jonoprotinidhi':
        case 'upazila_chairman':
        case 'mayor':
        case 'admin':
          router.push('/leader');
          break;
        case 'donor':
          router.push('/donor');
          break;
        case 'beneficiary':
          router.push('/beneficiary');
          break;
        case 'support_staff':
          router.push('/support');
          break;
        default:
          router.push('/');
      }
    }
  }, [isAuthenticated, user, router]);

  const getRolePermissions = (role: string) => {
    switch (role) {
      case 'nagorik':
        return { canAccessCitizen: true, canAccessLeader: false, canAccessDonor: true, canAccessBeneficiary: true, canAccessSupport: true };
      case 'sthaniyo_jonoprotinidhi':
      case 'upazila_chairman':
      case 'mayor':
        return { canAccessCitizen: true, canAccessLeader: true, canAccessDonor: true, canAccessBeneficiary: true, canAccessSupport: true };
      case 'donor':
        return { canAccessCitizen: false, canAccessLeader: false, canAccessDonor: true, canAccessBeneficiary: false, canAccessSupport: true };
      case 'beneficiary':
        return { canAccessCitizen: false, canAccessLeader: false, canAccessDonor: false, canAccessBeneficiary: true, canAccessSupport: true };
      case 'admin':
        return { canAccessCitizen: true, canAccessLeader: true, canAccessDonor: true, canAccessBeneficiary: true, canAccessSupport: true };
      default:
        return { canAccessCitizen: false, canAccessLeader: false, canAccessDonor: false, canAccessBeneficiary: false, canAccessSupport: false };
    }
  };



  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'nagorik': return Users;
      case 'sthaniyo_jonoprotinidhi': return Crown;
      case 'upazila_chairman': return Building;
      case 'mayor': return Crown;
      case 'donor': return Heart;
      case 'beneficiary': return UserCheck;
      case 'admin': return Shield;
      default: return Users;
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'nagorik': return 'নাগরিক';
      case 'sthaniyo_jonoprotinidhi': return 'স্থানীয় জনপ্রতিনিধি';
      case 'upazila_chairman': return 'উপজেলা চেয়ারম্যান';
      case 'mayor': return 'মেয়র';
      case 'donor': return 'দাতা';
      case 'beneficiary': return 'সুবিধাভোগী';
      case 'admin': return 'প্রশাসক';
      default: return 'ব্যবহারকারী';
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600 mb-4">
            Logged in as {user.name} ({getRoleName(user.role)})
          </p>
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500 mr-2" />
            <span className="text-gray-600">Redirecting to your dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Shield className="h-6 w-6 text-cyan-400" />
                <span className="bengali-text">অ্যাকাউন্ট</span>
              </h1>
              <p className="text-blue-300">Login or Register to access your dashboard</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Role Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center bengali-text">
            ভূমিকা ভিত্তিক অ্যাক্সেস
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { role: 'nagorik', name: 'নাগরিক', nameEn: 'Citizen', icon: Users, access: 'Citizen, Donor, Beneficiary, Support' },
              { role: 'sthaniyo_jonoprotinidhi', name: 'স্থানীয় জনপ্রতিনিধি', nameEn: 'Local Rep', icon: Crown, access: 'All Portals' },
              { role: 'donor', name: 'দাতা', nameEn: 'Donor', icon: Heart, access: 'Donor, Support' },
              { role: 'beneficiary', name: 'সুবিধাভোগী', nameEn: 'Beneficiary', icon: UserCheck, access: 'Beneficiary, Support' }
            ].map((roleInfo, index) => {
              const RoleIcon = roleInfo.icon;
              return (
                <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                  <RoleIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 text-sm">{roleInfo.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{roleInfo.nameEn}</p>
                  <p className="text-xs text-gray-500">{roleInfo.access}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-green-700">{success}</span>
          </div>
        )}

        {/* Auth Forms */}
        <div className="flex justify-center">
          {isLogin ? (
            <LoginForm 
              onSwitchToRegister={() => setIsLogin(false)}
              onLoginSuccess={() => {
                setSuccess('Login successful! Redirecting...');
                // Redirect will be handled by useEffect
              }}
            />
          ) : (
            <RegisterForm 
              onSwitchToLogin={() => setIsLogin(true)}
              onRegisterSuccess={() => {
                setSuccess('Registration successful! Redirecting...');
                // Redirect will be handled by useEffect
              }}
            />
          )}
        </div>

        {/* Demo Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 bengali-text">
            ডেমো অ্যাকাউন্ট
          </h3>
          <p className="text-blue-800 text-sm mb-4">
            You can use these demo accounts to test different user roles:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium">নাগরিক:</span>
                <span>nagorik@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-600" />
                <span className="font-medium">নেতা:</span>
                <span>leader@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-purple-600" />
                <span className="font-medium">দাতা:</span>
                <span>donor@example.com</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">সুবিধাভোগী:</span>
                <span>beneficiary@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-600" />
                <span className="font-medium">প্রশাসক:</span>
                <span>admin@example.com</span>
              </div>
              <div className="text-gray-600">
                <span className="font-medium">Password:</span> password123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
