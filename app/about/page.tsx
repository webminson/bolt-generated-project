export default function AboutPage() {
      return (
        <div className="min-h-screen bg-background">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">CareerCompass</h1>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-muted-foreground">
              This is the about page.
            </p>
          </main>
        </div>
      );
    }
