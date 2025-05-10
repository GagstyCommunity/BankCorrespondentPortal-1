import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { Switch, Route } from "wouter";
import PageContainer from "@/components/layout/PageContainer";
import Sidebar from "@/components/layout/Sidebar";
import AdminDashboard from "@/components/admin/Dashboard";
import useRole from "@/hooks/use-role";

const AdminPage = () => {
  const { user } = useAuth();
  const [location] = useLocation();
  const { role, checkAccess, redirectToLogin } = useRole();
  const [navItems, setNavItems] = useState<Array<{ href: string; label: string; isActive?: boolean; isAlert?: boolean; }>>([]);

  useEffect(() => {
    if (!checkAccess(['admin'])) {
      redirectToLogin();
      return;
    }
    
    // Define navigation items based on current route
    const items = [
      { href: "/admin", label: "Dashboard", isActive: location === "/admin" },
      { href: "/admin/csps", label: "CSP Management", isActive: location === "/admin/csps" },
      { href: "/admin/audits", label: "Audit Assignment", isActive: location === "/admin/audits" },
      { href: "/admin/fraud", label: "Fraud Engine", isActive: location === "/admin/fraud" },
      { href: "/admin/logs", label: "Audit Logs", isActive: location === "/admin/logs" },
      { href: "/admin/notifications", label: "Notification Hub", isActive: location === "/admin/notifications" },
      { href: "/admin/settings", label: "System Settings", isActive: location === "/admin/settings" },
      { href: "/admin/war-mode", label: "War Mode Control", isActive: location === "/admin/war-mode", isAlert: true }
    ];
    
    setNavItems(items);
  }, [location, checkAccess, redirectToLogin]);
  
  // Dashboard title based on route
  const getTitle = () => {
    switch (location) {
      case '/admin': return 'Admin Dashboard';
      case '/admin/csps': return 'CSP Management';
      case '/admin/audits': return 'Audit Assignment';
      case '/admin/fraud': return 'Fraud Engine';
      case '/admin/logs': return 'Audit Logs';
      case '/admin/notifications': return 'Notification Hub';
      case '/admin/settings': return 'System Settings';
      case '/admin/war-mode': return 'War Mode Control';
      default: return 'Admin Dashboard';
    }
  };
  
  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 ml-64">
        <PageContainer title={getTitle()} navItems={navItems} notifications={8}>
          <Switch>
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/admin/csps">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">CSP Management</h2>
                <p>This section will contain CSP management functionality.</p>
              </div>
            </Route>
            <Route path="/admin/audits">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Audit Assignment</h2>
                <p>This section will contain audit assignment functionality.</p>
              </div>
            </Route>
            <Route path="/admin/fraud">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Fraud Engine</h2>
                <p>This section will contain fraud detection and management functionality.</p>
              </div>
            </Route>
            <Route path="/admin/logs">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Audit Logs</h2>
                <p>This section will contain audit logs and history.</p>
              </div>
            </Route>
            <Route path="/admin/notifications">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Notification Hub</h2>
                <p>This section will contain notification management functionality.</p>
              </div>
            </Route>
            <Route path="/admin/settings">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">System Settings</h2>
                <p>This section will contain system configuration settings.</p>
              </div>
            </Route>
            <Route path="/admin/war-mode">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-alert">War Mode Control</h2>
                <p>This section will contain emergency protocols and war mode settings.</p>
              </div>
            </Route>
          </Switch>
        </PageContainer>
      </div>
    </div>
  );
};

export default AdminPage;
