import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Package, Search, MessageCircle, Phone, Mail, HelpCircle, Clock, Truck, MapPin } from "lucide-react";

const HelpCenterPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: Package,
      title: "Tracking & Delivery",
      description: "Find your package and delivery information",
      count: 12
    },
    {
      icon: Truck,
      title: "Shipping Services",
      description: "Learn about our shipping options",
      count: 8
    },
    {
      icon: MessageCircle,
      title: "Account & Billing",
      description: "Manage your account and payments",
      count: 6
    },
    {
      icon: HelpCircle,
      title: "General Support",
      description: "Common questions and answers",
      count: 10
    }
  ];

  const faqs = [
    {
      question: "How do I track my package?",
      answer: "Enter your tracking number on our homepage or tracking page. You'll see real-time updates about your package location and delivery status."
    },
    {
      question: "What shipping options do you offer?",
      answer: "We offer Standard (3-5 days), Express (1-2 days), and Same-Day delivery options. International shipping is also available to 25+ countries."
    },
    {
      question: "How much does shipping cost?",
      answer: "Shipping costs depend on package size, weight, destination, and service level. Use our shipping calculator for accurate pricing."
    },
    {
      question: "What if my package is lost or damaged?",
      answer: "All packages include insurance coverage. Contact our support team immediately to file a claim and we'll investigate and resolve the issue."
    },
    {
      question: "Can I change my delivery address?",
      answer: "You can change the delivery address before the package is out for delivery. Contact support or use our online portal to make changes."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 25 countries worldwide. International delivery times vary by destination and service level."
    },
    {
      question: "How do I schedule a pickup?",
      answer: "Schedule pickups online through your account dashboard or call our support team. We offer same-day pickup in most areas."
    },
    {
      question: "What items cannot be shipped?",
      answer: "Prohibited items include hazardous materials, perishable goods, and illegal substances. See our full restrictions list for details."
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      availability: "24/7 available",
      action: "Start Chat"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly",
      availability: "Mon-Fri 8AM-8PM",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email",
      availability: "Response within 24hrs",
      action: "Send Email"
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
            <h1 className="text-lg md:text-2xl font-bold text-primary">GL Express</h1>
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
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            💡 Help Center
          </Badge>
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            How Can We
            <br />
            <span className="text-primary">Help You Today?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers to common questions, get support, and learn more about our services
          </p>
          
          {/* Search */}
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Browse Help Topics</h3>
            <p className="text-xl text-muted-foreground">
              Find answers organized by category
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <category.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">{category.title}</h4>
                <p className="text-muted-foreground text-sm mb-3">{category.description}</p>
                <Badge variant="secondary">{category.count} articles</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Need More Help?</h3>
            <p className="text-xl text-muted-foreground">
              Our support team is here to assist you
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <option.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-2">{option.title}</h4>
                <p className="text-muted-foreground mb-2">{option.description}</p>
                <Badge variant="outline" className="mb-4">{option.availability}</Badge>
                <Button className="w-full" variant="outline">
                  {option.action}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Quick Actions</h3>
          <p className="text-xl mb-8 opacity-90">
            Common tasks you might want to do
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={() => navigate("/tracking")}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Track a Package
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => navigate("/contact")}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
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
                <h4 className="text-lg md:text-xl font-bold text-primary">GL Express</h4>
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
            <p className="text-xs md:text-sm">&copy; 2024 GL Express. All rights reserved. Built with ❤️ for better shipping.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenterPage;