
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Car } from 'lucide-react';

interface Vehicle {
  id: string;
  registration_number: string;
  model: string;
  make: string;
  year: number;
  vehicle_type: string;
  color: string;
  capacity: number;
  is_available: boolean;
  is_active: boolean;
  insurance_expiry?: string;
  permit_expiry?: string;
}

interface VehicleManagementProps {
  vendorId?: string;
}

const VehicleManagement = ({ vendorId }: VehicleManagementProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (vendorId) {
      fetchVehicles();
    }
  }, [vendorId]);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error: any) {
      console.error('Error fetching vehicles:', error);
      toast({
        title: 'Error',
        description: 'Failed to load vehicles',
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
      const vehicleData = {
        vendor_id: vendorId,
        registration_number: formData.get('registrationNumber') as string,
        model: formData.get('model') as string,
        make: formData.get('make') as string,
        year: parseInt(formData.get('year') as string),
        vehicle_type: formData.get('vehicleType') as string,
        color: formData.get('color') as string,
        capacity: parseInt(formData.get('capacity') as string),
        insurance_expiry: formData.get('insuranceExpiry') as string || null,
        permit_expiry: formData.get('permitExpiry') as string || null,
      };

      if (editingVehicle) {
        const { error } = await supabase
          .from('vehicles')
          .update(vehicleData)
          .eq('id', editingVehicle.id);

        if (error) throw error;
        toast({ title: 'Success!', description: 'Vehicle updated successfully' });
      } else {
        const { error } = await supabase
          .from('vehicles')
          .insert([vehicleData]);

        if (error) throw error;
        toast({ title: 'Success!', description: 'Vehicle added successfully' });
      }

      setShowForm(false);
      setEditingVehicle(null);
      fetchVehicles();
    } catch (error: any) {
      console.error('Error saving vehicle:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vehicleId: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', vehicleId);

      if (error) throw error;
      toast({ title: 'Success!', description: 'Vehicle deleted successfully' });
      fetchVehicles();
    } catch (error: any) {
      console.error('Error deleting vehicle:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const toggleAvailability = async (vehicleId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ is_available: !currentStatus })
        .eq('id', vehicleId);

      if (error) throw error;
      fetchVehicles();
    } catch (error: any) {
      console.error('Error updating vehicle availability:', error);
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
            {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h3>
          <Button onClick={() => {
            setShowForm(false);
            setEditingVehicle(null);
          }} variant="outline">
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number *</Label>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                required
                defaultValue={editingVehicle?.registration_number}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type *</Label>
              <Select name="vehicleType" defaultValue={editingVehicle?.vehicle_type} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Make *</Label>
              <Input
                id="make"
                name="make"
                required
                defaultValue={editingVehicle?.make}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                name="model"
                required
                defaultValue={editingVehicle?.model}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                min="1990"
                max="2030"
                defaultValue={editingVehicle?.year}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                name="color"
                defaultValue={editingVehicle?.color}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                min="1"
                max="20"
                defaultValue={editingVehicle?.capacity}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insuranceExpiry">Insurance Expiry</Label>
              <Input
                id="insuranceExpiry"
                name="insuranceExpiry"
                type="date"
                defaultValue={editingVehicle?.insurance_expiry}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="permitExpiry">Permit Expiry</Label>
              <Input
                id="permitExpiry"
                name="permitExpiry"
                type="date"
                defaultValue={editingVehicle?.permit_expiry}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Vehicles ({vehicles.length})</h3>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-8">
          <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No vehicles added yet</p>
          <Button onClick={() => setShowForm(true)} className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Vehicle
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{vehicle.registration_number}</CardTitle>
                  <div className="flex gap-2">
                    <Badge
                      variant={vehicle.is_available ? 'default' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => toggleAvailability(vehicle.id, vehicle.is_available)}
                    >
                      {vehicle.is_available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">
                  <strong>{vehicle.make} {vehicle.model}</strong> ({vehicle.year})
                </p>
                <p className="text-sm text-gray-600">
                  Type: <span className="capitalize">{vehicle.vehicle_type}</span> • 
                  Color: {vehicle.color} • 
                  Capacity: {vehicle.capacity}
                </p>
                {vehicle.insurance_expiry && (
                  <p className="text-xs text-gray-500">
                    Insurance expires: {new Date(vehicle.insurance_expiry).toLocaleDateString()}
                  </p>
                )}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => {
                      setEditingVehicle(vehicle);
                      setShowForm(true);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(vehicle.id)}
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

export default VehicleManagement;
