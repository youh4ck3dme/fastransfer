import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const cityRoutes = [
  { from: 'BA', to: 'Centrum', price: '20', time: '15 min' },
  { from: 'BA', to: 'Trnava', price: '60', time: '40 min' },
  { from: 'BA', to: 'D. Streda', price: '60', time: '45 min' },
  { from: 'BA', to: 'Nitra', price: '100', time: '1.5 hod' },
  { from: 'BA', to: 'Trenčín', price: '135', time: '2 hod' },
  { from: 'BA', to: 'Brno', price: '145', time: '1.5 hod' },
  { from: 'BA', to: 'Budapešť', price: '220', time: '2.5 hod' },
  { from: 'BA', to: 'Praha', price: '320', time: '3.5 hod' },
  { from: 'BA', to: 'Košice', price: '400', time: '4 hod' },
];

const airportRoutes = [
  { from: 'BA', to: 'BTS (Bratislava)', price: '30', time: '20 min' },
  { from: 'BA', to: 'VIE (Viedeň)', price: '64', time: '45 min' },
  { from: 'BA', to: 'BUD (Budapešť)', price: '240', time: '2.5 hod' },
  { from: 'BA', to: 'PRG (Praha)', price: '340', time: '3.5 hod' },
  { from: 'BA', to: 'KSC (Košice)', price: '390', time: '4 hod' },
  { from: 'BA', to: 'KRK (Krakov)', price: '400', time: '4 hod' },
];

const includes = [
  'WiFi on Board',
  'Platba kartou',
  'Platba cash',
  'Detská sedačka',
  'Pets Friendly',
  'Playlist na mieru',
  'Minerálna voda',
  'Profesionálny vodič',
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Transparentné ceny
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6">
            Cenník
            <span className="text-gradient-gold"> populárnych trás</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Fixné ceny bez skrytých poplatkov. Cena zahŕňa vozidlo, vodiča a všetky poplatky.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* City Transfers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-serif font-bold text-foreground mb-4">Ceny city transferov</h3>
            <div className="rounded-2xl bg-gradient-card gold-border overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-4 bg-secondary/30 text-sm font-semibold text-muted-foreground">
                <span>Odkiaľ</span>
                <span>Kam</span>
                <span>Čas</span>
                <span>Cena</span>
              </div>
              {cityRoutes.map((route, index) => (
                <motion.div
                  key={`${route.from}-${route.to}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="grid grid-cols-4 gap-4 p-4 border-t border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <span className="text-foreground font-medium">{route.from}</span>
                  <span className="text-muted-foreground">{route.to}</span>
                  <span className="text-muted-foreground">{route.time}</span>
                  <span className="text-primary font-bold">{route.price} €</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Airport Transfers */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-serif font-bold text-foreground mb-4">Ceny letiskových transferov</h3>
            <div className="rounded-2xl bg-gradient-card gold-border overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-4 bg-secondary/30 text-sm font-semibold text-muted-foreground">
                <span>Odkiaľ</span>
                <span>Kam</span>
                <span>Čas</span>
                <span>Cena</span>
              </div>
              {airportRoutes.map((route, index) => (
                <motion.div
                  key={`${route.from}-${route.to}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="grid grid-cols-4 gap-4 p-4 border-t border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <span className="text-foreground font-medium">{route.from}</span>
                  <span className="text-muted-foreground">{route.to}</span>
                  <span className="text-muted-foreground">{route.time}</span>
                  <span className="text-primary font-bold">{route.price} €</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <p className="text-sm text-muted-foreground mb-8 text-center">
          * Ceny sú orientačné pre sedan. Spiatočná cesta -10%. Pre presnú cenu nás kontaktujte.
        </p>

        {/* What's Included */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl bg-gradient-card p-8 gold-border">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-6 text-center">
              Čo je v cene
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {includes.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-muted-foreground text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href="#booking" className="flex items-center justify-center gap-2">
                  Získať cenovú ponuku
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
