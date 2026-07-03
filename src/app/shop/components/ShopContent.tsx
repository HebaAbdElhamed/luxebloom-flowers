'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/context/CartContext';

const ALL_PRODUCTS = [
{
  id: 1,
  name: 'Ivory Reverie',
  subtitle: 'White Roses & Ranunculus',
  price: 145,
  originalPrice: 175,
  rating: 4.9,
  reviews: 128,
  badge: 'Bestseller',
  color: 'White',
  type: 'Rose',
  occasion: 'Wedding',
  image: "https://images.unsplash.com/photo-1649441564112-22d5de12e3dd",
  alt: 'Ivory white rose bouquet with ranunculus, elegant ivory tissue wrap, soft studio lighting'
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
  color: 'Pink',
  type: 'Peony',
  occasion: 'Anniversary',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1faf5822f-1772212308996.png",
  alt: 'Lush blush peony bouquet with sweet peas, romantic garden arrangement, bright airy background'
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
  color: 'Red',
  type: 'Rose',
  occasion: 'Anniversary',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a24e4a29-1772484268789.png",
  alt: 'Premium long-stem red roses with gold ribbon, dramatic dark background, luxury presentation'
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
  color: 'Mixed',
  type: 'Wildflower',
  occasion: 'Birthday',
  image: "https://images.unsplash.com/photo-1630149461875-233003e5cbb7",
  alt: 'Wildflower garden bouquet with sage greenery and mixed blooms, natural earthy background'
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
  color: 'White',
  type: 'Orchid',
  occasion: 'Corporate',
  image: "https://images.unsplash.com/photo-1657040331395-ba1b5fc19ee8",
  alt: 'Architectural white phalaenopsis orchid in matte black vase, minimalist studio background'
},
{
  id: 6,
  name: 'Sunlit Fields',
  subtitle: 'Sunflowers & Daisies',
  price: 85,
  originalPrice: null,
  rating: 4.6,
  reviews: 152,
  badge: null,
  color: 'Yellow',
  type: 'Sunflower',
  occasion: 'Birthday',
  image: "https://images.unsplash.com/photo-1710125888693-a62906feec59",
  alt: 'Bright sunflower and daisy bouquet, cheerful yellow tones, natural light background'
},
{
  id: 7,
  name: 'Mauve Moment',
  subtitle: 'Lavender & Dusty Miller',
  price: 135,
  originalPrice: null,
  rating: 4.8,
  reviews: 89,
  badge: null,
  color: 'Purple',
  type: 'Lavender',
  occasion: 'Sympathy',
  image: "https://images.unsplash.com/photo-1601920752900-7bc8ab70f03f",
  alt: 'Soft lavender and dusty miller arrangement, muted purple tones, serene peaceful background'
},
{
  id: 8,
  name: 'Golden Hour',
  subtitle: 'Dahlias & Chrysanthemums',
  price: 160,
  originalPrice: 190,
  rating: 4.9,
  reviews: 67,
  badge: 'Sale',
  color: 'Orange',
  type: 'Dahlia',
  occasion: 'Just Because',
  image: "https://images.unsplash.com/photo-1537848705422-b8c9f33db007",
  alt: 'Warm orange dahlia and chrysanthemum arrangement, golden hour lighting, autumn tones'
}];


