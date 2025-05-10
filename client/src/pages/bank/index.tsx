import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Switch, Route } from "wouter";
import PageContainer from "@/components/layout/PageContainer";
import Sidebar from "@/components/layout/Sidebar";
import BankDashboard from "@/components/bank/Dashboard";
import useRole from "@/hooks/use-role";

const BankPage = () => {
  const [location] = useLocation();
  const { role, checkAccess, redirectToLogin } = useRole();
  const [navItems, setNavItems] = useState<Array<{ href: string; label: string; isActive?: boolean; isAlert?: boolean; }>>([]);
  
  useEffect(() => {
    if (!checkAccess(['bank'])) {
      redirectToLogin();
      return;
    }
    
    // Define navigation items based on current route
    const items = [
      { href: "/bank", label: "Overview", isActive: location === "/bank" },
      { href: "/bank/csps", label: "CSP Registry", isActive: location === "/bank/csps" },
      { href: "/bank/fraud", label: "Fraud Dashboard", isActive: location === "/bank/fraud" },
      { href: "/bank/documents", label: "Document Access", isActive: location === "/bank/documents" },
      { href: "/bank/decisions", label: "Decision Panel", isActive: location === "/bank/decisions" },
      { href: "/bank/reports", label: "Reports", isActive: location === "/bank/reports" },
      { href: "/bank/military", label: "Military Coordination", isActive: location === "/bank/military" }
    ];
    
    setNavItems(items);
  }, [location, checkAccess, redirectToLogin]);
  
  // Dashboard title based on route
  const getTitle = () => {
    switch (location) {
      case '/bank': return 'Bank Officer Dashboard';
      case '/bank/csps': return 'CSP Registry';
      case '/bank/fraud': return 'Fraud Dashboard';
      case '/bank/documents': return 'Document Access';
      case '/bank/decisions': return 'Decision Panel';
      case '/bank/reports': return 'Reports';
      case '/bank/military': return 'Military Coordination';
      default: return 'Bank Officer Dashboard';
    }
  };
  
  return (
    <div className="flex">
      <Sidebar role="bank" />
      <div className="flex-1 ml-64">
        <PageContainer title={getTitle()} navItems={navItems} notifications={7}>
          <Switch>
            <Route path="/bank" component={BankDashboard} />
            <Route path="/bank/csps">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">CSP Registry</h2>
                <p>This section will contain CSP registry functionality.</p>
              </div>
            </Route>
            <Route path="/bank/fraud">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Fraud Dashboard</h2>
                <p>This section will contain fraud detection functionality.</p>
              </div>
            </Route>
            <Route path="/bank/documents">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Document Access</h2>
                <p>This section will contain document access functionality.</p>
              </div>
            </Route>
            <Route path="/bank/decisions">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Decision Panel</h2>
                <p>This section will contain decision panel functionality.</p>
              </div>
            </Route>
            <Route path="/bank/reports">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Reports</h2>
                <p>This section will contain reporting functionality.</p>
              </div>
            </Route>
            <Route path="/bank/military">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Military Coordination</h2>
                <p>This section will contain military coordination functionality.</p>
              </div>
            </Route>
          </Switch>
        </PageContainer>
      </div>
    </div>
  );
};

export default BankPage;
