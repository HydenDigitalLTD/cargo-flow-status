import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Handshake, Globe, Building, Zap, CheckCircle, Users, Award } from "lucide-react";

const PartnershipsPage = () => {
  const navigate = useNavigate();

  const partnerTypes = [
    {
      icon: Building,
      title: "Technology Partners",
      description: "Integrate our shipping APIs into your platform",
      benefits: ["API access", "Technical support", "Revenue sharing", "Co-marketing opportunities"]
    },
    {
      icon: Globe,
      title: "Logistics Partners",
      description: "Expand our global delivery network",
      benefits: ["Route optimization", "Shared resources", "Regional expertise", "Cost efficiency"]
    },
    {
      icon: Users,
      title: "Reseller Partners",
      description: "Sell our services to your customers",
      benefits: ["Commission structure", "Sales materials", "Training programs", "Lead sharing"]
    }
  ];

  const currentPartners = [
    {
      name: "ShipTech Solutions",
      type: "Technology",
      description: "API integration for e-commerce platforms",
      logo: "🚀"
    },
    {
      name: "Global Logistics Corp",
      type: "Logistics",
      description: "International shipping network",
      logo: "🌍"
    },
    {
      name: "EcommercePro",
      type: "Technology",
      description: "Integrated shipping solutions",
      logo: "🛒"
    },
    {
      name: "FastTrack Delivery",
      type: "Logistics",
      description: "Last-mile delivery services",
      logo: "📦"
    },
    {
      name: "RetailMax",
      type: "Reseller",
      description: "Enterprise shipping solutions",
      logo: "🏪"
    },
    {
      name: "CloudShip",
      type: "Technology",
      description: "Cloud-based shipping platform",
      logo: "☁️"
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Accelerated Growth",
      description: "Leverage our platform to grow your business faster"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access our worldwide shipping network"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Partner with an award-winning logistics company"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Get priority support from our partnership team"
    }
  ];

  const requirements = [
    "Established business with proven track record",
    "Alignment with our values and quality standards",
    "Technical capability to integrate our solutions",
    "Commitment to customer satisfaction",
    "Geographic presence in target markets",
    "Financial stability and growth potential"
  ];

  const getPartnerTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "Technology": "bg-blue-100 text-blue-800",
      "Logistics": "bg-green-100 text-green-800",
      "Reseller": "bg-purple-100 text-purple-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

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
            🤝 Strategic Partnerships
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            Partner With Us
            <br />
            <span className="text-primary">Shape the Future</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join our growing network of partners and help revolutionize the logistics industry. 
            Together, we can create better shipping experiences for everyone.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Handshake className="w-5 h-5 mr-2" />
            Become a Partner
          </Button>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Partnership Opportunities</h3>
            <p className="text-xl text-muted-foreground">
              Choose the partnership model that fits your business
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {partnerTypes.map((type, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <type.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <CardDescription className="text-base">{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {type.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4" variant="outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Partners</h3>
            <p className="text-xl text-muted-foreground">
              Trusted partners helping us deliver excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPartners.map((partner, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{partner.logo}</div>
                  <div>
                    <h4 className="text-lg font-semibold">{partner.name}</h4>
                    <Badge className={getPartnerTypeColor(partner.type)}>
                      {partner.type}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{partner.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Partnership Benefits</h3>
            <p className="text-xl text-muted-foreground">
              What you gain by partnering with us
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-3">{benefit.title}</h4>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Partnership Requirements</h3>
              <p className="text-xl text-muted-foreground">
                What we look for in potential partners
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Partnership Process</h3>
            <p className="text-xl text-muted-foreground">
              How to become our partner
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                1
              </div>
              <h4 className="text-lg font-semibold mb-3">Apply</h4>
              <p className="text-muted-foreground text-sm">
                Submit your partnership application with company details
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                2
              </div>
              <h4 className="text-lg font-semibold mb-3">Review</h4>
              <p className="text-muted-foreground text-sm">
                Our team reviews your application and business compatibility
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                3
              </div>
              <h4 className="text-lg font-semibold mb-3">Discussion</h4>
              <p className="text-muted-foreground text-sm">
                Schedule meetings to discuss partnership terms and benefits
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                4
              </div>
              <h4 className="text-lg font-semibold mb-3">Launch</h4>
              <p className="text-muted-foreground text-sm">
                Sign agreements and begin our partnership journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Partner With Us?</h3>
          <p className="text-xl mb-8 opacity-90">
            Let's explore how we can grow together and create mutual success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Handshake className="w-5 h-5 mr-2" />
              Apply for Partnership
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Users className="w-5 h-5 mr-2" />
              Schedule a Call
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

export default PartnershipsPage;