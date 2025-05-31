
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Car className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {vendorData?.name || 'Vendor Dashboard'}
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">{vendorData?.email}</p>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {vendorData?.rating?.toFixed(1) || '0.0'}
                </Badge>
              </div>
            </div>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">New Requests</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Car className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Active Trips</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">{vendorData?.total_bookings || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-2xl font-bold">{vendorData?.rating?.toFixed(1) || '0.0'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Pending Booking Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingsList userRole="vendor" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vehicles">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Vehicle Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <VehicleManagement vendorId={vendorData?.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drivers">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Driver Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <DriverManagement vendorId={vendorData?.id} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Booking History</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingsList userRole="vendor" showHistory={true} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;
