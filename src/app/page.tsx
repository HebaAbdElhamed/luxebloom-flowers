import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import ValuePropsSection from '@/app/components/ValuePropsSection';
import OccasionsSection from '@/app/components/OccasionsSection';
import BestSellersSection from '@/app/components/BestSellersSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import CtaSection from '@/app/components/CtaSection';

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden bg-background">
      <div className="noise-overlay" aria-hidden="true" />
      <Header transparent={true} />
      <HeroSection />
      <ValuePropsSection />
      <OccasionsSection />
      <BestSellersSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}