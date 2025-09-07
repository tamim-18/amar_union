"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  nameBn: string;
  email: string;
  nid: string;
  role: UserRole;
  avatar?: string;
  division: string;
  district: string;
  upazila: string;
  phone: string;
  isVerified: boolean;
  lastLogin: string;
  createdAt: string;
}

export type UserRole = 
  | 'nagorik'           // নাগরিক - General Citizen
  | 'sthaniyo_jonoprotinidhi'  // স্থানীয় জনপ্রতিনিধি - Local Representative
  | 'upazila_chairman'  // উপজেলা চেয়ারম্যান - Upazila Chairman
  | 'mayor'             // মেয়র - Mayor
  | 'minister'          // মন্ত্রী - Minister
  | 'donor'             // দাতা - Donor
  | 'beneficiary'       // সুবিধাভোগী - Beneficiary
  | 'admin'             // প্রশাসক - Admin
  | 'support_staff';    // সহায়তা কর্মী - Support Staff

export interface RolePermissions {
  canAccessCitizen: boolean;
  canAccessLeader: boolean;
  canAccessDonor: boolean;
  canAccessBeneficiary: boolean;
  canAccessSupport: boolean;
  canAccessMap: boolean;
  canAccessAdmin: boolean;
  canReportIssues: boolean;
  canManageIssues: boolean;
  canViewAnalytics: boolean;
  canManageUsers: boolean;
  canViewTransparency: boolean;
  canCheckEligibility: boolean;
  canTrackBenefits: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  getRolePermissions: (role: UserRole) => RolePermissions;
  switchRole: (role: UserRole) => void;
}

