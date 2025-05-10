import { Search, FileText, QrCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CustomerDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Fee Verification */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
              <Search className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-4">Fee Verification</h3>
          <p className="text-sm text-gray-600 text-center mb-6">
            Verify the fee charged for your banking transaction by entering your receipt ID.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Receipt ID</label>
              <Input 
                placeholder="Enter Receipt ID (e.g. RCP-123456)"
                className="w-full border border-neutral rounded-md"
              />
            </div>
            <Button className="w-full bg-accent hover:bg-accent-dark">Verify Fee</Button>
          </div>
        </Card>

        {/* File a Complaint */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-4">File a Complaint</h3>
          <p className="text-sm text-gray-600 text-center mb-6">
            Report an issue with a CSP or a transaction. We'll respond within 48 hours.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CSP ID or Location</label>
              <Input 
                placeholder="Enter CSP ID or Location"
                className="w-full border border-neutral rounded-md"
              />
            </div>
            <Button className="w-full">File Complaint</Button>
          </div>
        </Card>

        {/* Scan CSP QR Code */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center">
              <QrCode className="h-8 w-8 text-warning" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-4">Scan CSP QR Code</h3>
          <p className="text-sm text-gray-600 text-center mb-6">
            Verify the authenticity of a CSP by scanning their QR code.
          </p>
          <div className="p-4 bg-neutral-light rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <QrCode className="h-12 w-12 text-gray-400 mb-2 mx-auto" />
              <div className="text-sm text-gray-500">Camera Preview</div>
            </div>
          </div>
          <Button className="w-full bg-warning text-white hover:bg-warning/80">Start Scanner</Button>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">How to Use CSP Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-neutral-light rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                <Search className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-medium">AEPS Service</h4>
            </div>
            <p className="text-sm text-gray-600">
              Access your bank account using your Aadhaar number and fingerprint at any CSP point.
            </p>
          </div>
          <div className="border border-neutral-light rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                <Search className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-medium">Micro ATM</h4>
            </div>
            <p className="text-sm text-gray-600">
              Use your debit card to withdraw cash at CSP locations even in areas without ATMs.
            </p>
          </div>
          <div className="border border-neutral-light rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                <Search className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-medium">Bill Payments</h4>
            </div>
            <p className="text-sm text-gray-600">
              Pay utility bills, mobile recharges, and other services at any CSP point near you.
            </p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-neutral-light rounded-lg">
          <div className="flex items-start">
            <Search className="h-5 w-5 text-primary mr-3 mt-1" />
            <div>
              <h4 className="font-medium mb-1">CSP Safety Tips</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Always verify the CSP's ID card before conducting transactions</li>
                <li>• Check the maximum fee that can be charged for each service</li>
                <li>• Always collect and keep your transaction receipt</li>
                <li>• Never share your PIN with the CSP agent or anyone else</li>
                <li>• Verify the CSP by scanning their official QR code</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomerDashboard;
