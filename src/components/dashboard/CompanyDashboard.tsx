
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { 
  Car, 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  Users,
  BarChart3,
  LogOut,
  Bell
} from 'lucide-react';
import BookingForm from '@/components/booking/BookingForm';
import BookingsList from '@/components/booking/BookingsList';

interface CompanyDashboardProps {
  user: User;
}

const CompanyDashboard = ({ user }: CompanyDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  const mockStats = {
    totalBookings: 127,
    upcomingBookings: 8,
    completedBookings: 115,
    cancelledBookings: 4,
    activeVendors: 12
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CabBooking Pro</h1>
                <p className="text-sm text-gray-500">Company Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
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
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'new-booking', label: 'New Booking', icon: Plus },
            { id: 'bookings', label: 'All Bookings', icon: Car },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
                      <p className="text-orange-100 text-sm">Upcoming</p>
                      <p className="text-3xl font-bold">{mockStats.upcomingBookings}</p>
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

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Active Vendors</p>
                      <p className="text-3xl font-bold">{mockStats.activeVendors}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>
                  Your latest cab booking requests and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'B001', guest: 'John Smith', pickup: 'Office Complex A', dropoff: 'Airport', status: 'ongoing', time: '2:30 PM' },
                    { id: 'B002', guest: 'Sarah Johnson', pickup: 'Hotel Grand', dropoff: 'Conference Center', status: 'upcoming', time: '4:00 PM' },
                    { id: 'B003', guest: 'Mike Davis', pickup: 'Airport', dropoff: 'Office Complex A', status: 'completed', time: '1:15 PM' },
                  ].map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-white rounded-lg p-2">
                          <Car className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{booking.guest}</h4>
                          <p className="text-sm text-gray-600">{booking.pickup} → {booking.dropoff}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          booking.status === 'completed' ? 'default' :
                          booking.status === 'ongoing' ? 'secondary' : 'outline'
                        }>
                          {booking.status}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">{booking.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'new-booking' && <BookingForm />}
        {activeTab === 'bookings' && <BookingsList userType="company" />}
      </div>
    </div>
  );
};

export default CompanyDashboard;
