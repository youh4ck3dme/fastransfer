import { motion } from 'framer-motion';
import { Users, Briefcase, Wifi, Wine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import fleetSedan from '@/assets/fleet-sedan.jpg';
import fleetVan from '@/assets/fleet-van.jpg';
import fleetSuv from '@/assets/fleet-suv.jpg';

const vehicles = [
  {
    name: 'Executive Sedan',
    model: 'Mercedes-Benz S-Class / BMW 7',
    image: fleetSedan,
    passengers: '1-3',
    luggage: '3',
    features: ['Kožené sedadlá', 'WiFi', 'Klimatizácia', 'USB nabíjačky'],
    priceFrom: '1,50 €/km',
    popular: false,
  },
  {
    name: 'Luxury SUV',
    model: 'Range Rover / Mercedes GLS',
    image: fleetSuv,
    passengers: '1-4',
    luggage: '4',
    features: ['Panoramatická strecha', 'Masážne sedadlá', 'WiFi', 'Mini bar'],
    priceFrom: '1,80 €/km',
    popular: true,
  },
  {
    name: 'Executive Van',
    model: 'Mercedes V-Class',
    image: fleetVan,
    passengers: '1-7',
    luggage: '8',
    features: ['Konferenčné usporiadanie', 'TV obrazovky', 'WiFi', 'Nápoje'],
    priceFrom: '2,00 €/km',
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-1">
                    {vehicle.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{vehicle.model}</p>

                  {/* Specs */}
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{vehicle.passengers}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span>{vehicle.luggage}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Wifi className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Wine className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {vehicle.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground block">Od</span>
                      <span className="text-xl font-bold text-gradient-gold">{vehicle.priceFrom}</span>
                    </div>
                    <Button variant={vehicle.popular ? "hero" : "heroOutline"} size="sm" asChild>
                      <a href="#booking">Vybrať</a>
                    </Button>
                  </div>
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
