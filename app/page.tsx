import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Compass, BookOpen, BarChart, Users, Navigation } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Navigation className="h-6 w-6" />
            <span className="font-bold text-xl">CareerCompass</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link href="/pricing">Pricing</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Discover Your Perfect Career Path
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Take our comprehensive career assessments and get personalized guidance for your future career journey.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/pricing">View Plans</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <Compass className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold mb-2">Career Direction</h3>
              <p className="text-muted-foreground">
                Find your path with our scientifically backed assessment tools.
              </p>
            </Card>
            <Card className="p-6">
              <BookOpen className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold mb-2">Learning Resources</h3>
              <p className="text-muted-foreground">
                Access curated educational content to develop your skills.
              </p>
            </Card>
            <Card className="p-6">
              <BarChart className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold mb-2">Detailed Analytics</h3>
              <p className="text-muted-foreground">
                Get comprehensive insights into your strengths and potential.
              </p>
            </Card>
            <Card className="p-6">
              <Users className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-lg font-bold mb-2">Expert Guidance</h3>
              <p className="text-muted-foreground">
                Receive personalized recommendations from career experts.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to Start Your Journey?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Choose a plan that best fits your career development needs.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/pricing">View Pricing Plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
