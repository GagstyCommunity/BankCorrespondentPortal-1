import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Switch, Route } from "wouter";
import PageContainer from "@/components/layout/PageContainer";
import Sidebar from "@/components/layout/Sidebar";
import FIDashboard from "@/components/fi/Dashboard";
import useRole from "@/hooks/use-role";

const FIPage = () => {
  const [location] = useLocation();
  const { role, checkAccess, redirectToLogin } = useRole();
  const [navItems, setNavItems] = useState<Array<{ href: string; label: string; isActive?: boolean; isAlert?: boolean; }>>([]);
  
  useEffect(() => {
    if (!checkAccess(['fi'])) {
      redirectToLogin();
      return;
    }
    
    // Define navigation items based on current route
    const items = [
      { href: "/fi", label: "Dashboard", isActive: location === "/fi" },
      { href: "/fi/applications", label: "Application Collection", isActive: location === "/fi/applications" },
      { href: "/fi/credit", label: "Credit Forms", isActive: location === "/fi/credit" },
      { href: "/fi/kyc", label: "KYC Verification", isActive: location === "/fi/kyc" },
      { href: "/fi/reports", label: "Reports", isActive: location === "/fi/reports" },
      { href: "/fi/check-in", label: "Check-In", isActive: location === "/fi/check-in" }
    ];
    
    setNavItems(items);
  }, [location, checkAccess, redirectToLogin]);
  
  // Dashboard title based on route
  const getTitle = () => {
    switch (location) {
      case '/fi': return 'FI Agent Dashboard';
      case '/fi/applications': return 'Application Collection';
      case '/fi/credit': return 'Credit Forms';
      case '/fi/kyc': return 'KYC Verification';
      case '/fi/reports': return 'Reports';
      case '/fi/check-in': return 'Check-In';
      default: return 'FI Agent Dashboard';
    }
  };
  
  return (
    <div className="flex">
      <Sidebar role="fi" />
      <div className="flex-1 ml-64">
        <PageContainer title={getTitle()} navItems={navItems} notifications={2}>
          <Switch>
            <Route path="/fi" component={FIDashboard} />
            <Route path="/fi/applications">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Application Collection</h2>
                <p>This section will contain application collection functionality.</p>
              </div>
            </Route>
            <Route path="/fi/credit">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Credit Forms</h2>
                <p>This section will contain credit form management functionality.</p>
              </div>
            </Route>
            <Route path="/fi/kyc">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">KYC Verification</h2>
                <p>This section will contain KYC verification functionality.</p>
              </div>
            </Route>
            <Route path="/fi/reports">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Reports</h2>
                <p>This section will contain reporting functionality.</p>
              </div>
            </Route>
            <Route path="/fi/check-in">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Check-In</h2>
                <p>This section will contain check-in functionality.</p>
              </div>
            </Route>
          </Switch>
        </PageContainer>
      </div>
    </div>
  );
};

export default FIPage;
