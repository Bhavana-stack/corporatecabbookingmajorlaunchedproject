
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Car, Plus, Search, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const VehicleManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    plateNumber: '',
    vehicleType: '',
    model: '',
    availability: 'available',
    conditionStatus: 'good',
    insuranceNumber: '',
    insuranceExpiry: '',
    registrationExpiry: '',
    lastService: '',
    nextService: ''
  });

  // Mock vehicle data
  const mockVehicles = [
    {
      plateNumber: 'DL 01 AB 1234',
      vehicleType: 'Sedan',
      model: 'Honda City 2022',
      availability: 'available',
      conditionStatus: 'excellent',
      insuranceNumber: 'INS12345678',
      insuranceExpiry: '2024-12-31',
      registrationExpiry: '2025-06-15',
      lastService: '2024-01-01',
      nextService: '2024-04-01',
      assignedDriver: 'Rajesh Kumar'
    },
    {
      plateNumber: 'DL 02 CD 5678',
      vehicleType: 'SUV',
      model: 'Mahindra XUV700 2023',
      availability: 'in-use',
      conditionStatus: 'good',
      insuranceNumber: 'INS87654321',
      insuranceExpiry: '2024-11-30',
      registrationExpiry: '2025-08-20',
      lastService: '2023-12-15',
      nextService: '2024-03-15',
      assignedDriver: 'Amit Singh'
    },
    {
      plateNumber: 'DL 03 EF 9012',
      vehicleType: 'Hatchback',
      model: 'Maruti Swift 2021',
      availability: 'maintenance',
      conditionStatus: 'fair',
      insuranceNumber: 'INS11223344',
      insuranceExpiry: '2024-10-15',
      registrationExpiry: '2025-03-10',
      lastService: '2024-01-10',
      nextService: '2024-04-10',
      assignedDriver: 'Suresh Sharma'
    },
    {
      plateNumber: 'DL 04 GH 3456',
      vehicleType: 'Luxury',
      model: 'BMW 5 Series 2023',
      availability: 'available',
      conditionStatus: 'excellent',
      insuranceNumber: 'INS55667788',
      insuranceExpiry: '2025-01-31',
      registrationExpiry: '2025-09-25',
      lastService: '2023-12-20',
      nextService: '2024-03-20',
      assignedDriver: 'Vinod Kumar'
    }
  ];

  const filteredVehicles = mockVehicles.filter(vehicle =>
    vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVehicle = () => {
    if (!newVehicle.plateNumber || !newVehicle.vehicleType || !newVehicle.model) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Vehicle Added",
      description: `Vehicle ${newVehicle.plateNumber} has been added successfully.`,
    });

    setNewVehicle({
      plateNumber: '',
      vehicleType: '',
      model: '',
      availability: 'available',
      conditionStatus: 'good',
      insuranceNumber: '',
      insuranceExpiry: '',
      registrationExpiry: '',
      lastService: '',
      nextService: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setNewVehicle(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in-use': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Vehicle Management
            </CardTitle>
            <CardDescription>
              Manage your fleet vehicles and their status
            </CardDescription>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogDescription>
                  Enter the vehicle information below
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plateNumber">Plate Number *</Label>
                  <Input
                    id="plateNumber"
                    value={newVehicle.plateNumber}
                    onChange={(e) => handleInputChange('plateNumber', e.target.value)}
                    placeholder="Enter plate number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type *</Label>
                  <Select value={newVehicle.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Model *</Label>
                  <Input
                    id="model"
                    value={newVehicle.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    placeholder="Enter vehicle model"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select value={newVehicle.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="in-use">In Use</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conditionStatus">Condition</Label>
                  <Select value={newVehicle.conditionStatus} onValueChange={(value) => handleInputChange('conditionStatus', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceNumber">Insurance Number</Label>
                  <Input
                    id="insuranceNumber"
                    value={newVehicle.insuranceNumber}
                    onChange={(e) => handleInputChange('insuranceNumber', e.target.value)}
                    placeholder="Enter insurance number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceExpiry">Insurance Expiry</Label>
                  <Input
                    id="insuranceExpiry"
                    type="date"
                    value={newVehicle.insuranceExpiry}
                    onChange={(e) => handleInputChange('insuranceExpiry', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationExpiry">Registration Expiry</Label>
                  <Input
                    id="registrationExpiry"
                    type="date"
                    value={newVehicle.registrationExpiry}
                    onChange={(e) => handleInputChange('registrationExpiry', e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddVehicle} className="bg-green-600 hover:bg-green-700">
                  Add Vehicle
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search vehicles by plate number, type, or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <Card key={vehicle.plateNumber} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 rounded-lg p-2">
                      <Car className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{vehicle.plateNumber}</CardTitle>
                      <p className="text-sm text-gray-500">{vehicle.model}</p>
                    </div>
                  </div>
                  <Badge className={getAvailabilityColor(vehicle.availability)}>
                    {vehicle.availability}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Type:</span>
                  <Badge variant="outline">{vehicle.vehicleType}</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Condition:</span>
                  <Badge className={getConditionColor(vehicle.conditionStatus)}>
                    {vehicle.conditionStatus}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Driver:</span>
                  <span className="text-sm font-medium">{vehicle.assignedDriver}</span>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Insurance: {vehicle.insuranceExpiry}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span>Registration: {vehicle.registrationExpiry}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span>Next Service: {vehicle.nextService}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-8">
            <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-500">
              {searchTerm 
                ? 'Try adjusting your search criteria.'
                : 'No vehicles have been added yet.'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VehicleManagement;
