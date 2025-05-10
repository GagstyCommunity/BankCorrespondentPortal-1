import { ReactNode } from "react";
import Header from "./Header";
import WarModeHeader from "./WarModeHeader";
import { useWarMode } from "@/context/WarModeContext";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  navItems?: Array<{
    href: string;
    label: string;
    isActive?: boolean;
    isAlert?: boolean;
  }>;
  notifications?: number;
}

const PageContainer = ({ 
  children, 
  title,
  navItems,
  notifications
}: PageContainerProps) => {
  const { warMode } = useWarMode();
  
  return (
    <div className="min-h-screen bg-neutral-light pb-10">
      <div className="container mx-auto px-4 pt-6">
        {warMode && <WarModeHeader />}
        <Header 
          title={title} 
          navItems={navItems}
          notifications={notifications}
        />
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
