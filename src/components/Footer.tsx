import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'Letiskové transfery', href: '#services' },
      { label: 'Firemná preprava', href: '#services' },
      { label: 'VIP Security', href: '#services' },
      { label: 'Eventy & Svadby', href: '#services' },
    ],
    company: [
      { label: 'O nás', href: '#about' },
      { label: 'Flotila', href: '#fleet' },
      { label: 'Cenník', href: '#pricing' },
      { label: 'Kontakt', href: '#contact' },
    ],
    legal: [
      { label: 'Obchodné podmienky', href: '#' },
      { label: 'Ochrana súkromia', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  };

  return (
    <footer className="bg-charcoal border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center shadow-gold">
                <span className="text-primary-foreground font-serif font-bold text-xl">F</span>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-foreground">FastTransfer</h3>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">VIP Preprava</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Prémiová VIP preprava po celom Slovensku a Európe. Profesionálni vodiči, luxusné vozidlá, maximálny komfort.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Služby</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Spoločnosť</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+421911620520"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  +421 911 620 520
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@fastransfer.sk"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  info@fastransfer.sk
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  Bratislava, Slovensko
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} FastTransfer VIP Preprava. Všetky práva vyhradené.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
