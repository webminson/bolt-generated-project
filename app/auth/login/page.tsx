'use client';

    import { useState, useEffect } from 'react';
    import { useRouter } from 'next/navigation';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card } from '@/components/ui/card';
    import { useToast } from '@/hooks/use-toast';
    import { supabase } from '@/lib/supabase/client';
    import { ArrowLeft } from 'lucide-react';
    import Link from 'next/link';

    export default function LoginPage() {
      const router = useRouter();
      const { toast } = useToast();
      const [isLoading, setIsLoading] = useState(false);
      const [email, setEmail] = useState('');

      useEffect(() => {
        const checkSession = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            router.push('/dashboard');
          }
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            router.push('/dashboard');
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      }, [router]);

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
          const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
              emailRedirectTo: `${window.location.origin}/dashboard`,
            },
          });

          if (error) throw error;

          toast({
            title: 'Magic link sent!',
            description: 'Check your email for the login link.',
          });
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to send magic link. Please try again.',
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 space-y-6">
            <div className="flex items-center justify-between space-y-2 text-center">
              <Button asChild variant="ghost" size="icon" className="p-0">
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <div />
            </div>
            <p className="text-muted-foreground text-center">
              Sign in to your account using magic link
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending magic link...' : 'Send magic link'}
              </Button>
            </form>
          </Card>
        </div>
      );
    }
