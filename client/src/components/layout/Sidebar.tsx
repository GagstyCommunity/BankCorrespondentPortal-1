import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  HomeIcon, 
  Users, 
  FileSearch, 
  ShieldAlert, 
  BellRing, 
  Settings, 
  User,
  AlertTriangle,
  CreditCard,
  BarChart3,
  MapPin,
  Activity,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
  isAlert?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ 
  icon, 
  label, 
  href, 
  isActive = false, 
  isAlert = false,
  onClick
}: SidebarItemProps) => {
  return (
    <Link href={href}>
      <a
        className={cn(
          "flex items-center py-3 px-4 text-sm font-medium rounded-md mb-1",
          isActive 
            ? "bg-primary text-white" 
            : isAlert
              ? "text-alert hover:bg-neutral-light"
              : "text-gray-600 hover:bg-neutral-light",
          onClick && "cursor-pointer"
        )}
        onClick={onClick}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </a>
    </Link>
  );
};

interface SidebarProps {
  role: string;
}

const Sidebar = ({ role }: SidebarProps) => {
  const [location] = useLocation();
  const { logout } = useAuth();
  
  const getNavItems = () => {
    switch (role) {
      case 'admin':
        return [
          { icon: <HomeIcon size={18} />, label: "Dashboard", href: "/admin" },
          { icon: <Users size={18} />, label: "CSP Management", href: "/admin/csps" },
          { icon: <FileSearch size={18} />, label: "Audit Assignment", href: "/admin/audits" },
          { icon: <ShieldAlert size={18} />, label: "Fraud Engine", href: "/admin/fraud" },
          { icon: <Activity size={18} />, label: "Audit Logs", href: "/admin/logs" },
          { icon: <BellRing size={18} />, label: "Notification Hub", href: "/admin/notifications" },
          { icon: <Settings size={18} />, label: "System Settings", href: "/admin/settings" },
          { icon: <AlertTriangle size={18} />, label: "War Mode Control", href: "/admin/war-mode", isAlert: true }
        ];
      case 'csp':
        return [
          { icon: <HomeIcon size={18} />, label: "Dashboard", href: "/csp" },
          { icon: <CreditCard size={18} />, label: "Transactions", href: "/csp/transactions" },
          { icon: <User size={18} />, label: "Facial Check-In", href: "/csp/check-in" },
          { icon: <Activity size={18} />, label: "Device Status", href: "/csp/device" },
          { icon: <BellRing size={18} />, label: "Dispute Center", href: "/csp/disputes" },
          { icon: <BarChart3 size={18} />, label: "Reports", href: "/csp/reports" },
          { icon: <Users size={18} />, label: "Army Family Panel", href: "/csp/army" }
        ];
      case 'fi':
        return [
          { icon: <HomeIcon size={18} />, label: "Dashboard", href: "/fi" },
          { icon: <FileSearch size={18} />, label: "Application Collection", href: "/fi/applications" },
          { icon: <CreditCard size={18} />, label: "Credit Forms", href: "/fi/credit" },
          { icon: <User size={18} />, label: "KYC Verification", href: "/fi/kyc" },
          { icon: <BarChart3 size={18} />, label: "Reports", href: "/fi/reports" },
          { icon: <Activity size={18} />, label: "Check-In", href: "/fi/check-in" }
        ];
      case 'auditor':
        return [
          { icon: <HomeIcon size={18} />, label: "Tasks", href: "/auditor" },
          { icon: <FileSearch size={18} />, label: "Audit Form", href: "/auditor/form" },
          { icon: <MapPin size={18} />, label: "Visit Logs", href: "/auditor/logs" },
          { icon: <ShieldAlert size={18} />, label: "Red Zone Protocol", href: "/auditor/red-zone" },
          { icon: <AlertTriangle size={18} />, label: "Priority Audits", href: "/auditor/priority", isAlert: true }
        ];
      case 'bank':
        return [
          { icon: <HomeIcon size={18} />, label: "Overview", href: "/bank" },
          { icon: <Users size={18} />, label: "CSP Registry", href: "/bank/csps" },
          { icon: <ShieldAlert size={18} />, label: "Fraud Dashboard", href: "/bank/fraud" },
          { icon: <FileSearch size={18} />, label: "Document Access", href: "/bank/documents" },
          { icon: <Activity size={18} />, label: "Decision Panel", href: "/bank/decisions" },
          { icon: <BarChart3 size={18} />, label: "Reports", href: "/bank/reports" },
          { icon: <Users size={18} />, label: "Military Coordination", href: "/bank/military" }
        ];
      case 'customer':
        return [
          { icon: <HomeIcon size={18} />, label: "Services", href: "/customer" },
          { icon: <FileSearch size={18} />, label: "Track Complaint", href: "/customer/track" },
          { icon: <BellRing size={18} />, label: "Notifications", href: "/customer/notifications" }
        ];
      default:
        return [];
    }
  };
  
  const navItems = getNavItems();
  
  return (
    <div className="w-64 bg-white shadow-md p-4 h-screen overflow-y-auto fixed">
      <div className="flex items-center mb-8 px-4 py-2">
        <div className="text-primary font-bold text-2xl">Fia Global</div>
        <div className="ml-2 text-accent text-sm font-semibold">CSP Portal</div>
      </div>
      
      <div className="space-y-1">
        {navItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={location === item.href}
            isAlert={item.isAlert}
          />
        ))}
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 px-4">
        <div className="mb-4 p-4 bg-neutral-light rounded-lg">
          <div className="flex items-center mb-2">
            <ShieldAlert className="h-5 w-5 text-primary mr-2" />
            <div className="text-sm font-medium">Security Check</div>
          </div>
          <div className="text-xs text-gray-600">Last login: Today at 8:30 AM</div>
        </div>
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center" 
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Log Out</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
