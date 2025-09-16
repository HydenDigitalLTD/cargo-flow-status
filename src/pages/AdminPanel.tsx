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
import { Plus, Edit, Settings, Package, Clock, Eye, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading, signOut } = useAuth();
  const [packages, setPackages] = useState<any[]>([]);
  const [statusConfigs, setStatusConfigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [packageDetailOpen, setPackageDetailOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
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
    recipient_email: "",
    sender_name: "",
    sender_address: "",
    weight: "",
    service_type: "Standard",
    woocommerce_order_id: ""
  });

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate("/admin_login69");
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
        .order("status_order", { ascending: true });

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
        recipient_email: "",
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
          status_order: selectedConfig.status_order,
          hours_after_previous: selectedConfig.hours_after_previous || 0,
          days_after_previous: selectedConfig.days_after_previous || 0,
          minutes_after_previous: selectedConfig.minutes_after_previous || 0,
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

  const triggerAutoUpdate = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.functions.invoke('auto-status-update');
      
      if (error) throw error;

      toast({
        title: "Success",
        description: "Automatic status update triggered successfully"
      });
      
      loadData(); // Reload to show updated statuses
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to trigger automatic update",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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

  const updatePackageEmail = async (packageId: string, email: string) => {
    try {
      const { error } = await supabase
        .from("packages")
        .update({ recipient_email: email })
        .eq("id", packageId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Package email updated successfully"
      });

      loadData(); // Reload to show updated email
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update package email",
        variant: "destructive"
      });
    }
  };

  const updatePackageStatus = async (packageId: string, newStatus: string) => {
    try {
      // Update package status
      const { error: packageError } = await supabase
        .from("packages")
        .update({ 
          current_status: newStatus as any,
          updated_at: new Date().toISOString()
        })
        .eq("id", packageId);

      if (packageError) throw packageError;

      // Add to status history
      const { error: historyError } = await supabase
        .from("package_status_history")
        .insert({
          package_id: packageId,
          status: newStatus as any,
          notes: "Status updated manually by admin"
        });

      if (historyError) throw historyError;

      toast({
        title: "Success",
        description: "Package status updated successfully"
      });

      loadData(); // Reload to show updated status
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update package status",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const togglePackageSelection = (packageId: string) => {
    setSelectedPackages(prev => 
      prev.includes(packageId) 
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedPackages([]);
    } else {
      setSelectedPackages(packages.map(pkg => pkg.id));
    }
    setSelectAll(!selectAll);
  };

  const deleteSelectedPackages = async () => {
    if (selectedPackages.length === 0) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedPackages.length} package(s)? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("packages")
        .delete()
        .in("id", selectedPackages);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${selectedPackages.length} package(s) deleted successfully`
      });

      setSelectedPackages([]);
      setSelectAll(false);
      loadData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete packages",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">GL Express Admin Panel</h1>
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
                  
                  <div className="flex gap-2">
                    {selectedPackages.length > 0 && (
                      <Button 
                        variant="destructive" 
                        onClick={deleteSelectedPackages}
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Selected ({selectedPackages.length})
                      </Button>
                    )}
                    
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
                        <div>
                          <Label>Recipient Email</Label>
                          <Input
                            type="email"
                            value={newPackage.recipient_email}
                            onChange={(e) => setNewPackage({...newPackage, recipient_email: e.target.value})}
                            placeholder="Email address"
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
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectAll}
                          onCheckedChange={toggleSelectAll}
                          aria-label="Select all packages"
                        />
                      </TableHead>
                      <TableHead>Tracking Number</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedPackages.includes(pkg.id)}
                            onCheckedChange={() => togglePackageSelection(pkg.id)}
                            aria-label={`Select package ${pkg.tracking_number}`}
                          />
                        </TableCell>
                        <TableCell className="font-mono">{pkg.tracking_number}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{pkg.recipient_name}</p>
                            {pkg.recipient_email && (
                              <p className="text-sm text-muted-foreground">📧 {pkg.recipient_email}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {pkg.current_status.replace(/_/g, ' ').toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{pkg.service_type}</TableCell>
                        <TableCell>{new Date(pkg.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedPackage(pkg);
                                setPackageDetailOpen(true);
                              }}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                const email = prompt('Enter recipient email:', pkg.recipient_email || '');
                                if (email !== null) {
                                  updatePackageEmail(pkg.id, email);
                                }
                              }}
                            >
                              {pkg.recipient_email ? 'Edit Email' : 'Add Email'}
                            </Button>
                            <Select onValueChange={(newStatus) => updatePackageStatus(pkg.id, newStatus)}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Change Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="registered">Registered</SelectItem>
                                <SelectItem value="ready_for_pickup">Ready for Pickup</SelectItem>
                                <SelectItem value="in_transit">In Transit</SelectItem>
                                <SelectItem value="arrived_at_depot">Arrived at Depot</SelectItem>
                                <SelectItem value="reached_sorting_facility">Reached Sorting Facility</SelectItem>
                                <SelectItem value="departed_sorting_facility">Departed Sorting Facility</SelectItem>
                                <SelectItem value="on_hold">On Hold</SelectItem>
                                <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                                <SelectItem value="redelivery_attempt">Redelivery Attempt</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="failed_delivery">Failed Delivery</SelectItem>
                                <SelectItem value="returned_to_sender">Returned to Sender</SelectItem>
                                <SelectItem value="returned">Returned</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
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
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Status Timing Configuration
                    </CardTitle>
                    <CardDescription>
                      Configure when status updates should trigger automatically
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={triggerAutoUpdate} 
                    disabled={loading}
                    variant="outline"
                  >
                    {loading ? "Updating..." : "Trigger Auto Update"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Display Name</TableHead>
                      <TableHead>Duration in Status</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statusConfigs.map((config) => {
                      const formatTime = () => {
                        const parts = [];
                        if (config.days_after_previous > 0) parts.push(`${config.days_after_previous}d`);
                        if (config.hours_after_previous > 0) parts.push(`${config.hours_after_previous}h`);
                        if (config.minutes_after_previous > 0) parts.push(`${config.minutes_after_previous}m`);
                        return parts.length > 0 ? parts.join(' ') : '0m';
                      };

                      return (
                        <TableRow key={config.id}>
                          <TableCell className="font-bold text-center">{config.status_order}</TableCell>
                          <TableCell className="font-mono">{config.status}</TableCell>
                          <TableCell>{config.display_name}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTime()}
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
                      );
                    })}
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
                          <Label>Status Order (1=first, 2=second, etc.)</Label>
                          <Input
                            type="number"
                            min="1"
                            value={selectedConfig.status_order || 1}
                            onChange={(e) => setSelectedConfig({...selectedConfig, status_order: parseInt(e.target.value) || 1})}
                          />
                        </div>
                        
                        <div>
                          <Label>Display Name</Label>
                          <Input
                            value={selectedConfig.display_name}
                            onChange={(e) => setSelectedConfig({...selectedConfig, display_name: e.target.value})}
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label>Days to Stay in Status</Label>
                            <Input
                              type="number"
                              min="0"
                              value={selectedConfig.days_after_previous || 0}
                              onChange={(e) => setSelectedConfig({...selectedConfig, days_after_previous: parseInt(e.target.value) || 0})}
                            />
                          </div>
                          <div>
                            <Label>Hours to Stay in Status</Label>
                            <Input
                              type="number"
                              min="0"
                              max="23"
                              value={selectedConfig.hours_after_previous || 0}
                              onChange={(e) => setSelectedConfig({...selectedConfig, hours_after_previous: parseInt(e.target.value) || 0})}
                            />
                          </div>
                          <div>
                            <Label>Minutes to Stay in Status</Label>
                            <Input
                              type="number"
                              min="0"
                              max="59"
                              value={selectedConfig.minutes_after_previous || 0}
                              onChange={(e) => setSelectedConfig({...selectedConfig, minutes_after_previous: parseInt(e.target.value) || 0})}
                            />
                          </div>
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

        {/* Package Detail View Dialog */}
        <Dialog open={packageDetailOpen} onOpenChange={setPackageDetailOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Package Details</DialogTitle>
              <DialogDescription>Complete information for tracking number: {selectedPackage?.tracking_number}</DialogDescription>
            </DialogHeader>
            
            {selectedPackage && (
              <div className="grid grid-cols-2 gap-6">
                {/* Recipient Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recipient Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                      <p className="text-sm font-medium">{selectedPackage.recipient_name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                      <p className="text-sm">{selectedPackage.recipient_email || 'Not provided'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                      <p className="text-sm">{selectedPackage.recipient_phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                      <p className="text-sm">{selectedPackage.recipient_address}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Sender Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sender Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                      <p className="text-sm">{selectedPackage.sender_name || 'Not provided'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                      <p className="text-sm">{selectedPackage.sender_address || 'Not provided'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                      <p className="text-sm">{selectedPackage.sender_phone || 'Not provided'}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Package Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Package Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Tracking Number</Label>
                      <p className="text-sm font-mono font-medium">{selectedPackage.tracking_number}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Current Status</Label>
                      <Badge variant="outline" className="mt-1">
                        {selectedPackage.current_status.replace(/_/g, ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Service Type</Label>
                      <p className="text-sm">{selectedPackage.service_type || 'Standard'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Weight</Label>
                      <p className="text-sm">{selectedPackage.weight ? `${selectedPackage.weight} kg` : 'Not specified'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Dimensions</Label>
                      <p className="text-sm">{selectedPackage.dimensions || 'Not specified'}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* System Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">System Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Package ID</Label>
                      <p className="text-sm font-mono">{selectedPackage.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">WooCommerce Order ID</Label>
                      <p className="text-sm">{selectedPackage.woocommerce_order_id || 'Not from WooCommerce'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Created</Label>
                      <p className="text-sm">{new Date(selectedPackage.created_at).toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Last Updated</Label>
                      <p className="text-sm">{new Date(selectedPackage.updated_at).toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setPackageDetailOpen(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPanel;