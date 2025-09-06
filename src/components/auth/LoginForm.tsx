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
  UserCheck
} from "lucide-react";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onLoginSuccess: () => void;
}

export default function LoginForm({ onSwitchToRegister, onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simple validation
      if (!email || !password) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      // Use the actual login function from AuthContext
      const success = await login(email, password);
      
      if (success) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          onLoginSuccess();
        }, 1000);
      } else {
        setError('Invalid email or password. Use demo credentials.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (email: string) => {
    if (email.includes('nagorik')) return Users;
    if (email.includes('leader')) return Crown;
    if (email.includes('donor')) return Heart;
    if (email.includes('beneficiary')) return UserCheck;
    if (email.includes('admin')) return Shield;
    return User;
  };

  const getRoleColor = (email: string) => {
    if (email.includes('nagorik')) return 'text-blue-600';
    if (email.includes('leader')) return 'text-amber-600';
    if (email.includes('donor')) return 'text-purple-600';
    if (email.includes('beneficiary')) return 'text-emerald-600';
    if (email.includes('admin')) return 'text-red-600';
    return 'text-gray-600';
  };

  const getRoleName = (email: string) => {
    if (email.includes('nagorik')) return 'নাগরিক';
    if (email.includes('leader')) return 'স্থানীয় জনপ্রতিনিধি';
    if (email.includes('donor')) return 'দাতা';
    if (email.includes('beneficiary')) return 'সুবিধাভোগী';
    if (email.includes('admin')) return 'প্রশাসক';
    return 'ব্যবহারকারী';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 bengali-text">লগইন করুন</h2>
          <p className="text-gray-600">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3 text-blue-600" />
              <span>nagorik@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="h-3 w-3 text-amber-600" />
              <span>leader@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-3 w-3 text-purple-600" />
              <span>donor@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="h-3 w-3 text-emerald-600" />
              <span>beneficiary@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3 text-red-600" />
              <span>admin@example.com</span>
            </div>
            <div className="text-gray-600 mt-1">Password: password123</div>
          </div>
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            {email && (
              <div className="mt-2 flex items-center gap-2 text-xs">
                {(() => {
                  const RoleIcon = getRoleIcon(email);
                  return <RoleIcon className={`h-3 w-3 ${getRoleColor(email)}`} />;
                })()}
                <span className={getRoleColor(email)}>{getRoleName(email)}</span>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <ArrowRight className="h-4 w-4 mr-2" />
                Login
              </>
            )}
          </Button>
        </form>

        {/* Switch to Register */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Register here
            </button>
          </p>
        </div>

        {/* Quick Login Buttons */}
        <div className="mt-6 space-y-2">
          <p className="text-xs text-gray-500 text-center">Quick Login:</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEmail('nagorik@example.com');
                setPassword('password123');
              }}
              className="text-xs"
            >
              <Users className="h-3 w-3 mr-1" />
              নাগরিক
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEmail('leader@example.com');
                setPassword('password123');
              }}
              className="text-xs"
            >
              <Crown className="h-3 w-3 mr-1" />
              নেতা
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEmail('donor@example.com');
                setPassword('password123');
              }}
              className="text-xs"
            >
              <Heart className="h-3 w-3 mr-1" />
              দাতা
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEmail('beneficiary@example.com');
                setPassword('password123');
              }}
              className="text-xs"
            >
              <UserCheck className="h-3 w-3 mr-1" />
              সুবিধাভোগী
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
