import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { UsersIcon, ClockIcon, WifiIcon } from '@/components/icons/ServiceIcons';
import { Zap } from 'lucide-react';
import audiA6_2020 from '@/assets/audi-a6-2020.jpg';
import audiA6_2016 from '@/assets/audi-a6-2016.jpg';
import skodaSuperb from '@/assets/skoda-superb.jpg';
import skodaOctavia from '@/assets/skoda-octavia.jpg';

const vehicles = [
  {
    name: 'Audi A6',
    year: '2020',
    image: audiA6_2020,
    passengers: '1-3',
    power: '100 kW',
    transmission: 'Automat',
    category: 'Vyššia trieda',
    features: ['Kožené sedadlá', 'WiFi', 'Klimatizácia', 'USB nabíjačky'],
    popular: true,
  },
  {
    name: 'Audi A6',
    year: '2016',
    image: audiA6_2016,
    passengers: '1-3',
    power: '180 kW',
    transmission: 'Automat',
    category: 'Vyššia trieda',
    features: ['Kožené sedadlá', 'WiFi', 'Klimatizácia', 'USB nabíjačky'],
    popular: false,
  },
  {
    name: 'Škoda Superb',
    year: '2021',
    image: skodaSuperb,
    passengers: '1-3',
    power: '160 kW',
    transmission: 'Automat',
    category: 'Stredná trieda',
    features: ['Klimatizácia', 'WiFi', 'USB nabíjačky', 'Veľký kufor'],
    popular: false,
  },
  {
    name: 'Škoda Octavia',
    year: '2020',
    image: skodaOctavia,
    passengers: '1-3',
    power: '110 kW',
    transmission: 'Automat',
    category: 'Stredná trieda',
    features: ['Klimatizácia', 'WiFi', 'USB nabíjačky', 'Ekonomická'],
    popular: false,
  },
];

const Fleet = () => {
  return (
    <section id="fleet" className="py-24 bg-background relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Naša flotila
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6">
            Luxusné vozidlá pre
            <span className="text-gradient-gold"> váš komfort</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Všetky naše vozidlá sú najvyššej triedy, pravidelne servisované a udržiavané v bezchybnom stave.
          </p>
        </motion.div>

        {/* Vehicles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              {vehicle.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="px-4 py-1 bg-gradient-gold text-primary-foreground text-xs font-bold rounded-full shadow-lg">
                    NAJPOPULÁRNEJŠIE
                  </span>
                </div>
              )}

              <div className={`h-full rounded-2xl overflow-hidden bg-gradient-card transition-all duration-500 group-hover:shadow-gold ${
                vehicle.popular ? 'gold-border border-primary/50' : 'gold-border'
              }`}>
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-serif font-bold text-foreground">
                      {vehicle.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">{vehicle.year}</span>
                  </div>
                  <p className="text-xs text-primary font-medium mb-3">{vehicle.category}</p>

                  {/* Specs */}
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-border">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <UsersIcon className="w-3.5 h-3.5 text-primary" />
                      <span>{vehicle.passengers}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Zap className="w-3.5 h-3.5 text-primary" />
                      <span>{vehicle.power}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ClockIcon className="w-3.5 h-3.5 text-primary" />
                      <span>{vehicle.transmission}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="grid grid-cols-2 gap-1 mb-4">
                    {vehicle.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button variant={vehicle.popular ? "hero" : "heroOutline"} size="sm" className="w-full" asChild>
                    <a href="#booking">Rezervovať</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
