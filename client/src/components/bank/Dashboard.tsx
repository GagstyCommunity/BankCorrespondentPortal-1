import { Building2, ShieldAlert, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BankDashboard = () => {
  return (
    <div className="text-center py-20 bg-white rounded-lg shadow-md">
      <Building2 className="h-24 w-24 text-primary mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Bank Officer Dashboard</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        View flagged CSPs, approve onboarding, manage audit outcomes, and download fraud reports.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10">
        <Card className="text-center p-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">CSP Registry</h3>
          <p className="text-sm text-gray-600 mb-4">
            Manage all CSPs in your region with comprehensive performance metrics.
          </p>
          <Button className="w-full">Access Registry</Button>
        </Card>
        
        <Card className="text-center p-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-alert/10 flex items-center justify-center mb-4">
            <ShieldAlert className="h-8 w-8 text-alert" />
          </div>
          <h3 className="font-semibold mb-2">Fraud Dashboard</h3>
          <p className="text-sm text-gray-600 mb-4">
            Monitor and investigate potential fraud cases sorted by severity.
          </p>
          <Button variant="destructive" className="w-full">View Fraud Cases</Button>
        </Card>
        
        <Card className="text-center p-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FileCheck className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Document Access</h3>
          <p className="text-sm text-gray-600 mb-4">
            Review KYC documents and verification videos for CSP compliance.
          </p>
          <Button className="w-full">Access Documents</Button>
        </Card>
      </div>
    </div>
  );
};

export default BankDashboard;