interface RegisterData {
  name: string;
  nameBn: string;
  email: string;
  nid: string;
  role: UserRole;
  division: string;
  district: string;
  upazila: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Role-based permissions configuration
const getRolePermissions = (role: UserRole): RolePermissions => {
  switch (role) {
    case 'nagorik':
      return {
        canAccessCitizen: true,
        canAccessLeader: false,
        canAccessDonor: false,
        canAccessBeneficiary: false,
        canAccessSupport: true,
        canAccessMap: false,
        canAccessAdmin: false,
        canReportIssues: true,
        canManageIssues: false,
        canViewAnalytics: false,
        canManageUsers: false,
        canViewTransparency: true,
        canCheckEligibility: true,
        canTrackBenefits: true,
      };
    
    case 'sthaniyo_jonoprotinidhi':
      return {
        canAccessCitizen: false,
        canAccessLeader: true,
        canAccessDonor: false,
        canAccessBeneficiary: false,
        canAccessSupport: true,
        canAccessMap: true,
        canAccessAdmin: false,
        canReportIssues: true,
        canManageIssues: true,
        canViewAnalytics: true,
        canManageUsers: false,
        canViewTransparency: true,
        canCheckEligibility: true,
        canTrackBenefits: true,
      };
    
    case 'upazila_chairman':
      return {
        canAccessCitizen: false,
        canAccessLeader: true,
        canAccessDonor: false,
        canAccessBeneficiary: false,
        canAccessSupport: true,
        canAccessMap: true,
        canAccessAdmin: false,
        canReportIssues: true,
        canManageIssues: true,
        canViewAnalytics: true,
        canManageUsers: false,
        canViewTransparency: true,
        canCheckEligibility: true,
        canTrackBenefits: true,
      };
    
    case 'mayor':
      return {
        canAccessCitizen: false,
        canAccessLeader: true,
        canAccessDonor: false,
        canAccessBeneficiary: false,
        canAccessSupport: true,
        canAccessMap: true,
        canAccessAdmin: false,
        canReportIssues: true,
        canManageIssues: true,
        canViewAnalytics: true,
        canManageUsers: false,
        canViewTransparency: true,
        canCheckEligibility: true,
        canTrackBenefits: true,
      };
    
    case 'minister':
      return {
        canAccessCitizen: true,
        canAccessLeader: true,
        canAccessDonor: true,
        canAccessBeneficiary: true,
        canAccessSupport: true,
        canAccessMap: true,
        canAccessAdmin: true,
        canReportIssues: true,
        canManageIssues: true,
        canViewAnalytics: true,
        canManageUsers: true,
        canViewTransparency: true,
        canCheckEligibility: true,
        canTrackBenefits: true,
      };
    
    case 'donor':
      return {
        canAccessCitizen: false,
        canAccessLeader: false,
        canAccessDonor: true,
        canAccessBeneficiary: false,
        canAccessSupport: true,
        canAccessMap: false,
        canAccessAdmin: false,
        canReportIssues: false,
        canManageIssues: false,
        canViewAnalytics: true,
        canManageUsers: false,
        canViewTransparency: true,
        canCheckEligibility: false,
        canTrackBenefits: false,
      };
    
    case 'beneficiary':
      return {
        canAccessCitizen: false,
        canAccessLeader: false,
        canAccessDonor: false,
        canAccessBeneficiary: true,
        canAccessSupport: true,
        canAccessMap: false,
        canAccessAdmin: false,
        canReportIssues: false,
        canManageIssues: false,
        canViewAnalytics: false,
        canManageUsers: false,
        canViewTransparency: false,
        canCheckEligibility: true,
        canTrackBenefits: true,
      };
    
    case 'admin':
      return {
        canAccessCitizen: true,
        canAccessLeader: true,
        canAccessDonor: true,
        canAccessBeneficiary: true,
        canAccessSupport: true,
        canAccessMap: true,
        canAccessAdmin: true,
        canReportIssues: true,
        canManageIssues: true,
        canViewAnalytics: true,
        canManageUsers: true,
        canViewTransparency: true,
        canCheckEligibility: true,
        canTrackBenefits: true,
      };
    
    case 'support_staff':
      return {
        canAccessCitizen: false,
        canAccessLeader: false,
        canAccessDonor: false,
        canAccessBeneficiary: false,
        canAccessSupport: true,
        canAccessMap: false,
        canAccessAdmin: false,
        canReportIssues: false,
        canManageIssues: false,
        canViewAnalytics: false,
        canManageUsers: false,
        canViewTransparency: false,
        canCheckEligibility: false,
        canTrackBenefits: false,
      };
    
    default:
      return {
        canAccessCitizen: false,
        canAccessLeader: false,
        canAccessDonor: false,
        canAccessBeneficiary: false,
        canAccessSupport: false,
        canAccessMap: false,
        canAccessAdmin: false,
        canReportIssues: false,
        canManageIssues: false,
        canViewAnalytics: false,
        canManageUsers: false,
        canViewTransparency: false,
        canCheckEligibility: false,
        canTrackBenefits: false,
      };
  }
};

// Fake user database
const fakeUsers: User[] = [
  {
    id: '1',
    name: 'Rahima Khatun',
    nameBn: 'রহিমা খাতুন',
    email: 'nagorik@example.com',
    nid: '1234567890123',
    role: 'nagorik',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    phone: '+8801234567890',
    isVerified: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Abdul Hamid',
    nameBn: 'আব্দুল হামিদ',
    email: 'leader@example.com',
    nid: '1234567890124',
    role: 'sthaniyo_jonoprotinidhi',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    phone: '+8801234567891',
    isVerified: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Fatema Begum',
    nameBn: 'ফাতেমা বেগম',
    email: 'donor@example.com',
    nid: '1234567890125',
    role: 'donor',
    division: 'Chittagong',
    district: 'Chittagong',
    upazila: 'Chandgaon',
    phone: '+8801234567892',
    isVerified: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Karim Uddin',
    nameBn: 'করিম উদ্দিন',
    email: 'beneficiary@example.com',
    nid: '1234567890126',
    role: 'beneficiary',
    division: 'Sylhet',
    district: 'Sylhet',
    upazila: 'Sylhet Sadar',
    phone: '+8801234567893',
    isVerified: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Dr. Ahmed Ali',
    nameBn: 'ড. আহমেদ আলী',
    email: 'admin@example.com',
    nid: '1234567890127',
    role: 'admin',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Ramna',
    phone: '+8801234567894',
    isVerified: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in fake database
    const foundUser = fakeUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password123') { // Simple password for demo
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date().toISOString()
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = fakeUsers.find(u => u.email === userData.email || u.nid === userData.nid);
    
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: (fakeUsers.length + 1).toString(),
      ...userData,
      isVerified: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    
    // Add to fake database
    fakeUsers.push(newUser);
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    getRolePermissions,
    switchRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
