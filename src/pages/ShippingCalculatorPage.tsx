import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Calculator, Truck, Plane, Ship, CheckCircle } from "lucide-react";

const ShippingCalculatorPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fromZip: "",
    toZip: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    serviceType: ""
  });
  const [results, setResults] = useState<any>(null);

  const serviceTypes = [
    { value: "standard", label: "Standard (3-5 days)", icon: Truck },
    { value: "express", label: "Express (1-2 days)", icon: Plane },
    { value: "overnight", label: "Overnight", icon: Plane },
    { value: "international", label: "International", icon: Ship }
  ];

  const handleCalculate = () => {
    // Mock calculation - in real app, this would call an API
    const mockResults = [
      {
        service: "Standard",
        time: "3-5 business days",
        price: "$12.99",
        features: ["Basic tracking", "Insurance up to $100"]
      },
      {
        service: "Express",
        time: "1-2 business days",
        price: "$24.99",
        features: ["Priority handling", "Advanced tracking", "Insurance up to $500"]
      },
      {
        service: "Overnight",
        time: "Next business day",
        price: "$39.99",
        features: ["Overnight delivery", "Real-time tracking", "Insurance up to $1000", "Signature required"]
      }
    ];
    
    setResults(mockResults);
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
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            📊 Shipping Calculator
          </Badge>
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Calculate Shipping
            <br />
            <span className="text-primary">Costs & Times</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get instant shipping quotes for all service levels. 
            Compare prices and delivery times to choose the best option.
          </p>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Shipping Calculator</CardTitle>
                <CardDescription>Enter your package details to get accurate shipping quotes</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* From/To Locations */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">From ZIP Code</label>
                    <Input
                      placeholder="Enter origin ZIP"
                      value={formData.fromZip}
                      onChange={(e) => setFormData({...formData, fromZip: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">To ZIP Code</label>
                    <Input
                      placeholder="Enter destination ZIP"
                      value={formData.toZip}
                      onChange={(e) => setFormData({...formData, toZip: e.target.value})}
                    />
                  </div>
                </div>

                {/* Package Dimensions */}
                <div>
                  <label className="block text-sm font-medium mb-2">Package Dimensions</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Input
                      placeholder="Weight (lbs)"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    />
                    <Input
                      placeholder="Length (in)"
                      value={formData.length}
                      onChange={(e) => setFormData({...formData, length: e.target.value})}
                    />
                    <Input
                      placeholder="Width (in)"
                      value={formData.width}
                      onChange={(e) => setFormData({...formData, width: e.target.value})}
                    />
                    <Input
                      placeholder="Height (in)"
                      value={formData.height}
                      onChange={(e) => setFormData({...formData, height: e.target.value})}
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Service (Optional)</label>
                  <Select value={formData.serviceType} onValueChange={(value) => setFormData({...formData, serviceType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleCalculate} className="w-full h-12 text-lg bg-primary hover:bg-primary/90">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Shipping Cost
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results */}
      {results && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Shipping Options</h3>
                <p className="text-muted-foreground">Choose the best option for your needs</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {results.map((result: any, index: number) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl">{result.service}</CardTitle>
                      <div className="text-3xl font-bold text-primary">{result.price}</div>
                      <Badge variant="secondary">{result.time}</Badge>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {result.features.map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-4" variant="outline">
                        Select This Option
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tips Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">Shipping Tips</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-3">💡 Save on Shipping</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use the smallest box that fits your item</li>
                  <li>• Consider standard shipping for non-urgent items</li>
                  <li>• Bundle multiple items when possible</li>
                  <li>• Check for volume discounts</li>
                </ul>
              </Card>
              
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-3">📦 Packaging Tips</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use proper padding for fragile items</li>
                  <li>• Ensure the box is completely sealed</li>
                  <li>• Include accurate return addresses</li>
                  <li>• Consider insurance for valuable items</li>
                </ul>
              </Card>
            </div>
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

export default ShippingCalculatorPage;