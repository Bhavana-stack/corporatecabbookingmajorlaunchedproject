import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Calendar, MapPin, Clock, LogOut, User as UserIcon, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
              <UserIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {companyData?.name || 'Company Dashboard'}
              </h1>
              <p className="text-sm text-gray-500">{companyData?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => navigate('/contact')}
              variant="outline" 
              size="sm"
              className="border-blue-500/30 text-blue-600 hover:bg-blue-50"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Us
            </Button>
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
          <p className="text-gray-600">Manage your transportation needs efficiently</p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Dashboard Overview</h3>
          <Button 
            onClick={() => setShowBookingForm(true)} 
            className="modern-gradient text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Booking
          </Button>
        </div>

        {/* Modern Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Today's Bookings</p>
                <p className="text-3xl font-bold text-blue-600">0</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
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
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-orange-600">0</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-purple-600">0</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Badge className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Bookings List */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
          </div>
          <div className="p-6">
            <BookingsList userRole="company" />
          </div>
        </Card>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <BookingForm
              companyId={companyData?.id}
              onClose={() => setShowBookingForm(false)}
              onSuccess={() => {
                setShowBookingForm(false);
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
