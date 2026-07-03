'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const values = [
  {
    icon: 'TruckIcon' as const,
    title: 'Same-day Delivery',
    description: 'Order by 2 PM for guaranteed same-day delivery across NYC, LA, and Chicago.',
    accent: 'bg-sage-light',
    iconColor: 'text-sage',
  },
  {
    icon: 'SparklesIcon' as const,
    title: 'Artisan Crafted',
    description: 'Every bouquet hand-designed by our master florists with 10+ years of expertise.',
    accent: 'bg-blush/40',
    iconColor: 'text-primary',
  },
  {
    icon: 'SunIcon' as const,
    title: 'Freshly Picked',
    description: 'Sourced daily from sustainable farms — guaranteed fresh for 7+ days.',
    accent: 'bg-secondary',
    iconColor: 'text-gold-dark',
  },
];

const ValuePropsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.value-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="value-card flex items-start gap-5 p-7 rounded-2xl border border-border bg-card shadow-card"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: `opacity 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.1}s, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.1}s`,
              }}
            >
              <div className={`w-12 h-12 rounded-xl ${v.accent} flex items-center justify-center flex-shrink-0`}>
                <Icon name={v.icon} size={22} className={v.iconColor} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;