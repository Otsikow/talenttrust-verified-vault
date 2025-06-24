
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Users, FileText, Briefcase, Search, GraduationCap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/91251101-60fc-418a-a053-cf2e636fde36.png" alt="TrustTalent Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold text-gray-900">TrustTalent</span>
            <Badge variant="secondary" className="ml-2">TalentTrust Edition</Badge>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/register")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Verify. Trust. Hire.
            <span className="block text-blue-600 mt-2">The Future of Talent Verification</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            TrustTalent revolutionizes hiring and admissions with AI-powered verification of degrees, certificates, 
            references, and work samples. Build trust, reduce fraud, make confident decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4" onClick={() => navigate("/register?role=seeker")}>
              <Users className="mr-2 h-5 w-5" />
              I'm Looking for Work
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4" onClick={() => navigate("/register?role=employer")}>
              <Briefcase className="mr-2 h-5 w-5" />
              I'm Hiring Talent
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" onClick={() => navigate("/register?role=university")}>
              <GraduationCap className="mr-2 h-5 w-5" />
              University
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why TrustTalent?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-blue-100 hover:border-blue-200 transition-colors">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>AI-Powered Verification</CardTitle>
              <CardDescription>
                Our TalentTrust Engine verifies degrees, certificates, licenses, and work samples with 99.7% accuracy
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-green-100 hover:border-green-200 transition-colors">
            <CardHeader>
              <FileText className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Secure Document Vault</CardTitle>
              <CardDescription>
                Store, organize, and share verified credentials securely. One-click application attachments
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-purple-100 hover:border-purple-200 transition-colors">
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Trusted by Top Organizations</CardTitle>
              <CardDescription>
                Join thousands of employers and universities using verified credential data to make better decisions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How TrustTalent Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">For Job Seekers</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Upload Your Documents</h4>
                    <p className="text-gray-600">Add degrees, certificates, licenses, and work samples to your secure vault</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Get Verified</h4>
                    <p className="text-gray-600">Our AI verifies your credentials with issuing institutions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Apply with Confidence</h4>
                    <p className="text-gray-600">One-click application with verified credentials stands out</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-green-600">For Employers</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Post Verified Jobs</h4>
                    <p className="text-gray-600">Specify verification requirements for your positions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Filter Verified Candidates</h4>
                    <p className="text-gray-600">See only candidates with verified credentials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Hire with Trust</h4>
                    <p className="text-gray-600">Make confident decisions with verified talent data</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-purple-600">For Universities</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Bulk Verification</h4>
                    <p className="text-gray-600">Process multiple applicant credentials simultaneously</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Fraud Detection</h4>
                    <p className="text-gray-600">Identify forged documents and prevent admission fraud</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Streamline Admissions</h4>
                    <p className="text-gray-600">Make faster, more confident admission decisions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Process?</h2>
          <p className="text-xl mb-8 opacity-90">Join the verified credential revolution today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate("/register?role=seeker")}>
              Start as Job Seeker
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" onClick={() => navigate("/register?role=employer")}>
              Start as Employer
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600" onClick={() => navigate("/register?role=university")}>
              Start as University
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/lovable-uploads/91251101-60fc-418a-a053-cf2e636fde36.png" alt="TrustTalent Logo" className="h-6 w-6" />
              <span className="text-lg font-semibold">TrustTalent</span>
            </div>
            <p className="text-gray-400">© 2024 TrustTalent. Powered by TalentTrust Engine.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
