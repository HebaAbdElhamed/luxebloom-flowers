'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/context/CartContext';

const PRODUCT = {
  name: 'Ivory Reverie',
  subtitle: 'White Roses & Ranunculus',
  description:
  'A breathtaking composition of premium garden roses, cloud-like ranunculus, and delicate eucalyptus. Each stem is hand-selected at peak bloom and artfully arranged by our master florists. Arrives in our signature ivory kraft wrap with a hand-tied satin ribbon.',
  rating: 4.9,
  reviews: 128,
  badge: 'Bestseller',
  details: [
  '12–18 premium stems depending on size',
  'Sourced from sustainable farms in Ecuador & Holland',
  'Stays fresh for 7–10 days with proper care',
  'Arrives with care card and LuxeBloom gift tag'],

  images: [
  {
    src: "https://images.unsplash.com/photo-1649441564112-22d5de12e3dd",
    alt: 'Ivory white rose and ranunculus bouquet, elegant ivory tissue wrap, soft studio lighting, front view'
  },
  {
    src: "https://images.unsplash.com/photo-1687450835408-409d18be1761",
    alt: 'Blush peony bouquet detail shot, soft petals close-up, warm natural light'
  },
  {
    src: "https://images.unsplash.com/photo-1682299715839-6cb9290902be",
    alt: 'Bouquet from above showing arrangement composition, ivory and blush tones'
  },
  {
    src: "https://images.unsplash.com/photo-1713999986551-1af10a541bca",
    alt: 'Close-up of white ranunculus blooms, delicate petal texture, dreamy light background'
  }]

};

const SIZES = [
{ label: 'Small', stems: '12 stems', delta: 0, basePrice: 145 },
{ label: 'Medium', stems: '18 stems', delta: 45, basePrice: 190 },
{ label: 'Large', stems: '24 stems', delta: 90, basePrice: 235 }];


const WRAPS = [
{ label: 'Ivory Kraft', color: '#F5F0E8', border: '#D4C9B0' },
{ label: 'Blush Pink', color: '#F2C5B8', border: '#D4968A' },
{ label: 'Sage Green', color: '#B8C9A8', border: '#8A9E7A' },
{ label: 'Midnight', color: '#2A2A30', border: '#1A1A18' },
{ label: 'Gold Foil', color: '#D4A843', border: '#A8845A' }];


const RELATED = [
{
  id: 2,
  name: 'Blush Garden',
  price: 185,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1faf5822f-1772212308996.png",
  alt: 'Blush peony garden bouquet, romantic arrangement, bright background'
},
{
  id: 3,
  name: 'Crimson Affair',
  price: 220,
  image: "https://images.unsplash.com/photo-1566778343499-aedf1839c122",
  alt: 'Premium red roses with gold ribbon, dramatic dark background'
},
{
  id: 5,
  name: 'Orchid Luxe',
  price: 265,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_105b14928-1772835906155.png",
  alt: 'White phalaenopsis orchid in matte vase, minimalist studio background'
}];


