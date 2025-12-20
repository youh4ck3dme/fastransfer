import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const routes = [
  { from: 'Bratislava', to: 'Viedeň (letisko)', price: '55', time: '45 min' },
  { from: 'Bratislava', to: 'Budapešť', price: '180', time: '2.5 hod' },
  { from: 'Bratislava', to: 'Praha', price: '280', time: '3.5 hod' },
  { from: 'Bratislava', to: 'Košice', price: '350', time: '4 hod' },
  { from: 'Košice', to: 'Viedeň', price: '420', time: '5 hod' },
  { from: 'Žilina', to: 'Viedeň', price: '180', time: '3 hod' },
];

const includes = [
  'Profesionálny vodič v obleku',
  'Minerálna voda a občerstvenie',
  'WiFi počas cesty',
  'Flexibilné platobné možnosti',
  'Sledovanie letov v reálnom čase',
  'Čakanie 60 min zadarmo (letisko)',
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

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Routes Table */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl bg-gradient-card gold-border overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-4 bg-secondary/30 text-sm font-semibold text-muted-foreground">
                <span>Odkiaľ</span>
                <span>Kam</span>
                <span>Čas</span>
                <span>Cena od</span>
              </div>
              {routes.map((route, index) => (
                <motion.div
                  key={`${route.from}-${route.to}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-4 gap-4 p-4 border-t border-border/50 hover:bg-secondary/20 transition-colors group"
                >
                  <span className="text-foreground font-medium">{route.from}</span>
                  <span className="text-muted-foreground">{route.to}</span>
                  <span className="text-muted-foreground">{route.time}</span>
                  <span className="text-primary font-bold">{route.price} €</span>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-4 text-center">
              * Ceny sú orientačné pre sedan. Spiatočná cesta -10%. Pre presnú cenu nás kontaktujte.
            </p>
          </motion.div>

          {/* What's Included */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl bg-gradient-card p-8 gold-border h-full">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                Čo je v cene
              </h3>

              <ul className="space-y-4 mb-8">
                {includes.map((item, index) => (
                  <motion.li
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
                    <span className="text-muted-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="p-4 rounded-xl bg-secondary/30 gold-border mb-6">
                <p className="text-sm text-muted-foreground">
                  Pre individuálnu cenovú ponuku alebo dlhodobú spoluprácu nás kontaktujte.
                </p>
              </div>

              <Button variant="hero" className="w-full" size="lg" asChild>
                <a href="#booking" className="flex items-center justify-center gap-2">
                  Získať cenovú ponuku
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
