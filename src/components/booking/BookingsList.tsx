
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Search, Filter, Play, Square, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BookingsListProps {
  userType: 'company' | 'vendor';
}

const BookingsList = ({ userType }: BookingsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for bookings
  const mockBookings = [
    {
      id: 'B001',
      guestName: 'John Smith',
      company: 'TechCorp Ltd',
      pickupLocation: 'Office Complex A, Sector 18',
      dropoffLocation: 'Indira Gandhi Airport',
      date: '2024-01-15',
      time: '14:30',
      vehicleType: 'Sedan',
      vehicleNumber: 'DL 01 AB 1234',
      driverName: 'Rajesh Kumar',
      driverPhone: '+91 98765 43210',
      status: 'ongoing',
      invoiceNumber: 'INV-001'
    },
    {
      id: 'B002',
      guestName: 'Sarah Johnson',
      company: 'Innovation Inc',
      pickupLocation: 'Hotel Grand, CP',
      dropoffLocation: 'Conference Center, Gurgaon',
      date: '2024-01-15',
      time: '16:00',
      vehicleType: 'SUV',
      vehicleNumber: 'DL 02 CD 5678',
      driverName: 'Amit Singh',
      driverPhone: '+91 98765 43211',
      status: 'upcoming',
      invoiceNumber: 'INV-002'
    },
    {
      id: 'B003',
      guestName: 'Mike Davis',
      company: 'Global Solutions',
      pickupLocation: 'Indira Gandhi Airport',
      dropoffLocation: 'Office Complex B, Noida',
      date: '2024-01-14',
      time: '08:00',
      vehicleType: 'Hatchback',
      vehicleNumber: 'DL 03 EF 9012',
      driverName: 'Suresh Sharma',
      driverPhone: '+91 98765 43212',
      status: 'completed',
      invoiceNumber: 'INV-003'
    },
    {
      id: 'B004',
      guestName: 'Emily Brown',
      company: 'StartUp Hub',
      pickupLocation: 'Metro Station, Rajouri Garden',
      dropoffLocation: 'Business Park, Gurgaon',
      date: '2024-01-13',
      time: '09:30',
      vehicleType: 'Sedan',
      vehicleNumber: 'DL 04 GH 3456',
      driverName: 'Vinod Kumar',
      driverPhone: '+91 98765 43213',
      status: 'cancelled',
      invoiceNumber: 'INV-004'
    }
  ];

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTripAction = (bookingId: string, action: 'start' | 'end') => {
    toast({
      title: `Trip ${action === 'start' ? 'Started' : 'Completed'}`,
      description: `Booking ${bookingId} has been marked as ${action === 'start' ? 'ongoing' : 'completed'}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          All Bookings
        </CardTitle>
        <CardDescription>
          {userType === 'company' ? 'Manage your company bookings' : 'Manage your vendor bookings'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by guest name, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Car className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{booking.guestName}</h3>
                    <p className="text-gray-600">{booking.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  <span className="text-sm font-medium text-gray-900">#{booking.id}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trip Details */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Trip Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Pickup:</span> {booking.pickupLocation}
                    </div>
                    <div>
                      <span className="font-medium">Dropoff:</span> {booking.dropoffLocation}
                    </div>
                    <div>
                      <span className="font-medium">Date & Time:</span> {booking.date} at {booking.time}
                    </div>
                    <div>
                      <span className="font-medium">Vehicle Type:</span> {booking.vehicleType}
                    </div>
                  </div>
                </div>

                {/* Driver & Vehicle Details */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Driver & Vehicle</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Driver:</span> {booking.driverName}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {booking.driverPhone}
                    </div>
                    <div>
                      <span className="font-medium">Vehicle:</span> {booking.vehicleNumber}
                    </div>
                    <div>
                      <span className="font-medium">Invoice:</span> {booking.invoiceNumber}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {userType === 'vendor' && booking.status === 'upcoming' && (
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleTripAction(booking.id, 'start')}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Trip
                  </Button>
                </div>
              )}

              {userType === 'vendor' && booking.status === 'ongoing' && (
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleTripAction(booking.id, 'end')}
                  >
                    <Square className="h-4 w-4 mr-2" />
                    End Trip
                  </Button>
                </div>
              )}
            </div>
          ))}

          {filteredBookings.length === 0 && (
            <div className="text-center py-8">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No bookings have been created yet.'
                }
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingsList;
