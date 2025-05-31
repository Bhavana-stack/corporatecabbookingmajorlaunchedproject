
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, MapPin, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const BookingForm = () => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    guestName: '',
    guestPhone: '',
    guestEmail: '',
    pickupLocation: '',
    dropoffLocation: '',
    vehicleType: '',
    time: '',
    reference: '',
    specialRequests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.guestName || !formData.pickupLocation || !formData.dropoffLocation || !formData.vehicleType || !formData.time) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the booking request to vendors
    toast({
      title: "Booking Request Sent!",
      description: "Your booking request has been sent to available vendors.",
    });

    // Reset form
    setFormData({
      guestName: '',
      guestPhone: '',
      guestEmail: '',
      pickupLocation: '',
      dropoffLocation: '',
      vehicleType: '',
      time: '',
      reference: '',
      specialRequests: ''
    });
    setDate(undefined);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          New Booking Request
        </CardTitle>
        <CardDescription>
          Create a new cab booking request for your organization
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Guest Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="guestName">Guest Name *</Label>
                <Input
                  id="guestName"
                  value={formData.guestName}
                  onChange={(e) => handleInputChange('guestName', e.target.value)}
                  placeholder="Enter guest name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestPhone">Phone Number</Label>
                <Input
                  id="guestPhone"
                  type="tel"
                  value={formData.guestPhone}
                  onChange={(e) => handleInputChange('guestPhone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestEmail">Email</Label>
                <Input
                  id="guestEmail"
                  type="email"
                  value={formData.guestEmail}
                  onChange={(e) => handleInputChange('guestEmail', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">Reference/Department</Label>
                <Input
                  id="reference"
                  value={formData.reference}
                  onChange={(e) => handleInputChange('reference', e.target.value)}
                  placeholder="Department or reference"
                />
              </div>
            </div>

            {/* Trip Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Trip Details</h3>
              
              <div className="space-y-2">
                <Label>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleType">Vehicle Type *</Label>
                <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Location Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickupLocation">Pickup Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                    placeholder="Enter pickup location"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dropoffLocation">Dropoff Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                    placeholder="Enter dropoff location"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="Any special requirements or notes..."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Send Booking Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
