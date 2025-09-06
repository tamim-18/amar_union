"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { 
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Shield,
  Globe,
  Heart,
  Users,
  Crown,
  Building,
  UserCheck,
  Phone,
  MapPin,
  IdCard
} from "lucide-react";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess: () => void;
}

export default function RegisterForm({ onSwitchToLogin, onRegisterSuccess }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    nameBn: '',
    email: '',
    nid: '',
    role: 'nagorik' as string,
    division: 'Dhaka',
    district: '',
    upazila: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();

  const roles = [
    { id: 'nagorik', name: 'নাগরিক', nameEn: 'General Citizen', icon: Users, color: 'text-blue-600' },
    { id: 'sthaniyo_jonoprotinidhi', name: 'স্থানীয় জনপ্রতিনিধি', nameEn: 'Local Representative', icon: Crown, color: 'text-amber-600' },
    { id: 'upazila_chairman', name: 'উপজেলা চেয়ারম্যান', nameEn: 'Upazila Chairman', icon: Building, color: 'text-orange-600' },
    { id: 'mayor', name: 'মেয়র', nameEn: 'Mayor', icon: Crown, color: 'text-purple-600' },
    { id: 'minister', name: 'মন্ত্রী', nameEn: 'Minister', icon: Shield, color: 'text-red-600' },
    { id: 'donor', name: 'দাতা', nameEn: 'Donor', icon: Heart, color: 'text-pink-600' },
    { id: 'beneficiary', name: 'সুবিধাভোগী', nameEn: 'Beneficiary', icon: UserCheck, color: 'text-emerald-600' },
    { id: 'admin', name: 'প্রশাসক', nameEn: 'Admin', icon: Shield, color: 'text-gray-600' }
  ];

  const divisions = [
    'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.nid || !formData.password) {
        setError('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }

      if (formData.nid.length !== 13) {
        setError('NID must be 13 digits');
        setIsLoading(false);
        return;
      }

      // Use the actual register function from AuthContext
      const success = await register({
        name: formData.name,
        nameBn: formData.nameBn,
        email: formData.email,
        nid: formData.nid,
        role: formData.role as any,
        division: formData.division,
        district: formData.district,
        upazila: formData.upazila,
        phone: formData.phone,
        password: formData.password
      });

      if (success) {
        setSuccess('Registration successful! Redirecting...');
        setTimeout(() => {
          onRegisterSuccess();
        }, 1000);
      } else {
        setError('Registration failed. Email or NID already exists.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role?.icon || User;
  };

  const getRoleColor = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role?.color || 'text-gray-600';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 bengali-text">নিবন্ধন করুন</h2>
          <p className="text-gray-600">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700">{success}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 bengali-text">ব্যক্তিগত তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name (English) *
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="nameBn" className="text-sm font-medium text-gray-700">
                  Full Name (Bengali)
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="nameBn"
                    type="text"
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    value={formData.nameBn}
                    onChange={(e) => handleInputChange('nameBn', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+8801234567890"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="nid" className="text-sm font-medium text-gray-700">
                NID Number (13 digits) *
              </Label>
              <div className="relative mt-1">
                <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="nid"
                  type="text"
                  placeholder="1234567890123"
                  value={formData.nid}
                  onChange={(e) => handleInputChange('nid', e.target.value)}
                  className="pl-10"
                  maxLength={13}
                  required
                />
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 bengali-text">ভূমিকা নির্বাচন</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {roles.map((role) => {
                const RoleIcon = role.icon;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleInputChange('role', role.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === role.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <RoleIcon className={`h-6 w-6 mx-auto mb-2 ${role.color}`} />
                      <div className="text-xs font-medium text-gray-900">{role.name}</div>
                      <div className="text-xs text-gray-600">{role.nameEn}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 bengali-text">ঠিকানা তথ্য</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="division" className="text-sm font-medium text-gray-700">
                  Division *
                </Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <select
                    id="division"
                    value={formData.division}
                    onChange={(e) => handleInputChange('division', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {divisions.map(division => (
                      <option key={division} value={division}>{division}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="district" className="text-sm font-medium text-gray-700">
                  District
                </Label>
                <Input
                  id="district"
                  type="text"
                  placeholder="Enter district"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="upazila" className="text-sm font-medium text-gray-700">
                  Upazila
                </Label>
                <Input
                  id="upazila"
                  type="text"
                  placeholder="Enter upazila"
                  value={formData.upazila}
                  onChange={(e) => handleInputChange('upazila', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 bengali-text">পাসওয়ার্ড</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password *
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password *
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
              I agree to the{' '}
              <button type="button" className="text-blue-600 hover:text-blue-700">
                Terms and Conditions
              </button>{' '}
              and{' '}
              <button type="button" className="text-blue-600 hover:text-blue-700">
                Privacy Policy
              </button>
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <ArrowRight className="h-4 w-4 mr-2" />
                Create Account
              </>
            )}
          </Button>
        </form>

        {/* Switch to Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
