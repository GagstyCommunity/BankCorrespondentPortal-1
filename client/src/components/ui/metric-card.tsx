import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  variant?: "default" | "success" | "warning" | "alert" | "muted";
  size?: "sm" | "md" | "lg";
  className?: string;
  subText?: string;
}

const MetricCard = ({ 
  title, 
  value, 
  icon, 
  variant = "default", 
  size = "md",
  className = "",
  subText
}: MetricCardProps) => {
  const variantClassMap = {
    default: "text-primary",
    success: "text-success",
    warning: "text-warning",
    alert: "text-alert",
    muted: "text-gray-500"
  };
  
  const sizeClassMap = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };
  
  return (
    <div className={`bg-neutral-light rounded-lg p-3 ${className}`}>
      <div className="text-sm text-gray-500">{title}</div>
      <div className={`${sizeClassMap[size]} font-bold ${variantClassMap[variant]} flex items-center`}>
        {value}
        {icon && <span className="ml-2">{icon}</span>}
      </div>
      {subText && <div className="text-xs text-gray-500 mt-1">{subText}</div>}
    </div>
  );
};

export default MetricCard;
