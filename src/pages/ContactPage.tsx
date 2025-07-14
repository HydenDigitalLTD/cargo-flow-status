import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the contact form data to your backend
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon!"
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-lg md:text-2xl font-bold text-primary">DPD Tracking</h1>
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button variant="ghost" onClick={() => navigate("/tracking")}>Track Package</Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>Contact</Button>
          </nav>
          <nav className="md:hidden flex gap-2">
            <Button size="sm" variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button size="sm" variant="ghost" onClick={() => navigate("/tracking")}>Track</Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Contact Us</h2>
            <p className="text-base md:text-xl text-muted-foreground px-4">
              Get in touch with our support team for any questions or assistance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Send us a Message</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="text-xs md:text-sm font-medium">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your name"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs md:text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs md:text-sm font-medium">Subject</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="How can we help you?"
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs md:text-sm font-medium">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us more about your inquiry..."
                      rows={4}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-4 md:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground mb-2">
                    For general inquiries and support
                  </p>
                  <p className="font-semibold text-sm md:text-base break-words">support@dpd-tracking.com</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    Phone Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground mb-2">
                    Speak directly with our support team
                  </p>
                  <p className="font-semibold text-sm md:text-base">+1 (555) 123-4567</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                    Office Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground mb-2">
                    Visit us at our headquarters
                  </p>
                  <p className="font-semibold text-sm md:text-base">
                    123 Delivery Street<br />
                    Logistics City, LC 12345<br />
                    United States
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <Clock className="w-4 h-4 md:w-5 md:h-5" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-muted-foreground">Monday - Friday:</span>
                      <span className="font-semibold">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-muted-foreground">Saturday:</span>
                      <span className="font-semibold">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-muted-foreground">Sunday:</span>
                      <span className="font-semibold">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

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

export default ContactPage;