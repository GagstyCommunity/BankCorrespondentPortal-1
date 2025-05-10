import { Badge, BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: 'outline' | 'filled';
  size?: 'sm' | 'default';
  className?: string;
}

const StatusBadge = ({ 
  status, 
  variant = 'filled',
  size = 'default',
  className 
}: StatusBadgeProps) => {
  
  const getStatusVariant = (): BadgeProps["variant"] => {
    const statusMap: Record<string, BadgeProps["variant"]> = {
      'completed': 'success',
      'success': 'success',
      'active': 'success',
      'operational': 'success',
      'verified': 'success',
      
      'pending': 'warning',
      'processing': 'warning',
      'medium': 'warning',
      'degraded': 'warning',
      'minor issues': 'warning',
      'watch': 'warning',
      
      'high': 'destructive',
      'failed': 'destructive',
      'error': 'destructive',
      'alert': 'destructive',
      'critical': 'destructive',
      'suspended': 'destructive',
      'flagged': 'destructive',
      'blocked': 'destructive',
      
      'low': 'secondary',
      'inactive': 'secondary',
      'closed': 'secondary',
      'resolved': 'secondary'
    };
    
    return statusMap[status.toLowerCase()] || 'default';
  };
  
  const sizeClasses = size === 'sm' ? 'text-xs py-0 px-2' : '';
  
  return (
    <Badge 
      variant={variant === 'outline' ? 'outline' : getStatusVariant()}
      className={cn(sizeClasses, className)}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
