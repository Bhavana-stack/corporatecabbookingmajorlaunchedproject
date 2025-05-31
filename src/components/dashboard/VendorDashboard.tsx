
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { 
  Car, 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  BarChart3,
  LogOut,
  Bell,
  UserPlus,
  CarIcon
} from 'lucide-react';
import BookingsList from '@/components/booking/BookingsList';
import DriverManagement from '@/components/vendor/DriverManagement';
import VehicleManagement from '@/components/vendor/VehicleManagement';

interface VendorDashboardProps {
  user: User;
}

const VendorDashboard = ({ user }: VendorDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  const mockStats = {
    totalBookings: 89,
    pendingRequests: 3,
    completedBookings: 82,
    cancelledBookings: 4,
    activeDrivers: 8,
    activeVehicles: 12
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 rounded-lg p-2">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CabBooking Pro</h1>
                <p className="text-sm text-gray-500">Vendor Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                <Badge className="ml-1 bg-red-500 text-white text-xs px-1">3</Badge>
                Requests
              </Button>
              <div className="text-sm text-gray-600">
                Welcome, {user.email}
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'bookings', label: 'All Bookings', icon: Car },
            { id: 'drivers', label: 'Drivers', icon: Users },
            { id: 'vehicles', label: 'Vehicles', icon: CarIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Bookings</p>
                      <p className="text-3xl font-bold">{mockStats.totalBookings}</p>
                    </div>
                    <Car className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Pending Requests</p>
                      <p className="text-3xl font-bold">{mockStats.pendingRequests}</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Completed</p>
                      <p className="text-3xl font-bold">{mockStats.completedBookings}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Active Drivers</p>
                      <p className="text-3xl font-bold">{mockStats.activeDrivers}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-100 text-sm">Active Vehicles</p>
                      <p className="text-3xl font-bold">{mockStats.activeVehicles}</p>
                    </div>
                    <CarIcon className="h-8 w-8 text-indigo-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm">Cancelled</p>
                      <p className="text-3xl font-bold">{mockStats.cancelledBookings}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Pending Booking Requests
                </CardTitle>
                <CardDescription>
                  New booking requests that require your response
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'R001', company: 'TechCorp Ltd', guest: 'John Smith', pickup: 'Office Complex A', dropoff: 'Airport', time: '4:00 PM', type: 'Sedan' },
                    { id: 'R002', company: 'Innovation Inc', guest: 'Sarah Johnson', pickup: 'Hotel Grand', dropoff: 'Conference Center', time: '6:30 PM', type: 'SUV' },
                    { id: 'R003', company: 'Global Solutions', guest: 'Mike Davis', pickup: 'Airport', dropoff: 'Office Complex B', time: '8:00 AM', type: 'Hatchback' },
                  ].map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-orange-100 rounded-lg p-2">
                          <Car className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{request.guest}</h4>
                          <p className="text-sm text-gray-600">{request.company}</p>
                          <p className="text-sm text-gray-600">{request.pickup} → {request.dropoff}</p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div>
                          <Badge variant="outline">{request.type}</Badge>
                          <p className="text-sm text-gray-500">{request.time}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            Reject
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'bookings' && <BookingsList userType="vendor" />}
        {activeTab === 'drivers' && <DriverManagement />}
        {activeTab === 'vehicles' && <VehicleManagement />}
      </div>
    </div>
  );
};

export default VendorDashboard;
