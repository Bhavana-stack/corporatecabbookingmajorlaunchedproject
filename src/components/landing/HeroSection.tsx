
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Shield, Car, ArrowRight, Star } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Car className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Corporate Cab Connect
              </h1>
              <p className="text-sm text-slate-400">Transportation Excellence</p>
            </div>
          </div>
          <Button 
            onClick={onGetStarted}
            variant="outline" 
            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
          >
            Get Started <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </header>

        {/* Hero Content */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          <div className="flex justify-center gap-3 mb-8">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Enterprise Security
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              24/7 Premium Service
            </Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
              <Car className="w-4 h-4 mr-2" />
              Luxury Fleet
            </Badge>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Experience the</span><br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent">
              Future of Corporate
            </span><br />
            <span className="text-white">Transportation</span>
          </h2>

          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Smart Technology • Premium Comfort • Reliable Service
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-2xl shadow-blue-500/25"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">For Companies</h3>
            <p className="text-slate-300 leading-relaxed">
              Streamline your corporate transportation with smart booking management and real-time tracking.
            </p>
          </Card>

          <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">For Vendors</h3>
            <p className="text-slate-300 leading-relaxed">
              Manage your fleet, drivers, and bookings efficiently with our comprehensive vendor platform.
            </p>
          </Card>

          <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 hover:bg-white/10 transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Secure & Reliable</h3>
            <p className="text-slate-300 leading-relaxed">
              Enterprise-grade security with 24/7 support ensuring safe and punctual transportation.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
