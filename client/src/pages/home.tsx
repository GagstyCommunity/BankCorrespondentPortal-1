import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-primary font-bold text-2xl">Fia Global</div>
              <div className="ml-2 text-accent text-sm font-semibold">CSP Portal</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-primary">Home</a>
              <a href="#" className="text-gray-600 hover:text-primary">How It Works</a>
              <a href="#" className="text-gray-600 hover:text-primary">Become a CSP</a>
              <a href="#" className="text-gray-600 hover:text-primary">Customer Corner</a>
              <a href="#" className="text-gray-600 hover:text-primary">CSR Impact</a>
              <a href="#" className="text-gray-600 hover:text-primary">Contact</a>
            </nav>
            <div>
              {isAuthenticated ? (
                <Link href={`/${user?.role?.toLowerCase()}`}>
                  <Button>Go to Dashboard</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Banking for Rural India</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Fia Global's CSP Portal empowers banking correspondents to provide essential financial services to underserved communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg">Learn More</Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
              Become a CSP
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">AEPS & mATM</h3>
              <p className="text-gray-600">
                Biometric-based banking and card-based transactions, bringing banking to every village.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Bill Payments</h3>
              <p className="text-gray-600">
                BBPS services for utility bills, recharges, and more, all under one platform.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">KYC & Onboarding</h3>
              <p className="text-gray-600">
                Secure customer verification and account opening services for rural populations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-accent/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Financial Inclusion Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">30,000+</div>
              <p className="text-gray-600">CSP Agents</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">12M+</div>
              <p className="text-gray-600">Rural Customers Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">₹320Cr+</div>
              <p className="text-gray-600">Monthly Transactions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">18</div>
              <p className="text-gray-600">Partner Banks</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Customer Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">For Customers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-4">Verify CSP Authenticity</h3>
              <p className="text-gray-600 mb-6">
                Ensure you're dealing with authorized Fia Global CSP agents by verifying their credentials.
              </p>
              <Button>Scan QR Code</Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-4">Report an Issue</h3>
              <p className="text-gray-600 mb-6">
                Facing problems with a transaction or have concerns about a CSP? Let us know.
              </p>
              <Button>File Complaint</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Fia Global</h3>
              <p className="text-gray-400">
                Empowering financial inclusion through banking correspondent services.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Become a CSP</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Help & Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Customer Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-400 mb-2">Fia Global Headquarters</p>
              <p className="text-gray-400 mb-2">Mumbai, India</p>
              <p className="text-gray-400 mb-2">support@fiaglobal.com</p>
              <p className="text-gray-400">+91 1800-XXX-XXXX</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Fia Global. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
