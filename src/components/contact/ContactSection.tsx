
import { Mail, Phone, User, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const ContactSection = () => {
  const contactInfo = {
    name: "V BHAVANA",
    phone: "9642877134", 
    email: "corporatecabs@gmail.com"
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const handleCall = () => {
    window.open(`tel:${contactInfo.phone}`);
  };

  const handleEmail = () => {
    window.open(`mailto:${contactInfo.email}`);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="contact-card w-80 bg-white/95 backdrop-blur-lg border-white/30">
        <div className="space-y-4">
          {/* Header */}
          <div className="text-center border-b border-gray-200/50 pb-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full modern-gradient flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{contactInfo.name}</h3>
            <p className="text-sm text-gray-600">Transportation Services</p>
          </div>

          {/* Contact Options */}
          <div className="space-y-3">
            {/* Phone */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Call Now</p>
                  <p className="text-sm text-gray-600">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(contactInfo.phone, 'Phone number')}
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleCall}
                  className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-green-50/80 hover:bg-green-100/80 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Us</p>
                  <p className="text-sm text-gray-600">{contactInfo.email}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(contactInfo.email, 'Email address')}
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleEmail}
                  className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-3 border-t border-gray-200/50">
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleCall}
                className="bg-blue-500 hover:bg-blue-600 text-white"
                size="sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button
                onClick={handleEmail}
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-50"
                size="sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContactSection;
