
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import AuthPage from '@/components/auth/AuthPage';
import CompanyDashboard from '@/components/dashboard/CompanyDashboard';
import VendorDashboard from '@/components/dashboard/VendorDashboard';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { AlertCircle, Database } from 'lucide-react';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    if (!supabase) return;
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user role:', error);
        toast({
          title: "Error",
          description: "Failed to fetch user profile",
          variant: "destructive",
        });
      }

      setUserRole(data?.role || null);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show Supabase connection required screen
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Database className="h-8 w-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Supabase Connection Required</h2>
          <p className="text-gray-600 mb-6">
            To use the Cab Booking Portal, you need to connect to Supabase for authentication and database functionality.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-blue-800 font-medium mb-1">Next Steps:</p>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Click the green Supabase button in the top right</li>
                  <li>Connect to your Supabase project</li>
                  <li>The app will automatically work with authentication and database</li>
                </ol>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Refresh After Connecting
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (!userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-xl font-semibold mb-4">Setup Required</h2>
          <p className="text-gray-600 mb-4">Please contact your administrator to set up your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {userRole === 'company' ? (
        <CompanyDashboard user={user} />
      ) : (
        <VendorDashboard user={user} />
      )}
    </div>
  );
};

export default Index;
