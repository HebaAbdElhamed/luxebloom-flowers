'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  const blobCRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: any;
    let ScrollTrigger: any;

    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');
      gsap = gsapModule.gsap;
      ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.2 });

      if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 0, scale: 0.85, y: 10 });
        tl.to(badgeRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'back.out(1.7)'
        });
      }

      if (h1Ref.current) {
        gsap.set(h1Ref.current, { opacity: 0, y: 60 });
        tl.to(h1Ref.current, {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'expo.out'
        }, '-=0.7');
      }

      if (descRef.current) {
        gsap.set(descRef.current, { opacity: 0, y: 30 });
        tl.to(descRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out'
        }, '-=1');
      }

      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 20 });
        tl.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out'
        }, '-=0.9');
      }

      if (scrollIndicatorRef.current) {
        tl.to(scrollIndicatorRef.current, {
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        }, '-=0.4');
      }
    };

    initGSAP();

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const mx = (e.clientX - cx) / cx;
      const my = (e.clientY - cy) / cy;

      if (blobARef.current) {
        blobARef.current.style.transform = `translate(${mx * 40}px, ${my * 30}px)`;
      }
      if (blobBRef.current) {
        blobBRef.current.style.transform = `translate(${mx * -30}px, ${my * -25}px)`;
      }
      if (blobCRef.current) {
        blobCRef.current.style.transform = `translate(${mx * 20}px, ${my * -15}px)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `rotateY(${mx * 3}deg) rotateX(${-my * 3}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-28 pb-16 overflow-hidden"
      style={{ perspective: '1000px' }}>
      
      {/* Atmospheric blobs */}
      <div
        ref={blobARef}
        className="blob-primary absolute top-1/4 left-1/5 w-[45vw] h-[45vw] pointer-events-none"
        style={{ transition: 'transform 1s cubic-bezier(0.25,0.46,0.45,0.94)' }}
        aria-hidden="true" />
      
      <div
        ref={blobBRef}
        className="blob-secondary absolute bottom-1/4 right-1/5 w-[38vw] h-[38vw] pointer-events-none"
        style={{ transition: 'transform 1s cubic-bezier(0.25,0.46,0.45,0.94)' }}
        aria-hidden="true" />
      
      <div
        ref={blobCRef}
        className="blob-gold absolute top-1/2 left-1/2 w-[30vw] h-[30vw] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ transition: 'transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)' }}
        aria-hidden="true" />
      

      {/* Floating floral decorations */}
      <div
        className="absolute top-24 right-12 w-16 h-16 rounded-full overflow-hidden opacity-30 animate-float-petal hidden lg:block"
        aria-hidden="true">
        
        <AppImage
          src="https://images.unsplash.com/photo-1653599270077-4b9a1475ac6a"
          alt="Decorative floral element, soft pink petals"
          width={64}
          height={64}
          className="w-full h-full object-cover" />
        
      </div>
      <div
        className="absolute bottom-32 left-16 w-12 h-12 rounded-full overflow-hidden opacity-25 animate-float-petal hidden lg:block"
        style={{ animationDelay: '2s' }}
        aria-hidden="true">
        
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1ab4f7fff-1783004329312.png"
          alt="Decorative floral element, green leaf"
          width={48}
          height={48}
          className="w-full h-full object-cover" />
        
      </div>

      {/* Hero flower accent image */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-0 w-64 h-80 rounded-l-3xl overflow-hidden opacity-40 hidden xl:block pointer-events-none"
        aria-hidden="true">
        <AppImage
          src="https://images.unsplash.com/photo-1694796152188-497671aac01c"
          alt="Elegant pink roses in full bloom, luxury floral accent"
          width={256}
          height={320}
          className="w-full h-full object-cover" />
      </div>
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 w-48 h-64 rounded-r-3xl overflow-hidden opacity-30 hidden xl:block pointer-events-none"
        aria-hidden="true">
        <AppImage
          src="https://images.unsplash.com/photo-1617889124369-978fa00f4f79"
          alt="White and blush peonies with soft petals, delicate floral arrangement"
          width={192}
          height={256}
          className="w-full h-full object-cover" />
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto text-center"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)' }}>
        
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass mb-10 border border-border shadow-glass">
          
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping-soft" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Same-day Delivery Available
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={h1Ref}
          className="font-display text-hero font-semibold text-foreground mb-8 text-balance"
          style={{ fontStyle: 'italic' }}>
          
          We turn your emotions
          <br />
          <span
            className="font-display font-light"
            style={{
              background: 'linear-gradient(135deg, #1A1A18 0%, #8A8478 60%, #C9A96E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
            
            into a masterpiece.
          </span>
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          
          Handcrafted luxury bouquets for life's most meaningful moments.
          Artisan-designed, freshly sourced, delivered with intention.
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <Link
            href="/shop"
            className="gold-btn px-9 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2">
            
            <span>Explore Collection</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/#occasions"
            className="outline-btn px-9 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2">
            
            Browse Occasions
          </Link>
        </div>
      </div>

      {/* Hero image strip — asymmetric 5-image layout */}
      <div className="relative z-10 mt-16 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-4 grid-rows-2 gap-3 md:gap-4 h-[520px] md:h-[600px]">
          {/* Large left image — spans 2 rows */}
          <div className="hover-zoom rounded-2xl overflow-hidden row-span-2 col-span-1">
            <AppImage
              src="https://images.unsplash.com/photo-1544563976-4ab5609b9323"
              alt="Luxury white rose bouquet in elegant ivory wrapping, softly lit studio setting"
              width={400}
              height={600}
              className="w-full h-full object-cover"
              priority />
          </div>

          {/* Top center — wide */}
          <div className="hover-zoom rounded-2xl overflow-hidden col-span-2">
            <AppImage
              src="https://images.unsplash.com/photo-1615463366857-39056213231b"
              alt="Vibrant mixed floral arrangement with pink peonies, white roses and lush greenery on marble surface"
              width={600}
              height={280}
              className="w-full h-full object-cover"
              priority />
          </div>

          {/* Top right */}
          <div className="hover-zoom rounded-2xl overflow-hidden col-span-1">
            <AppImage
              src="https://images.unsplash.com/photo-1650629342779-2bc2418efe60"
              alt="Close-up of delicate blush pink tulips with soft morning light, elegant floral detail"
              width={300}
              height={280}
              className="w-full h-full object-cover"
              priority />
          </div>

          {/* Bottom center */}
          <div className="hover-zoom rounded-2xl overflow-hidden col-span-1">
            <AppImage
              src="https://images.unsplash.com/photo-1650212093812-3b7621961967"
              alt="Artisan hand-tied bouquet of garden roses in soft cream and peach tones, wrapped in kraft paper"
              width={300}
              height={280}
              className="w-full h-full object-cover" />
          </div>

          {/* Bottom right — wide */}
          <div className="hover-zoom rounded-2xl overflow-hidden col-span-2">
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_133179566-1772383582581.png"
              alt="Luxury red rose arrangement with gold ribbon in dark atmospheric lighting, premium floral gift"
              width={600}
              height={280}
              className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Floating label badges */}
        <div className="absolute -bottom-4 left-4 glass rounded-full px-4 py-2 shadow-glass border border-border hidden md:flex items-center gap-2">
          <span className="text-lg">🌸</span>
          <span className="text-xs font-semibold text-foreground tracking-wide">Freshly Picked Daily</span>
        </div>
        <div className="absolute -top-4 right-4 glass rounded-full px-4 py-2 shadow-glass border border-border hidden md:flex items-center gap-2">
          <span className="text-lg">✨</span>
          <span className="text-xs font-semibold text-foreground tracking-wide">Artisan Crafted</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        aria-hidden="true">
        
        <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-medium">Scroll</span>
        <div className="w-px h-10 bg-border overflow-hidden">
          <div className="w-full h-1/2 bg-primary animate-scroll-line" />
        </div>
      </div>
    </section>);

};

export default HeroSection;