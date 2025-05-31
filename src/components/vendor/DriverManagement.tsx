
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, User, Phone, Mail, Star } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  phone: string;
  email?: string;
  license_number: string;
  license_expiry?: string;
  address?: string;
  experience_years: number;
  rating: number;
  is_available: boolean;
  is_active: boolean;
}

interface DriverManagementProps {
  vendorId?: string;
}

const DriverManagement = ({ vendorId }: DriverManagementProps) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  useEffect(() => {
    if (vendorId) {
      fetchDrivers();
    }
  }, [vendorId]);

  const fetchDrivers = async () => {
    try {
      const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDrivers(data || []);
    } catch (error: any) {
      console.error('Error fetching drivers:', error);
      toast({
        title: 'Error',
        description: 'Failed to load drivers',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const driverData = {
        vendor_id: vendorId,
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string || null,
        license_number: formData.get('licenseNumber') as string,
        license_expiry: formData.get('licenseExpiry') as string || null,
        address: formData.get('address') as string || null,
        experience_years: parseInt(formData.get('experienceYears') as string) || 0,
      };

      if (editingDriver) {
        const { error } = await supabase
          .from('drivers')
          .update(driverData)
          .eq('id', editingDriver.id);

        if (error) throw error;
        toast({ title: 'Success!', description: 'Driver updated successfully' });
      } else {
        const { error } = await supabase
          .from('drivers')
          .insert([driverData]);

        if (error) throw error;
        toast({ title: 'Success!', description: 'Driver added successfully' });
      }

      setShowForm(false);
      setEditingDriver(null);
      fetchDrivers();
    } catch (error: any) {
      console.error('Error saving driver:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (driverId: string) => {
    if (!confirm('Are you sure you want to delete this driver?')) return;

    try {
      const { error } = await supabase
        .from('drivers')
        .delete()
        .eq('id', driverId);

      if (error) throw error;
      toast({ title: 'Success!', description: 'Driver deleted successfully' });
      fetchDrivers();
    } catch (error: any) {
      console.error('Error deleting driver:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleAvailability = async (driverId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('drivers')
        .update({ is_available: !currentStatus })
        .eq('id', driverId);

      if (error) throw error;
      fetchDrivers();
    } catch (error: any) {
      console.error('Error updating driver availability:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading && !showForm) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {editingDriver ? 'Edit Driver' : 'Add New Driver'}
          </h3>
          <Button onClick={() => {
            setShowForm(false);
            setEditingDriver(null);
          }} variant="outline">
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                required
                defaultValue={editingDriver?.name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                defaultValue={editingDriver?.phone}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={editingDriver?.email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number *</Label>
              <Input
                id="licenseNumber"
                name="licenseNumber"
                required
                defaultValue={editingDriver?.license_number}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="licenseExpiry">License Expiry</Label>
              <Input
                id="licenseExpiry"
                name="licenseExpiry"
                type="date"
                defaultValue={editingDriver?.license_expiry}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experienceYears">Experience (Years)</Label>
              <Input
                id="experienceYears"
                name="experienceYears"
                type="number"
                min="0"
                max="50"
                defaultValue={editingDriver?.experience_years}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              defaultValue={editingDriver?.address}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : editingDriver ? 'Update Driver' : 'Add Driver'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Drivers ({drivers.length})</h3>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Driver
        </Button>
      </div>

      {drivers.length === 0 ? (
        <div className="text-center py-8">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No drivers added yet</p>
          <Button onClick={() => setShowForm(true)} className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Driver
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drivers.map((driver) => (
            <Card key={driver.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{driver.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge
                      variant={driver.is_available ? 'default' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => toggleAvailability(driver.id, driver.is_available)}
                    >
                      {driver.is_available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  {driver.phone}
                </div>
                {driver.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    {driver.email}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {driver.rating?.toFixed(1) || '0.0'} • {driver.experience_years} years exp
                </div>
                <p className="text-xs text-gray-500">
                  License: {driver.license_number}
                  {driver.license_expiry && (
                    <span> (expires: {new Date(driver.license_expiry).toLocaleDateString()})</span>
                  )}
                </p>
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => {
                      setEditingDriver(driver);
                      setShowForm(true);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(driver.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverManagement;
