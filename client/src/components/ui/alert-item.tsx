import { ReactNode } from "react";
import { InfoIcon, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertItemProps {
  title: string;
  description?: string;
  variant?: "info" | "warning" | "success" | "error";
  className?: string;
  onClick?: () => void;
}

const AlertItem = ({
  title,
  description,
  variant = "info",
  className,
  onClick
}: AlertItemProps) => {
  const getIcon = (): ReactNode => {
    switch (variant) {
      case "info":
        return <InfoIcon className="h-4 w-4 text-white" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-white" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-white" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-white" />;
    }
  };
  
  const getIconBackground = (): string => {
    switch (variant) {
      case "info":
        return "bg-primary";
      case "warning":
        return "bg-warning";
      case "success":
        return "bg-accent";
      case "error":
        return "bg-alert";
    }
  };
  
  return (
    <div 
      className={cn(
        "p-3 bg-neutral-light rounded-lg cursor-pointer hover:bg-neutral transition-colors", 
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`p-1 ${getIconBackground()} rounded-full text-white mr-2`}>
          {getIcon()}
        </div>
        <div>
          <div className="text-sm font-medium">{title}</div>
          {description && (
            <div className="text-xs text-gray-500">{description}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertItem;
