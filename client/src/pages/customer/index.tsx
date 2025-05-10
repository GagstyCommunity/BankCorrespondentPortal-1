import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Switch, Route } from "wouter";
import PageContainer from "@/components/layout/PageContainer";
import Sidebar from "@/components/layout/Sidebar";
import CustomerDashboard from "@/components/customer/Dashboard";
import useRole from "@/hooks/use-role";

const CustomerPage = () => {
  const [location] = useLocation();
  const { role, checkAccess, redirectToLogin } = useRole();
  const [navItems, setNavItems] = useState<Array<{ href: string; label: string; isActive?: boolean; isAlert?: boolean; }>>([]);
  
  useEffect(() => {
    if (!checkAccess(['customer'])) {
      redirectToLogin();
      return;
    }
    
    // Define navigation items based on current route
    const items = [
      { href: "/customer", label: "Services", isActive: location === "/customer" },
      { href: "/customer/track", label: "Track Complaint", isActive: location === "/customer/track" },
      { href: "/customer/notifications", label: "Notifications", isActive: location === "/customer/notifications" }
    ];
    
    setNavItems(items);
  }, [location, checkAccess, redirectToLogin]);
  
  // Dashboard title based on route
  const getTitle = () => {
    switch (location) {
      case '/customer': return 'Customer Portal';
      case '/customer/track': return 'Track Complaint';
      case '/customer/notifications': return 'Notifications';
      default: return 'Customer Portal';
    }
  };
  
  return (
    <div className="flex">
      <Sidebar role="customer" />
      <div className="flex-1 ml-64">
        <PageContainer title={getTitle()} navItems={navItems}>
          <Switch>
            <Route path="/customer" component={CustomerDashboard} />
            <Route path="/customer/track">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Track Complaint</h2>
                <p>This section will contain complaint tracking functionality.</p>
              </div>
            </Route>
            <Route path="/customer/notifications">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                <p>This section will contain notification functionality.</p>
              </div>
            </Route>
          </Switch>
        </PageContainer>
      </div>
    </div>
  );
};

export default CustomerPage;
