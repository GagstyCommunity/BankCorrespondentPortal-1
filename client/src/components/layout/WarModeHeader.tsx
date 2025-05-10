import { AlarmClock, Map } from "lucide-react";
import { useWarMode } from "@/context/WarModeContext";

const WarModeHeader = () => {
  const { warMode, warModeLevel } = useWarMode();
  
  if (!warMode) return null;
  
  return (
    <div className="bg-alert rounded-lg shadow-md mb-6 animate-pulse">
      <div className="p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlarmClock className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-bold">EMERGENCY MODE ACTIVE</h2>
          </div>
          <div>
            <span className="text-xs bg-white text-alert px-2 py-1 rounded-full font-bold">
              LEVEL {warModeLevel} - {warModeLevel === 3 ? 'HIGH ALERT' : warModeLevel === 2 ? 'MEDIUM ALERT' : 'LOW ALERT'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarModeHeader;
