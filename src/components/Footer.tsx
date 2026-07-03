import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <AppLogo size={28} />
            <span className="font-display text-base font-semibold tracking-tight text-foreground">
              LuxeBloom
            </span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link href="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Shop
            </Link>
            <Link href="/#occasions" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Occasions
            </Link>
            <Link href="/product-details" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Featured
            </Link>
            <Link href="/#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              <Icon name="HeartIcon" size={16} />
            </a>
            <a
              href="#"
              aria-label="Pinterest"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              <Icon name="BookmarkIcon" size={16} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
            >
              <Icon name="ChatBubbleLeftIcon" size={16} />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            © 2026 LuxeBloom. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Handcrafted with care in New York City
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;