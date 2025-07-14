import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, FileText, Download, ExternalLink, Award } from "lucide-react";

const PressPage = () => {
  const navigate = useNavigate();

  const pressReleases = [
    {
      date: "March 15, 2024",
      title: "DPD Tracking Raises $50M Series B to Expand Global Operations",
      excerpt: "Funding will accelerate international expansion and enhance AI-powered tracking capabilities",
      category: "Funding"
    },
    {
      date: "February 28, 2024",
      title: "DPD Tracking Launches AI-Powered Delivery Prediction Service",
      excerpt: "New machine learning algorithms predict delivery times with 99.2% accuracy",
      category: "Product"
    },
    {
      date: "January 12, 2024",
      title: "DPD Tracking Expands to 10 New Countries in Europe",
      excerpt: "Strategic expansion brings total coverage to 25 countries worldwide",
      category: "Expansion"
    },
    {
      date: "December 8, 2023",
      title: "DPD Tracking Named 'Logistics Innovation of the Year'",
      excerpt: "Industry recognition for revolutionary package tracking technology",
      category: "Awards"
    },
    {
      date: "November 20, 2023",
      title: "DPD Tracking Reaches 2 Million Packages Delivered Milestone",
      excerpt: "Company celebrates major delivery milestone and 500% year-over-year growth",
      category: "Milestone"
    },
    {
      date: "October 5, 2023",
      title: "DPD Tracking Partners with Major E-commerce Platforms",
      excerpt: "New integrations with leading online retailers streamline shipping process",
      category: "Partnership"
    }
  ];

  const awards = [
    {
      year: "2024",
      title: "Best Logistics Technology",
      organization: "TechCrunch Disrupt",
      description: "Recognized for innovative tracking solutions"
    },
    {
      year: "2023",
      title: "Logistics Innovation of the Year",
      organization: "Supply Chain Excellence Awards",
      description: "Outstanding achievement in supply chain technology"
    },
    {
      year: "2023",
      title: "Rising Star Award",
      organization: "Global Shipping Summit",
      description: "Fastest growing logistics technology company"
    }
  ];

  const resources = [
    {
      title: "Company Logo Pack",
      description: "High-resolution logos in various formats",
      type: "ZIP",
      size: "2.4 MB"
    },
    {
      title: "Executive Headshots",
      description: "Professional photos of leadership team",
      type: "ZIP",
      size: "8.1 MB"
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics and company information",
      type: "PDF",
      size: "1.2 MB"
    },
    {
      title: "Product Screenshots",
      description: "High-quality product interface images",
      type: "ZIP",
      size: "15.3 MB"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Funding": "bg-green-100 text-green-800",
      "Product": "bg-blue-100 text-blue-800",
      "Expansion": "bg-purple-100 text-purple-800",
      "Awards": "bg-yellow-100 text-yellow-800",
      "Milestone": "bg-orange-100 text-orange-800",
      "Partnership": "bg-pink-100 text-pink-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
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
            📰 Press & Media
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            Latest News
            <br />
            <span className="text-primary">& Updates</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Stay up to date with the latest developments, announcements, 
            and milestones from DPD Tracking.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <FileText className="w-5 h-5 mr-2" />
            Media Kit
          </Button>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Recent Press Releases</h3>
            <p className="text-xl text-muted-foreground">
              Latest announcements and company news
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={getCategoryColor(release.category)}>
                        {release.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {release.date}
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold mb-2">{release.title}</h4>
                    <p className="text-muted-foreground">{release.excerpt}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Awards & Recognition</h3>
            <p className="text-xl text-muted-foreground">
              Industry recognition for our innovative solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {awards.map((award, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <div className="text-sm font-semibold text-primary mb-2">{award.year}</div>
                <h4 className="text-lg font-semibold mb-2">{award.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{award.organization}</p>
                <p className="text-xs text-muted-foreground">{award.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Media Resources</h3>
            <p className="text-xl text-muted-foreground">
              Download assets for your stories and articles
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {resources.map((resource, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2">{resource.title}</h4>
                    <p className="text-muted-foreground text-sm mb-2">{resource.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{resource.type}</span>
                      <span>{resource.size}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Media Inquiries</h3>
            <p className="text-xl text-muted-foreground mb-8">
              For press inquiries, interviews, or additional information, 
              please contact our media relations team.
            </p>
            
            <Card className="p-8">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Media Relations</h4>
                  <p className="text-muted-foreground">press@dpdtracking.com</p>
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-muted-foreground">+1 (555) 123-PRESS</p>
                </div>
                <div>
                  <h4 className="font-semibold">Response Time</h4>
                  <p className="text-muted-foreground">Within 24 hours</p>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                Contact Media Team
              </Button>
            </Card>
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

export default PressPage;