import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Users, Heart, Zap, Globe, MapPin, Clock, Briefcase } from "lucide-react";

const CareersPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible schedules and remote work options"
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Collaborative environment where everyone's voice matters"
    },
    {
      icon: Zap,
      title: "Growth Opportunities",
      description: "Professional development and career advancement"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Make a difference in logistics worldwide"
    }
  ];

  const benefits = [
    "Competitive salary and equity packages",
    "Comprehensive health, dental, and vision insurance",
    "Flexible PTO and holiday policy",
    "Professional development budget",
    "Remote work and flexible hours",
    "401(k) with company matching",
    "Free lunch and snacks",
    "Modern office spaces",
    "Team building events and retreats"
  ];

  const openPositions = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      description: "Build scalable systems for our tracking platform"
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "New York, NY / Remote",
      type: "Full-time",
      description: "Lead product strategy for our shipping solutions"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Austin, TX / Remote",
      type: "Full-time",
      description: "Help customers succeed with our platform"
    },
    {
      title: "Data Scientist",
      department: "Data",
      location: "Seattle, WA / Remote",
      type: "Full-time",
      description: "Analyze logistics data to improve operations"
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Los Angeles, CA / Remote",
      type: "Full-time",
      description: "Design intuitive experiences for our users"
    },
    {
      title: "Operations Specialist",
      department: "Operations",
      location: "Chicago, IL",
      type: "Full-time",
      description: "Optimize our shipping and logistics operations"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-primary">DPD Tracking</h1>
          </div>
          <nav className="flex gap-6">
            <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button variant="ghost" onClick={() => navigate("/tracking")}>Track Package</Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>Contact</Button>
            <Button variant="outline" onClick={() => navigate("/auth")}>Admin Login</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            🚀 Join Our Team
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            Build the Future
            <br />
            <span className="text-primary">of Logistics</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join a team of passionate individuals revolutionizing the shipping industry. 
            We're looking for talented people who want to make a global impact.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Briefcase className="w-5 h-5 mr-2" />
            View Open Positions
          </Button>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Work at DPD Tracking?</h3>
            <p className="text-xl text-muted-foreground">
              We believe in creating an environment where everyone can thrive
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Benefits & Perks</h3>
              <p className="text-xl text-muted-foreground">
                We take care of our team members
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Open Positions</h3>
            <p className="text-xl text-muted-foreground">
              Find your next opportunity with us
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {openPositions.map((position, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-semibold">{position.title}</h4>
                      <Badge variant="secondary">{position.type}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{position.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {position.department}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Our Culture</h3>
            <p className="text-xl text-muted-foreground mb-8">
              We're building more than just a company - we're building a community of innovators, 
              problem-solvers, and passionate individuals who believe in the power of logistics 
              to connect the world.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">12</div>
                <div className="text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">4.8★</div>
                <div className="text-muted-foreground">Employee Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Join Our Mission?</h3>
          <p className="text-xl mb-8 opacity-90">
            Don't see the perfect role? We're always looking for exceptional talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Briefcase className="w-5 h-5 mr-2" />
              View All Positions
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Users className="w-5 h-5 mr-2" />
              Send Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 DPD Tracking. All rights reserved. Built with ❤️ for better shipping.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CareersPage;