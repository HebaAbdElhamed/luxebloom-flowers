'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CtaSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('section-reveal');
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
    <section ref={sectionRef} className="section-reveal py-16 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-20 text-center">
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #E8C5B0 0%, transparent 70%)', filter: 'blur(60px)' }}
            aria-hidden="true"
          />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #9AAF8A 0%, transparent 70%)', filter: 'blur(60px)' }}
            aria-hidden="true"
          />

          {/* Floating icons */}
          <div className="absolute top-12 left-12 opacity-15 animate-float-petal hidden lg:block" aria-hidden="true">
            <Icon name="HeartIcon" size={40} className="text-blush" />
          </div>
          <div className="absolute bottom-12 right-16 opacity-15 animate-float-petal hidden lg:block" style={{ animationDelay: '2s' }} aria-hidden="true">
            <Icon name="SparklesIcon" size={48} className="text-primary" />
          </div>
          <div className="absolute top-16 right-24 opacity-10 animate-float-petal hidden lg:block" style={{ animationDelay: '4s' }} aria-hidden="true">
            <Icon name="StarIcon" size={32} className="text-blush" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/50">
                Same-day orders close at 2 PM
              </span>
            </div>

            <h2 className="font-display text-display font-semibold text-white mb-6 text-balance">
              Ready to send
              <br />
              <span className="font-light italic" style={{
                background: 'linear-gradient(135deg, #E8C5B0 0%, #C9A96E 50%, #FAF8F3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                something beautiful?
              </span>
            </h2>

            <p className="text-white/50 text-lg mb-12 font-light leading-relaxed">
              Join 12,400+ customers who trust LuxeBloom for life's most meaningful moments.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="gold-btn px-10 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2"
              >
                <span>Shop Collection</span>
                <Icon name="ArrowRightIcon" size={16} className="text-primary-foreground" />
              </Link>
              <Link
                href="/product-details"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-white/20 text-white text-base font-semibold hover:bg-white/10 transition-all"
              >
                Build a Bouquet
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-14 flex items-center justify-center gap-8 md:gap-12 border-t border-white/5 pt-10 flex-wrap">
              {[
                { value: '12k+', label: 'Happy Customers' },
                { value: '4.96★', label: 'Average Rating' },
                { value: '24/7', label: 'Customer Support' },
              ].map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <div className="h-8 w-px bg-white/10 hidden md:block" />}
                  <div className="text-center">
                    <p className="font-display text-2xl font-semibold text-white">{s.value}</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 mt-1">{s.label}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;