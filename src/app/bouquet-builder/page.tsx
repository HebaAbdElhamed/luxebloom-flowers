import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BouquetBuilder from './components/BouquetBuilder';

export const metadata = {
  title: 'Build Your Own Bouquet — LuxeBloom',
  description: 'Craft your perfect custom bouquet. Choose your vase, select stems, and see your total update in real time.',
};

export default function BouquetBuilderPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-28 pb-20">
        <BouquetBuilder />
      </main>
      <Footer />
    </>
  );
}
