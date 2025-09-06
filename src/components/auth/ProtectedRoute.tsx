"use client";

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Loader2, Shield, AlertCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredPermissions?: {
    canAccessCitizen?: boolean;
    canAccessLeader?: boolean;
    canAccessDonor?: boolean;
    canAccessBeneficiary?: boolean;
    canAccessSupport?: boolean;
    canAccessMap?: boolean;
    canAccessAdmin?: boolean;
  };
  fallbackPath?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  requiredPermissions,
  fallbackPath = '/auth'
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading, getRolePermissions } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user) {
        router.push(fallbackPath);
        return;
      }

      // Check role-based access
      if (requiredRole && user.role !== requiredRole) {
        router.push(fallbackPath);
        return;
      }

      // Check permission-based access
      if (requiredPermissions) {
        const userPermissions = getRolePermissions(user.role);
        const hasRequiredPermissions = Object.entries(requiredPermissions).every(
          ([permission, required]) => {
            if (required === undefined) return true;
            return userPermissions[permission as keyof typeof userPermissions] === required;
          }
        );

        if (!hasRequiredPermissions) {
          router.push(fallbackPath);
          return;
        }
      }
    }
  }, [isAuthenticated, user, isLoading, requiredRole, requiredPermissions, fallbackPath, router, getRolePermissions]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to access this page.</p>
          <button
            onClick={() => router.push('/auth')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You don&apos;t have the required role to access this page.
          </p>
          <button
            onClick={() => router.push('/auth')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (requiredPermissions) {
    const userPermissions = getRolePermissions(user.role);
    const hasRequiredPermissions = Object.entries(requiredPermissions).every(
      ([permission, required]) => {
        if (required === undefined) return true;
        return userPermissions[permission as keyof typeof userPermissions] === required;
      }
    );

    if (!hasRequiredPermissions) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <Shield className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">
              You don&apos;t have the required permissions to access this page.
            </p>
            <button
              onClick={() => router.push('/auth')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Go to Login
            </button>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
