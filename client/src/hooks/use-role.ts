import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';

export type UserRole = 'admin' | 'csp' | 'fi' | 'auditor' | 'bank' | 'customer' | 'guest';

export function useRole(): { 
  role: UserRole; 
  checkAccess: (allowedRoles: UserRole[]) => boolean;
  redirectToLogin: () => void;
} {
  const { user, isAuthenticated } = useAuth();
  const [role, setRole] = useState<UserRole>('guest');
  const [, navigate] = useLocation();

  useEffect(() => {
    if (user && user.role) {
      setRole(user.role.toLowerCase() as UserRole);
    } else {
      setRole('guest');
    }
  }, [user]);

  const checkAccess = (allowedRoles: UserRole[]): boolean => {
    if (!isAuthenticated) return false;
    return allowedRoles.includes(role);
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return { role, checkAccess, redirectToLogin };
}

export default useRole;