const COLORS = ['All', 'White', 'Pink', 'Red', 'Yellow', 'Purple', 'Orange', 'Mixed'];
const TYPES = ['All', 'Rose', 'Peony', 'Orchid', 'Wildflower', 'Sunflower', 'Lavender', 'Dahlia'];
const OCCASIONS = ['All', 'Wedding', 'Anniversary', 'Birthday', 'Sympathy', 'Corporate', 'Just Because'];
const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];
interface FlyParticle {
  id: number;
  x: number;
  y: number;
  productId: number;
}
const ShopContent: React.FC = () => {
  const [particles, setParticles] = useState<FlyParticle[]>([]);
    const particleCounter = useRef(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [priceMax, setPriceMax] = useState(300);
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
   const [addedIds, setAddedIds] = useState<Set<number>>(new Set());
const { addItem } = useCart();

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, product: (typeof ALL_PRODUCTS)[0]) => {
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
  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS.filter((p) => {
      if (p.price > priceMax) return false;
      if (selectedColor !== 'All' && p.color !== selectedColor) return false;
      if (selectedType !== 'All' && p.type !== selectedType) return false;
      if (selectedOccasion !== 'All' && p.occasion !== selectedOccasion) return false;
      return true;
    });

    if (sortBy === 'Price: Low to High') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'Top Rated') list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [priceMax, selectedColor, selectedType, selectedOccasion, sortBy]);

  const Sidebar = () =>
  <aside className="w-full">
      <div className="space-y-8">
        {/* Price */}
        <div>
          <h3 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
            Price
          </h3>
          <div className="space-y-3">
            <input
            type="range"
            min={50}
            max={300}
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full accent-primary h-1"
            aria-label="Maximum price filter" />
          
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>$50</span>
              <span className="font-semibold text-foreground">Up to ${priceMax}</span>
            </div>
          </div>
        </div>

        {/* Color */}
        <div>
          <h3 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
            Color
          </h3>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) =>
          <button
            key={c}
            onClick={() => setSelectedColor(c)}
            className={`filter-chip ${selectedColor === c ? 'active' : ''}`}>
            
                {c}
              </button>
          )}
          </div>
        </div>

        {/* Flower Type */}
        <div>
          <h3 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
            Flower Type
          </h3>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) =>
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`filter-chip ${selectedType === t ? 'active' : ''}`}>
            
                {t}
              </button>
          )}
          </div>
        </div>

        {/* Occasion */}
        <div>
          <h3 className="font-display text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
            Occasion
          </h3>
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map((o) =>
          <button
            key={o}
            onClick={() => setSelectedOccasion(o)}
            className={`filter-chip ${selectedOccasion === o ? 'active' : ''}`}>
            
                {o}
              </button>
          )}
          </div>
        </div>

        {/* Reset */}
        <button
        onClick={() => {
          setPriceMax(300);
          setSelectedColor('All');
          setSelectedType('All');
          setSelectedOccasion('All');
        }}
        className="w-full py-3 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
        
          Reset Filters
        </button>
      </div>
    </aside>;


  return (
    <div className="pt-28 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-2 block">
            Our Collection
          </span>
          <h1 className="font-display text-section font-semibold text-foreground mb-4">
            Shop Flowers
          </h1>
          <p className="text-muted-foreground max-w-xl">
            {filtered.length} arrangements, handcrafted by our master florists.
            Same-day delivery available on all orders placed before 2 PM.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center gap-2 text-sm font-medium text-foreground border border-border rounded-full px-4 py-2.5 hover:border-foreground transition-all">
            
            <Icon name="FunnelIcon" size={16} />
            Filters
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-muted-foreground hidden sm:block">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm font-medium text-foreground bg-card border border-border rounded-full px-4 py-2.5 focus:outline-none focus:border-primary cursor-pointer"
              aria-label="Sort products">
              
              {SORT_OPTIONS.map((o) =>
              <option key={o} value={o}>{o}</option>
              )}
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <Sidebar />
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen &&
          <div className="lg:hidden fixed inset-0 z-50 flex">
              <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
              <div className="relative ml-auto w-80 bg-background h-full overflow-y-auto p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-lg font-semibold text-foreground">Filters</h2>
                  <button onClick={() => setSidebarOpen(false)} aria-label="Close filters">
                    <Icon name="XMarkIcon" size={22} />
                  </button>
                </div>
                <Sidebar />
              </div>
            </div>
          }

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ?
            <div className="text-center py-20">
                <Icon name="MagnifyingGlassIcon" size={48} className="text-border mx-auto mb-4" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">No arrangements found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to find something beautiful.</p>
              </div> :

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) =>
              <Link key={p.id} href="/product-details" className="product-card block">
                    <div className="relative hover-zoom h-72">
                      <AppImage
                    src={p.image}
                    alt={p.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                  
                      {p.badge &&
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold z-10 ${
                    p.badge === 'Bestseller' ? 'bg-primary text-primary-foreground' :
                    p.badge === 'Sale' ? 'bg-foreground text-background' :
                    p.badge === 'Limited' ? 'bg-blush text-foreground' : 'bg-sage-light text-foreground'}`
                    }>
                    
                          {p.badge}
                        </span>
                  }
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-display text-lg font-semibold text-foreground">{p.name}</h3>
                        <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
                          <Icon name="StarIcon" variant="solid" size={13} className="star-filled" />
                          <span className="text-xs font-medium text-foreground">{p.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{p.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-xl font-semibold text-foreground">${p.price}</span>
                          {p.originalPrice &&
                      <span className="text-sm text-muted-foreground line-through">${p.originalPrice}</span>
                      }
                        </div>
                        {/* <button
                      className="gold-btn px-4 py-2 rounded-full text-xs font-semibold"
                      onClick={(e) => e.preventDefault()}>
                      
                          Add to Cart
                        </button> */}

                        <button
  className={`gold-btn px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
    addedIds.has(p.id) ? 'bg-sage' : ''
  }`}
  onClick={(e) => handleAddToCart(e, p)}
>
  {addedIds.has(p.id) ? 'Added ✓' : 'Add to Cart'}
</button>

                      </div>
                    </div>
                  </Link>
              )}
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

};

export default ShopContent;