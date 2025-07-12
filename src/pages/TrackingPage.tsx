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
          <h1 className="text-2xl font-bold text-primary">DPD Tracking</h1>
          <nav className="flex gap-6">
            <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button variant="ghost" onClick={() => navigate("/tracking")}>Track Package</Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>Contact</Button>
            <Button variant="outline" onClick={() => navigate("/admin")}>Admin</Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Track Your Package</CardTitle>
            <CardDescription>Enter your tracking number to get the latest updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                className="flex-1"
              />
              <Button onClick={handleTrack} disabled={loading}>
                {loading ? "Searching..." : "Track"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Package Information */}
        {packageData && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Package Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Package Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tracking Number</p>
                  <p className="font-mono font-semibold">{packageData.tracking_number}</p>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    {(() => {
                      const Icon = statusIcons[packageData.current_status as keyof typeof statusIcons];
                      return <Icon className="w-4 h-4" />;
                    })()}
                    <Badge variant={statusColors[packageData.current_status as keyof typeof statusColors] as any}>
                      {packageData.current_status.replace(/_/g, ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Recipient</p>
                    <p className="font-medium">{packageData.recipient_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Service Type</p>
                    <p className="font-medium">{packageData.service_type || "Standard"}</p>
                  </div>
                </div>

                {packageData.weight && (
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="font-medium">{packageData.weight} kg</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Delivery Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusHistory.length > 0 ? (
                    statusHistory.map((status, index) => {
                      const Icon = statusIcons[status.status as keyof typeof statusIcons];
                      return (
                        <div key={status.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="p-2 rounded-full bg-primary/10">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            {index < statusHistory.length - 1 && (
                              <div className="w-px h-8 bg-border mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="font-medium">
                              {status.status.replace(/_/g, ' ').toUpperCase()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(status.created_at).toLocaleString()}
                            </p>
                            {status.location && (
                              <p className="text-sm text-muted-foreground">
                                📍 {status.location}
                              </p>
                            )}
                            {status.notes && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {status.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-muted-foreground">No status updates available yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;