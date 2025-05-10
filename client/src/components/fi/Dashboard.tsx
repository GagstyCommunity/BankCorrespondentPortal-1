import { FileText, UserCheck, FileBarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FIDashboard = () => {
  return (
    <div className="text-center py-20 bg-white rounded-lg shadow-md">
      <FileText className="h-24 w-24 text-primary mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">FI Agent Dashboard</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        Non-Financial Services focused interface for application collection, credit forms, and other documentation.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10">
        <Card className="text-center p-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Application Collection</h3>
          <p className="text-sm text-gray-600 mb-4">
            Collect and process new account applications with integrated KYC verification.
          </p>
          <Button className="w-full">Access Module</Button>
        </Card>
        
        <Card className="text-center p-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <UserCheck className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Credit Forms</h3>
          <p className="text-sm text-gray-600 mb-4">
            Process loan applications and credit assessments for rural customers.
          </p>
          <Button className="w-full">Access Module</Button>
        </Card>
        
        <Card className="text-center p-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FileBarChart className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Reports & Analytics</h3>
          <p className="text-sm text-gray-600 mb-4">
            Track your performance and application status in real-time.
          </p>
          <Button className="w-full">Access Module</Button>
        </Card>
      </div>
    </div>
  );
};

export default FIDashboard;
