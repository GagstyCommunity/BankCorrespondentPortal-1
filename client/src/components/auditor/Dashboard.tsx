import { FileSearch, MapPin, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AuditorDashboard = () => {
  return (
    <div className="text-center py-20 bg-white rounded-lg shadow-md">
      <FileSearch className="h-24 w-24 text-primary mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Auditor Dashboard</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        Access audit cases, GPS/photo logs, face-verified submission, and map-based routing tools.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10">
        <Card className="text-center p-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FileSearch className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Assigned Tasks</h3>
          <p className="text-sm text-gray-600 mb-4">
            View and manage your assigned CSP audit tasks with priority indicators.
          </p>
          <Button className="w-full">View Tasks</Button>
        </Card>
        
        <Card className="text-center p-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Route Planning</h3>
          <p className="text-sm text-gray-600 mb-4">
            Optimize your audit route with GPS-enabled map navigation tools.
          </p>
          <Button className="w-full">Open Map</Button>
        </Card>
        
        <Card className="text-center p-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-alert/10 flex items-center justify-center mb-4">
            <ShieldAlert className="h-8 w-8 text-alert" />
          </div>
          <h3 className="font-semibold mb-2">Priority Audits</h3>
          <p className="text-sm text-gray-600 mb-4">
            High-priority audit assignments that require immediate attention.
          </p>
          <Button variant="destructive" className="w-full">Access Priority Queue</Button>
        </Card>
      </div>
    </div>
  );
};

export default AuditorDashboard;
