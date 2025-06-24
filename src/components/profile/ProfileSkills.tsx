
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileSkills = () => {
  const navigate = useNavigate();

  const verifiedSkills = [
    "React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "GraphQL"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verified Skills & Qualifications</CardTitle>
        <CardDescription>Skills and qualifications verified through your uploaded documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Technical Skills</h4>
            <div className="flex flex-wrap gap-2">
              {verifiedSkills.map((skill) => (
                <Badge key={skill} className="bg-green-100 text-green-700">
                  <Shield className="h-3 w-3 mr-1" />
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Verified Documents</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span>Bachelor's Degree - Computer Science</span>
                </div>
                <Badge className="bg-green-100 text-green-700">Verified</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span>AWS Solutions Architect Certificate</span>
                </div>
                <Badge className="bg-green-100 text-green-700">Verified</Badge>
              </div>
            </div>
          </div>

          <Button onClick={() => navigate("/vault")}>
            View All Documents
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSkills;
