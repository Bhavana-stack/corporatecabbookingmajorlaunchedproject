
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Mail, Phone, User, Copy, ExternalLink, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Button 
            onClick={() => navigate('/')}
            variant="outline" 
            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Get in Touch</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Contact Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8 mb-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">{contactInfo.name}</h2>
              <p className="text-blue-300 text-lg">Transportation Services Manager</p>
            </div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Phone */}
              <Card className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Call Direct</h3>
                      <p className="text-blue-300">{contactInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(contactInfo.phone, 'Phone number')}
                      className="h-10 w-10 p-0 text-blue-400 hover:bg-blue-500/20"
                    >
                      <Copy className="w-5 h-5" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleCall}
                      className="h-10 w-10 p-0 bg-blue-500 hover:bg-blue-600"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Email */}
              <Card className="bg-white/5 border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Email Us</h3>
                      <p className="text-green-300">{contactInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(contactInfo.email, 'Email address')}
                      className="h-10 w-10 p-0 text-green-400 hover:bg-green-500/20"
                    >
                      <Copy className="w-5 h-5" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleEmail}
                      className="h-10 w-10 p-0 bg-green-500 hover:bg-green-600"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleCall}
                className="bg-blue-500 hover:bg-blue-600 text-white py-4 text-lg"
                size="lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
              <Button
                onClick={handleEmail}
                variant="outline"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10 py-4 text-lg"
                size="lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </Button>
            </div>
          </Card>

          {/* Additional Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Business Hours</h3>
                  <p className="text-purple-300">24/7 Available</p>
                </div>
              </div>
              <p className="text-slate-300">
                We're available round the clock to serve your transportation needs.
              </p>
            </Card>

            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Service Area</h3>
                  <p className="text-orange-300">Nationwide Coverage</p>
                </div>
              </div>
              <p className="text-slate-300">
                Professional transportation services across all major cities.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
