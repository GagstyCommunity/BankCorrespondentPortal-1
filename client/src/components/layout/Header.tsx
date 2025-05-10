import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useWarMode } from "@/context/WarModeContext";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  title?: string;
  navItems?: Array<{
    href: string;
    label: string;
    isActive?: boolean;
    isAlert?: boolean;
  }>;
  notifications?: number;
}

const Header = ({ title, navItems = [], notifications = 0 }: HeaderProps) => {
  const [location, navigate] = useLocation();
  const { warMode, toggleWarMode } = useWarMode();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userInitial, setUserInitial] = useState('U');
  
  useEffect(() => {
    if (user?.fullName) {
      setUserInitial(user.fullName.charAt(0).toUpperCase());
    }
  }, [user]);

  const getRoleLabel = () => {
    const roleMap: Record<string, string> = {
      'admin': 'Full Access',
      'csp': 'Active',
      'fi': 'Active',
      'auditor': 'Field Verified',
      'bank': 'Branch Manager',
      'customer': ''
    };
    
    return user?.role ? roleMap[user.role] : '';
  };
  
  const getRoleBgColor = () => {
    const colorMap: Record<string, string> = {
      'admin': 'bg-primary',
      'csp': 'bg-accent',
      'fi': 'bg-accent',
      'auditor': 'bg-primary',
      'bank': 'bg-primary-dark',
      'customer': ''
    };
    
    return user?.role ? colorMap[user.role] : 'bg-primary';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <span className="text-xl font-bold text-primary">{title || "Dashboard"}</span>
          {getRoleLabel() && (
            <span className={`ml-4 px-3 py-1 ${getRoleBgColor()} text-white text-xs rounded-full`}>
              {getRoleLabel()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-full bg-neutral-light text-primary hover:bg-neutral">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-warning rounded-full text-white text-xs flex items-center justify-center">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </Button>
          </div>
          
          {user?.role === 'admin' && (
            <div className="war-mode-toggle flex items-center">
              <span className="text-sm font-medium mr-2">War Mode</span>
              <Switch 
                checked={warMode} 
                onCheckedChange={toggleWarMode}
                className={warMode ? 'bg-alert' : ''}
              />
            </div>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer">
                <Avatar className={`h-8 w-8 ${getRoleBgColor()} text-white`}>
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
                <div className="ml-2 hidden md:block">
                  <div className="text-sm font-semibold">{user?.fullName || 'User'}</div>
                  {user?.role !== 'customer' && (
                    <div className="text-xs text-gray-500">{user?.role?.toUpperCase()}</div>
                  )}
                </div>
                <ChevronDown className="h-4 w-4 ml-1 text-gray-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {navItems.length > 0 && (
        <nav className={`${mobileMenuOpen ? 'block' : 'hidden md:flex'} overflow-x-auto p-2`}>
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href}
              className={`px-4 py-2 ${
                item.isActive 
                  ? 'text-primary border-b-2 border-primary font-medium' 
                  : item.isAlert
                    ? 'text-alert font-medium'
                    : 'text-gray-600 hover:text-primary'
              } whitespace-nowrap`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Header;
