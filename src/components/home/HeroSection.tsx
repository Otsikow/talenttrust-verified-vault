
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, GraduationCap } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/b8a6fda3-fb40-401f-9849-f444a08bec9b.png" 
            alt="TrustTalent Logo" 
            className="mx-auto h-16 sm:h-20 w-auto"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Verify. Trust. Hire.
          <span className="block text-blue-600 mt-2">The Future of Talent Verification</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          TrustTalent uses AI to instantly verify degrees, certificates, and references for hiring and admissions. Reduce fraud, build trust, and make confident decisions—fast.
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
          <Button size="lg" variant="outline" className="text-lg px-8 py-4" onClick={() => navigate("/register?role=university")}>
            <GraduationCap className="mr-2 h-5 w-5" />
            University
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
