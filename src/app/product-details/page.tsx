import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDetailsContent from '@/app/product-details/components/ProductDetailsContent';

export default function ProductDetailsPage() {
  return (
    <main className="relative overflow-x-hidden bg-background">
      <Header transparent={false} />
      <ProductDetailsContent />
      <Footer />
    </main>
  );
}