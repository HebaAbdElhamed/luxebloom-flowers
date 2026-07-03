import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutContent from './components/CheckoutContent';

export const metadata = {
  title: 'Checkout — LuxeBloom',
  description: 'Complete your order with secure checkout. Schedule delivery and pay safely.',
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-28 pb-20">
        <CheckoutContent />
      </main>
      <Footer />
    </>
  );
}
