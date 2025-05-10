import { cn } from "@/lib/utils";

interface ProgressStatusProps {
  service: string;
  status: string;
  percentage: number;
  className?: string;
}

const ProgressStatus = ({ service, status, percentage, className }: ProgressStatusProps) => {
  const getStatusColor = () => {
    if (status.toLowerCase().includes('operational')) return 'text-success';
    if (status.toLowerCase().includes('minor') || status.toLowerCase().includes('degraded')) return 'text-warning';
    if (status.toLowerCase().includes('down') || status.toLowerCase().includes('critical')) return 'text-alert';
    return 'text-gray-500';
  };
  
  const getBarColor = () => {
    if (percentage > 90) return 'bg-success';
    if (percentage > 70) return 'bg-warning';
    return 'bg-alert';
  };
  
  return (
    <div className={cn("", className)}>
      <div className="flex justify-between mb-1">
        <span className="text-sm">{service}</span>
        <span className={`text-xs ${getStatusColor()} font-medium`}>{status}</span>
      </div>
      <div className="w-full h-2 bg-neutral-light rounded-full">
        <div 
          className={`h-2 rounded-full ${getBarColor()}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressStatus;
