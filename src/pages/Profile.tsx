
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, ShoppingBag, Package } from 'lucide-react';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    avatar_url: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          avatar_url: data.avatar_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-white mb-2">
            Your Profile
          </h1>
          <p className="text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-xl font-semibold text-white">Personal Information</h2>
              </div>

              <form onSubmit={updateProfile} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-gray-800 border-gray-700 text-gray-400 mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="full_name" className="text-white">Full Name</Label>
                  <Input
                    id="full_name"
                    type="text"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white mt-2 focus:border-primary focus:ring-primary"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="avatar_url" className="text-white">Avatar URL</Label>
                  <Input
                    id="avatar_url"
                    type="url"
                    value={profile.avatar_url}
                    onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white mt-2 focus:border-primary focus:ring-primary"
                    placeholder="Enter avatar URL"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary-dark text-white"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center mb-4">
                <ShoppingBag className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-semibold text-white">Quick Stats</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Orders</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Pre-orders</span>
                  <span>0</span>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center mb-4">
                <Package className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-semibold text-white">Account Actions</h3>
              </div>
              <Button
                onClick={signOut}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-500"
              >
                Sign Out
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
