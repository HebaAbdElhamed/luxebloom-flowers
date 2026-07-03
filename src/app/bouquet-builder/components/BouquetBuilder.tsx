'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

interface VaseOption {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
}

interface StemOption {
  id: string;
  name: string;
  emoji: string;
  pricePerStem: number;
  color: string;
}

interface CartStem {
  stemId: string;
  quantity: number;
}

const vaseOptions: VaseOption[] = [
{
  id: 'kraft',
  name: 'Kraft Paper Wrap',
  description: 'Rustic & natural',
  price: 0,
  image: "https://images.unsplash.com/photo-1676214183130-23c7335ef371",
  alt: 'Artisan bouquet wrapped in natural kraft paper with twine, rustic elegant style'
},
{
  id: 'satin',
  name: 'Satin Ribbon Wrap',
  description: 'Soft & romantic',
  price: 8,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1464b4a3a-1772870750359.png",
  alt: 'Luxury bouquet wrapped in ivory satin ribbon, romantic and elegant presentation'
},
{
  id: 'glass',
  name: 'Glass Vase',
  description: 'Classic & timeless',
  price: 18,
  image: "https://images.unsplash.com/photo-1652315668657-ba9c583b863b",
  alt: 'Elegant clear glass vase with floral arrangement, classic and timeless presentation'
},
{
  id: 'ceramic',
  name: 'Ceramic Vase',
  description: 'Artisan & premium',
  price: 28,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19b6d1936-1772709757415.png",
  alt: 'Handcrafted matte ceramic vase in soft ivory tone, artisan premium quality'
}];


const stemOptions: StemOption[] = [
{ id: 'rose-red', name: 'Red Rose', emoji: '🌹', pricePerStem: 4.5, color: '#C0392B' },
{ id: 'rose-white', name: 'White Rose', emoji: '🤍', pricePerStem: 4.5, color: '#F5F5F0' },
{ id: 'rose-pink', name: 'Blush Rose', emoji: '🌸', pricePerStem: 4.5, color: '#E8C5B0' },
{ id: 'tulip', name: 'Tulip', emoji: '🌷', pricePerStem: 3.0, color: '#E91E8C' },
{ id: 'peony', name: 'Peony', emoji: '💮', pricePerStem: 6.5, color: '#F4A7B9' },
{ id: 'lily', name: 'Lily', emoji: '🌼', pricePerStem: 5.0, color: '#FFF176' },
{ id: 'sunflower', name: 'Sunflower', emoji: '🌻', pricePerStem: 3.5, color: '#FDD835' },
{ id: 'lavender', name: 'Lavender', emoji: '💜', pricePerStem: 2.5, color: '#CE93D8' },
{ id: 'orchid', name: 'Orchid', emoji: '🌺', pricePerStem: 7.0, color: '#AB47BC' },
{ id: 'eucalyptus', name: 'Eucalyptus', emoji: '🌿', pricePerStem: 2.0, color: '#9AAF8A' }];


const BASE_PRICE = 15;

