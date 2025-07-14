import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Globe, Plane, Ship, CheckCircle, FileText, Shield } from "lucide-react";

const InternationalShippingPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Plane,
      title: "Air Freight",
      time: "3-7 Days",
      description: "Fast international delivery via air transport"
    },
    {
      icon: Ship,
      title: "Sea Freight",
      time: "15-30 Days",
      description: "Cost-effective shipping for large packages"
    },
    {
      icon: Globe,
      title: "Express Global",
      time: "1-3 Days",
      description: "Premium express service worldwide"
    }
  ];

  const countries = [
    "United States", "Canada", "United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands",
    "Australia", "Japan", "South Korea", "Singapore", "China", "India", "Brazil", "Mexico",
    "Sweden", "Norway", "Denmark", "Belgium", "Switzerland", "Austria", "Poland", "Ireland",
    "New Zealand"
  ];

  const features = [
    {
      icon: FileText,
      title: "Customs Clearance",
      description: "We handle all customs documentation and clearance processes"
    },
    {
      icon: Shield,
      title: "International Insurance",
      description: "Comprehensive coverage for international shipments"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Partnerships with trusted carriers worldwide"
    },
    {
      icon: CheckCircle,
      title: "Duty & Tax Calculation",
      description: "Transparent duty and tax calculations upfront"
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
            🌍 International Shipping
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            Ship Anywhere
            <br />
            <span className="text-primary">Around the World</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect globally with our comprehensive international shipping services. 
            We make cross-border shipping simple, reliable, and cost-effective.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Globe className="w-5 h-5 mr-2" />
            Get International Quote
          </Button>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">International Services</h3>
            <p className="text-xl text-muted-foreground">
              Choose the best shipping method for your needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <Badge variant="secondary" className="mt-2">{service.time}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                  <Button className="w-full mt-4" variant="outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Choose Our International Service</h3>
            <p className="text-xl text-muted-foreground">
              We handle the complexities of international shipping
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Countries */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Countries We Serve</h3>
            <p className="text-xl text-muted-foreground">
              We ship to over 25 countries worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {countries.map((country, index) => (
              <div key={index} className="text-center p-3 bg-card rounded-lg border hover:shadow-md transition-shadow">
                <div className="text-sm font-medium">{country}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">How International Shipping Works</h3>
            <p className="text-xl text-muted-foreground">
              Simple steps for worldwide delivery
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                1
              </div>
              <h4 className="text-lg font-semibold mb-3">Package & Documentation</h4>
              <p className="text-muted-foreground text-sm">
                Prepare your package and provide necessary customs documentation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                2
              </div>
              <h4 className="text-lg font-semibold mb-3">Customs Clearance</h4>
              <p className="text-muted-foreground text-sm">
                We handle customs processing and clearance in both countries
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                3
              </div>
              <h4 className="text-lg font-semibold mb-3">International Transit</h4>
              <p className="text-muted-foreground text-sm">
                Your package travels via our global network of trusted partners
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                4
              </div>
              <h4 className="text-lg font-semibold mb-3">Final Delivery</h4>
              <p className="text-muted-foreground text-sm">
                Local delivery to the recipient's address with tracking updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Ship Internationally?</h3>
          <p className="text-xl mb-8 opacity-90">
            Get started with our international shipping service today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <FileText className="w-5 h-5 mr-2" />
              Calculate Shipping Cost
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Globe className="w-5 h-5 mr-2" />
              View Shipping Zones
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary rounded-lg">
                  <Package className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-bold text-primary">DPD Tracking</h4>
              </div>
              <p className="text-muted-foreground">
                Leading the way in modern package delivery and tracking solutions worldwide.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-foreground">Services</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/tracking" className="hover:text-primary transition-colors">Package Tracking</Link></li>
                <li><Link to="/express-delivery" className="hover:text-primary transition-colors">Express Delivery</Link></li>
                <li><Link to="/international-shipping" className="hover:text-primary transition-colors">International Shipping</Link></li>
                <li><Link to="/business-solutions" className="hover:text-primary transition-colors">Business Solutions</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-foreground">Support</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/help-center" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link to="/tracking" className="hover:text-primary transition-colors">Track Package</Link></li>
                <li><Link to="/shipping-calculator" className="hover:text-primary transition-colors">Shipping Calculator</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-foreground">Company</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link to="/press" className="hover:text-primary transition-colors">Press</Link></li>
                <li><Link to="/partnerships" className="hover:text-primary transition-colors">Partnerships</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 DPD Tracking. All rights reserved. Built with ❤️ for better shipping.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InternationalShippingPage;