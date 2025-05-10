import { useQuery } from "@tanstack/react-query";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletCards, Barcode, FileText, UserSearch, DollarSign, Scan } from "lucide-react";
import MetricCard from "@/components/ui/metric-card";
import AlertItem from "@/components/ui/alert-item";
import StatusBadge from "@/components/ui/status-badge";
import QRCodeGenerator from "@/components/ui/qr-code";

const CSPDashboard = () => {
  // Fetch recent transactions
  const { data: transactions, isLoading: loadingTransactions } = useQuery({
    queryKey: ['/api/transactions/csp/1'],
  });
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-600">Your Status</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500">Risk Score</div>
                <div className="text-3xl font-bold text-success">92</div>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-success flex items-center justify-center text-success font-bold">
                Good
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Last Check-In</span>
                <span className="font-medium">Today, 9:15 AM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Audit</span>
                <span className="font-medium">14 days ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Complaints</span>
                <span className="font-medium">0 this month</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <Button className="w-full bg-accent hover:bg-accent-dark">Check-In Now</Button>
          </CardFooter>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-600">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="bg-neutral-light hover:bg-neutral p-3 rounded-lg flex flex-col items-center h-auto">
                <WalletCards className="h-6 w-6 text-primary mb-1" />
                <span className="text-sm">AEPS</span>
              </Button>
              <Button variant="outline" className="bg-neutral-light hover:bg-neutral p-3 rounded-lg flex flex-col items-center h-auto">
                <Barcode className="h-6 w-6 text-primary mb-1" />
                <span className="text-sm">mATM</span>
              </Button>
              <Button variant="outline" className="bg-neutral-light hover:bg-neutral p-3 rounded-lg flex flex-col items-center h-auto">
                <FileText className="h-6 w-6 text-primary mb-1" />
                <span className="text-sm">BBPS</span>
              </Button>
              <Button variant="outline" className="bg-neutral-light hover:bg-neutral p-3 rounded-lg flex flex-col items-center h-auto">
                <UserSearch className="h-6 w-6 text-primary mb-1" />
                <span className="text-sm">KYC</span>
              </Button>
              <Button variant="outline" className="bg-neutral-light hover:bg-neutral p-3 rounded-lg flex flex-col items-center h-auto">
                <DollarSign className="h-6 w-6 text-primary mb-1" />
                <span className="text-sm">Cash Deposit</span>
              </Button>
              <Button variant="outline" className="bg-neutral-light hover:bg-neutral p-3 rounded-lg flex flex-col items-center h-auto">
                <DollarSign className="h-6 w-6 text-primary mb-1" />
                <span className="text-sm">Cash Withdrawal</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <Button variant="outline" className="w-full">View All Services</Button>
          </CardFooter>
        </Card>

        {/* Alert Center */}
        <Card>
          <CardHeader className="pb-2 flex justify-between items-center">
            <CardTitle className="text-base font-medium text-gray-600">Alert Center</CardTitle>
            <StatusBadge status="3 New" />
          </CardHeader>
          <CardContent className="pb-2 space-y-3">
            <AlertItem 
              variant="warning"
              title="Device Status Warning"
              description="Your device location must be verified before next transaction"
            />
            <AlertItem 
              variant="info"
              title="New Commission Rates"
              description="Updated rates for AEPS transactions are now available"
            />
            <AlertItem 
              variant="success"
              title="Audit Scheduled"
              description="Your quarterly audit is scheduled for next Monday"
            />
          </CardContent>
          <CardFooter className="border-t">
            <Button variant="outline" className="w-full">View All Alerts</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-3 border-b flex justify-between items-center">
            <CardTitle>Recent Transactions</CardTitle>
            <div>
              <span className="text-xs text-gray-500">Today's Total:</span>
              <span className="ml-1 font-semibold">₹15,420</span>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-neutral-light">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loadingTransactions ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-3 text-center">Loading transactions...</td>
                  </tr>
                ) : (
                  <>
                    <tr className="hover:bg-neutral-light">
                      <td className="px-4 py-3 text-sm">TXN43289</td>
                      <td className="px-4 py-3 text-sm">Priya Sharma</td>
                      <td className="px-4 py-3 text-sm">AEPS Withdrawal</td>
                      <td className="px-4 py-3 text-sm font-medium">₹2,000</td>
                      <td className="px-4 py-3 text-sm">11:42 AM</td>
                      <td className="px-4 py-3 text-sm">
                        <StatusBadge status="Completed" size="sm" />
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-light">
                      <td className="px-4 py-3 text-sm">TXN43288</td>
                      <td className="px-4 py-3 text-sm">Vikram Singh</td>
                      <td className="px-4 py-3 text-sm">BBPS - Electricity</td>
                      <td className="px-4 py-3 text-sm font-medium">₹1,450</td>
                      <td className="px-4 py-3 text-sm">11:28 AM</td>
                      <td className="px-4 py-3 text-sm">
                        <StatusBadge status="Completed" size="sm" />
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-light">
                      <td className="px-4 py-3 text-sm">TXN43287</td>
                      <td className="px-4 py-3 text-sm">Anand Patel</td>
                      <td className="px-4 py-3 text-sm">mATM Withdrawal</td>
                      <td className="px-4 py-3 text-sm font-medium">₹5,000</td>
                      <td className="px-4 py-3 text-sm">10:54 AM</td>
                      <td className="px-4 py-3 text-sm">
                        <StatusBadge status="Completed" size="sm" />
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-light">
                      <td className="px-4 py-3 text-sm">TXN43286</td>
                      <td className="px-4 py-3 text-sm">Sunita Devi</td>
                      <td className="px-4 py-3 text-sm">BBPS - Mobile</td>
                      <td className="px-4 py-3 text-sm font-medium">₹299</td>
                      <td className="px-4 py-3 text-sm">10:32 AM</td>
                      <td className="px-4 py-3 text-sm">
                        <StatusBadge status="Completed" size="sm" />
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-light">
                      <td className="px-4 py-3 text-sm">TXN43285</td>
                      <td className="px-4 py-3 text-sm">Ravi Kumar</td>
                      <td className="px-4 py-3 text-sm">AEPS Balance Check</td>
                      <td className="px-4 py-3 text-sm font-medium">₹0</td>
                      <td className="px-4 py-3 text-sm">10:15 AM</td>
                      <td className="px-4 py-3 text-sm">
                        <StatusBadge status="Completed" size="sm" />
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <CardFooter className="border-t">
            <Button variant="link" className="px-0">View All Transactions</Button>
          </CardFooter>
        </Card>

        {/* QR Poster System */}
        <Card className="col-span-1">
          <CardHeader className="pb-3 border-b">
            <CardTitle>QR Poster System</CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <QRCodeGenerator
              value="https://fiaglobal.com/csp/12345"
              title="Your CSP QR Code"
              description="Allow customers to scan for verification"
            />
            <div className="mt-6">
              <div className="bg-accent/10 rounded-lg p-3">
                <h4 className="text-sm font-medium text-accent">Reminder</h4>
                <p className="text-xs text-gray-600 mt-1">Display the QR poster prominently at your CSP location to allow customers to verify your authenticity.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Face Check-In Status */}
        <Card>
          <CardHeader className="pb-3 border-b">
            <CardTitle>Face Check-In Status</CardTitle>
          </CardHeader>
          <CardContent className="py-4 flex">
            <div className="w-1/3">
              <div className="w-20 h-20 rounded-full bg-neutral-light flex items-center justify-center mx-auto">
                <Scan className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="w-2/3">
              <div className="mb-2">
                <div className="text-sm text-gray-500">Last Check-In</div>
                <div className="font-medium">Today, 09:15 AM</div>
              </div>
              <div className="mb-2">
                <div className="text-sm text-gray-500">Status</div>
                <div className="text-success font-medium">Verified</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Next Required</div>
                <div className="font-medium">Today, by 1:15 PM</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <Button className="w-full">Perform Face Check-In</Button>
          </CardFooter>
        </Card>

        {/* Device Status */}
        <Card>
          <CardHeader className="pb-3 border-b flex justify-between items-center">
            <CardTitle>Device Status</CardTitle>
            <StatusBadge status="Verification Needed" />
          </CardHeader>
          <CardContent className="py-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-neutral-light flex items-center justify-center mr-3">
                  <Scan className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm">Device ID</div>
                  <div className="font-medium">DEV-87549</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Location</div>
                  <div className="text-warning font-medium">Needs Verification</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Fingerprint</div>
                  <div className="text-success font-medium">Working</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Camera</div>
                  <div className="text-success font-medium">Working</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Security Status</div>
                  <div className="text-success font-medium">Protected</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <Button className="w-full bg-warning hover:bg-warning/80">Verify Device Location</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CSPDashboard;
