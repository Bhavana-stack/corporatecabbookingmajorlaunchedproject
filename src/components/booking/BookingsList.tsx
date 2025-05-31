
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { MapPin, Clock, Phone, User, Car, Check, X, Play, Square } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Booking {
  id: string;
  booking_number: string;
  guest_name: string;
  guest_phone: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_datetime: string;
  vehicle_type_requested?: string;
  status: string;
  visibility: string;
  fare_amount?: number;
  created_at: string;
  special_instructions?: string;
}

interface BookingsListProps {
  userRole: 'company' | 'vendor';
  showHistory?: boolean;
}

const BookingsList = ({ userRole, showHistory = false }: BookingsListProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
    
    // Subscribe to real-time changes
    const subscription = supabase
      .channel('bookings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
        },
        () => {
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userRole, showHistory]);

  const fetchBookings = async () => {
    try {
      let query = supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (!showHistory) {
        if (userRole === 'vendor') {
          query = query.in('status', ['pending']);
        } else {
          query = query.limit(10);
        }
      }

      const { data, error } = await query;

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load bookings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'accepted',
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Booking accepted successfully',
      });

      fetchBookings();
    } catch (error: any) {
      console.error('Error accepting booking:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleRejectBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'rejected',
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: 'Booking Rejected',
        description: 'Booking has been rejected',
      });

      fetchBookings();
    } catch (error: any) {
      console.error('Error rejecting booking:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {showHistory ? 'No booking history found' : 'No active bookings found'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="font-mono">
                  {booking.booking_number}
                </Badge>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
                {booking.visibility === 'open_market' && (
                  <Badge variant="secondary">Open Market</Badge>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(booking.created_at), { addSuffix: true })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{booking.guest_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{booking.guest_phone}</span>
                </div>
                {booking.vehicle_type_requested && (
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-gray-500" />
                    <span className="text-sm capitalize">{booking.vehicle_type_requested}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Pickup</p>
                    <p className="text-sm text-gray-600">{booking.pickup_location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Drop-off</p>
                    <p className="text-sm text-gray-600">{booking.dropoff_location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  {new Date(booking.pickup_datetime).toLocaleString()}
                </span>
              </div>
              {booking.fare_amount && (
                <div className="text-sm font-medium">
                  ₹{booking.fare_amount}
                </div>
              )}
            </div>

            {booking.special_instructions && (
              <div className="mb-3 p-2 bg-gray-50 rounded text-sm">
                <strong>Instructions:</strong> {booking.special_instructions}
              </div>
            )}

            {/* Action buttons for vendors */}
            {userRole === 'vendor' && booking.status === 'pending' && !showHistory && (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAcceptBooking(booking.id)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Accept
                </Button>
                <Button
                  onClick={() => handleRejectBooking(booking.id)}
                  variant="outline"
                  size="sm"
                >
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            )}

            {/* Trip control buttons for accepted bookings */}
            {userRole === 'vendor' && booking.status === 'accepted' && (
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Play className="h-4 w-4 mr-1" />
                  Start Trip
                </Button>
              </div>
            )}

            {userRole === 'vendor' && booking.status === 'ongoing' && (
              <div className="flex gap-2">
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  <Square className="h-4 w-4 mr-1" />
                  End Trip
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingsList;
