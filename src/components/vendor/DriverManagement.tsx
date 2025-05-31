
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { User, Plus, Search, Phone, Mail, Calendar, Car } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DriverManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDriver, setNewDriver] = useState({
    employeeId: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    licenseNumber: '',
    panNumber: '',
    aadharNumber: '',
    dateOfJoining: '',
    vehicleType: '',
    vehicleNumber: '',
    salary: '',
    department: '',
    accountNumber: '',
    ifscCode: ''
  });

  // Mock driver data
  const mockDrivers = [
    {
      employeeId: 'EMP001',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@vendor.com',
      address: 'H-123, Sector 15, Gurgaon',
      licenseNumber: 'DL1420110012345',
      panNumber: 'ABCPK1234D',
      aadharNumber: '1234 5678 9012',
      dateOfJoining: '2023-01-15',
      vehicleType: 'Sedan',
      vehicleNumber: 'DL 01 AB 1234',
      salary: '25000',
      department: 'Transport',
      accountNumber: '1234567890',
      ifscCode: 'SBIN0001234',
      status: 'active'
    },
    {
      employeeId: 'EMP002',
      name: 'Amit Singh',
      phone: '+91 98765 43211',
      email: 'amit.singh@vendor.com',
      address: 'B-456, Sector 22, Delhi',
      licenseNumber: 'DL1420110012346',
      panNumber: 'DEFAS5678E',
      aadharNumber: '2345 6789 0123',
      dateOfJoining: '2023-03-20',
      vehicleType: 'SUV',
      vehicleNumber: 'DL 02 CD 5678',
      salary: '28000',
      department: 'Transport',
      accountNumber: '2345678901',
      ifscCode: 'HDFC0001234',
      status: 'active'
    },
    {
      employeeId: 'EMP003',
      name: 'Suresh Sharma',
      phone: '+91 98765 43212',
      email: 'suresh.sharma@vendor.com',
      address: 'C-789, Sector 8, Noida',
      licenseNumber: 'DL1420110012347',
      panNumber: 'GHIJK9012F',
      aadharNumber: '3456 7890 1234',
      dateOfJoining: '2022-11-10',
      vehicleType: 'Hatchback',
      vehicleNumber: 'DL 03 EF 9012',
      salary: '22000',
      department: 'Transport',
      accountNumber: '3456789012',
      ifscCode: 'ICIC0001234',
      status: 'active'
    }
  ];

  const filteredDrivers = mockDrivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDriver = () => {
    if (!newDriver.name || !newDriver.phone || !newDriver.licenseNumber) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Driver Added",
      description: `${newDriver.name} has been added successfully.`,
    });

    setNewDriver({
      employeeId: '',
      name: '',
      phone: '',
      email: '',
      address: '',
      licenseNumber: '',
      panNumber: '',
      aadharNumber: '',
      dateOfJoining: '',
      vehicleType: '',
      vehicleNumber: '',
      salary: '',
      department: '',
      accountNumber: '',
      ifscCode: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setNewDriver(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Driver Management
            </CardTitle>
            <CardDescription>
              Manage your driver details and information
            </CardDescription>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Driver
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Driver</DialogTitle>
                <DialogDescription>
                  Enter the driver's information below
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID *</Label>
                    <Input
                      id="employeeId"
                      value={newDriver.employeeId}
                      onChange={(e) => handleInputChange('employeeId', e.target.value)}
                      placeholder="Enter employee ID"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newDriver.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={newDriver.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newDriver.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newDriver.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfJoining">Date of Joining</Label>
                    <Input
                      id="dateOfJoining"
                      type="date"
                      value={newDriver.dateOfJoining}
                      onChange={(e) => handleInputChange('dateOfJoining', e.target.value)}
                    />
                  </div>
                </div>

                {/* Documents & Employment */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Documents & Employment</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number *</Label>
                    <Input
                      id="licenseNumber"
                      value={newDriver.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      placeholder="Enter license number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN Number</Label>
                    <Input
                      id="panNumber"
                      value={newDriver.panNumber}
                      onChange={(e) => handleInputChange('panNumber', e.target.value)}
                      placeholder="Enter PAN number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadharNumber">Aadhar Number</Label>
                    <Input
                      id="aadharNumber"
                      value={newDriver.aadharNumber}
                      onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                      placeholder="Enter Aadhar number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Input
                      id="vehicleType"
                      value={newDriver.vehicleType}
                      onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                      placeholder="Enter vehicle type"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                    <Input
                      id="vehicleNumber"
                      value={newDriver.vehicleNumber}
                      onChange={(e) => handleInputChange('vehicleNumber', e.target.value)}
                      placeholder="Enter vehicle number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary</Label>
                    <Input
                      id="salary"
                      type="number"
                      value={newDriver.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                      placeholder="Enter salary"
                    />
                  </div>
                </div>

                {/* Banking Details */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Banking Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        value={newDriver.accountNumber}
                        onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                        placeholder="Enter account number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <Input
                        id="ifscCode"
                        value={newDriver.ifscCode}
                        onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                        placeholder="Enter IFSC code"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDriver} className="bg-green-600 hover:bg-green-700">
                  Add Driver
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
            placeholder="Search drivers by name, ID, or vehicle number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrivers.map((driver) => (
            <Card key={driver.employeeId} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 rounded-full p-2">
                      <User className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{driver.name}</CardTitle>
                      <p className="text-sm text-gray-500">{driver.employeeId}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {driver.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{driver.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{driver.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Car className="h-4 w-4 text-gray-400" />
                  <span>{driver.vehicleType} - {driver.vehicleNumber}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Joined: {driver.dateOfJoining}</span>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">License:</span>
                    <span className="font-medium">{driver.licenseNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Salary:</span>
                    <span className="font-medium">₹{driver.salary}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDrivers.length === 0 && (
          <div className="text-center py-8">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No drivers found</h3>
            <p className="text-gray-500">
              {searchTerm 
                ? 'Try adjusting your search criteria.'
                : 'No drivers have been added yet.'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DriverManagement;
