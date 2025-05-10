import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { WarModeProvider } from "@/context/WarModeContext";

// Pages
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/login";
import AdminDashboard from "@/pages/admin";
import CSPDashboard from "@/pages/csp";
import FIDashboard from "@/pages/fi";
import AuditorDashboard from "@/pages/auditor";
import BankDashboard from "@/pages/bank";
import CustomerDashboard from "@/pages/customer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/admin/*" component={AdminDashboard} />
      <Route path="/csp/*" component={CSPDashboard} />
      <Route path="/fi/*" component={FIDashboard} />
      <Route path="/auditor/*" component={AuditorDashboard} />
      <Route path="/bank/*" component={BankDashboard} />
      <Route path="/customer/*" component={CustomerDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WarModeProvider>
            <Toaster />
            <Router />
          </WarModeProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
