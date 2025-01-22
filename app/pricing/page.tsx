'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Navigation } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Navigation className="h-6 w-6" />
            <span className="font-bold text-xl">CareerCompass</span>
          </Link>
          <Button asChild variant="ghost">
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Career Journey</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the plan that best fits your career development needs. All plans include access to our core features and expert guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <Card className="p-8 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Basic</h3>
            <div className="text-3xl font-bold mb-6">
              $9<span className="text-lg text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-primary" />
                <span>Career Assessment Tests</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-primary" />
                <span>Basic Career Report</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-primary" />
                <span>Email Support</span>
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/auth/login">Get Started</Link>
            </Button>
          </Card>

          {/* Pro Plan */}
          <Card className="p-8 flex flex-col relative bg-primary text-primary-foreground">
            <div className="absolute top-0 right-0 bg-primary px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm">
              Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <div className="text-3xl font-bold mb-6">
              $29<span className="text-lg opacity-85">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <span>All Basic Features</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <span>Detailed Career Analysis</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <span>1-on-1 Career Coaching</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <span>Industry Insights</span>
              </li>
            </ul>
            <Button asChild className="w-full bg-background text-primary hover:bg-background/90">
              <Link href="/auth/login">Get Started</Link>
            </Button>
          </Card>

          {/* Enterprise Plan */}
          <Card className="p-8 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <div className="text-3xl font-bold mb-6">
              $99<span className="text-lg text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-primary" />
                <span>All Pro Features</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-primary" />
                <span>Custom Assessment Tools</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-primary" />
                <span>Priority Support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-primary" />
                <span>Team Management</span>
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link href="/auth/login">Contact Sales</Link>
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
