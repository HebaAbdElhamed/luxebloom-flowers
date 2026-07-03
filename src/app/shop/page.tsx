import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShopContent from '@/app/shop/components/ShopContent';

export default function ShopPage() {
  return (
    <main className="relative overflow-x-hidden bg-background">
      <Header transparent={false} />
      <ShopContent />
      <Footer />
    </main>
  );
}