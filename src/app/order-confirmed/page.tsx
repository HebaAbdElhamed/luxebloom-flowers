import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderConfirmedContent from './components/OrderConfirmedContent';

export const metadata = {
  title: 'Order Confirmed — LuxeBloom',
  description: 'Your order has been placed successfully. Thank you for choosing LuxeBloom.',
};

export default function OrderConfirmedPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-28 pb-20">
        <OrderConfirmedContent />
      </main>
      <Footer />
    </>
  );
}