export default function BouquetBuilder() {
  const [selectedVase, setSelectedVase] = useState<string>('kraft');
  const [stems, setStems] = useState<CartStem[]>([]);
  const [addedToCart, setAddedToCart] = useState(false);

  const getVase = (id: string) => vaseOptions.find((v) => v.id === id)!;
  const getStem = (id: string) => stemOptions.find((s) => s.id === id)!;

  const getStemQty = (stemId: string) => stems.find((s) => s.stemId === stemId)?.quantity ?? 0;

  const updateStem = (stemId: string, delta: number) => {
    setStems((prev) => {
      const existing = prev.find((s) => s.stemId === stemId);
      if (!existing) {
        if (delta > 0) return [...prev, { stemId, quantity: delta }];
        return prev;
      }
      const newQty = existing.quantity + delta;
      if (newQty <= 0) return prev.filter((s) => s.stemId !== stemId);
      return prev.map((s) => s.stemId === stemId ? { ...s, quantity: newQty } : s);
    });
  };

  const totalStems = stems.reduce((acc, s) => acc + s.quantity, 0);
  const stemsTotal = stems.reduce((acc, s) => acc + getStem(s.stemId).pricePerStem * s.quantity, 0);
  const vasePrice = getVase(selectedVase).price;
  const grandTotal = totalStems > 0 ? BASE_PRICE + vasePrice + stemsTotal : 0;

  const handleAddToCart = () => {
    if (totalStems === 0) return;
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Page Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border glass mb-6">
          <span className="text-sm">🌸</span>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">Custom Creation</span>
        </div>
        <h1 className="font-display text-display font-semibold text-foreground mb-4" style={{ fontStyle: 'italic' }}>
          Build Your Own Bouquet
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
          Curate every stem. Choose your vessel. Create something entirely yours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Builder Steps */}
        <div className="lg:col-span-2 space-y-12">

          {/* Step 1: Vase / Wrap */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
              <h2 className="font-display text-2xl font-semibold text-foreground">Choose Your Vessel</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {vaseOptions.map((vase) =>
              <button
                key={vase.id}
                onClick={() => setSelectedVase(vase.id)}
                className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left ${
                selectedVase === vase.id ?
                'border-primary shadow-gold scale-[1.02]' :
                'border-border hover:border-primary/50'}`
                }>
                
                  <div className="aspect-square overflow-hidden">
                    <AppImage
                    src={vase.image}
                    alt={vase.alt}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  
                  </div>
                  <div className="p-3 bg-card">
                    <p className="text-sm font-semibold text-foreground leading-tight">{vase.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{vase.description}</p>
                    <p className="text-xs font-bold text-primary mt-1">
                      {vase.price === 0 ? 'Included' : `+$${vase.price}`}
                    </p>
                  </div>
                  {selectedVase === vase.id &&
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                }
                </button>
              )}
            </div>
          </div>

          {/* Step 2: Stems */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
              <h2 className="font-display text-2xl font-semibold text-foreground">Select Your Stems</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stemOptions.map((stem) => {
                const qty = getStemQty(stem.id);
                return (
                  <div
                    key={stem.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 ${
                    qty > 0 ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/40'}`
                    }>
                    
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xl border-2"
                        style={{ borderColor: stem.color, backgroundColor: stem.color + '22' }}>
                        
                        {stem.emoji}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{stem.name}</p>
                        <p className="text-xs text-muted-foreground">${stem.pricePerStem.toFixed(2)} / stem</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateStem(stem.id, -1)}
                        disabled={qty === 0}
                        className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                        
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-foreground">{qty}</span>
                      <button
                        onClick={() => updateStem(stem.id, 1)}
                        className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors">
                        
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      </button>
                    </div>
                  </div>);

              })}
            </div>
          </div>
        </div>

        {/* Right: Live Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
              {/* Preview image */}
              <div className="relative h-48 overflow-hidden">
                <AppImage
                  src={getVase(selectedVase).image}
                  alt={getVase(selectedVase).alt}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Your Bouquet</p>
                  <p className="font-display text-lg font-semibold text-foreground">{getVase(selectedVase).name}</p>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Stems summary */}
                {stems.length > 0 ?
                <div className="space-y-2">
                    <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Selected Stems</p>
                    {stems.map((s) => {
                    const stem = getStem(s.stemId);
                    return (
                      <div key={s.stemId} className="flex items-center justify-between text-sm">
                          <span className="text-foreground">
                            {stem.emoji} {stem.name} × {s.quantity}
                          </span>
                          <span className="text-muted-foreground font-medium">
                            ${(stem.pricePerStem * s.quantity).toFixed(2)}
                          </span>
                        </div>);

                  })}
                  </div> :

                <div className="text-center py-4">
                    <p className="text-4xl mb-2">🌱</p>
                    <p className="text-sm text-muted-foreground">Add stems to begin your bouquet</p>
                  </div>
                }

                {/* Pricing breakdown */}
                {totalStems > 0 &&
                <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Base arrangement</span>
                      <span>${BASE_PRICE.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{getVase(selectedVase).name}</span>
                      <span>{vasePrice === 0 ? 'Included' : `$${vasePrice.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{totalStems} stem{totalStems !== 1 ? 's' : ''}</span>
                      <span>${stemsTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-foreground text-lg border-t border-border pt-3 mt-3">
                      <span>Total</span>
                      <span className="text-primary">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                }

                {/* CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={totalStems === 0}
                  className={`w-full py-4 rounded-full font-semibold text-base transition-all duration-300 ${
                  totalStems > 0 ?
                  'gold-btn' : 'bg-muted text-muted-foreground cursor-not-allowed'}`
                  }>
                  
                  {addedToCart ? '✓ Added to Cart!' : totalStems === 0 ? 'Add stems to continue' : `Add to Cart — $${grandTotal.toFixed(2)}`}
                </button>

                {totalStems > 0 &&
                <Link
                  href="/checkout"
                  className="block w-full py-3.5 rounded-full font-semibold text-base text-center outline-btn transition-all duration-300">
                  
                    Proceed to Checkout
                  </Link>
                }

                <p className="text-center text-xs text-muted-foreground">
                  🚚 Free same-day delivery on orders over $75
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}