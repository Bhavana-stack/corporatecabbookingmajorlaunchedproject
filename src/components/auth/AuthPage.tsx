import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Car, Building2, Users, MapPin, AlertCircle } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<string>('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSupabaseConfigured || !supabase) {
      toast({
        title: "Supabase Not Connected",
        description: "Please connect to Supabase first using the button in the top right.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "Successfully logged in.",
        });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        if (data.user) {
          // Create user profile
          const { error: profileError } = await supabase
            .from('user_profiles')
            .insert({
              user_id: data.user.id,
              email: data.user.email,
              role,
              company_name: companyName,
            });

          if (profileError) {
            console.error('Profile creation error:', profileError);
          }
        }

        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 -left-8 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 bg-white/10 rounded-full blur-md"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white rounded-2xl p-3 shadow-lg">
              <Car className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">CabBooking Pro</h1>
          <p className="text-blue-100">Corporate Travel Management Platform</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-orange-800 font-medium">Supabase Connection Required</p>
                <p className="text-sm text-orange-700 mt-1">
                  Please connect to Supabase using the green button in the top right to enable authentication.
                </p>
              </div>
            </div>
          </div>
        )}

        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription>
              {isLogin ? 'Sign in to your account' : 'Register as a company or vendor'}
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleAuth}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-white border-gray-200"
                  disabled={!isSupabaseConfigured}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="bg-white border-gray-200"
                  disabled={!isSupabaseConfigured}
                />
              </div>

              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="role">Account Type</Label>
                    <Select value={role} onValueChange={setRole} required disabled={!isSupabaseConfigured}>
                      <SelectTrigger className="bg-white border-gray-200">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Company
                          </div>
                        </SelectItem>
                        <SelectItem value="vendor">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Vendor
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">
                      {role === 'vendor' ? 'Vendor Name' : 'Company Name'}
                    </Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={`Enter your ${role === 'vendor' ? 'vendor' : 'company'} name`}
                      required={!isLogin}
                      className="bg-white border-gray-200"
                      disabled={!isSupabaseConfigured}
                    />
                  </div>
                </>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
                disabled={loading || !isSupabaseConfigured}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  disabled={!isSupabaseConfigured}
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Feature highlights */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <MapPin className="h-6 w-6 text-white mx-auto mb-1" />
            <p className="text-white text-xs">Real-time Tracking</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <Users className="h-6 w-6 text-white mx-auto mb-1" />
            <p className="text-white text-xs">Multi-vendor Network</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
