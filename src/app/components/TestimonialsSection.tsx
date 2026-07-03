'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const testimonials = [
{
  id: 1,
  name: 'Natalie Hargrove',
  role: 'Wedding Client',
  location: 'New York, NY',
  quote: 'LuxeBloom transformed our wedding ceremony. Every arrangement was breathtaking — guests kept asking who did the florals. Worth every penny.',
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a3bbaf5d-1770154803983.png",
  alt: 'Portrait of Natalie Hargrove, smiling woman with brown hair, natural light',
  product: 'Wedding Package — Ivory Reverie'
},
{
  id: 2,
  name: 'Marcus Webb',
  role: 'Anniversary Gift',
  location: 'Chicago, IL',
  quote: 'Ordered for our 10th anniversary. The bouquet arrived same-day, perfectly arranged, and she cried happy tears. Will be ordering for every occasion now.',
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ef76ebd7-1763296840904.png",
  alt: 'Portrait of Marcus Webb, professional man with warm smile, bright background',
  product: 'Crimson Affair — Premium Roses'
},
{
  id: 3,
  name: 'Priya Chandrasekaran',
  role: 'Event Planner',
  location: 'Los Angeles, CA',
  quote: 'As a professional event planner, I\'ve worked with many florists. LuxeBloom is on another level. Consistent quality, always on time, and the team is a pleasure to work with.',
  rating: 5,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18b47f11c-1766204529712.png",
  alt: 'Portrait of Priya Chandrasekaran, confident woman in professional attire, clean background',
  product: 'Corporate Standing Order'
}];


const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.testimonial-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-background" id="testimonials">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
            Client Stories
          </span>
          <h2 className="font-display text-section font-semibold text-foreground">
            Moments they'll
            <br />
            <span className="font-light italic">never forget.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) =>
          <div
            key={t.id}
            className="testimonial-card bg-card border border-border rounded-2xl p-8 flex flex-col gap-6"
            style={{
              opacity: 0,
              transform: 'translateY(28px)',
              transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.1}s, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.1}s`
            }}>
            
              {/* Quote mark */}
              <div className="text-5xl font-display leading-none text-primary opacity-40 select-none">"</div>

              {/* Stars */}
              <div className="flex items-center gap-1 -mt-4">
                {[...Array(t.rating)].map((_, si) =>
              <Icon key={si} name="StarIcon" variant="solid" size={14} className="star-filled" />
              )}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed font-light flex-1">{t.quote}</p>

              {/* Product tag */}
              <span className="text-xs text-muted-foreground font-medium tracking-wide border border-border rounded-full px-3 py-1 self-start">
                {t.product}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                  src={t.image}
                  alt={t.alt}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover" />
                
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role} · {t.location}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div className="mt-14 pt-12 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
          { value: '12,400+', label: 'Bouquets Delivered' },
          { value: '4.96', label: 'Average Rating' },
          { value: '98%', label: 'On-Time Delivery' },
          { value: '7 Days', label: 'Freshness Guarantee' }].
          map((stat) =>
          <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-semibold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;