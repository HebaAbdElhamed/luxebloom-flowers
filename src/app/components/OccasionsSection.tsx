'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

/*
BENTO GRID AUDIT:
Array has 6 cards: Wedding, Anniversary, Birthday, Sympathy, Corporate, JustBecause

Cell Map (md: grid-cols-3):
Row 1: [col-1 cs-1 rs-2: Wedding] [col-2 cs-1: Anniversary] [col-3 cs-1: Birthday]
Row 2: [col-1 (Wedding cont.)] [col-2 cs-1: Sympathy] [col-3 cs-1: Corporate]
Row 3: [col-1-3 cs-3: JustBecause]

Placed 6/6 cards ✓
*/

const occasions = [
{
  id: 'wedding',
  label: 'Weddings',
  image: "https://images.unsplash.com/photo-1676734627470-0328bad5d504",
  alt: 'Elegant white wedding bouquet with roses and greenery, bright natural light, airy atmosphere',
  colSpan: 'md:col-span-1',
  rowSpan: 'md:row-span-2',
  height: 'h-full min-h-[400px]'
},
{
  id: 'anniversary',
  label: 'Anniversary',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_133179566-1772383582581.png",
  alt: 'Deep red roses with champagne gold ribbon, romantic warm lighting, dark background',
  colSpan: 'md:col-span-1',
  rowSpan: '',
  height: 'h-52'
},
{
  id: 'birthday',
  label: 'Birthday',
  image: "https://images.unsplash.com/photo-1725759679389-b99d2baf3bef",
  alt: 'Colorful mixed bouquet with sunflowers and pink blooms, cheerful bright background',
  colSpan: 'md:col-span-1',
  rowSpan: '',
  height: 'h-52'
},
{
  id: 'sympathy',
  label: 'Sympathy',
  image: "https://images.unsplash.com/photo-1677295332908-274c1fd38d11",
  alt: 'Soft white lily and cream rose arrangement, serene peaceful lighting, minimal background',
  colSpan: 'md:col-span-1',
  rowSpan: '',
  height: 'h-52'
},
{
  id: 'corporate',
  label: 'Corporate',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12871073f-1772203917202.png",
  alt: 'Architectural minimal floral arrangement with white orchids, clean modern office background',
  colSpan: 'md:col-span-1',
  rowSpan: '',
  height: 'h-52'
},
{
  id: 'just-because',
  label: 'Just Because',
  image: "https://images.unsplash.com/photo-1734445665865-f5f08977f46a",
  alt: 'Lush garden-style bouquet with peonies and wildflowers, bright open airy studio, pastel tones',
  colSpan: 'md:col-span-3',
  rowSpan: '',
  height: 'h-52'
}];


const OccasionsSection: React.FC = () => {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="occasions" ref={sectionRef} className="section-reveal py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
              Shop by Occasion
            </span>
            <h2 className="font-display text-section font-semibold text-foreground text-balance">
              Every moment
              <br />
              <span className="font-light italic">deserves flowers.</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="outline-btn px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap self-start sm:self-auto">
            
            View All
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {occasions.map((occ) =>
          <Link
            key={occ.id}
            href={`/shop?occasion=${occ.id}`}
            className={`occasion-card ${occ.colSpan} ${occ.rowSpan} ${occ.height} block`}
            aria-label={`Shop ${occ.label} flowers`}>
            
              <AppImage
              src={occ.image}
              alt={occ.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw" />
            
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                <span className="text-white font-display text-xl font-semibold tracking-tight">
                  {occ.label}
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>);

};

export default OccasionsSection;