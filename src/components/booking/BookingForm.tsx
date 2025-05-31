
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

interface BookingFormProps {
  companyId?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const BookingForm = ({ companyId, onClose, onSuccess }: BookingFormProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      
      // Generate booking number
      const { data: bookingNumber, error: numberError } = await supabase
        .rpc('generate_booking_number');

      if (numberError) throw numberError;

      const bookingData = {
        booking_number: bookingNumber,
        company_id: companyId,
        guest_name: formData.get('guestName') as string,
        guest_phone: formData.get('guestPhone') as string,
        guest_email: formData.get('guestEmail') as string,
        pickup_location: formData.get('pickupLocation') as string,
        dropoff_location: formData.get('dropoffLocation') as string,
        pickup_datetime: new Date(formData.get('pickupDateTime') as string).toISOString(),
        vehicle_type_requested: formData.get('vehicleType') as string,
        special_instructions: formData.get('specialInstructions') as string,
        estimated_duration: parseInt(formData.get('estimatedDuration') as string) || null,
        estimated_distance: parseFloat(formData.get('estimatedDistance') as string) || null,
        fare_amount: parseFloat(formData.get('fareAmount') as string) || null,
      };

      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (error) throw error;

      toast({
        title: 'Success!',
        description: `Booking ${bookingNumber} created successfully`,
      });

      onSuccess();
    } catch (error: any) {
      console.error('Error creating booking:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">New Booking</h2>
        <Button onClick={onClose} variant="ghost" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="guestName">Guest Name *</Label>
            <Input id="guestName" name="guestName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guestPhone">Guest Phone *</Label>
            <Input id="guestPhone" name="guestPhone" type="tel" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="guestEmail">Guest Email</Label>
          <Input id="guestEmail" name="guestEmail" type="email" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickupLocation">Pickup Location *</Label>
            <Input id="pickupLocation" name="pickupLocation" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dropoffLocation">Drop-off Location *</Label>
            <Input id="dropoffLocation" name="dropoffLocation" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickupDateTime">Pickup Date & Time *</Label>
            <Input 
              id="pickupDateTime" 
              name="pickupDateTime" 
              type="datetime-local" 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select name="vehicleType">
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="hatchback">Hatchback</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="estimatedDuration">Estimated Duration (mins)</Label>
            <Input id="estimatedDuration" name="estimatedDuration" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimatedDistance">Estimated Distance (km)</Label>
            <Input id="estimatedDistance" name="estimatedDistance" type="number" step="0.1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fareAmount">Fare Amount</Label>
            <Input id="fareAmount" name="fareAmount" type="number" step="0.01" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialInstructions">Special Instructions</Label>
          <Textarea 
            id="specialInstructions" 
            name="specialInstructions" 
            placeholder="Any special requirements or instructions..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Creating Booking...' : 'Create Booking'}
          </Button>
          <Button type="button" onClick={onClose} variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
