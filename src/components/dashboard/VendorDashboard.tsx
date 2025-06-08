
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Car, Users, MapPin, Star, LogOut, User as UserIcon, Plus } from 'lucide-react';
import BookingsList from '@/components/booking/BookingsList';
import VehicleManagement from '@/components/vendor/VehicleManagement';
import DriverManagement from '@/components/vendor/DriverManagement';

interface VendorData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  rating: number;
  total_bookings: number;
}

interface VendorDashboardProps {
  user: User;
}

const VendorDashboard = ({ user }: VendorDashboardProps) => {
  const [vendorData, setVendorData] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendorData();
  }, [user.id]);

  const fetchVendorData = async () => {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setVendorData(data);
    } catch (error: any) {
      console.error('Error fetching vendor data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load vendor information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Modern Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl modern-gradient flex items-center justify-center">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {vendorData?.name || 'Vendor Dashboard'}
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">{vendorData?.email}</p>
                <Badge variant="outline" className="flex items-center gap-1 border-yellow-300 text-yellow-700">
                  <Star className="h-3 w-3" />
                  {vendorData?.rating?.toFixed(1) || '0.0'}
                </Badge>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleSignOut} 
            variant="outline" 
            size="sm"
            className="border-gray-300 hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Vendor Dashboard</h2>
          <p className="text-gray-600">Manage your fleet and bookings efficiently</p>
        </div>

        {/* Modern Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">New Requests</p>
                <p className="text-3xl font-bold text-blue-600">0</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Trips</p>
                <p className="text-3xl font-bold text-green-600">0</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Car className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-orange-600">{vendorData?.total_bookings || 0}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-yellow-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Rating</p>
                <p className="text-3xl font-bold text-yellow-600">{vendorData?.rating?.toFixed(1) || '0.0'}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Modern Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm p-1 rounded-xl">
            <TabsTrigger value="bookings" className="rounded-lg">Booking Requests</TabsTrigger>
            <TabsTrigger value="vehicles" className="rounded-lg">Vehicles</TabsTrigger>
            <TabsTrigger value="drivers" className="rounded-lg">Drivers</TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg">History</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Pending Booking Requests</h3>
              </div>
              <div className="p-6">
                <BookingsList userRole="vendor" />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="vehicles" className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Vehicle Management</h3>
              </div>
              <div className="p-6">
                <VehicleManagement vendorId={vendorData?.id} />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="drivers" className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Driver Management</h3>
              </div>
              <div className="p-6">
                <DriverManagement vendorId={vendorData?.id} />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Booking History</h3>
              </div>
              <div className="p-6">
                <BookingsList userRole="vendor" showHistory={true} />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;