const ProductDetailsContent: React.FC = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedWrap, setSelectedWrap] = useState(0);
  const [giftMessage, setGiftMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const currentPrice = SIZES[selectedSize].basePrice * quantity;
const { addToCart } = useCart();

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-10" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <Icon name="ChevronRightIcon" size={14} />
          <span className="text-foreground font-medium">{PRODUCT.name}</span>
        </nav>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20">
          {/* Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-square bg-secondary hover-zoom">
              <AppImage
                src={PRODUCT.images[activeImage].src}
                alt={PRODUCT.images[activeImage].alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw" />
              
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground z-10">
                {PRODUCT.badge}
              </span>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {PRODUCT.images.map((img, i) =>
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`gallery-thumb aspect-square ${activeImage === i ? 'active' : ''}`}
                aria-label={`View image ${i + 1}`}>
                
                  <AppImage
                  src={img.src}
                  alt={img.alt}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover" />
                
                </button>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) =>
                  <Icon
                    key={i}
                    name="StarIcon"
                    variant="solid"
                    size={14}
                    className={i < Math.floor(PRODUCT.rating) ? 'star-filled' : 'text-border'} />

                  )}
                </div>
                <span className="text-sm font-medium text-foreground">{PRODUCT.rating}</span>
                <span className="text-sm text-muted-foreground">({PRODUCT.reviews} reviews)</span>
              </div>
              <h1 className="font-display text-display font-semibold text-foreground mb-2 leading-tight">
                {PRODUCT.name}
              </h1>
              <p className="text-lg text-muted-foreground">{PRODUCT.subtitle}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-semibold text-foreground">
                ${currentPrice}
              </span>
              {quantity > 1 &&
              <span className="text-muted-foreground text-sm">
                  ${SIZES[selectedSize].basePrice} each
                </span>
              }
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{PRODUCT.description}</p>

            {/* Size Selector */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
                Size
              </h3>
              <div className="flex gap-3 flex-wrap">
                {SIZES.map((s, i) =>
                <button
                  key={s.label}
                  onClick={() => setSelectedSize(i)}
                  className={`size-btn flex flex-col items-start gap-0.5 px-5 py-3 ${selectedSize === i ? 'selected' : ''}`}>
                  
                    <span className="font-semibold">{s.label}</span>
                    <span className="text-xs text-muted-foreground">{s.stems}</span>
                    <span className="text-xs font-semibold text-primary">${s.basePrice}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Wrap Color */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-widest">
                Wrapping · <span className="font-normal normal-case text-muted-foreground">{WRAPS[selectedWrap].label}</span>
              </h3>
              <div className="flex gap-3 flex-wrap">
                {WRAPS.map((w, i) =>
                <button
                  key={w.label}
                  onClick={() => setSelectedWrap(i)}
                  className={`swatch ${selectedWrap === i ? 'selected' : ''}`}
                  style={{ backgroundColor: w.color, borderColor: selectedWrap === i ? w.border : 'transparent' }}
                  aria-label={`Select ${w.label} wrapping`}
                  title={w.label} />

                )}
              </div>
            </div>

            {/* Gift Message */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-widest">
                Gift Card Message <span className="font-normal normal-case text-muted-foreground">(optional)</span>
              </h3>
              <textarea
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="Write a heartfelt message to be included with your bouquet..."
                maxLength={200}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none transition-colors"
                aria-label="Gift card message" />
              
              <p className="text-xs text-muted-foreground mt-1.5 text-right">{giftMessage.length}/200</p>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-full overflow-hidden bg-card">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                  aria-label="Decrease quantity">
                  
                  <Icon name="MinusIcon" size={16} />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                  aria-label="Increase quantity">
                  
                  <Icon name="PlusIcon" size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 gold-btn py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition-all ${
                added ? 'opacity-80' : ''}`
                }>
                
                {added ?
                <>
                    <Icon name="CheckIcon" size={18} className="text-primary-foreground" />
                    <span>Added to Cart!</span>
                  </> :

                <>
                    <Icon name="ShoppingBagIcon" size={18} className="text-primary-foreground" />
                    <span>Add to Cart · ${currentPrice}</span>
                  </>
                }
              </button>

              {/* <button
                className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
                aria-label="Save to wishlist">
                
                <Icon name="HeartIcon" size={18} />
              </button> */}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              {[
              { icon: 'TruckIcon' as const, label: 'Same-day delivery' },
              { icon: 'ShieldCheckIcon' as const, label: '7-day freshness' },
              { icon: 'ArrowPathIcon' as const, label: 'Easy returns' }].
              map((b) =>
              <div key={b.label} className="flex flex-col items-center gap-2 text-center">
                  <Icon name={b.icon} size={20} className="text-primary" />
                  <span className="text-xs text-muted-foreground leading-tight">{b.label}</span>
                </div>
              )}
            </div>

            {/* Details accordion */}
            <div className="border border-border rounded-2xl overflow-hidden">
              <div className="p-5">
                <h3 className="font-display text-base font-semibold text-foreground mb-4">What's Included</h3>
                <ul className="space-y-2.5">
                  {PRODUCT.details.map((d, i) =>
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Icon name="CheckCircleIcon" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                      {d}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 pt-16 border-t border-border">
          <h2 className="font-display text-section font-semibold text-foreground mb-10">
            You Might Also Love
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {RELATED.map((r) =>
            <Link key={r.id} href="/product-details" className="product-card block">
                <div className="relative hover-zoom h-64">
                  <AppImage
                  src={r.image}
                  alt={r.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw" />
                
                </div>
                <div className="p-5 flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-foreground">{r.name}</h3>
                  <span className="font-display text-lg font-semibold text-foreground">${r.price}</span>
                </div>
              </Link>
            )}
          </div>
        </div> 
      </div>
    </div>);

};

export default ProductDetailsContent;