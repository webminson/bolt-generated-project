'use client';

    import { useEffect, useState } from 'react';
    import { useRouter } from 'next/navigation';
    import { Button } from '@/components/ui/button';
    import { supabase } from '@/lib/supabase/client';
    import { User } from '@supabase/supabase-js';
    import { Card } from '@/components/ui/card';
    import { useToast } from '@/hooks/use-toast';
    import { ProfileForm } from '@/components/dashboard/profile-form';

    export default function DashboardPage() {
      const router = useRouter();
      const { toast } = useToast();
      const [user, setUser] = useState<User | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const checkUser = async () => {
          try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
              router.push('/auth/login');
              return;
            }
            setUser(session.user);
          } catch (error) {
            console.error('Error checking auth status:', error);
            toast({
              title: 'Error',
              description: 'Failed to load user data',
              variant: 'destructive',
            });
          } finally {
            setLoading(false);
          }
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            setUser(session.user);
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      }, [router, toast]);

      const handleSignOut = async () => {
        try {
          await supabase.auth.signOut();
          router.push('/auth/login');
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to sign out',
            variant: 'destructive',
          });
        }
      };

      if (loading) {
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <p className="text-lg">Loading...</p>
          </div>
        );
      }

      return (
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">CareerCompass</h1>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">
                  {user?.email}
                </span>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <div className="space-y-2">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Last Sign In:</strong> {new Date(user?.last_sign_in_at || '').toLocaleString()}</p>
                <p><strong>Account Created:</strong> {new Date(user?.created_at || '').toLocaleString()}</p>
              </div>
            </Card>
            <Card className="p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <ProfileForm />
            </Card>
          </main>
        </div>
      );
    }
