import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Služby' },
    { href: '#fleet', label: 'Flotila' },
    { href: '#pricing', label: 'Cenník' },
    { href: '#about', label: 'O nás' },
    { href: '#contact', label: 'Kontakt' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-effect py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center shadow-gold">
              <span className="text-primary-foreground font-bold text-xl">F</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground tracking-tight">FastTransfer</h1>
              <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase font-medium">VIP Preprava</p>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Hlavná navigácia">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                whileHover={{ y: -2 }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          {/* CTA & Contact */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">24/7</span>
            </div>
            <a
              href="tel:+421911620520"
              className="flex items-center gap-2 text-foreground font-medium"
            >
              <Phone className="w-4 h-4 text-primary" />
              <span>+421 911 620 520</span>
            </a>
            <Button variant="hero" size="lg" asChild>
              <a href="#booking">Objednať</a>
            </Button>
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls={isMobileMenuOpen ? "mobile-menu" : undefined}
            aria-label={isMobileMenuOpen ? 'Zatvoriť menu' : 'Otvoriť menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-effect mt-3 mx-4 rounded-2xl overflow-hidden"
            id="mobile-menu"
          >
            <nav className="p-6 space-y-4" aria-label="Mobilná navigácia">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-foreground font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border">
                <a
                  href="tel:+421911620520"
                  className="flex items-center gap-2 text-primary font-semibold py-2"
                >
                  <Phone className="w-5 h-5" />
                  +421 911 620 520
                </a>
                <Button variant="hero" className="w-full mt-4" asChild>
                  <a href="#booking">Objednať Transfer</a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
