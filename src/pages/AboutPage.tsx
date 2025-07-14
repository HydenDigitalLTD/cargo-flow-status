import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Users, Globe, Award, Truck, MapPin, Heart, Target } from "lucide-react";

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Every decision we make puts our customers at the center"
    },
    {
      icon: Target,
      title: "Reliability",
      description: "Consistent, dependable service you can count on"
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "Constantly improving through technology and innovation"
    },
    {
      icon: Users,
      title: "Team Excellence",
      description: "Our skilled team makes the difference every day"
    }
  ];

  const timeline = [
    { year: "2020", title: "Company Founded", description: "Started with a vision to revolutionize package tracking" },
    { year: "2021", title: "First Million Packages", description: "Reached our first major milestone" },
    { year: "2022", title: "International Expansion", description: "Expanded to serve 25+ countries worldwide" },
    { year: "2023", title: "AI Integration", description: "Launched AI-powered tracking predictions" },
    { year: "2024", title: "50,000+ Customers", description: "Serving businesses and individuals globally" }
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
            <Button variant="outline" onClick={() => navigate("/auth")}>Admin Login</Button>
          </nav>
          <nav className="md:hidden flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button size="sm" variant="outline" onClick={() => navigate("/auth")}>Login</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 md:mb-6 bg-primary/10 text-primary border-primary/20 text-xs md:text-sm">
            🏢 About DPD Tracking
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-foreground">
            Connecting the World
            <br />
            <span className="text-primary">One Package at a Time</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            We're revolutionizing the logistics industry with cutting-edge technology, 
            exceptional service, and an unwavering commitment to customer satisfaction.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <Card className="p-6 md:p-8">
              <CardHeader>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl md:text-3xl mb-3 md:mb-4">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base md:text-lg text-muted-foreground">
                  To provide the most reliable, transparent, and efficient package tracking 
                  and delivery services, empowering businesses and individuals to stay connected 
                  with what matters most to them.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 md:p-8">
              <CardHeader>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Award className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <CardTitle className="text-2xl md:text-3xl mb-3 md:mb-4">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base md:text-lg text-muted-foreground">
                  To become the global leader in logistics technology, setting new standards 
                  for transparency, reliability, and customer experience in the shipping industry.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Our Core Values</h3>
            <p className="text-base md:text-xl text-muted-foreground px-4">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <value.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{value.title}</h4>
                <p className="text-sm md:text-base text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Our Journey</h3>
            <p className="text-base md:text-xl text-muted-foreground px-4">
              Key milestones in our growth story
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4 md:gap-6 mb-6 md:mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm md:text-base">
                    {item.year.slice(-2)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-px h-12 md:h-16 bg-border mt-3 md:mt-4"></div>
                  )}
                </div>
                <div className="flex-1 pb-6 md:pb-8">
                  <div className="bg-card p-4 md:p-6 rounded-lg border">
                    <div className="text-xs md:text-sm text-primary font-semibold mb-1">{item.year}</div>
                    <h4 className="text-lg md:text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm md:text-base text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">50,000+</div>
              <div className="text-xs md:text-base text-primary-foreground/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">2M+</div>
              <div className="text-xs md:text-base text-primary-foreground/80">Packages Delivered</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">25+</div>
              <div className="text-xs md:text-base text-primary-foreground/80">Countries Served</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">99.9%</div>
              <div className="text-xs md:text-base text-primary-foreground/80">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-12 md:py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 md:gap-3 mb-4">
                <div className="p-1.5 md:p-2 bg-primary rounded-lg">
                  <Package className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                </div>
                <h4 className="text-lg md:text-xl font-bold text-primary">DPD Tracking</h4>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Leading the way in modern package delivery and tracking solutions worldwide.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3 md:mb-4 text-foreground text-sm md:text-base">Services</h5>
              <ul className="space-y-1 md:space-y-2 text-muted-foreground text-sm md:text-base">
                <li><Link to="/tracking" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Package Tracking</Link></li>
                <li><Link to="/express-delivery" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Express Delivery</Link></li>
                <li><Link to="/international-shipping" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">International Shipping</Link></li>
                <li><Link to="/business-solutions" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Business Solutions</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3 md:mb-4 text-foreground text-sm md:text-base">Support</h5>
              <ul className="space-y-1 md:space-y-2 text-muted-foreground text-sm md:text-base">
                <li><Link to="/help-center" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link to="/tracking" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Track Package</Link></li>
                <li><Link to="/shipping-calculator" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Shipping Calculator</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-3 md:mb-4 text-foreground text-sm md:text-base">Company</h5>
              <ul className="space-y-1 md:space-y-2 text-muted-foreground text-sm md:text-base">
                <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/careers" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link to="/press" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Press</Link></li>
                <li><Link to="/partnerships" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Partnerships</Link></li>
              </ul>
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

export default AboutPage;