import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Settings, Package, Clock } from "lucide-react";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading, signOut } = useAuth();
  const [packages, setPackages] = useState<any[]>([]);
  const [statusConfigs, setStatusConfigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [profileForm, setProfileForm] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [newPackage, setNewPackage] = useState({
    tracking_number: "",
    recipient_name: "",
    recipient_address: "",
    recipient_phone: "",
    sender_name: "",
    sender_address: "",
    weight: "",
    service_type: "Standard",
    woocommerce_order_id: ""
  });

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate("/auth");
      return;
    }
    
    loadData();
    loadProfile();
  }, [user, authLoading, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load packages
      const { data: packagesData } = await supabase
        .from("packages")
        .select("*")
        .order("created_at", { ascending: false });

      // Load status configurations
      const { data: configsData } = await supabase
        .from("status_configs")
        .select("*")
        .order("hours_after_previous", { ascending: true });

      setPackages(packagesData || []);
      setStatusConfigs(configsData || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    if (!user) return;
    
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      setProfile(data);
      setProfileForm({
        ...profileForm,
        email: data?.email || user.email || ""
      });
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const createPackage = async () => {
    try {
      const { error } = await supabase
        .from("packages")
        .insert([{
          ...newPackage,
          weight: newPackage.weight ? parseFloat(newPackage.weight) : null
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Package created successfully"
      });

      setNewPackage({
        tracking_number: "",
        recipient_name: "",
        recipient_address: "",
        recipient_phone: "",
        sender_name: "",
        sender_address: "",
        weight: "",
        service_type: "Standard",
        woocommerce_order_id: ""
      });
      setDialogOpen(false);
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create package",
        variant: "destructive"
      });
    }
  };

  const updateStatusConfig = async () => {
    if (!selectedConfig) return;

    try {
      const { error } = await supabase
        .from("status_configs")
        .update({
          hours_after_previous: selectedConfig.hours_after_previous,
          display_name: selectedConfig.display_name,
          description: selectedConfig.description,
          is_active: selectedConfig.is_active
        })
        .eq("id", selectedConfig.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Status configuration updated successfully"
      });

      setConfigDialogOpen(false);
      setSelectedConfig(null);
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update configuration",
        variant: "destructive"
      });
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    try {
      // Update email in profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ email: profileForm.email })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Update password if provided
      if (profileForm.newPassword && profileForm.newPassword === profileForm.confirmPassword) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: profileForm.newPassword
        });

        if (passwordError) throw passwordError;
      }

      toast({
        title: "Success",
        description: "Profile updated successfully"
      });

      setProfileDialogOpen(false);
      setProfileForm({
        email: profileForm.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      loadProfile();
    } catch (error: any) {
      toast({
        title: "Error", 
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">DPD Admin Panel</h1>
          <nav className="flex gap-6 items-center">
            <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
            <Button variant="ghost" onClick={() => navigate("/tracking")}>Track Package</Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>Contact</Button>
            <Button variant="ghost" onClick={() => setProfileDialogOpen(true)}>Profile</Button>
            <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="packages">Package Management</TabsTrigger>
            <TabsTrigger value="settings">Status Settings</TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          </TabsList>

          {/* Package Management */}
          <TabsContent value="packages">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Package Management
                    </CardTitle>
                    <CardDescription>Manage all packages in the system</CardDescription>
                  </div>
                  
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Package
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Package</DialogTitle>
                        <DialogDescription>Add a new package to the tracking system</DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Tracking Number</Label>
                          <Input
                            value={newPackage.tracking_number}
                            onChange={(e) => setNewPackage({...newPackage, tracking_number: e.target.value})}
                            placeholder="Enter tracking number"
                          />
                        </div>
                        <div>
                          <Label>Service Type</Label>
                          <Select value={newPackage.service_type} onValueChange={(value) => setNewPackage({...newPackage, service_type: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Standard">Standard</SelectItem>
                              <SelectItem value="Express">Express</SelectItem>
                              <SelectItem value="Overnight">Overnight</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Recipient Name</Label>
                          <Input
                            value={newPackage.recipient_name}
                            onChange={(e) => setNewPackage({...newPackage, recipient_name: e.target.value})}
                            placeholder="Recipient name"
                          />
                        </div>
                        <div>
                          <Label>Recipient Phone</Label>
                          <Input
                            value={newPackage.recipient_phone}
                            onChange={(e) => setNewPackage({...newPackage, recipient_phone: e.target.value})}
                            placeholder="Phone number"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label>Recipient Address</Label>
                          <Textarea
                            value={newPackage.recipient_address}
                            onChange={(e) => setNewPackage({...newPackage, recipient_address: e.target.value})}
                            placeholder="Full address"
                          />
                        </div>
                        <div>
                          <Label>Sender Name</Label>
                          <Input
                            value={newPackage.sender_name}
                            onChange={(e) => setNewPackage({...newPackage, sender_name: e.target.value})}
                            placeholder="Sender name"
                          />
                        </div>
                        <div>
                          <Label>Weight (kg)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={newPackage.weight}
                            onChange={(e) => setNewPackage({...newPackage, weight: e.target.value})}
                            placeholder="0.0"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label>WooCommerce Order ID</Label>
                          <Input
                            value={newPackage.woocommerce_order_id}
                            onChange={(e) => setNewPackage({...newPackage, woocommerce_order_id: e.target.value})}
                            placeholder="Optional order ID"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button onClick={createPackage}>Create Package</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking Number</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell className="font-mono">{pkg.tracking_number}</TableCell>
                        <TableCell>{pkg.recipient_name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {pkg.current_status.replace(/_/g, ' ').toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{pkg.service_type}</TableCell>
                        <TableCell>{new Date(pkg.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Status Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Status Timing Configuration
                </CardTitle>
                <CardDescription>
                  Configure when status updates should trigger automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Display Name</TableHead>
                      <TableHead>Hours After Previous</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statusConfigs.map((config) => (
                      <TableRow key={config.id}>
                        <TableCell className="font-mono">{config.status}</TableCell>
                        <TableCell>{config.display_name}</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {config.hours_after_previous}h
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{config.description}</TableCell>
                        <TableCell>
                          <Badge variant={config.is_active ? "default" : "secondary"}>
                            {config.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedConfig(config);
                              setConfigDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Status Configuration</DialogTitle>
                      <DialogDescription>Modify timing and display settings</DialogDescription>
                    </DialogHeader>
                    
                    {selectedConfig && (
                      <div className="space-y-4">
                        <div>
                          <Label>Display Name</Label>
                          <Input
                            value={selectedConfig.display_name}
                            onChange={(e) => setSelectedConfig({...selectedConfig, display_name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Hours After Previous Status</Label>
                          <Input
                            type="number"
                            value={selectedConfig.hours_after_previous}
                            onChange={(e) => setSelectedConfig({...selectedConfig, hours_after_previous: parseInt(e.target.value)})}
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={selectedConfig.description}
                            onChange={(e) => setSelectedConfig({...selectedConfig, description: e.target.value})}
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={() => setConfigDialogOpen(false)}>Cancel</Button>
                      <Button onClick={updateStatusConfig}>Save Changes</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your account information and change password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Current Email</Label>
                  <Input value={profile?.email || user?.email || ""} disabled />
                </div>
                
                <div>
                  <Label>Role</Label>
                  <Input value={profile?.role || "admin"} disabled />
                </div>

                <div>
                  <Label>Account Created</Label>
                  <Input 
                    value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : ""} 
                    disabled 
                  />
                </div>

                <Button onClick={() => setProfileDialogOpen(true)}>
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Profile Update Dialog */}
        <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Profile</DialogTitle>
              <DialogDescription>Change your email and password</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                />
              </div>
              
              <div>
                <Label>New Password (optional)</Label>
                <Input
                  type="password"
                  value={profileForm.newPassword}
                  onChange={(e) => setProfileForm({...profileForm, newPassword: e.target.value})}
                  placeholder="Leave blank to keep current password"
                />
              </div>
              
              <div>
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  value={profileForm.confirmPassword}
                  onChange={(e) => setProfileForm({...profileForm, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setProfileDialogOpen(false)}>Cancel</Button>
              <Button onClick={updateProfile}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPanel;