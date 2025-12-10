'use client'

import { useT } from "@/app/lib/i18n-context";
import MainLayout from '@/components/layout/main-layout'

export default function AboutClient() {
  const t = useT();
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <section className="container mx-auto px-6 py-20" aria-labelledby="about-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 id="about-heading" className="text-5xl font-bold tracking-tight mb-6 text-foreground">
                {t("about.title")}
              </h1>
            </div>
            
            <div className="p-8 rounded-lg border border-border bg-card mb-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("about.body")}
                </p>
              </div>
            </div>
            
            {/* Key highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-8 rounded-lg border border-border bg-card">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-8 rounded-lg border border-border bg-card">
                <div className="text-4xl font-bold text-primary mb-2">Auckland</div>
                <div className="text-muted-foreground">Local Base</div>
              </div>
              <div className="text-center p-8 rounded-lg border border-border bg-card">
                <div className="text-4xl font-bold text-primary mb-2">Budget</div>
                <div className="text-muted-foreground">Friendly</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}