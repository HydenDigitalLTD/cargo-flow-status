import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, MapPin, Shield, Clock, Users, Globe, CheckCircle, Star, BarChart3, Zap, Heart, User } from "lucide-react";

const HomePage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      navigate(`/tracking?number=${encodeURIComponent(trackingNumber.trim())}`);
    }
  };

  const features = [
    {
      icon: Package,
      title: "Secure Packaging",
      description: "Your packages are handled with the utmost care and security",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable delivery to your doorstep",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "Track your package every step of the way",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Shield,
      title: "Insurance Coverage",
      description: "All packages are insured for your peace of mind",
      color: "bg-orange-50 text-orange-600"
    }
  ];

  const stats = [
    { icon: Users, label: "Happy Customers", value: "50,000+" },
    { icon: Package, label: "Packages Delivered", value: "2M+" },
    { icon: Globe, label: "Countries Served", value: "25+" },
    { icon: Clock, label: "Average Delivery", value: "2 Days" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      content: "DPD's tracking system is incredibly accurate. I always know exactly where my packages are.",
      rating: 5
    },
    {
      name: "Mike Chen", 
      role: "Online Shopper",
      content: "Fast, reliable, and professional. DPD never disappoints with their delivery service.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "E-commerce Manager", 
      content: "The real-time updates and professional handling make DPD our go-to shipping partner.",
      rating: 5
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
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="container mx-auto px-4 text-center relative">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 animate-fade-in">
            ✨ Most Trusted Delivery Service
          </Badge>
          
          <h2 className="text-6xl font-bold mb-6 text-foreground animate-fade-in bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Track Your Package
            <br />
            <span className="text-4xl text-muted-foreground">with Confidence</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in">
            Experience real-time tracking with our advanced logistics system. 
            Get instant updates, precise delivery estimates, and complete transparency throughout your package journey.
          </p>
          
          <div className="max-w-lg mx-auto bg-card p-6 rounded-2xl shadow-2xl animate-fade-in border">
            <div className="flex gap-3">
              <Input
                placeholder="Enter your tracking number (e.g., WC87631816528)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                className="flex-1 h-12 text-lg"
              />
              <Button onClick={handleTrack} size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 animate-glow">
                <MapPin className="w-5 h-5 mr-2" />
                Track
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-3 text-left">
              💡 Tip: You can also scan QR codes from your delivery receipts
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              🚀 Premium Features
            </Badge>
            <h3 className="text-4xl font-bold mb-6 text-foreground">
              Why Choose DPD?
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our advanced logistics platform designed for modern shipping needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              💬 Customer Love
            </Badge>
            <h3 className="text-4xl font-bold mb-6 text-foreground">
              What Our Customers Say
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from thousands of satisfied customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h3 className="text-4xl font-bold mb-6">
            Ready to Experience Better Shipping?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses and individuals who trust DPD for their shipping needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <BarChart3 className="w-5 h-5 mr-2" />
              Business Solutions
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Heart className="w-5 h-5 mr-2" />
              Personal Shipping
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

export default HomePage;