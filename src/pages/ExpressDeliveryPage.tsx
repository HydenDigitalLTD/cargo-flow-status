import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, Zap, Shield, CheckCircle, Truck, MapPin } from "lucide-react";

const ExpressDeliveryPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Same-day and next-day delivery options available"
    },
    {
      icon: Shield,
      title: "Secure Transit",
      description: "Enhanced security measures for valuable packages"
    },
    {
      icon: Clock,
      title: "Time Guarantee",
      description: "On-time delivery guarantee or your money back"
    },
    {
      icon: MapPin,
      title: "Real-time GPS",
      description: "Live tracking with precise location updates"
    }
  ];

  const plans = [
    {
      name: "Express Standard",
      time: "Next Day",
      price: "$15.99",
      features: ["Next business day delivery", "Basic tracking", "Insurance up to $100", "Standard packaging"]
    },
    {
      name: "Express Priority",
      time: "Same Day",
      price: "$29.99",
      features: ["Same day delivery", "Real-time GPS tracking", "Insurance up to $500", "Priority handling", "SMS notifications"],
      popular: true
    },
    {
      name: "Express Premium",
      time: "2-4 Hours",
      price: "$49.99",
      features: ["Ultra-fast delivery", "Dedicated courier", "Insurance up to $1000", "White-glove service", "Live updates"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-primary rounded-lg">
              <Package className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-primary">DPD Tracking</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button variant="ghost" onClick={() => navigate("/tracking")}>Track Package</Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>Contact</Button>
          </nav>
          <nav className="md:hidden flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button size="sm" variant="ghost" onClick={() => navigate("/contact")}>Contact</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            ⚡ Express Delivery Service
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            Lightning Fast
            <br />
            <span className="text-primary">Express Delivery</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            When time matters most, choose our express delivery service. 
            Get your packages delivered the same day, next day, or within hours.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Zap className="w-5 h-5 mr-2" />
            Get Express Quote
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Express Service Features</h3>
            <p className="text-xl text-muted-foreground">
              Premium features for time-critical deliveries
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Express Delivery Plans</h3>
            <p className="text-xl text-muted-foreground">
              Choose the speed that fits your needs
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
                  <div className="text-sm text-muted-foreground mb-2">Delivery in {plan.time}</div>
                  <div className="text-4xl font-bold text-primary mb-4">{plan.price}</div>
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
                    Select {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">How Express Delivery Works</h3>
            <p className="text-xl text-muted-foreground">
              Simple steps to get your package delivered fast
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                1
              </div>
              <h4 className="text-xl font-semibold mb-3">Book Your Delivery</h4>
              <p className="text-muted-foreground">
                Choose your express service level and schedule pickup online or via phone
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                2
              </div>
              <h4 className="text-xl font-semibold mb-3">Track in Real-time</h4>
              <p className="text-muted-foreground">
                Monitor your package every step of the way with live GPS tracking
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                3
              </div>
              <h4 className="text-xl font-semibold mb-3">Fast Delivery</h4>
              <p className="text-muted-foreground">
                Receive your package within the guaranteed timeframe or get your money back
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Need Express Delivery?</h3>
          <p className="text-xl mb-8 opacity-90">
            Don't wait - get your package delivered today with our express service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Clock className="w-5 h-5 mr-2" />
              Book Express Delivery
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Truck className="w-5 h-5 mr-2" />
              Calculate Shipping Cost
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 md:py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-2 md:gap-3 mb-4">
                <div className="p-1.5 md:p-2 bg-primary rounded-lg">
                  <Package className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-primary">DPD Tracking</h4>
              </div>
              <p className="text-sm md:text-base text-muted-foreground mb-6">
                Leading the way in modern package delivery and tracking solutions worldwide.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3 md:mb-4 text-foreground text-lg md:text-xl">Subscribe to Newsletter</h5>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Get the latest updates on shipping, tracking features, and exclusive offers delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1"
                />
                <Button className="bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
          
          <div className="border-t pt-6 md:pt-8 text-center text-muted-foreground">
            <p className="text-xs md:text-sm">&copy; 2024 DPD Tracking. All rights reserved. Built with ❤️ for better shipping.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExpressDeliveryPage;