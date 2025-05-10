import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  AlertCircle,
  MapPin, 
  ShieldAlert, 
  ShieldCheck 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/status-badge";
import MetricCard from "@/components/ui/metric-card";
import ProgressStatus from "@/components/ui/progress-status";
import { useWarMode } from "@/context/WarModeContext";

const AdminDashboard = () => {
  const { toggleWarMode } = useWarMode();
  
  // Fetch system statuses
  const { data: systemStatus, isLoading: loadingStatus } = useQuery({
    queryKey: ['/api/system-status'],
  });
  
  // Fetch alerts
  const { data: alerts, isLoading: loadingAlerts } = useQuery({
    queryKey: ['/api/alerts'],
  });
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* CSP Overview */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-600">CSP Overview</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard title="Active CSPs" value="2,458" variant="default" />
              <MetricCard title="Pending Approvals" value="43" variant="warning" />
              <MetricCard title="Flagged" value="17" variant="alert" />
              <MetricCard title="Suspended" value="8" variant="muted" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Manage CSPs</Button>
          </CardFooter>
        </Card>

        {/* Audit Status */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-600">Audit Status</CardTitle>
          </CardHeader>
          <CardContent className="pb-2 space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm">Completed Today</div>
              <div className="font-semibold">78/120</div>
            </div>
            <div className="w-full bg-neutral-light rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <div className="flex justify-between">
              <MetricCard
                title="High Priority"
                value="14"
                variant="alert"
                className="flex-1 mr-2"
              />
              <MetricCard
                title="Unassigned"
                value="23"
                variant="warning"
                className="flex-1"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Audit Dashboard</Button>
          </CardFooter>
        </Card>

        {/* Real-time Fraud Map */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium text-gray-600">Real-time Fraud Map</CardTitle>
            <div className="text-sm text-accent font-medium">Live Updates</div>
          </CardHeader>
          <CardContent className="pb-2">
            {/* Map Placeholder */}
            <div className="bg-neutral-light rounded-lg h-40 md:h-64 mb-4 relative flex items-center justify-center">
              <MapPin className="h-20 w-20 text-primary/20" />
              <div className="absolute top-2 right-2 bg-white p-2 rounded-md shadow-md">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-success mr-1"></div>
                    <span>Safe</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-warning mr-1"></div>
                    <span>Watch</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-alert mr-1"></div>
                    <span>Alert</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <MetricCard title="Risk Areas" value="8" variant="alert" />
              <MetricCard title="Fraud Cases" value="27" variant="warning" />
              <MetricCard title="Blocked CSPs" value="12" variant="muted" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Alerts */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-3 border-b">
            <CardTitle>Latest Alerts</CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-neutral-light">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alert ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">CSP ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loadingAlerts ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-3 text-center">Loading alerts...</td>
                  </tr>
                ) : (
                  <>
                    <tr className="hover:bg-neutral-light">
                      <td className="px-4 py-3 text-sm">ALT-2809</td>
                      <td className="px-4 py-3 text-sm">CSP-3421</td>
                      <td className="px-4 py-3 text-sm">Device location mismatch during transaction</td>
                      <td className="px-4 py-3 text-sm">12 mins ago</td>
                      <td className="px-4 py-3 text-sm">
                        <StatusBadge status="High" size="sm" />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Button variant="link" className="p-0 h-auto text-primary">Review</Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-light">
                      <td className="px-4 py-3 text-sm">ALT-2808</td>
                      <td className="px-4 py-3 text-sm">CSP-2780</td>
                      <td className="px-4 py-3 text-sm">Multiple transaction retries with different PINs</td>
                      <td className="px-4 py-3 text-sm">34 mins ago</td>
                      <td className="px-4 py-3 text-sm">
                        <StatusBadge status="Medium" size="sm" />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Button variant="link" className="p-0 h-auto text-primary">Review</Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-light">
                      <td className="px-4 py-3 text-sm">ALT-2807</td>
                      <td className="px-4 py-3 text-sm">CSP-1856</td>
                      <td className="px-4 py-3 text-sm">Failed facial verification for check-in</td>
                      <td className="px-4 py-3 text-sm">42 mins ago</td>
                      <td className="px-4 py-3 text-sm">
                        <StatusBadge status="Medium" size="sm" />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Button variant="link" className="p-0 h-auto text-primary">Review</Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-light">
                      <td className="px-4 py-3 text-sm">ALT-2806</td>
                      <td className="px-4 py-3 text-sm">CSP-4502</td>
                      <td className="px-4 py-3 text-sm">Unusual transaction volume spike</td>
                      <td className="px-4 py-3 text-sm">1 hour ago</td>
                      <td className="px-4 py-3 text-sm">
                        <StatusBadge status="High" size="sm" />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Button variant="link" className="p-0 h-auto text-primary">Review</Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-light">
                      <td className="px-4 py-3 text-sm">ALT-2805</td>
                      <td className="px-4 py-3 text-sm">CSP-2104</td>
                      <td className="px-4 py-3 text-sm">Customer complaint filed: fee discrepancy</td>
                      <td className="px-4 py-3 text-sm">2 hours ago</td>
                      <td className="px-4 py-3 text-sm">
                        <StatusBadge status="Low" size="sm" />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Button variant="link" className="p-0 h-auto text-primary">Review</Button>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <CardFooter className="border-t">
            <Button variant="link" className="px-0">View All Alerts</Button>
          </CardFooter>
        </Card>

        {/* System Status */}
        <Card className="col-span-1">
          <CardHeader className="pb-3 border-b">
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 py-4">
            {loadingStatus ? (
              <div className="text-center">Loading system status...</div>
            ) : (
              <>
                <ProgressStatus 
                  service="Fraud Engine" 
                  status="Operational" 
                  percentage={98} 
                />
                <ProgressStatus 
                  service="AEPS Services" 
                  status="Operational" 
                  percentage={100} 
                />
                <ProgressStatus 
                  service="mATM Services" 
                  status="Minor Issues" 
                  percentage={87} 
                />
                <ProgressStatus 
                  service="Facial Recognition" 
                  status="Operational" 
                  percentage={96} 
                />
                <ProgressStatus 
                  service="Notification System" 
                  status="Operational" 
                  percentage={99} 
                />
              </>
            )}
            
            <div className="mt-6 p-4 bg-neutral-light rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-semibold">CSP Suraksha Protocol</div>
                  <div className="text-xs text-gray-500">Last scan: 12 minutes ago</div>
                </div>
              </div>
              <div className="mt-3">
                <Button 
                  variant="outline" 
                  className="w-full py-2 text-primary text-sm font-medium border border-primary rounded-md hover:bg-primary hover:text-white"
                >
                  Run Security Scan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
