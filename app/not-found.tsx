import { Metadata } from 'next';
import Link from "next/link";
import MainLayout from '@/components/layout/main-layout'

export const metadata: Metadata = {
  title: '404 - Page Not Found | SWADE IT',
  description: 'The page you are looking for could not be found. Return to SWADE IT homepage for Auckland IT support services.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
          <Link href="/" className="text-primary underline underline-offset-4">
            Return to Home
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}