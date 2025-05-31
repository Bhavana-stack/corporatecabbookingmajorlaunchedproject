
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Calendar, MapPin, Clock, LogOut, User as UserIcon } from 'lucide-react';
import BookingForm from '@/components/booking/BookingForm';
import BookingsList from '@/components/booking/BookingsList';

interface CompanyData {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface CompanyDashboardProps {
  user: User;
}

const CompanyDashboard = ({ user }: CompanyDashboardProps) => {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanyData();
  }, [user.id]);

  const fetchCompanyData = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setCompanyData(data);
    } catch (error: any) {
      console.error('Error fetching company data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load company information',
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
            <div className="bg-blue-100 p-2 rounded-lg">
              <UserIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {companyData?.name || 'Company Dashboard'}
              </h1>
              <p className="text-sm text-gray-600">{companyData?.email}</p>
            </div>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <Button onClick={() => setShowBookingForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Today's Bookings</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-green-600" />
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
                  <MapPin className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-purple-600 bg-purple-100">
                    Total
                  </Badge>
                  <div>
                    <p className="text-sm text-gray-600">All Bookings</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bookings List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <BookingsList userRole="company" />
          </CardContent>
        </Card>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BookingForm
              companyId={companyData?.id}
              onClose={() => setShowBookingForm(false)}
              onSuccess={() => {
                setShowBookingForm(false);
                // Refresh bookings list
                window.location.reload();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
