'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function OrderConfirmedContent() {
  const [visible, setVisible] = useState(false);
  const [checkDone, setCheckDone] = useState(false);
  const [orderNumber] = useState(() => `LB-${Math.floor(100000 + Math.random() * 900000)}`);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setCheckDone(true), 1200);
    return () => {clearTimeout(t1);clearTimeout(t2);};
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 text-center">
      {/* Animated checkmark */}
      <div
        className={`relative mx-auto mb-10 transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        style={{ width: 120, height: 120 }}>
        
        {/* Pulsing ring */}
        <div className={`absolute inset-0 rounded-full border-4 border-primary transition-all duration-1000 ${checkDone ? 'scale-125 opacity-0' : 'scale-100 opacity-100'}`} />
        {/* Circle */}
        <div className="w-full h-full rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            className="overflow-visible">
            
            <circle
              cx="26"
              cy="26"
              r="24"
              stroke="var(--primary)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="150.8"
              strokeDashoffset={visible ? '0' : '150.8'}
              style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.65,0,0.35,1)', transformOrigin: 'center', transform: 'rotate(-90deg)' }} />
            
            <path
              d="M14 26l9 9 15-15"
              stroke="var(--primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="40"
              strokeDashoffset={checkDone ? '0' : '40'}
              style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0.65,0,0.35,1) 0.7s' }} />
            
          </svg>
        </div>
        {/* Floating petals */}
        {checkDone &&
        <>
            {['🌸', '🌹', '✨', '🌷', '💐'].map((emoji, i) =>
          <div
            key={i}
            className="absolute text-xl animate-confetti-fall pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              animationDelay: `${i * 0.12}s`,
              '--angle': `${i * 72 - 36}deg`
            } as React.CSSProperties}>
            
                {emoji}
              </div>
          )}
          </>
        }
      </div>

      {/* Heading */}
      <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border glass mb-5">
          <span className="text-sm">🎉</span>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">Order Confirmed</span>
        </div>
        <h1 className="font-display text-display font-semibold text-foreground mb-4" style={{ fontStyle: 'italic' }}>
          Thank You!
        </h1>
        <p className="text-lg text-muted-foreground font-light leading-relaxed mb-2">
          Your bouquet is being lovingly prepared by our artisan florists.
        </p>
        <p className="text-sm text-muted-foreground">
          A confirmation email will be sent to your inbox shortly.
        </p>
      </div>

      {/* Order card */}
      <div className={`mt-10 bg-card rounded-3xl border border-border shadow-card overflow-hidden transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="relative h-40 overflow-hidden">
          <AppImage
            src="https://images.unsplash.com/photo-1596650455710-10b47785ecb4"
            alt="Beautiful luxury bouquet arrangement with pink peonies and white roses, artisan crafted"
            width={600}
            height={160}
            className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Order Number</p>
              <p className="font-display text-xl font-semibold text-foreground">{orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</p>
              <div className="inline-flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-sage animate-ping-soft" />
                <span className="text-sm font-semibold text-sage">Preparing</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Order items */}
          <div className="space-y-3">
            {[
            { emoji: '💐', name: 'Custom Bouquet — Satin Wrap', detail: 'Artisan crafted', price: '$89.50' },
            { emoji: '🌹', name: 'Red Rose × 5', detail: 'Premium stems', price: '$22.50' },
            { emoji: '💮', name: 'Peony × 3', detail: 'Garden fresh', price: '$19.50' }].
            map((item) =>
            <div key={item.name} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl flex-shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
                <span className="text-sm font-bold text-foreground">{item.price}</span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-2">
            <span className="font-semibold text-foreground">Total Paid</span>
            <span className="font-display text-2xl font-semibold text-primary">$131.50</span>
          </div>

          {/* Delivery info */}
          <div className="bg-secondary rounded-2xl p-4 flex gap-3 items-start">
            <span className="text-xl">🚚</span>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Estimated Delivery</p>
              <p className="text-sm text-muted-foreground">Today between 3:00 PM – 5:00 PM</p>
              <p className="text-xs text-muted-foreground mt-1">Free same-day delivery included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Link href="/shop" className="gold-btn px-10 py-4 rounded-full font-semibold text-base inline-flex items-center justify-center gap-2">
          <span>Continue Shopping</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
        <Link href="/" className="outline-btn px-10 py-4 rounded-full font-semibold text-base inline-flex items-center justify-center">
          Back to Home
        </Link>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Questions? Contact us at{' '}
        <a href="mailto:hello@luxebloom.com" className="text-primary hover:underline">hello@luxebloom.com</a>
      </p>
    </div>);

}