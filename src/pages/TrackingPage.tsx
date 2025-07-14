import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { Package, Clock, MapPin, CheckCircle, XCircle, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TrackingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get("number") || "");
  const [packageData, setPackageData] = useState<any>(null);
  const [statusHistory, setStatusHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const statusIcons = {
    registered: Package,
    ready_for_pickup: Clock,
    in_transit: Truck,
    out_for_delivery: MapPin,
    delivered: CheckCircle,
    failed_delivery: XCircle,
    returned: XCircle
  };

  const statusColors = {
    registered: "secondary",
    ready_for_pickup: "outline",
    in_transit: "default",
    out_for_delivery: "default",
    delivered: "default",
    failed_delivery: "destructive",
    returned: "destructive"
  };

  useEffect(() => {
    if (trackingNumber) {
      searchPackage(trackingNumber);
    }
  }, []);

  const searchPackage = async (number: string) => {
    if (!number.trim()) return;
    
    setLoading(true);
    try {
      // Get package data
      const { data: packageData, error: packageError } = await supabase
        .from("packages")
        .select("*")
        .eq("tracking_number", number.trim())
        .single();

      if (packageError || !packageData) {
        toast({
          title: "Package Not Found",
          description: "No package found with this tracking number.",
          variant: "destructive"
        });
        setPackageData(null);
        setStatusHistory([]);
        return;
      }

      // Get status history
      const { data: historyData, error: historyError } = await supabase
        .from("package_status_history")
        .select("*")
        .eq("package_id", packageData.id)
        .order("created_at", { ascending: true });

      setPackageData(packageData);
      setStatusHistory(historyData || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch package information.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = () => {
    searchPackage(trackingNumber);
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
            <Button size="sm" variant="ghost" onClick={() => navigate("/contact")}>Contact</Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Search Section */}
        <Card className="mb-6 md:mb-8">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Track Your Package</CardTitle>
            <CardDescription className="text-sm md:text-base">Enter your tracking number to get the latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                className="flex-1"
              />
              <Button onClick={handleTrack} disabled={loading} className="w-full sm:w-auto">
                {loading ? "Searching..." : "Track"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Package Information */}
        {packageData && (
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Package Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Package className="w-4 h-4 md:w-5 md:h-5" />
                  Package Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Tracking Number</p>
                  <p className="font-mono font-semibold text-sm md:text-base">{packageData.tracking_number}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Current Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    {(() => {
                      const Icon = statusIcons[packageData.current_status as keyof typeof statusIcons];
                      return <Icon className="w-4 h-4" />;
                    })()}
                    <Badge variant={statusColors[packageData.current_status as keyof typeof statusColors] as any} className="text-xs">
                      {packageData.current_status.replace(/_/g, ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">Recipient</p>
                    <p className="font-medium text-sm md:text-base">{packageData.recipient_name}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">Service Type</p>
                    <p className="font-medium text-sm md:text-base">{packageData.service_type || "Standard"}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-xs md:text-sm text-muted-foreground">Delivery Address</p>
                  <p className="font-medium text-sm md:text-base break-words">{packageData.recipient_address}</p>
                </div>

                {packageData.recipient_phone && (
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">Recipient Phone</p>
                    <p className="font-medium text-sm md:text-base">{packageData.recipient_phone}</p>
                  </div>
                )}

                {packageData.recipient_email && (
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">Recipient Email</p>
                    <p className="font-medium text-sm md:text-base break-words">{packageData.recipient_email}</p>
                  </div>
                )}

                {packageData.weight && (
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">Weight</p>
                    <p className="font-medium text-sm md:text-base">{packageData.weight} kg</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Clock className="w-4 h-4 md:w-5 md:h-5" />
                  Delivery Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {statusHistory.length > 0 ? (
                    statusHistory.map((status, index) => {
                      const Icon = statusIcons[status.status as keyof typeof statusIcons];
                      return (
                        <div key={status.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="p-1.5 md:p-2 rounded-full bg-primary/10">
                              <Icon className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                            </div>
                            {index < statusHistory.length - 1 && (
                              <div className="w-px h-6 md:h-8 bg-border mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-3 md:pb-4">
                            <p className="font-medium text-sm md:text-base">
                              {status.status.replace(/_/g, ' ').toUpperCase()}
                            </p>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {new Date(status.created_at).toLocaleString()}
                            </p>
                            {status.location && (
                              <p className="text-xs md:text-sm text-muted-foreground">
                                📍 {status.location}
                              </p>
                            )}
                            {status.notes && status.notes !== "Status updated automatically" && (
                              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                                {status.notes.startsWith("Order #") && status.notes.includes("received from WooCommerce") 
                                  ? status.notes.replace(/received from WooCommerce.*/, "- Information received from store and is registered in our system")
                                  : status.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm md:text-base text-muted-foreground">No status updates available yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
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

export default TrackingPage;