import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Building, BarChart3, Users, Zap, Shield, Globe, CheckCircle } from "lucide-react";

const BusinessSolutionsPage = () => {
  const navigate = useNavigate();

  const solutions = [
    {
      icon: Building,
      title: "Enterprise Shipping",
      description: "Scalable shipping solutions for large enterprises",
      features: ["Volume discounts", "Dedicated account manager", "Priority support", "Custom integrations"]
    },
    {
      icon: BarChart3,
      title: "E-commerce Integration",
      description: "Seamless integration with popular e-commerce platforms",
      features: ["API integration", "Automated shipping", "Order management", "Real-time tracking"]
    },
    {
      icon: Globe,
      title: "Supply Chain Management",
      description: "End-to-end supply chain optimization",
      features: ["Inventory management", "Demand forecasting", "Route optimization", "Performance analytics"]
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "$99/month",
      packages: "Up to 500 packages",
      features: ["Basic API access", "Standard tracking", "Email support", "Basic analytics"],
      popular: false
    },
    {
      name: "Professional",
      price: "$299/month",
      packages: "Up to 2,000 packages",
      features: ["Advanced API", "Priority tracking", "Phone & email support", "Advanced analytics", "Custom branding"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      packages: "Unlimited packages",
      features: ["Full API suite", "White-label solution", "Dedicated support", "Custom reports", "SLA guarantee"],
      popular: false
    }
  ];

  const integrations = [
    "Shopify", "WooCommerce", "Magento", "BigCommerce", "Amazon", "eBay", 
    "Salesforce", "SAP", "Oracle", "Microsoft Dynamics", "Zapier", "REST API"
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Increased Efficiency",
      description: "Automate your shipping processes and reduce manual work by up to 80%"
    },
    {
      icon: BarChart3,
      title: "Cost Savings",
      description: "Save up to 30% on shipping costs with our volume discounts and route optimization"
    },
    {
      icon: Users,
      title: "Better Customer Experience",
      description: "Provide real-time tracking and delivery updates to improve customer satisfaction"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Comprehensive insurance and tracking to minimize lost or damaged packages"
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
            🏢 Business Solutions
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            Powerful Shipping
            <br />
            <span className="text-primary">For Your Business</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Scale your business with our enterprise-grade shipping solutions. 
            From startups to Fortune 500 companies, we have the tools you need.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Building className="w-5 h-5 mr-2" />
            Schedule Demo
          </Button>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Business Solutions</h3>
            <p className="text-xl text-muted-foreground">
              Tailored solutions for every business need
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <solution.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                  <CardDescription className="text-base">{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Business Benefits</h3>
            <p className="text-xl text-muted-foreground">
              Transform your shipping operations
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

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Business Plans</h3>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your business size
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`p-6 relative ${plan.popular ? 'ring-2 ring-primary shadow-xl scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">{plan.packages}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : `Start ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Easy Integrations</h3>
            <p className="text-xl text-muted-foreground">
              Connect with your existing tools and platforms
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {integrations.map((integration, index) => (
              <div key={index} className="text-center p-4 bg-card rounded-lg border hover:shadow-md transition-shadow">
                <div className="text-sm font-medium">{integration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Scale Your Business?</h3>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how our solutions can transform your shipping operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Users className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Pricing
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

export default BusinessSolutionsPage;