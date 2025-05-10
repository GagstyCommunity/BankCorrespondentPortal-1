import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Switch, Route } from "wouter";
import PageContainer from "@/components/layout/PageContainer";
import Sidebar from "@/components/layout/Sidebar";
import CSPDashboard from "@/components/csp/Dashboard";
import useRole from "@/hooks/use-role";

const CSPPage = () => {
  const [location] = useLocation();
  const { role, checkAccess, redirectToLogin } = useRole();
  const [navItems, setNavItems] = useState<Array<{ href: string; label: string; isActive?: boolean; isAlert?: boolean; }>>([]);
  
  useEffect(() => {
    if (!checkAccess(['csp'])) {
      redirectToLogin();
      return;
    }
    
    // Define navigation items based on current route
    const items = [
      { href: "/csp", label: "Dashboard", isActive: location === "/csp" },
      { href: "/csp/transactions", label: "Transactions", isActive: location === "/csp/transactions" },
      { href: "/csp/check-in", label: "Facial Check-In", isActive: location === "/csp/check-in" },
      { href: "/csp/device", label: "Device Status", isActive: location === "/csp/device" },
      { href: "/csp/disputes", label: "Dispute Center", isActive: location === "/csp/disputes" },
      { href: "/csp/reports", label: "Reports", isActive: location === "/csp/reports" },
      { href: "/csp/army", label: "Army Family Panel", isActive: location === "/csp/army" }
    ];
    
    setNavItems(items);
  }, [location, checkAccess, redirectToLogin]);
  
  // Dashboard title based on route
  const getTitle = () => {
    switch (location) {
      case '/csp': return 'CSP Agent Dashboard';
      case '/csp/transactions': return 'Transactions';
      case '/csp/check-in': return 'Facial Check-In';
      case '/csp/device': return 'Device Status';
      case '/csp/disputes': return 'Dispute Center';
      case '/csp/reports': return 'Reports';
      case '/csp/army': return 'Army Family Panel';
      default: return 'CSP Agent Dashboard';
    }
  };
  
  return (
    <div className="flex">
      <Sidebar role="csp" />
      <div className="flex-1 ml-64">
        <PageContainer title={getTitle()} navItems={navItems} notifications={3}>
          <Switch>
            <Route path="/csp" component={CSPDashboard} />
            <Route path="/csp/transactions">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Transactions</h2>
                <p>This section will contain transaction management functionality.</p>
              </div>
            </Route>
            <Route path="/csp/check-in">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Facial Check-In</h2>
                <p>This section will contain facial verification functionality.</p>
              </div>
            </Route>
            <Route path="/csp/device">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Device Status</h2>
                <p>This section will contain device management functionality.</p>
              </div>
            </Route>
            <Route path="/csp/disputes">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Dispute Center</h2>
                <p>This section will contain customer dispute handling functionality.</p>
              </div>
            </Route>
            <Route path="/csp/reports">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Reports</h2>
                <p>This section will contain reporting functionality.</p>
              </div>
            </Route>
            <Route path="/csp/army">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Army Family Panel</h2>
                <p>This section will contain services for military families.</p>
              </div>
            </Route>
          </Switch>
        </PageContainer>
      </div>
    </div>
  );
};

export default CSPPage;
