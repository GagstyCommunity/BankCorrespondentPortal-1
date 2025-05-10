import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Switch, Route } from "wouter";
import PageContainer from "@/components/layout/PageContainer";
import Sidebar from "@/components/layout/Sidebar";
import AuditorDashboard from "@/components/auditor/Dashboard";
import useRole from "@/hooks/use-role";

const AuditorPage = () => {
  const [location] = useLocation();
  const { role, checkAccess, redirectToLogin } = useRole();
  const [navItems, setNavItems] = useState<Array<{ href: string; label: string; isActive?: boolean; isAlert?: boolean; }>>([]);
  
  useEffect(() => {
    if (!checkAccess(['auditor'])) {
      redirectToLogin();
      return;
    }
    
    // Define navigation items based on current route
    const items = [
      { href: "/auditor", label: "Tasks", isActive: location === "/auditor" },
      { href: "/auditor/form", label: "Audit Form", isActive: location === "/auditor/form" },
      { href: "/auditor/logs", label: "Visit Logs", isActive: location === "/auditor/logs" },
      { href: "/auditor/red-zone", label: "Red Zone Protocol", isActive: location === "/auditor/red-zone" },
      { href: "/auditor/priority", label: "Priority Audits", isActive: location === "/auditor/priority", isAlert: true }
    ];
    
    setNavItems(items);
  }, [location, checkAccess, redirectToLogin]);
  
  // Dashboard title based on route
  const getTitle = () => {
    switch (location) {
      case '/auditor': return 'Auditor Dashboard';
      case '/auditor/form': return 'Audit Form';
      case '/auditor/logs': return 'Visit Logs';
      case '/auditor/red-zone': return 'Red Zone Protocol';
      case '/auditor/priority': return 'Priority Audits';
      default: return 'Auditor Dashboard';
    }
  };
  
  return (
    <div className="flex">
      <Sidebar role="auditor" />
      <div className="flex-1 ml-64">
        <PageContainer title={getTitle()} navItems={navItems} notifications={5}>
          <Switch>
            <Route path="/auditor" component={AuditorDashboard} />
            <Route path="/auditor/form">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Audit Form</h2>
                <p>This section will contain audit form functionality.</p>
              </div>
            </Route>
            <Route path="/auditor/logs">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Visit Logs</h2>
                <p>This section will contain visit logs functionality.</p>
              </div>
            </Route>
            <Route path="/auditor/red-zone">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Red Zone Protocol</h2>
                <p>This section will contain red zone protocol functionality.</p>
              </div>
            </Route>
            <Route path="/auditor/priority">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Priority Audits</h2>
                <p>This section will contain priority audit functionality.</p>
              </div>
            </Route>
          </Switch>
        </PageContainer>
      </div>
    </div>
  );
};

export default AuditorPage;
