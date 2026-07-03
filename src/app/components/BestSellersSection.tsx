'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/context/CartContext';

const products = [
  {
    id: 1,
    name: 'Ivory Reverie',
    subtitle: 'White Roses & Ranunculus',
    price: 145,
    originalPrice: 175,
    rating: 4.9,
    reviews: 128,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1583780544671-000a728c2789',
    alt: 'Ivory white rose bouquet with ranunculus in elegant ivory tissue wrapping, soft studio lighting',
  },
  {
    id: 2,
    name: 'Blush Garden',
    subtitle: 'Peonies & Sweet Peas',
    price: 185,
    originalPrice: null,
    rating: 5.0,
    reviews: 94,
    badge: 'New',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1faf5822f-1772212308996.png',
    alt: 'Lush blush peony bouquet with sweet peas, romantic garden-style arrangement, bright airy background',
  },
  {
    id: 3,
    name: 'Crimson Affair',
    subtitle: 'Premium Red Roses',
    price: 220,
    originalPrice: null,
    rating: 4.8,
    reviews: 211,
    badge: null,
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_133179566-1772383582581.png',
    alt: 'Premium long-stem red roses with gold ribbon, dramatic dark atmospheric background, luxury presentation',
  },
  {
    id: 4,
    name: 'Sage & Bloom',
    subtitle: 'Garden Wildflowers',
    price: 110,
    originalPrice: 130,
    rating: 4.7,
    reviews: 76,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1688932981288-c0f053f0a999',
    alt: 'Wildflower garden bouquet with sage greenery and mixed blooms, natural earthy background, relaxed style',
  },
  {
    id: 5,
    name: 'Orchid Luxe',
    subtitle: 'White Phalaenopsis',
    price: 265,
    originalPrice: null,
    rating: 5.0,
    reviews: 43,
    badge: 'Limited',
    image: 'https://images.unsplash.com/photo-1657040331395-ba1b5fc19ee8',
    alt: 'Architectural white phalaenopsis orchid arrangement in matte black vase, minimalist studio background',
  },
];

interface FlyParticle {
  id: number;
  x: number;
  y: number;
  productId: number;
}

const BestSellersSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
  const [particles, setParticles] = useState<FlyParticle[]>([]);
  const particleCounter = useRef(0);
  const { addItem } = useCart();

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState, { passive: true });
      updateScrollState();
    }
    return () => el?.removeEventListener('scroll', updateScrollState);
  }, []);

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

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, product: (typeof products)[0]) => {
      e.preventDefault();
      e.stopPropagation();

      // Get button position for particle origin
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Add to cart
      addItem({
        id: product.id,
        name: product.name,
        subtitle: product.subtitle,
        price: product.price,
        image: product.image,
        alt: product.alt,
      });

      // Trigger button pulse animation
      setAddedIds((prev) => new Set(prev).add(product.id));
      setTimeout(() => {
        setAddedIds((prev) => {
          const next = new Set(prev);
          next.delete(product.id);
          return next;
        });
      }, 700);

      // Spawn fly particles
      const count = 6;
      const newParticles: FlyParticle[] = Array.from({ length: count }, (_, i) => ({
        id: ++particleCounter.current,
        x,
        y,
        productId: product.id,
      }));
      setParticles((prev) => [...prev, ...newParticles]);
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id))
        );
      }, 800);
    },
    [addItem]
  );

  return (
    <section ref={sectionRef} className="section-reveal py-20 px-6 bg-secondary/30 relative overflow-hidden">
      {/* Fly particles portal */}
      {particles.map((p, idx) => (
        <span
          key={p.id}
          className="fixed pointer-events-none z-[200] w-3 h-3 rounded-full bg-primary"
          style={{
            left: p.x,
            top: p.y,
            transform: 'translate(-50%, -50%)',
            animation: `flyToCart 0.7s ease-in forwards`,
            animationDelay: `${(idx % 6) * 0.04}s`,
            opacity: 1,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-3 block">
              Curated Selection
            </span>
            <h2 className="font-display text-section font-semibold text-foreground">
              Best Sellers
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground transition-all hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <Icon name="ChevronLeftIcon" size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground transition-all hover:border-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <Icon name="ChevronRightIcon" size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.map((p) => (
            <Link
              key={p.id}
              href="/product-details"
              className="product-card flex-shrink-0 w-72 block"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Image */}
              <div className="relative hover-zoom h-80">
                <AppImage
                  src={p.image}
                  alt={p.alt}
                  fill
                  className="object-cover"
                  sizes="288px"
                />
                {p.badge && (
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold z-10 ${
                      p.badge === 'Bestseller' ?'bg-primary text-primary-foreground'
                        : p.badge === 'Sale' ?'bg-foreground text-background'
                        : p.badge === 'Limited' ?'bg-blush text-foreground' :'bg-sage-light text-foreground'
                    }`}
                  >
                    {p.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-foreground mb-0.5">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{p.subtitle}</p>

                <div className="flex items-center gap-1.5 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="StarIcon"
                        variant="solid"
                        size={12}
                        className={i < Math.floor(p.rating) ? 'star-filled' : 'text-border'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({p.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-xl font-semibold text-foreground">${p.price}</span>
                    {p.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${p.originalPrice}</span>
                    )}
                  </div>
                  <button
                    className={`gold-btn w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      addedIds.has(p.id) ? 'scale-125 bg-sage' : 'scale-100'
                    }`}
                    aria-label={`Add ${p.name} to cart`}
                    onClick={(e) => handleAddToCart(e, p)}
                  >
                    {addedIds.has(p.id) ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-primary-foreground">
                        <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <Icon name="PlusIcon" size={16} className="text-primary-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="outline-btn px-8 py-3.5 rounded-full text-sm font-semibold inline-flex items-center gap-2"
          >
            View All Products
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;