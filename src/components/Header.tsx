'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { totalCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Build Bouquet', href: '/bouquet-builder' },
    { label: 'Occasions', href: '/#occasions' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled || !transparent ? 'py-3' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${
            scrolled || !transparent ? 'glass shadow-glass' : 'bg-transparent'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <AppLogo size={32} />
            <span className="font-display text-lg font-semibold tracking-tight text-foreground hidden sm:block">
              LuxeBloom
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Icon */}
            <Link
              href="/checkout"
              className="relative flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card hover:border-primary/50 transition-all duration-200"
              aria-label={`Cart, ${totalCount} items`}
            >
              <Icon name="ShoppingBagIcon" size={20} className="text-foreground" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-gold animate-bounce-once">
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </Link>

            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-2 gold-btn px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              Shop Now
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="md:hidden mt-2 glass rounded-2xl p-6 shadow-glass animate-fade-up"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/checkout"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border"
              >
                <Icon name="ShoppingBagIcon" size={18} />
                Cart
                {totalCount > 0 && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {totalCount}
                  </span>
                )}
              </Link>
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="gold-btn px-5 py-3 rounded-full text-sm font-semibold text-center mt-2"
              >
                Shop Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;